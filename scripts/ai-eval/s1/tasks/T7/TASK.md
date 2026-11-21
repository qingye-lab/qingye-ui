# T7 发布栏

在 `src/PublishBar.tsx` 实现并导出 `PublishBar` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type PublishBarProps = {
  blockedReason: string | null; // 不能发布的原因，例如“还缺一位审批人”；null 表示可以发布
  onPublish: () => void;
};
```

## 需求

1. 一个名称为“发布”的按钮。`blockedReason` 为 `null` 时，点击调用 `onPublish()`。
2. `blockedReason` 不为 `null` 时，按钮仍显示但不能执行；按本库约定让用户知道为什么不能发布（原因文字使用 `blockedReason` 原文）。

允许修改：`src/PublishBar.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
