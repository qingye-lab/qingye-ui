# AlertDialog

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/alert-dialog
Source: packages/ui/src/components/alert-dialog.tsx
Source SHA-256: b615207fc39b258e0147256705bdbbe13a37477227a93ccc989c55a93b204f7e

Block the work surface for an explicit decision about the current object.

## Decision
Backdrop presses do not dismiss it; focus starts on the panel. Escape and the return button only close the dialog. The caller handles the affirmative action.

## Notes
- Use Dialog for ordinary edits, or inline confirmation when interruption is unnecessary.
- Keep consequences visible and associated with the danger action.
- Handle closing and the affirmative action separately.
- Provide an explicit return choice; Escape alone is insufficient.
- Shared layers put a newly opened surface above older owned popups. Caller zIndex overrides can break that relationship.
- ARIA evidence narrows the contract: Portal forces keepMounted=false, even for JavaScript callers passing true. The application holds drafts explicitly; direct Primitive composition remains affected.

## Use and ownership
- A decision requiring a response before proceeding.
- Avoid: Notifications, success feedback, or content that can be edited in place.
- Library: Open state, focus trapping, scroll lock, background blocking, and return.
- Application: Decision content, consequences, and continuing actions.

## Composition
- Return and continue actions appear together, with necessary consequences associated.

## Responsive behavior
- Content determines width within viewport limits; this batch checked desktop only.

## Customization
- Shares Dialog radius, surfaces, backdrop, and shadow roles.
- Focus enters the panel by default; motion.css alone supplies entry and exit.

## Current exports
- AlertDialog: function; owner alert-dialog; PASS; props: AlertDialogProps<Payload>
- AlertDialogClose: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Close.Props
- AlertDialogCreateHandle: const; owner alert-dialog; UNVERIFIED
- AlertDialogDescription: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Description.Props
- AlertDialogFooter: function; owner alert-dialog; PASS; props: DialogGroupProps
- AlertDialogHeader: function; owner alert-dialog; PASS; props: DialogGroupProps
- AlertDialogPanel: function; owner alert-dialog; PASS; props: DialogGroupProps
- AlertDialogPopup: function; owner alert-dialog; PASS; props: AlertDialogPopupProps
- AlertDialogPopupProps: type; owner alert-dialog; PASS
- AlertDialogPrimitive: reexport; owner alert-dialog; UNVERIFIED
- AlertDialogProps: type; owner alert-dialog; PASS
- AlertDialogTitle: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Title.Props
- AlertDialogTrigger: function; owner alert-dialog; PASS; props: AlertDialogPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### AlertDialog
Keep open/defaultOpen/onOpenChange/handle; the primitive enforces modality and prevents outside-pointer dismissal.

### AlertDialogPopup
Use the same structure and content-driven sizing as Dialog, defaulting focus to the panel.
- initialFocus: DialogFocusTarget; default panel. Choose a protective action, confirmation field or focusable heading. Avoid initial focus on a danger action.
- finalFocus: DialogFocusTarget; default trigger. Specify a meaningful surviving parent when the trigger is removed.
- portalProps / backdropProps / viewportProps: DialogPopupProps. Forward containers, styles, render, refs and native attributes to structural layers.

### AlertDialogTitle / AlertDialogDescription
Name the decision and its consequences with accessible associations.

### AlertDialogTrigger / AlertDialogClose
Compose Button by default. Name Close explicitly, such as Return; it does not run the affirmative action.

### AlertDialogHeader / AlertDialogPanel / AlertDialogFooter
Reuse Dialog's title, working-content and action groups with distinct data-slot hooks.

### AlertDialogCreateHandle / AlertDialogPrimitive
Shared-trigger handle and the Base UI primitive namespace.

## Keyboard
- Enter / Space: Open the decision.
- Tab / Shift+Tab: Cycle within the topmost decision while the background is unavailable.
- Esc: Leave this decision and return without executing the danger action.

## Source examples
### 确认与返回
Source: apps/docs/src/content/alert-dialog/demos/01-confirmation.tsx
```tsx
import { useId, useState } from "react";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "确认与返回", titleEn: "Confirmation and return" };

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("青野");
  const consequenceId = useId();

  return (
    <div className="grid w-full max-w-sm gap-(--qy-panel-gap)">
      <Field><FieldLabel>备注</FieldLabel><Input value={value} onValueChange={setValue} /></Field>
      <p id={consequenceId} className="text-support text-muted-foreground">清空后，输入内容无法恢复。</p>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="bordered" tone="danger" aria-describedby={consequenceId} />} className="justify-self-start">清空输入</AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>清空输入？</AlertDialogTitle>
            <AlertDialogDescription id={`${consequenceId}-popup`}>当前备注将被清空。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="bordered" />}>返回</AlertDialogClose>
            <Button tone="danger" aria-describedby={`${consequenceId}-popup`} onClick={() => { setValue(""); setOpen(false); }}>清空输入</Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}
```
