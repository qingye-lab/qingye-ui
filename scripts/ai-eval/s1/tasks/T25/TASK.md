# T25 任务指派人的资料预览

在 `src/Assignee.tsx` 实现并导出 `Assignee` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type AssigneeProps = {
  person: {
    name: string;
    email: string;
    profileUrl: string;
    deactivated: boolean; // 账号是否已停用
  };
};
```

## 需求

1. 显示指派人姓名，姓名是指向 `profileUrl` 的链接。
2. 鼠标停在姓名上，或键盘聚焦到姓名时，出现预览卡片，卡片里显示邮箱（`email` 原文）。
3. 指派人账号已停用（`deactivated` 为 `true`）时，停用的账号收不到任务通知，要让用户知道这件事；文字使用“已停用”。账号未停用时不出现“已停用”。

允许修改：`src/Assignee.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
