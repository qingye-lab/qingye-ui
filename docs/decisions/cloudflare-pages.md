# 文档站使用 Cloudflare Pages 原生 GitHub 部署

Status: accepted
Date: 2026-10-01

## Context

用户要求通过 Cloudflare 关联 GitHub 发布 UI 组件网站，并明确本次包含当前未提交的 UI 修改。源仓库为私有仓库 `qingye-lab/yanqing-ui`，默认分支为 `main`。

## Evidence

`apps/docs` 是 Vite 构建的 React 文档站，使用 React Router 客户端路由。根目录已有 `pnpm docs:build`，输出位于 `apps/docs/dist`；当前站点无需服务端函数或数据库。现有 GitHub CI 使用 Node.js 24，工作区固定 pnpm 10.12.1。

## Decision

使用 Cloudflare Pages 项目 `yanqing-ui`，原生关联该 GitHub 仓库的 `main` 分支。生产推送自动构建，构建命令为 `pnpm docs:build`，输出目录为 `apps/docs/dist`。生产和预览配置均固定 `NODE_VERSION=24.20.0`、`PNPM_VERSION=10.12.1`；本次仅启用生产分支自动部署。

使用 Pages 默认 SPA 路由回退，不添加顶层 `404.html`。仓库保持私有，发布产物为可公开访问的文档站。

## Alternatives considered

GitHub Actions 调用 Wrangler 可以部署，但需要额外管理 Cloudflare Secret。手动上传构建产物不能单独实现用户要求的 GitHub 推送自动部署。

## Consequences

Cloudflare 使用已有 GitHub 集成读取仓库并构建；提交到 `main` 即发布生产站点。组件包仍由现有标签 Release 工作流发布。站内私有仓库和 Release 链接仍需相应 GitHub 访问权限。

## Verification

发布前检查组件测试、类型检查和文档构建。发布后检查 Cloudflare 源仓库、生产分支、自动部署开关及部署对应的 Git SHA，并在真实浏览器中检查首页、组件文档直接访问和刷新，以及不存在的路由。Cloudflare 构建失败时检查部署日志；已有成功版本可在 Pages 部署面板中回滚。

## Revisit when

文档站引入服务端功能、改变输出目录或迁移仓库时重新评估部署配置。启用预览部署或绑定自定义域名时更新本决策。
