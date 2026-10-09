# Tooltip

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/tooltip
Source: packages/ui/src/components/tooltip.tsx
Source SHA-256: b8710b9868d43639430cfd8da3e0d5c1d5d97dade974cde0747fad565faf5312

Read shortcuts, formats and brief context on hover or focus.

## Decision
Controls supply their own text or aria-label. Hints supplement it. Keep consequences, disabled reasons and recovery instructions visible.

## Notes
- Icon buttons supply aria-label. While open, aria-describedby links the hint and preserves existing descriptions.
- Use short text only. Use Popover for click help or interactive content, and visible text for persistent information.
- Directly rendered disabled controls also disable hints. Synchronize Trigger.disabled for disabling inside render functions or custom controls. Keep the reason visible.

## Use and ownership
- Add shortcuts, format information, or brief context beside an identifiable object/action.
- Avoid: Sole names, sole critical consequences, disabled reasons, failure recovery, or interactive content.
- Library: Focus/hover opening, associations, delays, positioning, and Escape.
- Application: Supplementary content and controlled open state.

## Composition
- Controls have their own names; Tooltip associates supplementary text. Persistent outcomes stay beside objects.

## Responsive behavior
- Wrap within primitive available width; control text retains narrow roles and necessary information stays visible.

## Customization
- Shared root delays and existing surface/shadow/radius tokens.

## Current exports
- Tooltip: function; owner tooltip; PASS; props: TooltipPrimitive.Root.Props<Payload>
- TooltipContent: function; owner tooltip; alias of TooltipPopup; PASS; props: TooltipPopupProps
- TooltipCreateHandle: const; owner tooltip; UNVERIFIED
- TooltipPopup: function; owner tooltip; PASS; props: TooltipPopupProps
- TooltipPrimitive: reexport; owner tooltip; UNVERIFIED
- TooltipProvider: const; owner tooltip; UNVERIFIED
- TooltipTrigger: function; owner tooltip; PASS; props: TooltipPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### TooltipProvider
Share pointer delays. Keyboard focus opens immediately.
- delay: number; default 600. Initial hover delay in milliseconds; an overridable primitive preset.
- closeDelay: number; default 0. Delay after leaving both trigger and hint.
- timeout: number; default 400. Shared instant-opening window in milliseconds, a primitive preset.

### Tooltip
Non-modal open state. Hints remain hoverable and contain no interactive controls.
- open / defaultOpen: boolean; default false. Controlled / uncontrolled open state.
- onOpenChange: (open, details) => void. Receive requests and reasons; the application owns controlled state.
- disabled: boolean; default false. Disable hints while leaving the trigger's action available.
- disableHoverablePopup: boolean; default false. Retained in the type for compatibility; the wrapper always uses false to keep hints hoverable.
- trackCursorAxis: "none" | "x" | "y" | "both"; default none. both is normalized to none to preserve pointer access to the hint; other values are forwarded.
- handle / triggerId / defaultTriggerId: Handle / string. Associate shared triggers and controlled or initial opening.

### TooltipTrigger
Supports render, refs, events, ARIA and state-based classes.
- delay / closeDelay: number. Override pointer delays for this trigger.
- disabled: boolean; default false. Disable hints only. Set native action disabling on the rendered control.

### TooltipPopup / TooltipContent
Hint text and positioning with wrapping. motion.css owns entry and exit.
- side / align: Positioner.Props; default top / center. Primitive positioning defaults with collision handling.
- sideOffset / alignOffset / anchor: Positioner.Props; default 0 / 0 / trigger. Explicit positioning relative to the anchor.
- portalProps: Portal.Props. Set container to retain local language, direction and density; default portal target is body.
- positionerProps: Positioner.Props. Forward render, refs, events and state styles to its own Positioner, merging caller styles after shared popup layers.

### TooltipCreateHandle / TooltipPrimitive
Typed shared-trigger handles and the public Base UI namespace.

## Keyboard
- Tab / Shift+Tab: Show on focus and close on leaving without trapping focus.
- Esc: Dismiss while retaining focus on the trigger.

## Source examples
### 文字格式
Source: apps/docs/src/content/tooltip/demos/01-icon-buttons.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { IconBold, IconItalic } from "@tabler/icons-react";

export const meta = { title: "文字格式" };

export default function Demo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  return (
    <div className="flex flex-col gap-(--qy-field-group-gap)">
      <div className="flex gap-(--qy-action-gap)">
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="粗体" aria-pressed={bold} onClick={() => setBold(!bold)} />}><IconBold aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>强调项目名称</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="quiet" shape="icon" aria-label="斜体" aria-pressed={italic} onClick={() => setItalic(!italic)} />}><IconItalic aria-hidden="true" /></TooltipTrigger>
          <TooltipPopup>标记作品名称或引用</TooltipPopup>
        </Tooltip>
      </div>
      <p className="text-body text-foreground" aria-live="polite">{bold ? <strong>{italic ? <em>青野组件库</em> : "青野组件库"}</strong> : italic ? <em>青野组件库</em> : "青野组件库"}</p>
    </div>
  );
}
```

### 位置
Source: apps/docs/src/content/tooltip/demos/02-sides.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";

export const meta = { title: "位置", titleEn: "Placement" };

const places = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return <div className="flex gap-(--qy-action-gap)">{places.map(({ side, label }) => <Tooltip key={side}><TooltipTrigger render={<Button variant="quiet" />}>{label}</TooltipTrigger><TooltipPopup side={side}>{side}</TooltipPopup></Tooltip>)}</div>;
}
```

### 快捷键
Source: apps/docs/src/content/tooltip/demos/03-shortcut.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { IconBold } from "@tabler/icons-react";

export const meta = { title: "快捷键", titleEn: "Keyboard shortcut" };

export default function Demo() {
  const [bold, setBold] = useState(false);
  return (
    <div className="flex items-center gap-(--qy-field-group-gap)" onKeyDown={(event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        setBold((value) => !value);
      }
    }}>
      <Tooltip>
        <TooltipTrigger render={<Button aria-label="粗体" aria-pressed={bold} variant="quiet" shape="icon" onClick={() => setBold((value) => !value)} />}><IconBold aria-hidden="true" /></TooltipTrigger>
        <TooltipPopup><kbd>⌘B / Ctrl+B</kbd></TooltipPopup>
      </Tooltip>
      <p className="text-body text-foreground">{bold ? <strong>让器物服务于人</strong> : "让器物服务于人"}</p>
    </div>
  );
}
```

### 段落对齐
Source: apps/docs/src/content/tooltip/demos/04-shared.tsx
```tsx
import { useMemo, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { IconAlignCenter, IconAlignLeft, IconAlignRight } from "@tabler/icons-react";

export const meta = { title: "段落对齐", titleEn: "Aligning a paragraph" };

const items = [
  { value: "left", label: "左对齐", detail: "段落靠左边缘排列", icon: IconAlignLeft },
  { value: "center", label: "居中对齐", detail: "段落沿中央排列", icon: IconAlignCenter },
  { value: "right", label: "右对齐", detail: "段落靠右边缘排列", icon: IconAlignRight },
] as const;

export default function Demo() {
  const handle = useMemo(() => TooltipCreateHandle<string>(), []);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  return <div className="flex flex-col gap-(--qy-field-group-gap)"><div role="group" aria-label="段落对齐" className="flex gap-(--qy-action-gap)">{items.map(({ value, label, detail, icon: Icon }) => <TooltipTrigger handle={handle} key={value} payload={detail} render={<Button variant="quiet" shape="icon" aria-label={label} aria-pressed={align === value} onClick={() => setAlign(value)} />}><Icon aria-hidden="true" /></TooltipTrigger>)}</div><Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip><p className="text-body text-foreground" style={{ textAlign: align }}>青野组件库，器用为本。</p></div>;
}
```
