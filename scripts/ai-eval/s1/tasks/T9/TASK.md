# T9 标签字段

在 `src/TagField.tsx` 实现并导出 `TagField` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type TagFieldProps = {
  suggestions: string[];             // 已有的标签
  onSubmit: (tag: string) => void;   // 添加一个标签
};
```

## 需求

1. 可见标签为“标签”的输入。用户输入时，把 `suggestions` 中包含所输入文字的项作为建议列出。
2. 用户可以选择一个建议，也可以写一个 `suggestions` 里没有的全新标签名。
3. 名称为“添加”的按钮，以当前标签文字调用 `onSubmit(标签)`。

允许修改：`src/TagField.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
