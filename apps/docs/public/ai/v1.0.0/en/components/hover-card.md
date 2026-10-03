# HoverCard

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/hover-card
Source: packages/ui/src/components/hover-card.tsx
Source SHA-256: 0bdd04c93188bdba486b29fd4e0c569737af0782b5570348b63a843b8f3122da

Reveal the same supplemental content on hover and keyboard focus.

## Decision
Use a reachable link by default. Supplemental content cannot carry the only consequence information; do not reclaim focus after deliberate navigation.

## Notes
- Critical consequences must also remain reachable in a persistent location.
- Choose Popover when the task needs local actions.
- Transparent boundaries, surfaces, text, and motion use public roles; no invented objects or requests.

## Use and ownership
- A link needs a keyboard-accessible supplementary preview from the same source.
- Avoid: Important information available only on hover.
- Library: Hover/focus states, positioning, and exit.
- Application: Link targets, actual content, and consequences.

## Composition
- An actual link with supplementary content; an independent Positioner consumes shared layers.

## Responsive behavior
- Long content wraps; primitive available width/height constrain capacity.

## Customization
- surface-raised, panel-padding-sm, text roles, and motion.css.

## Current exports
- HoverCard: function; owner hover-card; PASS; props: HoverCardPrimitive.Root.Props<Payload>
- HoverCardCreateHandle: const; owner hover-card; UNVERIFIED
- HoverCardPopup: function; owner hover-card; PASS; props: HoverCardPopupProps
- HoverCardPopupProps: type; owner hover-card; PASS
- HoverCardPrimitive: reexport; owner hover-card; UNVERIFIED
- HoverCardTrigger: function; owner hover-card; PASS; props: HoverCardPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### HoverCard
Public Base UI PreviewCard Root, retaining open/defaultOpen/onOpenChange, payload, handle, and closeDelay.

### HoverCardTrigger
An actual reachable entry with a keyboard-accessible preview from the same source.
- href: string. Native links need nonblank real targets; custom render must provide equivalent keyboard access.
- delay: number; default 0. Hover entry delay; immediate is the current choice, while the primitive still manages focus.
- render / ref / className / style: HoverCardPrimitive.Trigger.Props. Retain primitive composition and state callbacks.

### HoverCardPopup
Supplementary content with its own positioning context.
- side / align / sideOffset / alignOffset / anchor: HoverCardPrimitive.Positioner.Props. Uses its own public positioning context.
- portalProps / positionerProps: Primitive part props. Forwards containers, refs, render, events, and styles; shared popup layers merge first, caller style last.

## Keyboard
- Tab / Shift+Tab: Focus on the link opens the preview; moving away never reclaims focus.
- Esc: End the preview.
- Enter: Follow the link target.

## Source examples
### 悬停与焦点
Source: apps/docs/src/content/hover-card/demos/01-states.tsx
```tsx
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye/ui/components/hover-card";
import { Button } from "@qingye/ui/components/button";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "悬停与焦点", titleEn: "Hover and focus" };
export default function HoverCardDemo() {
  return <Inline gap="fields"><HoverCard><HoverCardTrigger href="#hover-card-target">内容入口</HoverCardTrigger><HoverCardPopup>补充内容</HoverCardPopup></HoverCard><Button variant="quiet">下一控件</Button><span id="hover-card-target" className="text-body">内容</span></Inline>;
}
```
