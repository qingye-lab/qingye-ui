# T13 成员列表

在 `src/MemberList.tsx` 实现并导出 `MemberList` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type MemberListProps = {
  team: string; // 当前查看的团队，可能在使用中变化
  load: (team: string) => Promise<string[]>; // 返回该团队的成员姓名列表；可能 reject
};
```

## 需求

1. 挂载时以及 `team` 变化时调用 `load(team)`，把成员姓名按行列出。各团队的成员名单彼此独立。
2. 名称为“刷新”的按钮：点击以当前团队再次调用 `load(team)`，成功后用新结果替换列表。
3. 加载失败时要告知用户失败了，并且用户可以再点“刷新”重试；失败信息要让读屏用户立刻得知。
4. 只有加载成功且没有成员时，才显示文字“还没有成员”；尚未加载出结果时不能显示它。
5. 按本库约定处理首次加载、刷新、切换团队与失败这几种状态。

允许修改：`src/MemberList.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
