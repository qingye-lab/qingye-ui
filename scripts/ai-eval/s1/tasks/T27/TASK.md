# T27 任务状态筛选

在 `src/StatusFilter.tsx` 实现并导出 `StatusFilter` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type StatusFilterProps = {
  value: string[]; // 当前生效的状态筛选
  onApply: (next: string[]) => void;
};
```

可选状态固定为“待处理”“进行中”“已完成”三项。

## 需求

1. 一个名称为“筛选”的按钮，在它旁边打开一个浮层。
2. 浮层里用复选框勾选要显示的状态，每项的名称就是上面的状态文字；初始勾选反映 `value`。
3. 浮层底部有一个名称为“应用”的按钮。点击时以当前勾选的状态（数组）调用 `onApply`，并收起浮层。
4. 列表重算很慢，所以不能每勾选一次就调用 `onApply`。
5. 按 Esc 或点击浮层外面也能收起浮层。

允许修改：`src/StatusFilter.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
