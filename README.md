# 青野 UI · Qingye UI

一套可在多个 React 项目中复用的组件库：基于 [Base UI](https://base-ui.com) 的可访问原语，采用 [coss ui](https://coss.com/ui)（MIT）的组件设计，配合三层设计令牌、浅色 / 深色双主题和库级动效规范。

- `packages/ui` — 组件库 `@qingye/ui`
- `apps/docs` — 文档站与组件示例

## 使用

当前组件包版本为 `0.2.0`。仓库目前为私有，使用有仓库访问权限且已登录的 GitHub CLI 下载指定版本，再安装本地包：

```sh
gh release download v0.2.0 --repo qingye-lab/qingye-ui --pattern qingye-ui-0.2.0.tgz
pnpm add ./qingye-ui-0.2.0.tgz
```

Tailwind CSS 4 项目：

```css
@import "tailwindcss";
@import "@qingye/ui/styles.css";
```

没有 Tailwind 的项目导入预编译样式：

```ts
import "@qingye/ui/ui.css";
```

```tsx
import { Button, ThemeProvider } from "@qingye/ui";

export function App() {
  return (
    <ThemeProvider>
      <Button>开始</Button>
    </ThemeProvider>
  );
}
```

完整说明见文档站（`pnpm dev` 后访问 http://localhost:5180）。

## 文档站部署

在线文档：[青野 UI · Qingye UI](https://yanqing-ui.pages.dev/)。部署沿用现有 Pages 项目标识与域名；品牌、源码和 GitHub 仓库统一使用 Qingye UI。

文档站使用 Cloudflare Pages 原生 GitHub 关联部署，源仓库为 `qingye-lab/qingye-ui`，生产分支为 `main`。推送到 `main` 后由 Cloudflare 拉取源码、构建并发布，无需在 GitHub Actions 中保存 Cloudflare API Token。

| Cloudflare Pages 配置 | 值 |
| --- | --- |
| 项目名称 | `yanqing-ui` |
| 根目录 | 仓库根目录 |
| 构建命令 | `pnpm docs:build` |
| 输出目录 | `apps/docs/dist` |
| `NODE_VERSION` | `24.20.0` |
| `PNPM_VERSION` | `10.12.1` |

构建结果是 React 单页应用，使用 Pages 默认的路由回退；不要在输出根目录添加 `404.html`，否则直接访问组件文档或刷新页面会失去 SPA 回退。

部署选择与验证方式见 [Cloudflare Pages 部署决策](./docs/decisions/cloudflare-pages.md)。

## 组件组合演示

文档站首页展示经营概览、青野邮箱、媒体资源与组件预览，也可以打开独立演示页面。每个 demo 用完整页面展示组件的组合、状态和交互；按钮、输入、菜单、表格、图表与弹窗等控件均复用 `@qingye/ui`。

- `/examples` — 示例入口
- `/examples/dashboard` — 经营概览：指标、图表、筛选、表格与编辑
- `/examples/mail` — 青野邮箱：邮件阅读、搜索、星标、归档和回复
- `/examples/studio` — 媒体资源：分类、搜索、收藏、视图切换、资源预览与文件上传

示例使用本地数据，操作只改变演示状态。页面布局和内容服务于组件能力展示，不提供实际邮件服务、邀请或上传后端。

## 开发

```sh
pnpm install
pnpm dev                              # 文档站
pnpm --filter @qingye/ui test        # 单元测试
pnpm --filter @qingye/ui build       # 构建组件库
node scripts/shot.mjs <component>     # 浅色/深色 × 桌面/手机截图
```

组件规范见 [STANDARDS.md](./STANDARDS.md)，协作约定见 [AGENTS.md](./AGENTS.md)。

## 发布

更新 `packages/ui/package.json` 的版本号，推送同名标签（如 `v0.2.0`），Release 工作流会构建并把 tarball 附加到 GitHub Release。

## 许可

MIT。部分组件改编自 coss ui（MIT），详见 [THIRD_PARTY_NOTICES](./packages/ui/THIRD_PARTY_NOTICES.md)。
