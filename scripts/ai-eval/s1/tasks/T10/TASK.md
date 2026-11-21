# T10 时间粒度

在 `src/GranularityPicker.tsx` 实现并导出 `GranularityPicker` 组件，界面使用 `@qingye_lab/ui`。

## 接口（已在骨架中给出，不要改名）

```ts
export type Granularity = "day" | "week" | "month";

export type GranularityPickerProps = {
  value: Granularity;                       // 当前粒度（受控）
  onChange: (value: Granularity) => void;
};
```

## 需求

同一张图表按“日 / 周 / 月”粒度重新取数，界面上只有这一张图，没有按粒度切换的内容区域。需要一个名称为“时间粒度”的选择：

1. 候选的可见文字依次为“日”“周”“月”，分别对应 `day`、`week`、`month`；当前项由 `value` 决定。
2. 选择另一个候选时调用 `onChange(对应值)`。
3. 任何时候都必须有一个当前粒度。

按本库约定选用控件。

允许修改：`src/GranularityPicker.tsx`（可在 `src/` 下新增文件）。不要修改 `package.json`、`vitest.config.ts`、`tsconfig.json` 与 `src/test/`。
