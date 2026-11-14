# GjoL DB

古网公告数据统计网站前端项目，项目通过爬虫技术自动收集游戏公告内容，依据版本分类公告，并对公告段落进行无监督文本分类。

## 🌐 项目地址

访问网站：[gjoldb.info](https://gjoldb.info)

## 安装依赖

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## 运行项目

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## 本机部署

在配置了 `ssh ali` 的电脑上执行 `corepack pnpm run deploy`。需要 Node.js、Corepack、rsync、SSH 和服务器访问权限；构建使用项目声明的 pnpm 版本。脚本会构建**当前工作区**，包括未提交的改动，请先确认这些改动可以发布。

脚本将 `.output/public` 上传至服务器 `/var/www/gjol-nuxt/releases/` 的新目录，验证文件后切换 `current` 软链接，并通过本机 Nginx 校验首页；校验失败时恢复上一版本。旧版本和旧的 Nuxt 静态资源会保留，供回滚和已打开页面使用。不会修改 Nginx、后端或服务器环境配置。

发布后可访问 https://gjoldb.info/ 验证页面。需要回滚时，可通过 SSH 将 `current` 软链接切回先前的 release；历史版本不会自动清理。旧的 GitHub Actions 和 `.env.deploy` 是此前容器部署方案，不用于此流程。
