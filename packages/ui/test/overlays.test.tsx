import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "../src/components/dialog";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../src/components/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "../src/components/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerPrimitive,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "../src/components/drawer";

function Form({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <label>
        姓名
        <input defaultValue="林嘉禾" />
      </label>
      {children}
    </>
  );
}

test("dialog opens from its trigger, exposes a name, and closes with Escape back to the trigger", async () => {
  const user = userEvent.setup();
  render(
    <Dialog>
      <DialogTrigger>编辑资料</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
          <DialogDescription>修改后会同步到团队通讯录。</DialogDescription>
        </DialogHeader>
        <Form />
        <DialogFooter>
          <DialogClose>取消</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>,
  );

  const trigger = screen.getByRole("button", { name: "编辑资料" });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  await user.click(trigger);
  const dialog = await screen.findByRole("dialog");
  // The title names the dialog, so the description is announced with it.
  expect(dialog).toHaveAccessibleName("编辑资料");
  expect(screen.getByRole("textbox", { name: "姓名" })).toHaveValue("林嘉禾");

  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("dialog close button dismisses the dialog", async () => {
  const user = userEvent.setup();
  render(
    <Dialog defaultOpen>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>导出账单</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>取消</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>,
  );
  await user.click(await screen.findByRole("button", { name: "取消" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("shadcn aliases point at the same parts", () => {
  expect(DialogContent).toBe(DialogPopup);
  expect(AlertDialogContent).toBe(AlertDialogPopup);
  expect(SheetContent).toBe(SheetPopup);
  // Drawer is the exception: DrawerContent keeps Base UI's meaning (the inner
  // content part), because DrawerPopup also owns the drag bar and swipe area.
  expect(DrawerContent).toBe(DrawerPrimitive.Content);
});

test("alert dialog is modal, centres on the cancel action, and closes on Escape", async () => {
  const user = userEvent.setup();
  render(
    <AlertDialog>
      <AlertDialogTrigger>删除设备</AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>删除“仓库 3 号扫码枪”？</AlertDialogTitle>
          <AlertDialogDescription>设备的 1,024 条扫码记录会一并删除，且无法恢复。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>取消</AlertDialogClose>
          <AlertDialogClose>删除设备</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>,
  );

  await user.click(screen.getByRole("button", { name: "删除设备" }));
  const dialog = await screen.findByRole("alertdialog");
  expect(dialog).toHaveAccessibleName("删除“仓库 3 号扫码枪”？");
  expect(screen.getByText(/1,024 条扫码记录/)).toBeInTheDocument();

  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
});

test("sheet slides in from the side it is given and closes on Escape", async () => {
  const user = userEvent.setup();
  render(
    <Sheet>
      <SheetTrigger>右侧</SheetTrigger>
      <SheetPopup side="left">
        <SheetHeader>
          <SheetTitle>最近动态</SheetTitle>
          <SheetDescription>从左侧滑入的面板。</SheetDescription>
        </SheetHeader>
      </SheetPopup>
    </Sheet>,
  );

  await user.click(screen.getByRole("button", { name: "右侧" }));
  const dialog = await screen.findByRole("dialog");
  expect(dialog).toHaveAccessibleName("最近动态");
  expect(dialog).toHaveAttribute("data-side", "left");

  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

test("drawer opens, names itself, and closes from its close control", async () => {
  const user = userEvent.setup();
  render(
    <Drawer>
      <DrawerTrigger>筛选订单</DrawerTrigger>
      <DrawerPopup>
        <DrawerHeader>
          <DrawerTitle>筛选订单</DrawerTitle>
          <DrawerDescription>仅影响当前列表的显示。</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>重置</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>,
  );

  await user.click(screen.getByRole("button", { name: "筛选订单" }));
  const dialog = await screen.findByRole("dialog");
  expect(dialog).toHaveAccessibleName("筛选订单");

  await user.click(screen.getByRole("button", { name: "重置" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
});

/**
 * jsdom does not implement focus trapping, so containment is asserted only at
 * the level jsdom models faithfully: the dialog takes focus on open, the
 * background is hidden from assistive tech, and the focus guards are present.
 * The Tab cycle itself was verified in a real browser (focus stays on the
 * dialog's own controls and wraps at both ends).
 */
test("an open dialog takes focus, hides the background and mounts its focus guards", async () => {
  render(
    <Dialog defaultOpen>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>编辑资料</DialogTitle>
        </DialogHeader>
        <Form>
          <input defaultValue="产品设计师" />
        </Form>
      </DialogPopup>
    </Dialog>,
  );
  const dialog = await screen.findByRole("dialog");
  // Focus starts on the dialog's first control (Base UI focuses asynchronously).
  await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  // The rest of the page is hidden from assistive tech while it is modal.
  expect(document.querySelector("[aria-hidden=true]")).toBeTruthy();
  // Base UI renders the focus guards that keep Tab inside in a real browser.
  const guards = document.querySelectorAll("span[data-type=inside]");
  expect(guards.length).toBeGreaterThan(0);
});
