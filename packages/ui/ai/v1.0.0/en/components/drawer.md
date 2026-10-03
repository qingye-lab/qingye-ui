# Drawer

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/drawer
Source: packages/ui/src/components/drawer.tsx
Source SHA-256: 73755fb868bbf1b9d78486c8c616eefe566e27bf5c8cca469d7c31c1f255d71e

Enter an edge-aligned work surface and return to its entry point.

## Decision
Public swipeDirection controls the edge. Actual modality controls focus and background blocking; closing does not imply undo.

## Notes
- Specify finalFocus when opening programmatically without a trigger.
- Applications handle drafts, saving, abandonment, and undo separately.
- Popup capacity is viewport constrained. Long content scrolls; left/right edges have no arbitrary fixed width.
- Shared FloatingLayerScope/useFloatingLayer order associated candidates and nested workspaces. Overriding zIndex can break this relationship.
- The contract was narrowed after actual ARIA checks: Portal fixes keepMounted=false even for JavaScript callers passing true. Applications explicitly retain drafts; custom Primitive composition still exposes the primitive's retained-Portal isolation defect.

## Use and ownership
- A task requires an edge workspace with an actual exit.
- Avoid: Treating slide direction as a different blocking semantic.
- Library: Actual open state, primitive gestures, focus, background blocking, and shared layers.
- Application: Inputs, drafts, and outcomes.

## Composition
- Title/Description/Content with existing Button/Input/Popover.

## Responsive behavior
- Content capacity is viewport constrained; the browser owner verifies this batch's gestures and actual desktop geometry.

## Customization
- Shared surfaces, lines, padding, radii, and motion.css; no independent size variant.

## Current exports
- Drawer: function; owner drawer; PASS; props: DrawerProps<Payload>
- DrawerClose: function; owner drawer; PASS; props: DrawerPrimitive.Close.Props
- DrawerContent: function; owner drawer; PASS; props: DrawerPrimitive.Content.Props
- DrawerCreateHandle: const; owner drawer; UNVERIFIED
- DrawerDescription: function; owner drawer; PASS; props: DrawerPrimitive.Description.Props
- DrawerPopup: function; owner drawer; PASS; props: DrawerPopupProps
- DrawerPopupProps: type; owner drawer; PASS
- DrawerPrimitive: reexport; owner drawer; UNVERIFIED
- DrawerProps: type; owner drawer; PASS
- DrawerTitle: function; owner drawer; PASS; props: DrawerPrimitive.Title.Props
- DrawerTrigger: function; owner drawer; PASS; props: DrawerPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Drawer
Actual open state, direction, and blocking mode.
- open / defaultOpen / onOpenChange: DrawerPrimitive.Root.Props. Actual opening and cancelable requests; caller events run first and controlled refusal does not promote layers.
- modal: boolean | "trap-focus"; default true. Full blocking, nonblocking, or focus trapping only. Only full blocking shows a backdrop and declares aria-modal.
- swipeDirection: "down" | "up" | "left" | "right"; default "down". Exit direction and owning edge; retains public primitive gestures, snapPoints, and activeSnapPoint.

### DrawerPopup
A composition of edge workspace, backdrop, and viewport.
- initialFocus / finalFocus: DialogFocusTarget; default true. Defaults to the first control and trigger; callers may name meaningful focusable targets. false is not accepted.
- portalProps / backdropProps / viewportProps: DrawerPrimitive part props. Forwards native Portal, render, refs, events, and styles. Caller style merges last and can override default layers.

### DrawerTitle / DrawerDescription / DrawerContent
Actual names, necessary descriptions, and scrollable working content without invented business states.

### DrawerTrigger / DrawerClose
Use Button; Close reads locale.close when children are omitted.

## Keyboard
- Enter / Space: Open from the trigger.
- Tab / Shift+Tab: Navigate the workspace according to its actual modal setting.
- Esc: Close the current layer and return to its entry.

## Source examples
### 方向与嵌套返回
Source: apps/docs/src/content/drawer/demos/01-states.tsx
```tsx
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye/ui/components/popover";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "方向与嵌套返回", titleEn: "Edges and nested return" };
export default function DrawerDemo() {
  return <Inline gap="fields">{(["left", "right", "up", "down"] as const).map(direction => <Drawer key={direction} swipeDirection={direction}><DrawerTrigger>{direction}</DrawerTrigger><DrawerPopup><DrawerTitle>{direction}</DrawerTitle><DrawerContent><Label htmlFor={`drawer-${direction}`}>输入</Label><Input id={`drawer-${direction}`} /><Popover><PopoverTrigger>补充</PopoverTrigger><PopoverPopup>补充内容</PopoverPopup></Popover><Dialog><DialogTrigger>内层</DialogTrigger><DialogPopup><DialogTitle>内层</DialogTitle><DialogClose /></DialogPopup></Dialog><DrawerClose /></DrawerContent></DrawerPopup></Drawer>)}</Inline>;
}
```
