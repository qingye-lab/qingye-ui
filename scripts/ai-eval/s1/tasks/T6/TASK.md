# T6 邀请成员

在 `src/InviteForm.tsx` 实现并导出 `InviteForm` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type InviteFormProps = {
  checkEmail: (email: string) => Promise<boolean>; // true 表示可以邀请，false 表示已是成员
  sendInvite: (email: string) => Promise<void>;    // 失败时 reject
};
```

## 需求

1. **邮箱**：可见标签为“邮箱”的输入框。
   - 离开输入框时调用 `checkEmail(当前邮箱)`。结果为 `false` 时，这个字段显示错误“该邮箱已是成员”，并处于无效状态；用读屏的用户也要能知道它为什么无效。
   - 修改邮箱后，错误消失。
   - 输入框旁有一个只有图标的按钮，名称为“清空”，点击清空邮箱。
2. **发送邀请**：名称为“发送邀请”的按钮，点击后调用 `sendInvite(邮箱)`。
   - 邮箱已被判定为已是成员时不发送。
   - 发送进行中，按钮表现为正在处理；这期间重复点击不会重复发送。
   - 发送失败时显示失败提示，用读屏的用户也要立刻得知；已填的邮箱保留，可以再次发送。
   - 发送成功后显示“邀请已发送”。

允许修改：`src/InviteForm.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
