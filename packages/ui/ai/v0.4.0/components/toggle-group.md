# 切换按钮组 ToggleGroup

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/toggle-group
Source: packages/ui/src/components/toggle-group.tsx
Source SHA-256: defdd88bcc80894633f388061135acdbf02a0132880d954a57df7e1c4ca4a4ca

一组共享状态的 Toggle：单选用于视图或对齐方式，多选用于文字格式等可叠加的选项。

## Use and ownership
- 选择单个视图或叠加多个格式，选项围绕同一设置对象。
- Avoid: 按钮组的按下状态不能代替标签面板关系；单选是否允许清空由真实任务决定。
- Library: 维护单选或多选值、pressed 状态、方向键焦点与布局方向；焦点移动与执行选择分开。
- Application: 决定选项含义、必须保留的选择与实际格式或视图结果。

## Composition
- 多个 ToggleGroupItem 共用 value 和 variant；outline 可用 Separator 表达连续边界。

## Responsive behavior
- orientation=vertical 在 default 与 outline 都纵向排列；触屏下检查相邻命中区而非仅整组尺寸。

## Customization
- 组级 size 与 variant 建立一致关系；不通过子项颜色覆盖假装一个业务结果。

## Current exports
- ToggleGroup: function; owner toggle-group; PASS; props: ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleVariants>
- ToggleGroupContext: const; owner toggle-group; PASS
- ToggleGroupItem: function; owner toggle-group; PASS; props: TogglePrimitive.Props &
  VariantProps<typeof toggleVariants>
- ToggleGroupPrimitive: reexport; owner toggle-group; UNVERIFIED
- ToggleGroupSeparator: function; owner toggle-group; PASS; props: {
  className?: string;
} & React.ComponentProps<typeof Separator>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ToggleGroup
基于 Base UI ToggleGroup。outline 时子项拼接成一组，共用圆角与边框。
- value / defaultValue: string[]. 受控 / 非受控的选中值。
- onValueChange: (value: string[], details) => void. 选中值变化时调用。
- multiple: boolean; default false. 允许同时按下多项。
- variant: "default" | "outline"; default "default". 传递给所有子项。
- size: "sm" | "default" | "lg"; default "default". 传递给所有子项。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向，同时决定方向键。
- disabled: boolean; default false. 禁用整组。

### ToggleGroupItem
组内的一项，接受 Toggle 的全部属性。
- value: string. 该项的值。
- disabled: boolean; default false. 禁用单项。

### ToggleGroupSeparator
outline 组内的分隔线；纵向组传 orientation="horizontal"。

## Keyboard
- Tab: 焦点进入组内当前项，再按离开整组。
- ← → / ↑ ↓: 在组内移动焦点（随 orientation）。
- Home / End: 移到第一项 / 最后一项。
- Enter / Space: 按下或抬起当前项。

## Source examples
### 单选
Source: apps/docs/src/content/toggle-group/demos/01-default.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const meta = { title: "单选", description: "默认一次只按下一项，适合对齐方式、视图模式。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["left"]}>
      <ToggleGroupItem aria-label="左对齐" value="left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="居中" value="center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="右对齐" value="right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### 多选
Source: apps/docs/src/content/toggle-group/demos/02-multiple.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react";

export const meta = { title: "多选", description: "multiple 允许叠加，例如同时加粗与斜体。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["bold", "italic"]} multiple>
      <ToggleGroupItem aria-label="加粗" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="斜体" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="下划线" value="underline">
        <UnderlineIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="删除线" value="strike">
        <StrikethroughIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### 描边
Source: apps/docs/src/content/toggle-group/demos/03-outline.tsx
```tsx
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";

export const meta = { title: "描边", description: "outline 把子项拼成一个整体，可用分隔线区分。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["week"]} variant="outline">
      <ToggleGroupItem value="day">日</ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem value="week">周</ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem value="month">月</ToggleGroupItem>
      <ToggleGroupSeparator />
      <ToggleGroupItem value="quarter">季度</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### 尺寸
Source: apps/docs/src/content/toggle-group/demos/04-sizes.tsx
```tsx
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";
import { LayoutGridIcon, ListIcon } from "lucide-react";

export const meta = { title: "尺寸", description: "size 统一作用于组内所有项。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup defaultValue={["grid"]} key={size} size={size} variant="outline">
          <ToggleGroupItem aria-label="网格视图" value="grid">
            <LayoutGridIcon />
          </ToggleGroupItem>
          <ToggleGroupSeparator />
          <ToggleGroupItem aria-label="列表视图" value="list">
            <ListIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
```

### 纵向
Source: apps/docs/src/content/toggle-group/demos/05-vertical.tsx
```tsx
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";
import { AlignEndHorizontalIcon, AlignStartHorizontalIcon, AlignCenterHorizontalIcon } from "lucide-react";

export const meta = { title: "纵向", description: "orientation=\"vertical\" 时用 ↑ ↓ 移动焦点。" };

export default function Demo() {
  return (
    <div className="flex items-start gap-(--qy-space-6)">
      {(["default", "outline"] as const).map((variant) => (
        <ToggleGroup
          aria-label={variant === "default" ? "内容对齐" : "画板对齐"}
          defaultValue={["top"]}
          key={variant}
          orientation="vertical"
          variant={variant}
        >
          <ToggleGroupItem aria-label="顶部对齐" value="top">
            <AlignStartHorizontalIcon />
          </ToggleGroupItem>
          {variant === "outline" && <ToggleGroupSeparator orientation="horizontal" />}
          <ToggleGroupItem aria-label="垂直居中" value="middle">
            <AlignCenterHorizontalIcon />
          </ToggleGroupItem>
          {variant === "outline" && <ToggleGroupSeparator orientation="horizontal" />}
          <ToggleGroupItem aria-label="底部对齐" value="bottom">
            <AlignEndHorizontalIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
```

### 禁用
Source: apps/docs/src/content/toggle-group/demos/06-disabled.tsx
```tsx
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";

export const meta = { title: "禁用", description: "可禁用整组，或只禁用其中一项。" };

export default function Demo() {
  return (
    <>
      <ToggleGroup defaultValue={["auto"]} disabled variant="outline">
        <ToggleGroupItem value="auto">自动</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="manual">手动</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={["standard"]} variant="outline">
        <ToggleGroupItem value="standard">标准</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="express">加急</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem disabled value="same-day">
          当日达
        </ToggleGroupItem>
      </ToggleGroup>
    </>
  );
}
```

### 配合 Tooltip
Source: apps/docs/src/content/toggle-group/demos/07-with-tooltip.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { CodeIcon, ListOrderedIcon, QuoteIcon } from "lucide-react";

export const meta = { title: "配合 Tooltip", description: "仅图标时，用 Tooltip 给鼠标用户补充说明。" };

const items = [
  { value: "quote", label: "引用", icon: QuoteIcon },
  { value: "list", label: "有序列表", icon: ListOrderedIcon },
  { value: "code", label: "代码块", icon: CodeIcon },
];

export default function Demo() {
  return (
    <TooltipProvider>
      <ToggleGroup multiple>
        {items.map(({ value, label, icon: Icon }) => (
          <Tooltip key={value}>
            <TooltipTrigger render={<ToggleGroupItem aria-label={label} value={value} />}>
              <Icon />
            </TooltipTrigger>
            <TooltipPopup>{label}</TooltipPopup>
          </Tooltip>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  );
}
```

