# T19 收件人列表

在 `src/RecipientList.tsx` 实现并导出 `RecipientList` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type RecipientListProps = {
  initialRecipients: { id: string; name: string }[];
  onChange?: (ids: string[]) => void; // 每次移除后传入剩余收件人的 id（保持原顺序）
};
```

## 需求

1. 组件自己持有当前收件人列表，初始为 `initialRecipients`。
2. 每位收件人显示为一个可移除的记号，记号上显示其姓名；移除可以用鼠标点击，也可以用键盘操作。移除按钮的可访问名称为“移除 姓名”（如“移除 Bob”）。
3. 移除一位后，该记号消失，并调用 `onChange` 传入剩余收件人的 id。
4. 按本库约定处理移除之后的键盘操作：用键盘移除时，用户应能不借助鼠标、从合理的位置继续操作。

允许修改：`src/RecipientList.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
