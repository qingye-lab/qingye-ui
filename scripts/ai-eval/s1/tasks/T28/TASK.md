# T28 数据导入进度

在 `src/ImportPanel.tsx` 实现并导出 `ImportPanel` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ImportPanelProps = {
  startImport: () => Promise<void>; // 开始导入；Promise 在导入结束时完成
};
```

## 需求

1. 一个名称为“导入”的按钮，点击后调用 `startImport()`，开始导入。
2. 服务端在导入结束前不报告任何进度，导入通常需要 10 到 30 秒。导入期间显示一个名称为“导入进度”的进度条。
3. `startImport()` 返回的 Promise 完成后，显示文字“导入完成”，进度条消失。

允许修改：`src/ImportPanel.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
