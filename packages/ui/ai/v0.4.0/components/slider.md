# 滑块 Slider

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/slider
Source: packages/ui/src/components/slider.tsx
Source SHA-256: ffe34a960b0e4af9403c7680845dc01287ba4f4a2c1ed76c34df648a2fb99918

在连续或分级的数值范围内拖动取值，适合音量、阈值、价格区间这类近似值；需要精确输入时配合 NumberField。

## Use and ownership
- 调整连续或分级的近似数值，范围关系比逐字输入更重要。
- Avoid: 不能只靠滑块位置表达精确值；范围的两个滑块必须分别命名。
- Library: 范围、步长、方向键与拖动、按滑块命名和本地化数值。
- Application: 单位、业务范围、请求触发时机和保存结果。

## Composition
- SliderValue 展示当前值；精确任务配 NumberField，共享同一受控值。

## Responsive behavior
- 轨道保留调整空间与粗指针命中区；竖向滑块由宿主提供实际高度。

## Customization
- getAriaLabel 区分上下界，getAriaValueText 表达单位；format 默认跟随 UI locale。

## Current exports
- Slider: function; owner slider; PASS; props: SliderPrimitive.Root.Props & {
  /** Accessible name per thumb; needed for range sliders so each thumb is distinguishable. */
  getAriaLabel?: SliderPrimitive.Thumb.Props["getAriaLabel"];
  /** Spoken value per thumb, e.g. "¥1,200". */
  getAriaValueText?: SliderPrimitive.Thumb.Props["getAriaValueText"];
}
- SliderPrimitive: reexport; owner slider; UNVERIFIED
- SliderValue: function; owner slider; PASS; props: SliderPrimitive.Value.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Slider
Base UI Slider；根据值的数量自动渲染一个或两个滑块。
- value / defaultValue / onValueChange: number | number[]. 受控 / 非受控的值；数组表示范围。
- onValueCommitted: (value) => void. 拖动结束或键盘调整后调用，适合触发请求。
- min / max / step: number; default 0 / 100 / 1. 范围与步长。
- largeStep: number; default 10. PageUp / PageDown 与 Shift + 方向键的步长。
- orientation: "horizontal" | "vertical"; default "horizontal". 方向；竖向时需给父元素设定高度。
- format: Intl.NumberFormatOptions. SliderValue 与读屏使用的数字格式。
- getAriaLabel: (index: number) => string. 每个滑块的无障碍名称；范围滑块必须区分「最低」「最高」。
- getAriaValueText: (formatted, value, index) => string. 读屏时朗读的值，例如「¥1,200」。
- disabled / name: boolean / string. 禁用与表单字段名。

### SliderValue
当前值的文字显示，放在 Slider 内部。

## Keyboard
- ← → / ↑ ↓: 按 step 调整。
- Shift + 方向键 / PageUp / PageDown: 按 largeStep 调整。
- Home / End: 跳到最小 / 最大值。

## Source examples
### 标签与数值
Source: apps/docs/src/content/slider/demos/01-basic.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Slider, SliderValue } from "@qingye/ui/components/slider";

export const meta = { title: "标签与数值", description: "Field 提供标签，SliderValue 显示当前值。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-sm">
      <Slider defaultValue={68} format={{ style: "unit", unit: "percent" }}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <FieldLabel>屏幕亮度</FieldLabel>
          <SliderValue className="text-muted-foreground numeric" />
        </div>
      </Slider>
    </Field>
  );
}
```

### 范围
Source: apps/docs/src/content/slider/demos/02-range.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Slider, SliderValue } from "@qingye/ui/components/slider";

export const meta = { title: "范围", description: "两个滑块分别命名，读屏能区分最低价与最高价。" };

const yuan = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 0 });

export default function Demo() {
  return (
    <Field className="w-full max-w-sm">
      <Slider
        defaultValue={[800, 3200]}
        min={0}
        max={5000}
        step={100}
        minStepsBetweenValues={5}
        format={{ style: "currency", currency: "CNY", maximumFractionDigits: 0 }}
        getAriaLabel={(index) => (index === 0 ? "最低价" : "最高价")}
        getAriaValueText={(_, value) => yuan.format(value)}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <FieldLabel>价格区间</FieldLabel>
          <SliderValue className="text-muted-foreground numeric" />
        </div>
      </Slider>
    </Field>
  );
}
```

### 刻度
Source: apps/docs/src/content/slider/demos/03-steps.tsx
```tsx
import { Slider } from "@qingye/ui/components/slider";

export const meta = { title: "刻度", description: "step 限定可选值，下方刻度标出每一档。" };

const levels = ["关闭", "低", "中", "高", "最大"];

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Slider aria-label="新风档位" defaultValue={2} max={levels.length - 1} getAriaValueText={(_, value) => levels[value] ?? ""} />
      <div aria-hidden="true" className="mt-3 flex justify-between px-2.5 text-muted-foreground text-xs sm:px-2">
        {levels.map((level) => (
          <span key={level} className="flex w-0 flex-col items-center gap-1.5">
            <span className="h-1 w-px bg-muted-foreground/48" />
            {/* Two-character labels center on a zero-width tick, extending at most 1em per side. */}
            <span className="whitespace-nowrap" data-audit-overflow-inline="1em">{level}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

### 竖向与禁用
Source: apps/docs/src/content/slider/demos/04-vertical.tsx
```tsx
import { Slider } from "@qingye/ui/components/slider";

export const meta = { title: "竖向与禁用", description: "竖向滑块需要父元素有确定高度；禁用时整体降低不透明度。" };

const bands = [
  { label: "60Hz", value: 62 },
  { label: "230Hz", value: 48 },
  { label: "910Hz", value: 55 },
  { label: "3.6kHz", value: 70 },
  { label: "14kHz", value: 40 },
];

export default function Demo() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <div className="flex h-40 gap-5">
        {bands.map((band) => (
          <div key={band.label} className="flex flex-col items-center gap-2">
            <Slider orientation="vertical" defaultValue={band.value} getAriaLabel={() => `${band.label} 增益`} />
            <span className="text-muted-foreground text-xs numeric">{band.label}</span>
          </div>
        ))}
      </div>
      <div className="w-48">
        <Slider aria-label="扬声器音量" defaultValue={30} disabled />
        <p className="mt-2 text-muted-foreground text-xs">设备离线，无法调节</p>
      </div>
    </div>
  );
}
```

