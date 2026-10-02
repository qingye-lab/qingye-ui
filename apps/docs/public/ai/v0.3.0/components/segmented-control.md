# 分段控件 Segmented Control

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/segmented-control
Source: packages/ui/src/components/segmented-control.tsx
Source SHA-256: 64812ea8c71b19e572b6f8d1b5b29dae4f426c3f9999c3cafc228fb1121fcd32

一组并排的互斥选项的外观。它只是一套样式，套在语义合适的原语上：表单取值用 RadioGroup，切换视图或筛选用 ToggleGroup，跳转地址用导航链接，切换面板用 Tabs。

## Use and ownership
- 一组并排的互斥选项的外观。它只是一套样式，套在语义合适的原语上：表单取值用 RadioGroup，切换视图或筛选用 ToggleGroup，跳转地址用导航链接，切换面板用 Tabs。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

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

