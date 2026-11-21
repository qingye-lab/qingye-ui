# T21 文件行

在 `src/FileRow.tsx` 实现并导出 `FileRow` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type FileRowProps = {
  name: string;          // 文件名
  onRename: () => void;
  onDelete: () => void;
};
```

## 需求

1. 文件列表里的一行，显示文件名。
2. 在这一行上点右键，弹出操作菜单，含“重命名”“删除”两项，分别调用 `onRename()` 与 `onDelete()`。
3. 按本库约定组织这些操作的入口。

允许修改：`src/FileRow.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
