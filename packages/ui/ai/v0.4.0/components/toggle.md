# 切换按钮 Toggle

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/toggle
Source: packages/ui/src/components/toggle.tsx
Source SHA-256: 37b117bae96fe483e8380b2ea95033349e402a9899bd2f3e05c8a254bb442004

可按下保持的双态按钮，用于开关一项格式或视图设置，例如加粗、收藏、显示网格。

## Use and ownership
- 开关可保持的一项模式或格式，例如显示网格与加粗。
- Avoid: 不要把即时执行的命令或表单字段值伪装成 pressed；名称不随按下状态改成反义词。
- Library: 维护 pressed 与 aria-pressed、键盘激活和禁用；视觉随同一状态变化。
- Application: 决定模式的实际效果、与内容选择的关联及保存策略。

## Composition
- 相关的多个模式交给 ToggleGroup；图标项保留稳定 aria-label，Tooltip 只补充名称展示。

## Responsive behavior
- 三种尺寸分别保留移动占位差与触屏命中区；不能只减小按钮来增加工具数量。

## Customization
- 用 variant 和 size 控制表面与密度；按下强调必须与未选中、悬停和焦点可区分。

## Current exports
- Toggle: function; owner toggle; PASS; props: TogglePrimitive.Props &
  VariantProps<typeof toggleVariants>
- TogglePrimitive: reexport; owner toggle; UNVERIFIED
- toggleVariants: const; owner toggle; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toggle
基于 Base UI Toggle，渲染 <button aria-pressed>；按下时带 data-pressed。
- variant: "default" | "outline"; default "default". default 无边框，outline 带边框与内高光。
- size: "sm" | "default" | "lg"; default "default". 高度与最小宽度，仅图标时为正方形。
- pressed / defaultPressed: boolean. 受控 / 非受控的按下状态。
- onPressedChange: (pressed: boolean, details) => void. 按下状态变化时调用。
- disabled: boolean; default false. 禁用。

## Keyboard
- Enter / Space: 切换按下状态。
- Tab: 移入、移出焦点。

## Source examples
### 默认
Source: apps/docs/src/content/toggle/demos/01-default.tsx
```tsx
import { Toggle } from "@qingye/ui/components/toggle";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export const meta = { title: "默认", description: "按下后保持浅色填充，再次点击恢复。" };

export default function Demo() {
  return (
    <div className="flex items-center gap-1">
      <Toggle aria-label="加粗" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle aria-label="斜体">
        <ItalicIcon />
      </Toggle>
      <Toggle aria-label="下划线">
        <UnderlineIcon />
      </Toggle>
    </div>
  );
}
```

### 描边
Source: apps/docs/src/content/toggle/demos/02-outline.tsx
```tsx
import { Toggle } from "@qingye/ui/components/toggle";
import { Grid3X3Icon, PinIcon } from "lucide-react";

export const meta = { title: "描边", description: "放在工具栏或卡片上，需要与背景区分时使用。" };

export default function Demo() {
  return (
    <>
      <Toggle defaultPressed variant="outline">
        <Grid3X3Icon />
        显示网格
      </Toggle>
      <Toggle variant="outline">
        <PinIcon />
        固定到顶部
      </Toggle>
    </>
  );
}
```

### 尺寸
Source: apps/docs/src/content/toggle/demos/03-sizes.tsx
```tsx
import { Toggle } from "@qingye/ui/components/toggle";
import { StarIcon } from "lucide-react";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <>
      <Toggle aria-label="收藏" size="sm" variant="outline">
        <StarIcon />
      </Toggle>
      <Toggle aria-label="收藏" variant="outline">
        <StarIcon />
      </Toggle>
      <Toggle aria-label="收藏" size="lg" variant="outline">
        <StarIcon />
      </Toggle>
      <Toggle size="sm" variant="outline">
        小
      </Toggle>
      <Toggle variant="outline">默认</Toggle>
      <Toggle size="lg" variant="outline">
        大
      </Toggle>
    </>
  );
}
```

### 禁用
Source: apps/docs/src/content/toggle/demos/04-disabled.tsx
```tsx
import { Toggle } from "@qingye/ui/components/toggle";
import { LockIcon } from "lucide-react";

export const meta = { title: "禁用" };

export default function Demo() {
  return (
    <>
      <Toggle disabled variant="outline">
        <LockIcon />
        只读模式
      </Toggle>
      <Toggle defaultPressed disabled variant="outline">
        <LockIcon />
        已锁定
      </Toggle>
    </>
  );
}
```

### 受控
Source: apps/docs/src/content/toggle/demos/05-controlled.tsx
```tsx
import { Toggle } from "@qingye/ui/components/toggle";
import { BellIcon, BellOffIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "受控",
  description: "用 pressed 与 onPressedChange 接管状态，例如订阅一台设备的告警。",
};

export default function Demo() {
  const [watching, setWatching] = useState(true);
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Toggle onPressedChange={setWatching} pressed={watching} variant="outline">
        {watching ? <BellIcon /> : <BellOffIcon />}
        关注告警
      </Toggle>
      <span className="text-muted-foreground text-sm">
        {watching ? "SH-204 出现异常时会通知你" : "不会收到 SH-204 的通知"}
      </span>
    </div>
  );
}
```

