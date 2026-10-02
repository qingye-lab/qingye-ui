# 青野 UI · Qingye UI

器用为本，关系为法，合宜为度。React 组件库使用 Base UI 原语，包含 coss ui（MIT）派生组件与本地实现，以任务关系、明确状态和恢复路径组织界面。内置分层令牌、浅深主题与动效规范，需要 React 19.2+。

公开设计方法见随包提供的 `design.md`；`catalog.json` 包含当前导出、API 指引、来源、依赖与组合示例；`ai/SKILL.md` 和 `ai/v<版本>/` 供 AI 按安装版本查询。无法静态确认的 Provider 要求或继承签名保留未知，不等同于运行时验证。

`registry/` 只提供引用共享包的项目 Provider / 主题模板，不复制基础组件。应用负责权限、草稿、请求、版本和结果；单独的 `@qingye/tooling` 提供本地诊断与主题操作，UI 不依赖它运行。

## 安装

仓库目前为私有，使用有仓库访问权限且已登录的 GitHub CLI，一次复制以下命令下载并安装最新 Release：

```sh
gh release download --repo qingye-lab/qingye-ui --pattern 'qingye-ui-*.tgz' --output qingye-ui.tgz --clobber && pnpm add ./qingye-ui.tgz
```

保留并提交 `qingye-ui.tgz`、`package.json` 和 lock 文件。日常 `pnpm install` 按 lock 复现；主动升级时重新运行上述命令。npm/yarn 项目将最后的安装命令换成 `npm install ./qingye-ui.tgz` / `yarn add ./qingye-ui.tgz`。

`DataTable` 需要 `@tanstack/react-table`，`Chart` 需要 `recharts`；它们是可选的 peer 依赖，只在使用对应组件时安装。

## 样式

**Tailwind CSS 4 项目**（推荐）——由 Tailwind 扫描组件源码，只生成实际用到的类：

```css
@import "tailwindcss";
@import "@qingye/ui/styles.css";
```

`styles.css` 已声明 `dark` 变体（`.dark` 或 `data-theme="dark"` 祖先），无需重复配置。

**没有 Tailwind 的项目**——导入预编译样式（gzip 约 30 KB）：

```ts
import "@qingye/ui/ui.css";
```

两种方式二选一，不要同时导入。

## 根部 Provider

```tsx
import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import { ToastProvider } from "@qingye/ui/components/toast";
import { TooltipProvider } from "@qingye/ui/components/tooltip";

<ThemeProvider>
  <TooltipProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </TooltipProvider>
</ThemeProvider>
```

为避免首屏闪烁，在 `<head>` 中尽早应用已保存的主题：

```html
<script>
  try {
    var t = localStorage.getItem("yq-theme");
    var dark = t === "dark" || ((!t || t === "system") && matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  } catch (e) {}
</script>
```

## 导入

```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogPopup } from "@qingye/ui/components/dialog";
import { Select } from "@qingye/ui/components/select";
```

按组件导入可避免加载未使用组件的依赖。根入口 `@qingye/ui` 会导出 Chart/DataTable；在不消除未用导出的环境中（如直接由 Node 加载），仍需安装 `recharts` 与 `@tanstack/react-table` 这两个可选 peer。 如果包管理器关闭自动安装 peer，使用 Recharts 还需显式安装其要求的 `react-is`（与 React 主版本兼容）。

已有 shadcn 命名的组件同时导出别名（`DropdownMenu*`、`DialogContent`、`SheetContent`、`TabsTrigger`、`TooltipContent` 等），便于迁移。

## 主题定制

品牌在 `<html data-brand="project">` 静态设置；缺省不需要品牌属性。ThemeProvider 默认在 html 切换 `.light/.dark`，显式 `attribute="data-theme"` 才写明暗属性；密度独立使用 `data-density`。示例 CSS 不是库内品牌包，局部容器与 Portal 品牌继承未自动支持。

令牌分三层：`tokens/primitives.css`（原始色板）→ `tokens/semantic.css`（语义角色，浅色 + 深色）→ `tokens/components.css`（字号、间距、圆角、尺寸、密度、动效）。组件只读语义层和组件层。在导入 `styles.css` 之后覆盖 `--qy-*` 令牌即可定制：

```css
html[data-brand="project"] {
  --qy-primary: oklch(0.55 0.18 255);
  --qy-primary-foreground: oklch(0.99 0 0);
  --qy-radius: 0.5rem;
}
html[data-brand="project"]:is(.dark, [data-theme="dark"]) {
  --qy-primary: oklch(0.7 0.15 255);
}
```

不带前缀的 `--background`、`--card` 等是供 shadcn 生态读取的兼容变量，始终指向 `--qy-*`，不要直接覆盖。

根圆角默认8px，只联动 md/lg；`--qy-radius-control` 默认接lg，`--qy-radius-panel` 默认接独立2xl（12px）；xs/sm/xl/2xl/full保持独立。布局 spacing 由根 `--qy-space-1`（默认4px）派生命名步，组件显式消费布局间距，固定图标/控件几何不依赖全局 spacing。

密度：html 或局部容器可设置 `data-density="compact"`，实际消费密度角色的表格/面板随之收紧，不声称所有尺寸都联动。

## 国际化

内置文案默认简体中文，不依赖浏览器语言。切换英文：

```tsx
import { UILocaleProvider } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";

<UILocaleProvider locale={enUS}>…</UILocaleProvider>
```

可用 `messages={{ close: "关闭面板" }}` 局部覆写；组件自身的 `aria-label` 等参数优先于默认文案。

## 动效

`motion.css` 统一处理：按压反馈（`.qy-pressable`）、选择器与菜单弹层入场、键盘操作时即时切换、`prefers-reduced-motion` 下只保留透明度与颜色变化。可选的 `MotionProvider` 会在 `<html>` 上标记当前输入方式。

## 来源

适配自 coss ui 的组件记录在 `coss-source.json`（上游路径、SHA-256 与每项本地改动），`upstream/` 不随包发布。检查上游更新：

```sh
pnpm --filter @qingye/ui check:upstream
```

许可：MIT，见 `LICENSE` 与 `THIRD_PARTY_NOTICES.md`。
