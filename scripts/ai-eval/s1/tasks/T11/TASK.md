# T11 账户设置页

在 `src/SettingsPage.tsx` 实现并导出 `SettingsPage` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type SettingsPageProps = {
  name: string;
  email: string;
  onSignOut: () => void;
};
```

## 需求

1. 页面名称是“账户设置”；页面级动作是一个“退出登录”按钮，点击调用 `onSignOut()`。
2. 页面有两个分节：
   - “个人资料”：显示姓名 `name` 与邮箱 `email`；分节标题行右端有一个“编辑”链接，指向 `/settings/profile`。
   - “通知”：一段说明文字“每周一发送摘要邮件”。
3. 按本库约定组织页面结构。

允许修改：`src/SettingsPage.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
