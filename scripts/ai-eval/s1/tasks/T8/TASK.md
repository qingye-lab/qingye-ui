# T8 草稿编辑器

在 `src/DraftEditor.tsx` 实现并导出 `DraftEditor` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export class ConflictError extends Error {}

export type DraftEditorProps = {
  initial: string;                                                          // 草稿初始文字
  save: (text: string, options?: { force?: boolean }) => Promise<void>;    // 服务器上已被他人修改时以 ConflictError reject
  reload: () => Promise<string>;                                            // 取回服务器上的最新文字
};
```

## 需求

1. 可见标签为“草稿”的多行输入，初始内容为 `initial`。名称为“保存”的按钮，点击调用 `save(当前文字)`。
2. `save` 以 `ConflictError` reject，表示服务器上的草稿已被他人修改。此时用户需要在两项决定之间选择：
   - “覆盖保存”：以 `save(当前文字, { force: true })` 重新提交；
   - “重新载入”：调用 `reload()`，用结果替换草稿。
3. 出现冲突时要说明“已被他人修改”，使用读屏的用户也要立刻得知；用户已写的草稿不能丢。按本库约定呈现冲突及这两项决定。

允许修改：`src/DraftEditor.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
