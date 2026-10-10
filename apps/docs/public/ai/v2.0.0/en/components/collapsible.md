# Collapsible

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/collapsible
Source: packages/ui/src/components/collapsible.tsx
Source SHA-256: 464332e8cb94b91e8854df37c5d5d3c696dee2af73bd1c3695a6beaa19f5e66a

Reveal additional content for the same object.

## Decision
Relate the named trigger to one content region. Retain input by default; closing only ends its presentation.

## Notes
- Use Accordion for a group of expandable sections.
- Closing establishes no cancellation, undo, or save result.

## Use and ownership
- One object has supplementary content to disclose deliberately.
- Avoid: Putting necessary consequences solely in initially hidden content.
- Library: Open state, keyboard, and ARIA.
- Application: Content, inputs, and business states.

## Composition
- Trigger and Panel retain public primitive associations.

## Responsive behavior
- Content wraps and grows naturally.

## Customization
- Shared field gap, Button, and motion.css roles.

## Current exports
- Collapsible: function; owner collapsible; PASS; props: CollapsiblePrimitive.Root.Props
- CollapsiblePanel: function; owner collapsible; PASS; props: CollapsiblePrimitive.Panel.Props
- CollapsiblePrimitive: reexport; owner collapsible; UNVERIFIED
- CollapsibleTrigger: function; owner collapsible; PASS; props: CollapsiblePrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Collapsible
Expansion state for one section.
- open / defaultOpen / onOpenChange: CollapsiblePrimitive.Root.Props. Actual open state and cancelable change requests.
- disabled: boolean. Disable toggling.

### CollapsibleTrigger
Defaults to quiet Button; supports primitive render, refs, and events.

### CollapsiblePanel
Associated content and retention policy.
- keepMounted: boolean; default true. Retain closed content and native fields; the application decides whether hidden fields are disabled.
- render / ref / className / style: CollapsiblePrimitive.Panel.Props. Forward presentation and primitive states.

## Keyboard
- Enter / Space: Expand or collapse.
- Tab / Shift+Tab: Reach the trigger and expanded content.

## Source examples
### 展开与保留输入
Source: apps/docs/src/content/collapsible/demos/01-states.tsx
```tsx
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "展开与保留输入", titleEn: "Reveal and retain input" };
export default function CollapsibleDemo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Collapsible><CollapsibleTrigger>补充内容</CollapsibleTrigger><CollapsiblePanel><Label htmlFor="collapsible-value">输入</Label><Input id="collapsible-value" /></CollapsiblePanel></Collapsible><Collapsible disabled><CollapsibleTrigger>禁用展开</CollapsibleTrigger><CollapsiblePanel>内容</CollapsiblePanel></Collapsible></Stack>;
}
```
