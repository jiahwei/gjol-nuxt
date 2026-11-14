import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(new URL('../deploy.sh', import.meta.url))

function runDeploy(failure = '') {
  const dir = mkdtempSync(join(tmpdir(), 'gjol-deploy-test-'))
  const bin = join(dir, 'bin')
  const log = join(dir, 'commands.log')
  mkdirSync(bin)
  writeFileSync(log, '')
  copyFileSync(script, join(dir, 'deploy.sh'))

  const commands = {
    corepack: `#!/bin/sh
printf 'corepack %s\\n' "$*" >> "$TEST_LOG"
[ "$TEST_FAILURE" = build ] && exit 1
mkdir -p .output/public/_nuxt
printf index > .output/public/index.html
printf fallback > .output/public/200.html
printf js > .output/public/_nuxt/test.js
`,
    ssh: `#!/bin/sh
printf 'ssh %s\\n' "$*" >> "$TEST_LOG"
cat >/dev/null
case " $* " in
  *' prepare '*) printf '%s\\n' /var/www/gjol-nuxt/releases/release-test ;;
esac
`,
    rsync: `#!/bin/sh
printf 'rsync %s\\n' "$*" >> "$TEST_LOG"
[ "$TEST_FAILURE" = upload ] && exit 1
exit 0
`,
    curl: `#!/bin/sh
printf 'curl %s\\n' "$*" >> "$TEST_LOG"
exit 0
`,
    git: `#!/bin/sh
case "$*" in
  *rev-parse*) printf '%s\\n' 1234567890abcdef ;;
esac
exit 0
`,
  }
  for (const [name, contents] of Object.entries(commands)) {
    writeFileSync(join(bin, name), contents, { mode: 0o755 })
  }

  try {
    const result = spawnSync('bash', [join(dir, 'deploy.sh')], {
      cwd: dir,
      env: { ...process.env, PATH: `${bin}:${process.env.PATH}`, HOME: dir, TEST_LOG: log, TEST_FAILURE: failure },
      encoding: 'utf8',
      timeout: 10000,
    })
    return { ...result, commands: readFileSync(log, 'utf8').trim().split('\n').filter(Boolean) }
  }
  finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

test('构建失败时不上传或切换版本', () => {
  const result = runDeploy('build')
  assert.notEqual(result.status, 0, result.stderr)
  assert.ok(result.commands.some(line => line.startsWith('corepack pnpm run generate')), result.commands.join('\n'))
  assert.ok(!result.commands.some(line => line.startsWith('rsync ')), result.commands.join('\n'))
  assert.ok(!result.commands.some(line => /\bactivate\b/.test(line)), result.commands.join('\n'))
})

test('上传失败时不切换版本', () => {
  const result = runDeploy('upload')
  assert.notEqual(result.status, 0, result.stderr)
  assert.ok(result.commands.some(line => line.startsWith('rsync ')), result.commands.join('\n'))
  assert.ok(!result.commands.some(line => /\bactivate\b/.test(line)), result.commands.join('\n'))
})

test('成功时先上传再切换到上传的版本', () => {
  const result = runDeploy()
  assert.equal(result.status, 0, `${result.stderr}\n${result.stdout}`)
  const upload = result.commands.findIndex(line => line.startsWith('rsync '))
  const activate = result.commands.findIndex(line => /\bactivate\b/.test(line))
  assert.ok(upload >= 0, result.commands.join('\n'))
  assert.ok(activate > upload, result.commands.join('\n'))
  assert.match(result.commands[activate], /\/var\/www\/gjol-nuxt\/releases\/release-test/)
})
