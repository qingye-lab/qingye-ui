# T23 文章目录

在 `src/ArticleToc.tsx` 实现并导出 `ArticleToc` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ArticleTocProps = {
  headings: { id: string; title: string }[]; // 长文各节的标题，页面上对应的节已带有该 id
};
```

## 需求

1. 长文页侧边的“本页目录”：列出各节标题，点击跳到对应 `#id`；目录的可访问名称为“本页目录”。
2. 按本库约定决定什么情况下显示目录。

允许修改：`src/ArticleToc.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
