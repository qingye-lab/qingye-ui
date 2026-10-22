import { createRoot } from "react-dom/client";
import { Button } from "@qingye_lab/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Sidebar, SidebarContent, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye_lab/ui/components/sidebar";

/** Imported only by the development browser regression runner. */
export function mountSlotSidebarRegressions(host: HTMLElement) {
  const root = createRoot(host);
  const icon = <span aria-hidden="true">●</span>;
  const render = (custom: boolean) => {
    const attrs = (part: string) => custom ? { "data-slot": `consumer-${part}` } : {};
    root.render(<>
      <Sidebar className="w-64" data-testid="subject-sidebar">
        <SidebarToggle />
        <SidebarContent>
          <SidebarLink icon={icon} active href="#current" data-testid="current-link">Current</SidebarLink>
          <SidebarLink icon={icon} href="#other" data-testid="ordinary-link">Other</SidebarLink>
          <SidebarSub defaultOpen>
            <SidebarSubTrigger icon={icon} data-testid="branch-trigger">Branch</SidebarSubTrigger>
            <SidebarSubContent><SidebarLink active href="#child">Child</SidebarLink></SidebarSubContent>
          </SidebarSub>
        </SidebarContent>
      </Sidebar>
      <Popover>
        <PopoverTrigger {...attrs("popover-trigger")} render={<Button />}>Open popover</PopoverTrigger>
        <PopoverPopup {...attrs("popover-popup")} viewportProps={attrs("popover-viewport")}>
          <PopoverTitle>Popover details</PopoverTitle><PopoverDescription>Review content.</PopoverDescription>
          <PopoverClose render={<Button />}>Close popover</PopoverClose>
        </PopoverPopup>
      </Popover>
      <Dialog>
        <DialogTrigger {...attrs("dialog-trigger")}>Open dialog</DialogTrigger>
        <DialogPopup {...attrs("dialog-popup")} backdropProps={{ "data-testid": "dialog-backdrop", ...attrs("dialog-backdrop") }}>
          <DialogTitle>Dialog details</DialogTitle><DialogDescription>Review content.</DialogDescription>
          <DialogClose>Close dialog</DialogClose>
        </DialogPopup>
      </Dialog>
      <AlertDialog>
        <AlertDialogTrigger {...attrs("alert-dialog-trigger")}>Open alert</AlertDialogTrigger>
        <AlertDialogPopup {...attrs("alert-dialog-popup")} backdropProps={{ "data-testid": "alert-backdrop", ...attrs("alert-dialog-backdrop") }}>
          <AlertDialogTitle>Alert details</AlertDialogTitle><AlertDialogDescription>Review content.</AlertDialogDescription>
          <AlertDialogClose>Keep</AlertDialogClose>
        </AlertDialogPopup>
      </AlertDialog>
    </>);
  };
  render(false);
  return { render, dispose() { root.unmount(); host.remove(); } };
}
