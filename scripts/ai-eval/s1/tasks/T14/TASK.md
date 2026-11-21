# T14 成员行操作菜单

在 `src/MemberRowMenu.tsx` 实现并导出 `MemberRowMenu` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type MemberRowMenuProps = {
  memberId: string;
  onDeactivate: () => void;
};
```

## 需求

1. 一个只有图标的触发按钮，可访问名称为“更多操作”。点击后展开一个菜单，含两项。
2. “查看资料”：打开该成员的资料页 `/members/<memberId>`。
3. “停用”：调用 `onDeactivate()`。

按本库约定选用组件与语义。允许修改：`src/MemberRowMenu.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
