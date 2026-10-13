# Toggle

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/toggle
Source: packages/ui/src/components/toggle.tsx
Source SHA-256: 36a4e2ae0efd10e7f8efa296ff5df32ccc2cf62485fe827d24a8ea57ea00a8ba

A two-state toggle that holds its pressed fact until toggled again, with a stable name.

## Decision
A pressed Toggle fills light ink inside its line with ink text and does not use the primary action fill, so overriding --qy-primary does not change it. To adjust how pressed looks, change the system selected surface --qy-surface-selected (every selected state follows; --qy-track-selected is only its alias) and --qy-track-selected-foreground.

## Notes
- Names stay stable; aria-pressed expresses state.
- Pressed does not establish saved, requested, or persisted completion.
- Use Checkbox for boolean form values and Switch for immediate settings.

## Use and ownership
- Binary tool buttons with stable names.
- Avoid: Use Button for one-time actions.
- Avoid: Use Checkbox for boolean form values.
- Avoid: Toggle cannot infer asynchronous outcomes.
- Library: Uncontrolled pressed state, activation, and focus.
- Application: Controlled pressed state, associated content, and persistence.

## Composition
- Can compose in ToggleGroup; icons require aria-label.

## Responsive behavior
- Existing five control profiles and touch-target; actual hit areas were not browser-verified in this batch.

## Customization
- Both states are bordered with an unchanged line; pressed fills inside the line with --qy-track-selected and ink text from --qy-track-selected-foreground (light ink wash by default), not --qy-primary; shares Button geometry and focus roles.

## Current exports
- Toggle: function; owner toggle; PASS; props: ToggleProps<Value>
- TogglePrimitive: reexport; owner toggle; UNVERIFIED
- ToggleProps: type; owner toggle; PASS
- ToggleSize: type; owner toggle; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Toggle
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 292 inherited (@types/react 283, @base-ui/react 9); not expanded, see the installed declarations

### TogglePrimitive
- no props declared by this library
- plus 292 inherited (@types/react 283, @base-ui/react 9); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Toggle
An independent pressed boolean fact.
- pressed / defaultPressed: boolean. Controlled state or uncontrolled initial value; un-toggled by default.
- onPressedChange: (pressed: boolean, details) => void. Supplies pressed facts, cancelable through details.cancel().
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Five matching control/text-control profiles with narrow-screen +4px.
- shape: "label" | "icon"; default "label". Text/icon geometry; icon-only buttons need an accessible name.
- disabled: boolean; default false. Native disabling prevents pressed changes.
- value: string. Identifies an item only within ToggleGroup. Standalone Toggle still holds a boolean rather than a form value.
- render / nativeButton / ref / className / style: Base UI composition. Retain element, ARIA, events, and primitive style callbacks.

### TogglePrimitive
Public Base UI pressed-state primitive.

## Keyboard
- Tab / Shift+Tab: Reach available buttons.
- Space / Enter: Toggle pressed/unpressed.

## Source examples
### 切换态
Source: apps/docs/src/content/toggle/demos/01-pressed.tsx
```tsx
import { useState } from "react";
import { IconBold, IconItalic } from "@tabler/icons-react";
import { Toggle } from "@qingye_lab/ui/components/toggle";

export const meta = { title: "切换态", titleEn: "Toggled state" };
export default function Demo() {
  const [pressed, setPressed] = useState(true);
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <Toggle pressed={pressed} onPressedChange={setPressed}>加粗</Toggle>
    <Toggle shape="icon" aria-label="斜体"><IconItalic aria-hidden="true" /></Toggle>
    <Toggle disabled defaultPressed><IconBold aria-hidden="true" />加粗</Toggle>
    <span className={pressed ? "text-body-strong text-foreground" : "text-body text-foreground"}>Aa 字</span>
  </div>;
}
```

### 尺寸
Source: apps/docs/src/content/toggle/demos/02-sizes.tsx
```tsx
import { Toggle, type ToggleSize } from "@qingye_lab/ui/components/toggle";

export const meta = { title: "尺寸", titleEn: "Sizes" };
const sizes: ToggleSize[] = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{sizes.map(size => <Toggle key={size} size={size}>{size}</Toggle>)}</div>;
}
```
