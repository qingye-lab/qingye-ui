# Yanqing UI

一套可在多个 React 项目中复用的组件库：基于 [Base UI](https://base-ui.com) 的可访问原语，采用 [coss ui](https://coss.com/ui)（MIT）的组件设计，配合三层设计令牌、浅色 / 深色双主题和库级动效规范。

- `packages/ui` — 组件库 `@yanqing/ui`
- `apps/docs` — 文档站与组件示例

## 使用

从 GitHub Release 安装指定版本：

```sh
pnpm add https://github.com/qingye-lab/yanqing-ui/releases/download/v0.1.0/yanqing-ui-0.1.0.tgz
```

Tailwind CSS 4 项目：

```css
@import "tailwindcss";
@import "@yanqing/ui/styles.css";
```

没有 Tailwind 的项目导入预编译样式：

```ts
import "@yanqing/ui/ui.css";
```

```tsx
import { Button, ThemeProvider } from "@yanqing/ui";

export function App() {
  return (
    <ThemeProvider>
      <Button>开始</Button>
    </ThemeProvider>
  );
}
```

完整说明见文档站（`pnpm dev` 后访问 http://localhost:5180）。

## 开发

```sh
pnpm install
pnpm dev                              # 文档站
pnpm --filter @yanqing/ui test        # 单元测试
pnpm --filter @yanqing/ui build       # 构建组件库
node scripts/shot.mjs <component>     # 浅色/深色 × 桌面/手机截图
```

组件规范见 [STANDARDS.md](./STANDARDS.md)，协作约定见 [AGENTS.md](./AGENTS.md)。

## 发布

更新 `packages/ui/package.json` 的版本号，推送同名标签（如 `v0.2.0`），Release 工作流会构建并把 tarball 附加到 GitHub Release。

## 许可

MIT。部分组件改编自 coss ui（MIT），详见 [THIRD_PARTY_NOTICES](./packages/ui/THIRD_PARTY_NOTICES.md)。
