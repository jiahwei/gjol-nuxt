#!/bin/sh
set -eu

cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"

echo '构建当前工作区的静态站点（包括未提交的改动）...'
corepack pnpm run generate

output=.output/public
test -s "$output/index.html"
test -s "$output/200.html"
test -d "$output/_nuxt"
index_hash=$(shasum -a 256 "$output/index.html" | awk '{print $1}')

echo '在 ali 创建新的发布目录...'
release=$(ssh -o BatchMode=yes ali bash -s -- prepare <<'REMOTE'
set -eu
base=/var/www/gjol-nuxt/releases
test -d "$base"
mktemp -d "$base/release-XXXXXXXXXX"
REMOTE
)
case "$release" in
  /var/www/gjol-nuxt/releases/release-*) ;;
  *) echo "服务器返回的发布目录无效: $release" >&2; exit 1 ;;
esac

echo "上传到 $release ..."
rsync -rL --no-perms --no-owner --no-group "$output/" "ali:$release/"

echo '校验并切换版本...'
ssh -o BatchMode=yes ali bash -s -- activate "$release" "$index_hash" <<'REMOTE'
set -euo pipefail
release=$2
expected_hash=$3
base=/var/www/gjol-nuxt
case "$release" in "$base"/releases/release-*) ;; *) exit 1 ;; esac
test -s "$release/index.html"
test -s "$release/200.html"
test -d "$release/_nuxt"
test "$(sha256sum "$release/index.html" | awk '{print $1}')" = "$expected_hash"

# Prevent overlapping activations and keep the previous release for rollback.
exec 9>"$base/.deploy.lock"
flock -n 9 || { echo '另一个发布正在进行中' >&2; exit 1; }
test -L "$base/current"
previous=$(readlink -f "$base/current")
test -d "$previous"

# Keep old hashed assets accessible to visitors who loaded the previous page.
if [ -d "$previous/_nuxt" ]; then
  rsync -a --ignore-existing "$previous/_nuxt/" "$release/_nuxt/"
fi
chmod -R a+rX "$release"
temporary="$base/.current-$(basename "$release")"
ln -s "$release" "$temporary"
mv -Tf "$temporary" "$base/current"

if ! served_hash=$(curl --noproxy '*' --fail --silent --show-error --max-time 15 \
  --resolve gjoldb.info:443:127.0.0.1 https://gjoldb.info/ | sha256sum | awk '{print $1}') \
  || [ "$served_hash" != "$expected_hash" ]; then
  echo '线上首页校验失败，正在恢复上一版本' >&2
  ln -s "$previous" "$temporary"
  mv -Tf "$temporary" "$base/current"
  exit 1
fi
echo "已发布: $release"
echo "上一版本: $previous"
REMOTE
