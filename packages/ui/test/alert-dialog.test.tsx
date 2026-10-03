import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPanel, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "../src/components/alert-dialog";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "../src/components/dialog";
import { Button } from "../src/components/button";

function Decision() {
  return <><AlertDialogHeader><AlertDialogTitle>删除</AlertDialogTitle><AlertDialogDescription id="consequence">删除后无法恢复。</AlertDialogDescription></AlertDialogHeader><AlertDialogPanel><Button tone="danger" aria-describedby="consequence">删除</Button></AlertDialogPanel><AlertDialogFooter><AlertDialogClose>保留</AlertDialogClose></AlertDialogFooter></>;
}

test("a named alertdialog declares modal and focuses its panel rather than the first danger button", async () => {
  const user = userEvent.setup();
  render(<AlertDialog><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup><Decision /></AlertDialogPopup></AlertDialog>);
  await user.tab();
  await user.keyboard("{Enter}");
  const popup = await screen.findByRole("alertdialog", { name: "删除" });
  expect(popup).toHaveAttribute("aria-modal", "true");
  expect(popup).toHaveAccessibleDescription("删除后无法恢复。");
  await waitFor(() => expect(popup).toHaveFocus());
  expect(screen.getByRole("button", { name: "删除" })).not.toHaveFocus();
});

test("backdrop press does not dismiss or report a decision", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(<AlertDialog onOpenChange={change}><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup backdropProps={{ "data-testid": "backdrop" }}><Decision /></AlertDialogPopup></AlertDialog>);
  await user.click(screen.getByRole("button", { name: "删除入口" }));
  const popup = await screen.findByRole("alertdialog");
  change.mockClear();
  await user.click(screen.getByTestId("backdrop"));
  expect(popup).toBeInTheDocument();
  expect(change).not.toHaveBeenCalled();
});

test.each(["Escape", "explicit"])("%s closes without running the danger action and returns focus", async (path) => {
  const user = userEvent.setup();
  const remove = vi.fn();
  render(<AlertDialog><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup><AlertDialogTitle>删除</AlertDialogTitle><p id="remove-consequence">删除后无法恢复。</p><Button tone="danger" aria-describedby="remove-consequence" onClick={remove}>删除</Button><AlertDialogClose>保留</AlertDialogClose></AlertDialogPopup></AlertDialog>);
  const trigger = screen.getByRole("button", { name: "删除入口" });
  await user.click(trigger);
  await screen.findByRole("alertdialog");
  if (path === "Escape") await user.keyboard("{Escape}");
  else await user.click(screen.getByRole("button", { name: "保留" }));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(remove).not.toHaveBeenCalled();
});

test("Tab loops inside the alertdialog while background controls are excluded", async () => {
  const user = userEvent.setup();
  render(<><AlertDialog><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup><Decision /></AlertDialogPopup></AlertDialog><button>背景按钮</button></>);
  await user.click(screen.getByRole("button", { name: "删除入口" }));
  await waitFor(() => expect(screen.getByRole("alertdialog")).toHaveFocus());
  expect(screen.queryByRole("button", { name: "背景按钮" })).not.toBeInTheDocument();
  await user.tab();
  await waitFor(() => expect(screen.getByRole("button", { name: "删除" })).toHaveFocus());
  await user.tab();
  await waitFor(() => expect(screen.getByRole("button", { name: "保留" })).toHaveFocus());
  await user.tab();
  await waitFor(() => expect(screen.getByRole("button", { name: "删除" })).toHaveFocus());
  await user.tab({ shift: true });
  await waitFor(() => expect(screen.getByRole("button", { name: "保留" })).toHaveFocus());
});

test("initialFocus can explicitly choose the protective action", async () => {
  const user = userEvent.setup();
  const keep = createRef<HTMLButtonElement>();
  render(<AlertDialog><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup initialFocus={keep}><AlertDialogTitle>删除</AlertDialogTitle><AlertDialogClose ref={keep}>保留</AlertDialogClose></AlertDialogPopup></AlertDialog>);
  await user.click(screen.getByRole("button", { name: "删除入口" }));
  await waitFor(() => expect(keep.current).toHaveFocus());
});

test("controlled state retains application authority over close requests", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { rerender } = render(<AlertDialog open onOpenChange={change}><AlertDialogPopup><Decision /></AlertDialogPopup></AlertDialog>);
  await screen.findByRole("alertdialog");
  await user.keyboard("{Escape}");
  expect(change).toHaveBeenCalledWith(false, expect.objectContaining({ reason: "escape-key" }));
  expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  rerender(<AlertDialog open={false} onOpenChange={change}><AlertDialogPopup><Decision /></AlertDialogPopup></AlertDialog>);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
});

test("defaultOpen can be closed with an explicit choice", async () => {
  const user = userEvent.setup();
  render(<AlertDialog defaultOpen><AlertDialogPopup><Decision /></AlertDialogPopup></AlertDialog>);
  await user.click(await screen.findByRole("button", { name: "保留" }));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
});

test("a removed trigger returns to the meaningful parent", async () => {
  function Example() {
    const parent = useRef<HTMLHeadingElement>(null);
    const [open, setOpen] = useState(false);
    const [exists, setExists] = useState(true);
    return <><h2 tabIndex={-1} ref={parent}>标题</h2><AlertDialog open={open} onOpenChange={setOpen}>{exists && <AlertDialogTrigger>删除入口</AlertDialogTrigger>}<AlertDialogPopup finalFocus={parent}><AlertDialogTitle>删除</AlertDialogTitle><button onClick={() => { setExists(false); setOpen(false); }}>移除入口</button><AlertDialogClose>保留</AlertDialogClose></AlertDialogPopup></AlertDialog></>;
  }
  const user = userEvent.setup();
  render(<Example />);
  await user.click(screen.getByRole("button", { name: "删除入口" }));
  await user.click(await screen.findByRole("button", { name: "移除入口" }));
  await waitFor(() => expect(screen.getByRole("heading", { name: "标题" })).toHaveFocus());
});

test("nested alert decision keeps the parent modal open and restores the child trigger", async () => {
  const user = userEvent.setup();
  render(<Dialog><DialogTrigger>打开</DialogTrigger><DialogPopup><DialogTitle>编辑名称</DialogTitle><AlertDialog><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup><Decision /></AlertDialogPopup></AlertDialog><DialogClose /></DialogPopup></Dialog>);
  await user.click(screen.getByRole("button", { name: "打开" }));
  const trigger = await screen.findByRole("button", { name: "删除入口" });
  await user.click(trigger);
  await screen.findByRole("alertdialog");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(screen.getByRole("dialog", { name: "编辑名称" })).toHaveAttribute("aria-modal", "true");
  await user.keyboard("{Escape}");
  await waitFor(() => expect(screen.getByRole("button", { name: "打开" })).toHaveFocus());
});

test("safe default focus preserves forwarded callback-ref cleanup and the caller render", async () => {
  const cleanup = vi.fn();
  const ref = vi.fn(() => cleanup);
  const user = userEvent.setup();
  render(<AlertDialog><AlertDialogTrigger>删除入口</AlertDialogTrigger><AlertDialogPopup ref={ref} render={<section />} className={() => "rounded-none"} data-object="example"><Decision /></AlertDialogPopup></AlertDialog>);
  await user.click(screen.getByRole("button", { name: "删除入口" }));
  const popup = await screen.findByRole("alertdialog");
  await waitFor(() => expect(popup).toHaveFocus());
  expect(popup.tagName).toBe("SECTION");
  expect(popup).toHaveClass("rounded-none");
  expect(popup).toHaveAttribute("data-object", "example");
  expect(ref).toHaveBeenCalledWith(popup);
  expect(popup.querySelector('[data-slot="alert-dialog-header"]')).not.toBeNull();
  expect(popup.querySelector('[data-slot="alert-dialog-panel"]')).not.toBeNull();
  expect(popup.querySelector('[data-slot="alert-dialog-footer"]')).not.toBeNull();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(cleanup).toHaveBeenCalled());
});
