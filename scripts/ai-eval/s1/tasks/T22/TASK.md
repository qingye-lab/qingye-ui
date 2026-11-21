# T22 视图切换

在 `src/ViewSwitch.tsx` 实现并导出 `ViewSwitch` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type ViewSwitchProps = {
  value: "list" | "grid"; // 当前视图，由父组件持有
  onValueChange: (value: "list" | "grid") => void;
};
```

## 需求

1. 文件浏览页顶部有“列表”“网格”两种视图可切换，任何时候恰有一种视图处于选中。
2. 选中另一项时调用 `onValueChange`，参数为所选视图。
3. 控件需有可访问名称“视图”。
4. 按本库约定选择控件。

允许修改：`src/ViewSwitch.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
