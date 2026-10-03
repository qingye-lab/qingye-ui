import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Drawer, DrawerClose, DrawerPopup, DrawerTitle, DrawerTrigger } from "../src/components/drawer";
import { Dialog, DialogPopup, DialogTitle, DialogTrigger } from "../src/components/dialog";
import { Input } from "../src/components/input";

test("the named edge work surface has native composition and returns focus on explicit close", async () => {
  const user = userEvent.setup(); const ref = createRef<HTMLDivElement>();
  render(<Drawer swipeDirection="left"><DrawerTrigger>打开</DrawerTrigger><DrawerPopup ref={ref} render={<section />}><DrawerTitle>面板</DrawerTitle><Input aria-label="值" /><DrawerClose>关闭</DrawerClose></DrawerPopup></Drawer>);
  await user.tab(); await user.keyboard("{Enter}");
  const surface = await screen.findByRole("dialog", { name: "面板" });
  expect(surface).toHaveAttribute("aria-modal", "true"); expect(surface).toHaveAttribute("data-swipe-direction", "left"); expect(ref.current).toBe(surface); expect(surface.tagName).toBe("SECTION");
  await user.click(screen.getByRole("button", { name: "关闭" }));
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(screen.getByRole("button", { name: "打开" })).toHaveFocus();
});
test("nested dialog Escape exits the child first, then the drawer, with meaningful return targets", async () => {
  const user = userEvent.setup();
  render(<Drawer><DrawerTrigger>打开面板</DrawerTrigger><DrawerPopup><DrawerTitle>面板</DrawerTitle><Dialog><DialogTrigger>打开子面</DialogTrigger><DialogPopup><DialogTitle>子面</DialogTitle><Input aria-label="子值" /></DialogPopup></Dialog><DrawerClose>关闭</DrawerClose></DrawerPopup></Drawer>);
  await user.click(screen.getByRole("button", { name: "打开面板" }));
  await user.click(await screen.findByRole("button", { name: "打开子面" }));
  await screen.findByRole("dialog", { name: "子面" }); await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog", { name: "子面" })).toBeNull());
  expect(screen.getByRole("button", { name: "打开子面" })).toHaveFocus();
  expect(screen.getByRole("dialog", { name: "面板" })).toBeInTheDocument();
  await user.keyboard("{Escape}"); await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(screen.getByRole("button", { name: "打开面板" })).toHaveFocus();
});
test("a canceled request remains closed and nonmodal drawer does not declare a blocked page", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<Drawer onOpenChange={(_, details) => details.cancel()}><DrawerTrigger>打开</DrawerTrigger><DrawerPopup><DrawerTitle>面板</DrawerTitle></DrawerPopup></Drawer>);
  await user.click(screen.getByRole("button", { name: "打开" })); expect(screen.queryByRole("dialog")).toBeNull();
  rerender(<Drawer modal={false} defaultOpen><DrawerTrigger>打开</DrawerTrigger><DrawerPopup><DrawerTitle>面板</DrawerTitle><DrawerClose /></DrawerPopup></Drawer>);
  await user.click(screen.getByRole("button", { name: "打开" }));
  const panel = await screen.findByRole("dialog", { name: "面板" }); expect(panel).not.toHaveAttribute("aria-modal", "true");
});
