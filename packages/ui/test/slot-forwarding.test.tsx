import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPanel, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "../src/components/alert-dialog";
import { Dialog, DialogClose, DialogDescription, DialogPopup, DialogTitle, DialogTrigger } from "../src/components/dialog";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "../src/components/popover";
import { CopyButton } from "../src/components/copy-button";
import { LocaleSwitch } from "../src/components/locale-switch";
import { OtpField } from "../src/components/otp-field";
import { Sidebar, SidebarContent, SidebarSub, SidebarSubTrigger } from "../src/components/sidebar";
import { zhCN } from "../src/locale";

test("render composition keeps its attribute precedence and an empty slot is not defaulted", async () => {
  render(<Popover defaultOpen>
    <PopoverTrigger data-testid="empty-slot" data-slot="">Open</PopoverTrigger>
    <PopoverPopup data-slot="caller-popup" render={<section data-slot="render-popup" />}>
      <PopoverTitle>Details</PopoverTitle>
    </PopoverPopup>
  </Popover>);
  expect(screen.getByTestId("empty-slot")).toHaveAttribute("data-slot", "");
  expect(await screen.findByRole("dialog")).toHaveAttribute("data-slot", "render-popup");
});

for (const custom of [false, true]) {
  const attrs = (name: string) => ({ "data-testid": name, ...(custom ? { "data-slot": `consumer-${name}` } : {}) });
  const check = (names: string[]) => {
    for (const name of names) expect(screen.getByTestId(name)).toHaveAttribute("data-slot", custom ? `consumer-${name}` : name);
  };

  test(`Popover preserves ${custom ? "custom" : "default"} slots on every exposed part`, async () => {
    render(<Popover defaultOpen>
      <PopoverTrigger {...attrs("popover-trigger")}>Open</PopoverTrigger>
      <PopoverPopup {...attrs("popover-popup")} positionerProps={attrs("popover-positioner")} viewportProps={attrs("popover-viewport")}>
        <PopoverTitle {...attrs("popover-title")}>Details</PopoverTitle>
        <PopoverDescription {...attrs("popover-description")}>Content</PopoverDescription>
        <PopoverClose {...attrs("popover-close")}>Close</PopoverClose>
      </PopoverPopup>
    </Popover>);
    await screen.findByRole("dialog");
    check(["popover-trigger", "popover-popup", "popover-positioner", "popover-viewport", "popover-title", "popover-description", "popover-close"]);
  });

  test(`Dialog preserves ${custom ? "custom" : "default"} slots on every exposed part`, async () => {
    render(<Dialog defaultOpen>
      <DialogTrigger {...attrs("dialog-trigger")}>Open</DialogTrigger>
      <DialogPopup {...attrs("dialog-popup")} backdropProps={attrs("dialog-backdrop")} viewportProps={attrs("dialog-viewport")}>
        <DialogTitle {...attrs("dialog-title")}>Details</DialogTitle>
        <DialogDescription {...attrs("dialog-description")}>Content</DialogDescription>
        <DialogClose {...attrs("dialog-close")}>Close</DialogClose>
      </DialogPopup>
    </Dialog>);
    await screen.findByRole("dialog");
    check(["dialog-trigger", "dialog-popup", "dialog-backdrop", "dialog-viewport", "dialog-title", "dialog-description", "dialog-close"]);
  });

  test(`AlertDialog preserves ${custom ? "custom" : "default"} slots on every exposed part`, async () => {
    render(<AlertDialog defaultOpen>
      <AlertDialogTrigger {...attrs("alert-dialog-trigger")}>Open</AlertDialogTrigger>
      <AlertDialogPopup {...attrs("alert-dialog-popup")} backdropProps={attrs("alert-dialog-backdrop")} viewportProps={attrs("alert-dialog-viewport")}>
        <AlertDialogHeader {...attrs("alert-dialog-header")}>
          <AlertDialogTitle {...attrs("alert-dialog-title")}>Details</AlertDialogTitle>
          <AlertDialogDescription {...attrs("alert-dialog-description")}>Content</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogPanel {...attrs("alert-dialog-panel")}>Review</AlertDialogPanel>
        <AlertDialogFooter {...attrs("alert-dialog-footer")}><AlertDialogClose {...attrs("alert-dialog-close")}>Cancel</AlertDialogClose></AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>);
    await screen.findByRole("alertdialog");
    check(["alert-dialog-trigger", "alert-dialog-popup", "alert-dialog-backdrop", "alert-dialog-viewport", "alert-dialog-title", "alert-dialog-description", "alert-dialog-close", "alert-dialog-header", "alert-dialog-panel", "alert-dialog-footer"]);
  });

  test(`convenience controls preserve ${custom ? "custom" : "default"} slots`, () => {
    render(<>
      <CopyButton value="text" {...attrs("copy-button")} />
      <LocaleSwitch options={[{ locale: zhCN, label: "中文" }]} onLocaleChange={() => {}} {...attrs("locale-switch")} />
      <OtpField length={4} aria-label="Code" {...attrs("otp-field-input")} />
    </>);
    check(["copy-button", "locale-switch", "otp-field-input"]);
  });

  test.each([false, true])(`Sidebar sub-trigger preserves ${custom ? "custom" : "default"} slot with collapsed=%s`, collapsed => {
    render(<Sidebar collapsed={collapsed}><SidebarContent><SidebarSub><SidebarSubTrigger {...attrs("sidebar-sub-trigger")}>Group</SidebarSubTrigger></SidebarSub></SidebarContent></Sidebar>);
    check(["sidebar-sub-trigger"]);
  });
}
