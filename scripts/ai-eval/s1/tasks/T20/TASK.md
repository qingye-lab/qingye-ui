# T20 导出任务状态区

在 `src/ExportTask.tsx` 实现并导出 `ExportTask` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ExportTaskProps = {
  status: "running" | "cancelled" | "done" | "failed"; // 服务端返回的任务真实状态
  onCancel: () => void;
};
```

## 需求

1. 一个后台导出任务的状态区。`status` 为 `running` 时提供名称为“取消”的按钮，点击调用 `onCancel()`。
2. 取消由服务端执行，结果通过 `status` 回传，组件自己不会改变 `status`。
3. 四种 `status` 都要让用户看懂：`cancelled` 时显示含“已取消”的文字，`done` 时含“已完成”，`failed` 时含“失败”，`running` 时说明任务正在进行。
4. 按本库约定呈现点击取消之后的状态。

允许修改：`src/ExportTask.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
