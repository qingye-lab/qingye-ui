# T18 昵称

在 `src/NicknameField.tsx` 实现并导出 `NicknameField` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export class UnknownOutcomeError extends Error {}
// save 以 UnknownOutcomeError reject：请求超时，服务器可能已写入，也可能没有

export type NicknameFieldProps = {
  value: string;                          // 当前昵称
  save: (next: string) => Promise<void>;  // 保存新昵称
};
```

## 需求

1. 显示当前昵称 `value`。
2. 可见标签为“昵称”的输入框，和名称为“保存”的按钮；点击按钮调用 `save(输入框内容)`。
3. 保存成功后，显示新昵称。
4. `save` 以 `UnknownOutcomeError` reject 时，请求超时、结果不确定：按本库约定呈现这一情形。

允许修改：`src/NicknameField.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
