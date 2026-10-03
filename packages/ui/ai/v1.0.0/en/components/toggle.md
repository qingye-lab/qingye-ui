# Toggle

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/toggle
Source: packages/ui/src/components/toggle.tsx
Source SHA-256: 4c2e32ceae7b39accaf0736cf6c6f87afc11f3bb29b333865483550c1ae384ff

A two-state pressed button with a stable name.

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
- Unpressed uses bordered, pressed solid; shares Button geometry and focus roles.

## Current exports
- Toggle: function; owner toggle; PASS; props: ToggleProps<Value>
- TogglePrimitive: reexport; owner toggle; UNVERIFIED
- ToggleProps: type; owner toggle; PASS
- ToggleSize: type; owner toggle; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Toggle
An independent pressed boolean fact.
- pressed / defaultPressed: boolean. Controlled state or uncontrolled initial value; unpressed by default.
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
### 按压
Source: apps/docs/src/content/toggle/demos/01-pressed.tsx
```tsx
import { useState } from "react";
import { BoldIcon } from "lucide-react";
import { Toggle } from "@qingye/ui/components/toggle";

export const meta = { title: "按压", titleEn: "Pressed" };
export default function Demo() {
  const [pressed, setPressed] = useState(false);
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <Toggle pressed={pressed} onPressedChange={setPressed}>加粗</Toggle>
    <Toggle shape="icon" aria-label="斜体">I</Toggle>
    <Toggle disabled defaultPressed><BoldIcon aria-hidden="true" />加粗</Toggle>
    <span className={pressed ? "text-body-strong text-foreground" : "text-body text-foreground"}>Aa 字</span>
  </div>;
}
```

### 尺寸
Source: apps/docs/src/content/toggle/demos/02-sizes.tsx
```tsx
import { Toggle, type ToggleSize } from "@qingye/ui/components/toggle";

export const meta = { title: "尺寸", titleEn: "Sizes" };
const sizes: ToggleSize[] = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{sizes.map(size => <Toggle key={size} size={size}>{size}</Toggle>)}</div>;
}
```
