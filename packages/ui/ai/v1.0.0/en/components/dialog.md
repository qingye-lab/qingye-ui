# Dialog

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/dialog
Source: packages/ui/src/components/dialog.tsx
Source SHA-256: b8d6d2969f3f89460d02a4d6a668b9eceb2c8eabb363feb592b038a855e11369

Take over the work surface for an edit or decision, then return.

## Decision
Closing ends the presentation and returns to the trigger; it does not imply saving. The caller owns input values and subsequent actions.

## Notes
- Use an inline form or Popover when interruption is unnecessary; use AlertDialog for an explicit consequential decision.
- The application owns drafts. Name closing, discarding, saving and undo separately.
- Associate danger actions with visible nonempty consequences using aria-describedby or ButtonProtection.
- Programmatic opening without a trigger needs a meaningful finalFocus target.
- Shared layers put a newly opened surface above older owned popups. Caller zIndex overrides can break that relationship.
- ARIA evidence narrows the contract: Portal forces keepMounted=false, even for JavaScript callers passing true. The application holds drafts explicitly. Direct Primitive composition still has the upstream retained-portal isolation defect.

## Use and ownership
- Editing or deciding requires pausing the main flow.
- Avoid: Frequent edits that can happen in place.
- Avoid: Use AlertDialog for decisions requiring an explicit response.
- Library: Open state, focus trapping, scroll lock, background blocking, and return.
- Application: Drafts, versions, saves, failures, abandonment, and persistence.

## Composition
- Title/Description associate names and necessary explanations.
- Header/Panel/Footer organize inputs and actions without supplying business states.

## Responsive behavior
- Intrinsic content width is constrained by the viewport; long content scrolls within the panel.
- Controls retain their own narrow-screen tokens and touch targets; this batch's demos checked desktop only.

## Customization
- Surfaces, radii, backdrop, and shadow consume existing roles.
- motion.css alone owns entry/exit; no additional call-site animation.

## Current exports
- Dialog: function; owner dialog; PASS; props: DialogProps<Payload>
- DialogClose: function; owner dialog; PASS; props: DialogPrimitive.Close.Props
- DialogCreateHandle: const; owner dialog; UNVERIFIED
- DialogDescription: function; owner dialog; PASS; props: DialogPrimitive.Description.Props
- DialogFocusTarget: type; owner dialog; PASS
- DialogFooter: function; owner dialog; PASS; props: DialogGroupProps
- DialogGroupProps: type; owner dialog; PASS
- DialogHeader: function; owner dialog; PASS; props: DialogGroupProps
- DialogPanel: function; owner dialog; PASS; props: DialogGroupProps
- DialogPopup: function; owner dialog; PASS; props: DialogPopupProps
- DialogPopupProps: interface; owner dialog; PASS
- DialogPrimitive: reexport; owner dialog; UNVERIFIED
- DialogProps: type; owner dialog; PASS
- DialogTitle: function; owner dialog; PASS; props: DialogPrimitive.Title.Props
- DialogTrigger: function; owner dialog; PASS; props: DialogPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Dialog
Always fully modal, retaining controlled, uncontrolled and shared-trigger state.
- open / defaultOpen: boolean; default false. Controlled state / initial uncontrolled state.
- onOpenChange: (open, details) => void. Receive state requests and reasons, without implying business submission or cancellation.
- handle / triggerId / defaultTriggerId: DialogPrimitive.Root.Props. Associate shared, controlled or initially open triggers.
- disablePointerDismissal: boolean; default false. Prevent backdrop dismissal when required, keeping an explicit exit.

### DialogPopup
Compose a portal, backdrop and viewport with content-driven width and no size variants.
- initialFocus: true | RefObject<HTMLElement | null> | (interaction) => HTMLElement | true | null; default true. First control by default, or the panel on touch. A field, heading or panel can be specified; false is unsupported.
- finalFocus: true | RefObject<HTMLElement | null> | (interaction) => HTMLElement | true | null; default true. Return to the trigger by default. Provide a focusable parent if it disappears; false is unsupported.
- portalProps / backdropProps / viewportProps: Omit<Portal.Props, 'keepMounted'> / Backdrop.Props / Viewport.Props. Forward containers, refs, styling, events and render. Retaining closed portal DOM is unsupported; set a container for local language, density or direction.
- render / ref / className / style: DialogPrimitive.Popup.Props. Compose or override presentation; className supports primitive state functions.

### DialogTitle / DialogDescription
Primitive-managed accessible name and description; avoid repeating the title.

### DialogTrigger / DialogClose
Use Button by default, with render/ref/events. An empty Close reads locale.close.

### DialogHeader / DialogPanel / DialogFooter
Group names, working content and actions, with useRender composition and no extra enclosure.

### DialogCreateHandle / DialogPrimitive
Typed shared-trigger handle and the Base UI primitive namespace.

## Keyboard
- Enter / Space: Open from the trigger.
- Tab / Shift+Tab: Cycle within the topmost dialog.
- Esc: Close this layer and return to its trigger or finalFocus.

## Source examples
### 对话框与字段
Source: apps/docs/src/content/dialog/demos/01-field.tsx
```tsx
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "对话框与字段", titleEn: "Dialog with a field" };

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger>编辑名称</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>编辑名称</DialogTitle>
          <DialogDescription>最多 20 个字。</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" maxLength={20} /></Field>
        </DialogPanel>
        <DialogFooter><DialogClose>关闭</DialogClose></DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```
