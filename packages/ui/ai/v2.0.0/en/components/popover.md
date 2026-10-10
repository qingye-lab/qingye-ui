# Popover

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/popover
Source: packages/ui/src/components/popover.tsx
Source SHA-256: 9f9eb4f052d7aa7179e2ef48069533993ff88efba27d291f79d3a9e1bc362879

A trigger-bound non-modal popup for local actions and supplementary information.

## Decision
Closing hides the popup; it does not complete submission or undo. The application owns drafts and results. Keep essential consequences on the persistent work surface.

## Notes
- Popover is always non-modal. Use Dialog or AlertDialog for a blocking decision.
- Outside clicks retain focus on the clicked control; keyboard dismissal returns to the trigger.
- The default body portal cannot inherit the trigger's local DOM context. Mount container before opening.
- Base UI owns open state, focus and positioning; motion.css owns entry and exit motion.

## Use and ownership
- Disclose local actions or supplementary information beside an object while the main workspace remains usable.
- Avoid: Blocking tasks, the only critical consequence, or treating closure as successful save/cancellation.
- Library: Local open requests, trigger associations, positioning, focus, and return.
- Application: Drafts, business actions, asynchronous outcomes, controlled open, and return targets after the trigger disappears.

## Composition
- Trigger associates the object; Title/Description establish names; Close, Escape, and external entries provide return.

## Responsive behavior
- Scroll within available height with internal focus; exit mechanisms and nonblocking semantics remain unchanged.

## Customization
- Central surfaces and popup radii; forward native and positioning props without child-specific visual exceptions.

## Current exports
- Popover: function; owner popover; PASS; props: PopoverProps<Payload>
- PopoverClose: function; owner popover; PASS; props: PopoverPrimitive.Close.Props
- PopoverContent: function; owner popover; alias of PopoverPopup; PASS; props: PopoverPopupProps
- PopoverCreateHandle: const; owner popover; PASS
- PopoverDescription: function; owner popover; PASS; props: PopoverPrimitive.Description.Props
- PopoverPopup: function; owner popover; PASS; props: PopoverPopupProps
- PopoverPopupProps: interface; owner popover; PASS
- PopoverPrimitive: reexport; owner popover; UNVERIFIED
- PopoverProps: type; owner popover; PASS
- PopoverTitle: function; owner popover; PASS; props: PopoverPrimitive.Title.Props
- PopoverTrigger: function; owner popover; PASS; props: PopoverPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- The default body portal cannot inherit the trigger's local DOM context. Mount container before opening.
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Popover
Manage non-modal open state with the Base UI Root contract. modal has been removed.
- open / defaultOpen: boolean; default false. Controlled / uncontrolled open state.
- onOpenChange: (open, details) => void. Receive the requested state and reason; the application owns controlled state.
- handle / triggerId / defaultTriggerId: Handle / string. Associate shared triggers or a controlled/initially open popup.

### PopoverTrigger / PopoverClose
Native trigger and close controls supporting render, ref, style, events and state class functions.

### PopoverPopup
Raised surface, positioning and scrollable content. Aliased as PopoverContent, with no calendar or tooltip-specific variant.
- side / align: Positioner.Props; default bottom / center. Anchor-relative side and alignment with primitive-owned collision handling.
- sideOffset / alignOffset / anchor: Positioner.Props; default 0 / 0 / trigger. Explicit positioning. Default offsets follow the primitive at zero.
- initialFocus / finalFocus: Popup.Props; default true / true. Primitive-managed focus and return. Set finalFocus to a meaningful parent when the trigger will disappear.
- portalProps: Portal.Props. Use a mounted context container to retain local density, direction, language or theme.
- positionerProps / viewportProps: Positioner.Props / Viewport.Props. Forward classes, styles, refs, render and native attributes. Shared popup layers are merged before caller Positioner styles.

### PopoverTitle / PopoverDescription
Associate the popup's accessible name and description.

### PopoverCreateHandle / PopoverPrimitive
Typed shared-trigger handle and the Base UI primitive namespace.

## Keyboard
- Enter / Space: Open or close from the trigger.
- Esc: Close and return to the trigger or finalFocus target.
- Tab / Shift+Tab: Traverse content and leave the popup for the work surface.

## Source examples
### 多行输入
Source: apps/docs/src/content/popover/demos/01-form.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { useState } from "react";

export const meta = { title: "多行输入", titleEn: "Multiline input" };

export default function Demo() {
  const [draft, setDraft] = useState("");
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="quiet" />}>编辑备注</PopoverTrigger>
      <PopoverPopup className="w-80">
        <Stack gap="panel">
          <PopoverTitle>编辑备注</PopoverTitle>
          <Field>
            <FieldLabel>备注</FieldLabel>
            <Textarea onChange={(event) => setDraft(event.target.value)} value={draft} />
          </Field>
          <PopoverClose render={<Button variant="quiet" />}>关闭</PopoverClose>
        </Stack>
      </PopoverPopup>
    </Popover>
  );
}
```

### 关闭按钮
Source: apps/docs/src/content/popover/demos/02-close-button.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { IconInfoCircle, IconX } from "@tabler/icons-react";

export const meta = { title: "关闭按钮", titleEn: "Close button" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button aria-label="详细信息" shape="icon" variant="quiet" />}><IconInfoCircle aria-hidden="true" /></PopoverTrigger>
      <PopoverPopup className="w-72">
        <Stack gap="panel">
          <Inline gap="panel" className="justify-between">
            <PopoverTitle>青野 Qingye UI</PopoverTitle>
            <PopoverClose aria-label="关闭" render={<Button shape="icon" size="sm" variant="quiet" />}><IconX aria-hidden="true" /></PopoverClose>
          </Inline>
          <PopoverDescription>React 组件库</PopoverDescription>
        </Stack>
      </PopoverPopup>
    </Popover>
  );
}
```

### 位置
Source: apps/docs/src/content/popover/demos/03-sides.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";

export const meta = { title: "位置", titleEn: "Placement" };

const places = [
  { side: "top", label: "上方" },
  { side: "inline-end", label: "行尾" },
  { side: "bottom", label: "下方" },
  { side: "inline-start", label: "行首" },
] as const;

export default function Demo() {
  return (
    <Inline className="justify-center">
      {places.map(({ side, label }) => (
        <Popover key={label}>
          <PopoverTrigger render={<Button variant="quiet" />}>{label}</PopoverTrigger>
          <PopoverPopup side={side}>
            <PopoverTitle>{label}</PopoverTitle>
          </PopoverPopup>
        </Popover>
      ))}
    </Inline>
  );
}
```

### 共享面板
Source: apps/docs/src/content/popover/demos/04-shared.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverClose, PopoverCreateHandle, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { useMemo } from "react";

export const meta = { title: "共享面板", titleEn: "Shared popup" };

export default function Demo() {
  const handle = useMemo(() => PopoverCreateHandle<string>(), []);
  return (
    <Inline>
      <PopoverTrigger handle={handle} payload="第一项" render={<Button variant="quiet" />}>第一项</PopoverTrigger>
      <PopoverTrigger handle={handle} payload="第二项" render={<Button variant="quiet" />}>第二项</PopoverTrigger>
      <Popover handle={handle}>
        {({ payload }) => (
          <PopoverPopup>
            <Stack gap="panel">
              <PopoverTitle>{payload}</PopoverTitle>
              <PopoverClose render={<Button size="sm" variant="quiet" />}>关闭</PopoverClose>
            </Stack>
          </PopoverPopup>
        )}
      </Popover>
    </Inline>
  );
}
```

### 局部语言与密度
Source: apps/docs/src/content/popover/demos/05-context.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { useRef } from "react";

import { Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "局部语言与密度", titleEn: "Local language and density" };

export default function Demo() {
  const context = useRef<HTMLDivElement>(null);
  return (
    <div data-density="compact" dir="rtl" lang="ar" ref={context}>
      <Popover>
        <PopoverTrigger render={<Button variant="quiet" />}>فتح</PopoverTrigger>
        <PopoverPopup portalProps={{ container: context }}>
          <Stack gap="panel">
            <PopoverTitle>ملاحظة</PopoverTitle>
            <Text>نص قصير.</Text>
            <PopoverClose render={<Button size="sm" variant="quiet" />}>إغلاق</PopoverClose>
          </Stack>
        </PopoverPopup>
      </Popover>
    </div>
  );
}
```
