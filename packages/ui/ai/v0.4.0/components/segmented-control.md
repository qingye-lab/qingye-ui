# 分段控件 Segmented Control

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/segmented-control
Source: packages/ui/src/components/segmented-control.tsx
Source SHA-256: 64812ea8c71b19e572b6f8d1b5b29dae4f426c3f9999c3cafc228fb1121fcd32

一组并排的互斥选项的外观。它只是一套样式，套在语义合适的原语上：表单取值用 RadioGroup，切换视图或筛选用 ToggleGroup，跳转地址用导航链接，切换面板用 Tabs。

## Use and ownership
- 为并列短选项提供共享外观，同时保留其原本的值、模式或地址语义。
- Avoid: 外观相同不代表交互相同；不能给导航链接套上 tab 或 radio 的虚假状态。
- Library: 提供轨道、选项尺寸和 checked / pressed / aria-current 的状态样式，不创建状态机。
- Application: 选择语义原语、定义选项与对象关系并决定选中值的真实效果。

## Composition
- 表单值用 RadioGroup，保持模式用 ToggleGroup，地址用 a / Link，面板关系用 Tabs。

## Responsive behavior
- 选项超出容量时调整组合而不挤压文字与命中区；按所用原语验证方向键和触屏。

## Customization
- state 必须匹配原语实际输出属性；集中修改轨道和选中表面角色，不复制到消费页面。

## Current exports
- segmentedControlItemLayoutClassName: const; owner segmented-control; UNVERIFIED
- segmentedControlItemSizeClassNames: const; owner segmented-control; PASS
- segmentedControlItemVariants: const; owner segmented-control; UNVERIFIED
- segmentedControlRootClassName: const; owner segmented-control; UNVERIFIED
- SegmentedControlSize: type; owner segmented-control; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: class-variance-authority
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### segmentedControlRootClassName
容器样式：底板、内边距与间距。放在 RadioGroup、ToggleGroup 或 <nav> 内的容器上。

### segmentedControlItemVariants
选项样式（cva），传入尺寸与状态来源，返回类名。
- size: "sm" | "default" | "lg"; default "default". 选项高度，移动端自动加高 4px。
- state: "checked" | "pressed" | "current". 选中样式读取哪个属性：Radio 用 checked，Toggle 用 pressed，链接用 current（aria-current）。
- className: string. 追加的类名，例如 grow 让选项等分宽度。

### segmentedControlItemLayoutClassName
只含图标与间距的布局类，供自定义选项复用（Tabs 也在用）。

## Keyboard
- Tab: 焦点进入选中的选项（RadioGroup）或第一个选项（ToggleGroup）。
- ← / →: RadioGroup 中移动并选中；ToggleGroup 中只移动焦点。
- Space / Enter: ToggleGroup 中切换获得焦点的选项。

## Source examples
### 表单取值
Source: apps/docs/src/content/segmented-control/demos/01-radio.tsx
```tsx
import { RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";

export const meta = {
  title: "表单取值",
  description: "基于 RadioGroup，值会随表单提交；grow 让两个选项等宽。",
};

const item = segmentedControlItemVariants({ className: "grow", state: "checked" });

export default function Demo() {
  return (
    <RadioGroupPrimitive
      aria-label="计费周期"
      className={segmentedControlRootClassName}
      defaultValue="monthly"
      name="billing"
    >
      <RadioPrimitive.Root className={item} value="monthly">
        按月付费
      </RadioPrimitive.Root>
      <RadioPrimitive.Root className={item} value="yearly">
        按年付费
        <span className="text-success-foreground text-xs">省 20%</span>
      </RadioPrimitive.Root>
    </RadioGroupPrimitive>
  );
}
```

### 尺寸
Source: apps/docs/src/content/segmented-control/demos/02-sizes.tsx
```tsx
import { RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";

export const meta = { title: "尺寸", description: "sm、default、lg 三档。" };

const sizes = ["sm", "default", "lg"] as const;
const ranges = [
  { value: "24h", label: "24 小时" },
  { value: "7d", label: "7 天" },
  { value: "30d", label: "30 天" },
];

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <RadioGroupPrimitive
          aria-label="统计范围"
          className={segmentedControlRootClassName}
          defaultValue="7d"
          key={size}
        >
          {ranges.map((range) => (
            <RadioPrimitive.Root
              className={segmentedControlItemVariants({ size, state: "checked" })}
              key={range.value}
              value={range.value}
            >
              {range.label}
            </RadioPrimitive.Root>
          ))}
        </RadioGroupPrimitive>
      ))}
    </div>
  );
}
```

### 切换视图
Source: apps/docs/src/content/segmented-control/demos/03-toggle-group.tsx
```tsx
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";
import { TogglePrimitive } from "@qingye/ui/components/toggle";
import { ToggleGroupPrimitive } from "@qingye/ui/components/toggle-group";
import { CalendarIcon, KanbanIcon, ListIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "切换视图",
  description: "基于 ToggleGroup：方向键只移动焦点，按 Space 才切换，适合视图与筛选。",
};

const item = segmentedControlItemVariants({ state: "pressed" });
const iconItem = segmentedControlItemVariants({ className: "px-0 aspect-square", state: "pressed" });

export default function Demo() {
  const [view, setView] = useState(["board"]);
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroupPrimitive
        aria-label="任务视图"
        className={segmentedControlRootClassName}
        onValueChange={(next) => next.length && setView(next)}
        value={view}
      >
        <TogglePrimitive className={item} value="list">
          <ListIcon />
          列表
        </TogglePrimitive>
        <TogglePrimitive className={item} value="board">
          <KanbanIcon />
          看板
        </TogglePrimitive>
        <TogglePrimitive className={item} value="calendar">
          <CalendarIcon />
          日历
        </TogglePrimitive>
      </ToggleGroupPrimitive>
      <ToggleGroupPrimitive
        aria-label="任务视图"
        className={segmentedControlRootClassName}
        onValueChange={(next) => next.length && setView(next)}
        value={view}
      >
        <TogglePrimitive aria-label="列表" className={iconItem} value="list">
          <ListIcon />
        </TogglePrimitive>
        <TogglePrimitive aria-label="看板" className={iconItem} value="board">
          <KanbanIcon />
        </TogglePrimitive>
        <TogglePrimitive aria-label="日历" className={iconItem} value="calendar">
          <CalendarIcon />
        </TogglePrimitive>
      </ToggleGroupPrimitive>
    </div>
  );
}
```

### 导航链接
Source: apps/docs/src/content/segmented-control/demos/04-navigation.tsx
```tsx
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";

export const meta = {
  title: "导航链接",
  description: "跳转到不同地址时用真正的链接，当前页标 aria-current=\"page\"。",
};

const item = segmentedControlItemVariants({ state: "current" });

export default function Demo() {
  return (
    <nav aria-label="项目分区">
      <div className={segmentedControlRootClassName}>
        <a aria-current="page" className={item} href="#overview">
          概览
        </a>
        <a className={item} href="#activity">
          动态
        </a>
        <a className={item} href="#settings">
          设置
        </a>
      </div>
    </nav>
  );
}
```

### 禁用
Source: apps/docs/src/content/segmented-control/demos/05-disabled.tsx
```tsx
import { RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";

export const meta = { title: "禁用", description: "可以禁用单个选项，也可以禁用整组。" };

const item = segmentedControlItemVariants({ state: "checked" });

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RadioGroupPrimitive aria-label="部署区域" className={segmentedControlRootClassName} defaultValue="hz">
        <RadioPrimitive.Root className={item} value="hz">
          华东
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="bj">
          华北
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} disabled value="sg">
          新加坡（即将开放）
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
      <RadioGroupPrimitive
        aria-label="部署区域"
        className={segmentedControlRootClassName}
        defaultValue="hz"
        disabled
      >
        <RadioPrimitive.Root className={item} value="hz">
          华东
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="bj">
          华北
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
    </div>
  );
}
```

