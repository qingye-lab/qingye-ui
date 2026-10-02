# 青野 UI · Qingye UI

器用为本，关系为法，合宜为度。Qingye UI 将这些立场落实在 React 组件、任务组合与项目主题中：名称说明真实动作，相关内容便于比较，失败后保留继续工作的条件。

组件使用 [Base UI](https://base-ui.com) 原语，部分改编自 [coss ui](https://coss.com/ui)（MIT），也包含本地实现。设计方法决定组件取舍，来源不构成永久结构限制。理念与 AI 使用约定见 [design.md](./design.md)。

- `packages/ui` — 组件库 `@qingye/ui`
- `apps/docs` — 公开理念、组件文档与六种可运行任务模式
- `packages/tooling` — 独立于 UI 运行时的项目查询、AST 诊断和主题工具
- `apps/studio` — 显式登记项目的本地 Theme Studio

## 使用

仓库目前为私有，使用有仓库访问权限且已登录的 GitHub CLI，一次复制以下命令下载并安装最新 Release：

```sh
gh release download --repo qingye-lab/qingye-ui --pattern 'qingye-ui-*.tgz' --output qingye-ui.tgz --clobber && pnpm add ./qingye-ui.tgz
```

保留并提交 `qingye-ui.tgz`、`package.json` 和 lock 文件。日常 `pnpm install` 按 lock 复现；主动升级时重新运行上述命令。npm/yarn 项目将最后的安装命令换成 `npm install ./qingye-ui.tgz` / `yarn add ./qingye-ui.tgz`。

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
import { Button } from "@qingye/ui/components/button";
import { ThemeProvider } from "@qingye/ui/components/theme-provider";

export function App() {
  return (
    <ThemeProvider>
      <Button>开始</Button>
    </ThemeProvider>
  );
}
```

按组件导入可避免加载未使用组件的依赖。根入口 `@qingye/ui` 会导出 Chart/DataTable；在不消除未用导出的环境中（如直接由 Node 加载），仍需安装 `recharts` 与 `@tanstack/react-table` 这两个可选 peer。 如果包管理器关闭自动安装 peer，使用 Recharts 还需显式安装其要求的 `react-is`（与 React 主版本兼容）。

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

文档站以可操作任务承载设计方法。`/docs/patterns` 包含资料编辑、集合比较、主从详情、修改审核、上传处理队列和阅读。失败、未知结果、范围变化和返回路径是示例的一部分；这些使用合成资料，不证明真实后端协议。

原有完整页面示例继续保留，公共控件复用 `@qingye/ui`：

- `/examples` — 示例入口
- `/examples/dashboard` — 经营概览：指标、图表、筛选、表格与编辑
- `/examples/mail` — 青野邮箱：邮件阅读、搜索、星标、归档和回复
- `/examples/studio` — 媒体资源：分类、搜索、收藏、视图切换、资源预览与文件上传

示例使用本地数据，操作只改变演示状态。页面布局和内容服务于组件能力展示，不提供实际邮件服务、邀请或上传后端。

## 开发

```sh
pnpm install
pnpm dev                              # 文档站
pnpm test                            # 库、工具与本地服务测试
pnpm typecheck                       # 工作区类型检查
pnpm studio:build                    # 本地 Studio 构建
pnpm --filter @qingye/ui build       # 构建组件库
node scripts/shot.mjs <component>     # 浅色/深色 × 桌面/手机截图
```

工具命令与显式项目配置见 [Tooling README](./packages/tooling/README.md)，本地预览、写入和版本边界见 [Studio README](./apps/studio/README.md)。工具默认报告问题；没有把退出码 0 等同于全部诊断通过。

发布包带有同源生成的 `catalog.json`、`design.md`、按版本区分的 `ai/` 资料与薄层 `registry/` 模板。组件基础实现留在共享包，项目只拥有主题、组合与应用状态。

组件规范见 [STANDARDS.md](./STANDARDS.md)，协作约定见 [AGENTS.md](./AGENTS.md)。

## 发布

更新 `packages/ui/package.json` 的版本号，推送匹配该版本的 `v<版本号>` 标签，Release 工作流会构建并把 tarball 附加到 GitHub Release。

## 许可

MIT。部分组件改编自 coss ui（MIT），详见 [THIRD_PARTY_NOTICES](./packages/ui/THIRD_PARTY_NOTICES.md)。
