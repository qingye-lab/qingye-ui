# 青野 UI · Qingye UI

React 组件库：Base UI 原语 + coss ui（MIT）的组件设计 + 三层设计令牌，内置浅色 / 深色主题与动效规范。需要 React 19.2+。

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

按组件导入可避免加载未使用组件的依赖。根入口 `@qingye/ui` 会导出 Chart/DataTable；在不消除未用导出的环境中（如直接由 Node 加载），仍需安装 `recharts` 与 `@tanstack/react-table` 这两个可选 peer。

已有 shadcn 命名的组件同时导出别名（`DropdownMenu*`、`DialogContent`、`SheetContent`、`TabsTrigger`、`TooltipContent` 等），便于迁移。

## 主题定制

令牌分三层：`tokens/primitives.css`（原始色板）→ `tokens/semantic.css`（语义角色，浅色 + 深色）→ `tokens/components.css`（字号、间距、圆角、尺寸、密度、动效）。组件只读语义层和组件层。在导入 `styles.css` 之后覆盖 `--qy-*` 令牌即可定制：

```css
:root {
  --qy-primary: oklch(0.55 0.18 255);
  --qy-primary-foreground: oklch(0.99 0 0);
  --qy-radius: 0.5rem;
}
.dark {
  --qy-primary: oklch(0.7 0.15 255);
}
```

不带前缀的 `--background`、`--card` 等是供 shadcn 生态读取的兼容变量，始终指向 `--qy-*`，不要直接覆盖。

密度：在任意容器上设置 `data-density="compact"`，内部表格行高、面板内边距和间距随之收紧。

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
