import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Activity, StrictMode, createRef, useLayoutEffect, useState } from "react";
import { expect, test, vi } from "vitest";
import { ConfirmProvider, useConfirm, type ConfirmFunction, type ConfirmOptions } from "../src/components/confirm";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";
import { Button } from "../src/components/button";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "../src/components/dialog";

const options = { title: "移出集合？", description: "记录会保留在全部记录中。", confirmLabel: "移出", cancelLabel: "保留" };

function Consumer({ capture, onDecision, showEntry = true }: { capture?: (confirm: ConfirmFunction) => void; onDecision?: (confirmed: boolean) => void; showEntry?: boolean }) {
  const confirm = useConfirm();
  useLayoutEffect(() => { capture?.(confirm); }, [capture, confirm]);
  return showEntry ? <Button onClick={async () => { const confirmed = await confirm(options); onDecision?.(confirmed); }}>移出入口</Button> : null;
}

test("await confirm resolves only the decision, names its consequence, and restores keyboard focus", async () => {
  const user = userEvent.setup();
  const decision = vi.fn();
  render(<ConfirmProvider><Consumer onDecision={decision} /><button>背景按钮</button></ConfirmProvider>);
  const trigger = screen.getByRole("button", { name: "移出入口" });
  await user.tab();
  await user.keyboard("{Enter}");
  const dialog = await screen.findByRole("alertdialog", { name: "移出集合？" });
  await waitFor(() => expect(dialog).toHaveAccessibleDescription(options.description));
  await waitFor(() => expect(dialog).toHaveFocus());
  expect(within(dialog).getByRole("button", { name: "移出" })).not.toHaveFocus();
  expect(screen.queryByRole("button", { name: "背景按钮" })).not.toBeInTheDocument();
  await user.tab();
  expect(within(dialog).getByRole("button", { name: "移出" })).toHaveFocus();
  await user.keyboard("{Enter}");
  await waitFor(() => expect(decision).toHaveBeenCalledExactlyOnceWith(true));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  await waitFor(() => expect(trigger).toHaveFocus());
});

test.each(["cancel", "Escape"])("%s declines the decision without running an affirmative action", async path => {
  const user = userEvent.setup();
  const decision = vi.fn();
  render(<ConfirmProvider><Consumer onDecision={decision} /></ConfirmProvider>);
  const trigger = screen.getByRole("button", { name: "移出入口" });
  await user.click(trigger);
  await screen.findByRole("alertdialog");
  if (path === "Escape") await user.keyboard("{Escape}");
  else await user.click(screen.getByRole("button", { name: "保留" }));
  await waitFor(() => expect(decision).toHaveBeenCalledExactlyOnceWith(false));
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("a request made while another is active waits its turn and settles on its own", async () => {
  const user = userEvent.setup();
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  let first!: Promise<boolean>, second!: Promise<boolean>, third!: Promise<boolean>;
  const settled = vi.fn();
  act(() => {
    first = confirm(options);
    second = confirm({ title: "替换？", description: "替换当前值。", confirmLabel: "替换" });
    third = confirm({ title: "第三个？", description: "排在最后。", confirmLabel: "继续" });
    void second.then(settled); void third.then(settled);
  });
  expect(screen.getAllByRole("alertdialog")).toHaveLength(1);
  expect(screen.getByRole("alertdialog")).toHaveAccessibleName(options.title);
  expect(settled).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "保留" }));
  await expect(first).resolves.toBe(false);
  // 前一个结束并退场之后才轮到下一个；排队不等于被拒绝。
  expect(await screen.findByRole("alertdialog", { name: "替换？" })).toBeInTheDocument();
  expect(settled).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: "替换" }));
  await expect(second).resolves.toBe(true);
  expect(await screen.findByRole("alertdialog", { name: "第三个？" })).toBeInTheDocument();
  await user.keyboard("{Escape}");
  await expect(third).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  let next!: Promise<boolean>;
  act(() => { next = confirm({ title: "再来一个？", description: "队列已空。", confirmLabel: "好" }); });
  await screen.findByRole("alertdialog", { name: "再来一个？" });
  await user.click(screen.getByRole("button", { name: "好" }));
  await expect(next).resolves.toBe(true);
});

test("a waiting request can be aborted or its owner unmounted without opening or disturbing the others", async () => {
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  const controller = new AbortController();
  let first!: Promise<boolean>, waiting!: Promise<boolean>, last!: Promise<boolean>;
  act(() => {
    first = confirm(options);
    waiting = confirm({ ...options, title: "等待中", signal: controller.signal });
    last = confirm({ ...options, title: "最后" });
  });
  await screen.findByRole("alertdialog", { name: options.title });
  act(() => controller.abort());
  await expect(waiting).resolves.toBe(false);
  await userEvent.click(screen.getByRole("button", { name: "移出" }));
  await expect(first).resolves.toBe(true);
  expect(await screen.findByRole("alertdialog", { name: "最后" })).toBeInTheDocument();
  expect(screen.queryByRole("alertdialog", { name: "等待中" })).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "移出" }));
  await expect(last).resolves.toBe(true);
});

test("unmounting the provider settles every waiting request with false", async () => {
  let confirm!: ConfirmFunction;
  const { unmount } = render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  let first!: Promise<boolean>, second!: Promise<boolean>;
  act(() => { first = confirm(options); second = confirm({ ...options, title: "排队中" }); });
  await screen.findByRole("alertdialog");
  unmount();
  await expect(first).resolves.toBe(false);
  await expect(second).resolves.toBe(false);
});

test("backdrop presses preserve the current decision and caller-provided popup props", async () => {
  const user = userEvent.setup();
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  const decision = vi.fn();
  act(() => { void confirm({ ...options, popupProps: { backdropProps: { "data-testid": "confirm-backdrop" }, "data-scope": "collection" } }).then(decision); });
  const dialog = screen.getByRole("alertdialog");
  expect(dialog).toHaveAttribute("data-scope", "collection");
  await user.click(screen.getByTestId("confirm-backdrop"));
  expect(dialog).toBeInTheDocument();
  expect(decision).not.toHaveBeenCalled();
  await user.keyboard("{Escape}");
  await waitFor(() => expect(decision).toHaveBeenCalledExactlyOnceWith(false));
});

test("an abort signal declines an active decision and a pre-aborted call never opens", async () => {
  const user = userEvent.setup();
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  const controller = new AbortController();
  let pending!: Promise<boolean>;
  act(() => { pending = confirm({ ...options, signal: controller.signal }); });
  await screen.findByRole("alertdialog");
  act(() => controller.abort());
  await expect(pending).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  await expect(confirm({ ...options, signal: controller.signal })).resolves.toBe(false);
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "移出入口" }));
  expect(await screen.findByRole("alertdialog")).toHaveAccessibleName(options.title);
  await user.keyboard("{Escape}");
});

test("aborting before the dialog renders releases the request instead of leaving the provider busy", async () => {
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  const controller = new AbortController();
  let canceled!: Promise<boolean>, next!: Promise<boolean>;
  act(() => { canceled = confirm({ ...options, signal: controller.signal }); controller.abort(); next = confirm(options); });
  await expect(canceled).resolves.toBe(false);
  await screen.findByRole("alertdialog");
  await userEvent.click(screen.getByRole("button", { name: "移出" }));
  await expect(next).resolves.toBe(true);
});

test("reusing an options object cannot redirect abort cleanup to another signal", async () => {
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  const original = new AbortController();
  const replacement = new AbortController();
  const removeOriginal = vi.spyOn(original.signal, "removeEventListener");
  const removeReplacement = vi.spyOn(replacement.signal, "removeEventListener");
  const mutable: ConfirmOptions = { ...options, signal: original.signal };
  let pending!: Promise<boolean>;
  act(() => { pending = confirm(mutable); });
  await screen.findByRole("alertdialog");
  mutable.signal = replacement.signal;
  act(() => original.abort());
  await expect(pending).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  expect(removeOriginal).toHaveBeenCalledWith("abort", expect.any(Function));
  expect(removeReplacement).not.toHaveBeenCalled();
});

test("unmounting the hook owner declines its request and stale functions cannot open another dialog", async () => {
  let confirm!: ConfirmFunction;
  function Example({ show }: { show: boolean }) {
    return <ConfirmProvider>{show && <Consumer capture={value => { confirm = value; }} />}</ConfirmProvider>;
  }
  const { rerender } = render(<Example show />);
  let pending!: Promise<boolean>;
  act(() => { pending = confirm(options); });
  await screen.findByRole("alertdialog");
  rerender(<Example show={false} />);
  await expect(pending).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  await expect(confirm(options)).resolves.toBe(false);
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
});

test("unmounting the provider settles outstanding promises under StrictMode", async () => {
  let confirm!: ConfirmFunction;
  const { unmount } = render(<StrictMode><ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider></StrictMode>);
  let pending!: Promise<boolean>;
  act(() => { pending = confirm(options); });
  await screen.findByRole("alertdialog");
  unmount();
  await expect(pending).resolves.toBe(false);
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
});

test.each(["provider", "owner"] as const)("Activity hiding the %s declines its decision and resumes without a stale dialog", async boundary => {
  const user = userEvent.setup();
  let confirm!: ConfirmFunction;
  const capture = (value: ConfirmFunction) => { confirm = value; };
  function Example({ mode }: { mode: "visible" | "hidden" }) {
    const consumer = <Consumer capture={capture} />;
    return boundary === "provider"
      ? <Activity mode={mode}><ConfirmProvider>{consumer}</ConfirmProvider></Activity>
      : <ConfirmProvider><Activity mode={mode}>{consumer}</Activity></ConfirmProvider>;
  }
  const { rerender } = render(<Example mode="visible" />);
  let pending!: Promise<boolean>;
  act(() => { pending = confirm(options); });
  const dialog = await screen.findByRole("alertdialog");
  await waitFor(() => expect(dialog).toHaveFocus());
  rerender(<Example mode="hidden" />);
  await expect(pending).resolves.toBe(false);
  await expect(confirm(options)).resolves.toBe(false);
  rerender(<Example mode="visible" />);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());

  let reopened!: Promise<boolean>;
  act(() => { reopened = confirm(options); });
  await screen.findByRole("alertdialog");
  await user.click(screen.getByRole("button", { name: "保留" }));
  await expect(reopened).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());

  const controller = new AbortController();
  let aborted!: Promise<boolean>;
  act(() => { aborted = confirm({ ...options, signal: controller.signal }); });
  await screen.findByRole("alertdialog");
  act(() => controller.abort());
  await expect(aborted).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());

  let approved!: Promise<boolean>;
  act(() => { approved = confirm(options); });
  await user.click(await screen.findByRole("button", { name: "移出" }));
  await expect(approved).resolves.toBe(true);
});

test("StrictMode layout-effect requests discard the replayed decision and leave the current one operable", async () => {
  const user = userEvent.setup();
  const decisions: Promise<boolean>[] = [];
  function AutomaticConsumer() {
    const confirm = useConfirm();
    useLayoutEffect(() => { decisions.push(confirm(options)); }, [confirm]);
    return null;
  }
  render(<StrictMode><ConfirmProvider><AutomaticConsumer /></ConfirmProvider></StrictMode>);
  expect(decisions).toHaveLength(2);
  await expect(decisions[0]).resolves.toBe(false);
  const currentDecision = vi.fn();
  void decisions[1]!.then(currentDecision);
  await act(async () => { await Promise.resolve(); });
  expect(currentDecision).not.toHaveBeenCalled();
  const dialog = await screen.findByRole("alertdialog");
  await waitFor(() => expect(dialog).toHaveFocus());
  await user.keyboard("{Escape}");
  await expect(decisions[1]).resolves.toBe(false);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
});

test("an Activity resume can issue a fresh layout-effect decision without reviving the old request", async () => {
  const decisions: Promise<boolean>[] = [];
  function AutomaticConsumer() {
    const confirm = useConfirm();
    useLayoutEffect(() => { decisions.push(confirm(options)); }, [confirm]);
    return null;
  }
  function Example({ mode }: { mode: "visible" | "hidden" }) {
    return <Activity mode={mode}><ConfirmProvider><AutomaticConsumer /></ConfirmProvider></Activity>;
  }
  const { rerender } = render(<Example mode="visible" />);
  expect(decisions).toHaveLength(1);
  await screen.findByRole("alertdialog");
  rerender(<Example mode="hidden" />);
  await expect(decisions[0]).resolves.toBe(false);
  rerender(<Example mode="visible" />);
  expect(decisions).toHaveLength(2);
  const currentDecision = vi.fn();
  void decisions[1]!.then(currentDecision);
  await act(async () => { await Promise.resolve(); });
  expect(currentDecision).not.toHaveBeenCalled();
  expect(screen.getAllByRole("alertdialog")).toHaveLength(1);
  await userEvent.click(screen.getByRole("button", { name: "移出" }));
  await expect(decisions[1]).resolves.toBe(true);
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
});

test("a removed entry can return focus to an explicit surviving parent", async () => {
  const parent = createRef<HTMLHeadingElement>();
  let confirm!: ConfirmFunction;
  const { rerender } = render(<ConfirmProvider><h2 ref={parent} tabIndex={-1}>集合</h2><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  const trigger = screen.getByRole("button", { name: "移出入口" });
  trigger.focus();
  let pending!: Promise<boolean>;
  act(() => { pending = confirm({ ...options, popupProps: { finalFocus: parent } }); });
  await screen.findByRole("alertdialog");
  rerender(<ConfirmProvider><h2 ref={parent} tabIndex={-1}>集合</h2><Consumer showEntry={false} capture={value => { confirm = value; }} /></ConfirmProvider>);
  await userEvent.click(screen.getByRole("button", { name: "保留" }));
  await expect(pending).resolves.toBe(false);
  await waitFor(() => expect(parent.current).toHaveFocus());
});

test("confirm called inside a dialog returns to its requester without closing the parent", async () => {
  const user = userEvent.setup();
  render(<ConfirmProvider><Dialog><DialogTrigger>编辑草稿</DialogTrigger><DialogPopup><DialogTitle>草稿</DialogTitle><Consumer /><DialogClose>关闭草稿</DialogClose></DialogPopup></Dialog></ConfirmProvider>);
  await user.click(screen.getByRole("button", { name: "编辑草稿" }));
  const trigger = await screen.findByRole("button", { name: "移出入口" });
  await user.click(trigger);
  const decision = await screen.findByRole("alertdialog");
  await waitFor(() => expect(decision).toHaveFocus());
  await user.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(screen.getByRole("dialog", { name: "草稿" })).toHaveAttribute("aria-modal", "true");
  await user.click(screen.getByRole("button", { name: "关闭草稿" }));
  await waitFor(() => expect(screen.getByRole("button", { name: "编辑草稿" })).toHaveFocus());
});

test("defaults follow UILocale and explicit action labels take precedence", async () => {
  let confirm!: ConfirmFunction;
  render(<UILocaleProvider locale={enUS}><ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider></UILocaleProvider>);
  let pending!: Promise<boolean>;
  act(() => { pending = confirm({ title: "Leave collection?", description: "The record remains available.", confirmLabel: "Leave" }); });
  expect(screen.getByRole("button", { name: "Leave" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  await expect(pending).resolves.toBe(false);
});

test("caller-owned submission stays busy and a failure keeps recoverable content", async () => {
  const user = userEvent.setup();
  let reject!: (error: Error) => void;
  const execute = vi.fn(() => new Promise<void>((_, rejectRequest) => { reject = rejectRequest; }));
  function Example() {
    const confirm = useConfirm();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    return <><p>当前记录 A</p><Button loading={busy} onClick={async () => {
      if (!await confirm(options)) return;
      setBusy(true);
      try { await execute(); } catch { setError("移出失败，记录仍可重试。"); } finally { setBusy(false); }
    }}>移出记录</Button>{error && <p role="alert">{error}</p>}</>;
  }
  render(<ConfirmProvider><Example /></ConfirmProvider>);
  await user.click(screen.getByRole("button", { name: "移出记录" }));
  await user.click(screen.getByRole("button", { name: "移出" }));
  await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  const submit = screen.getByRole("button", { name: "移出记录" });
  expect(submit).toHaveAttribute("aria-busy", "true");
  fireEvent.click(submit);
  expect(execute).toHaveBeenCalledOnce();
  act(() => reject(new Error("request failed")));
  await screen.findByRole("alert");
  expect(submit).not.toHaveAttribute("aria-busy", "true");
  expect(screen.getByText("当前记录 A")).toBeInTheDocument();
  await user.click(submit);
  expect(await screen.findByRole("alertdialog")).toHaveAccessibleName(options.title);
  expect(execute).toHaveBeenCalledOnce();
  await user.keyboard("{Escape}");
});

test("missing provider and empty accessible content fail explicitly", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  try { expect(() => render(<Consumer />)).toThrow("ConfirmProvider"); } finally { error.mockRestore(); }
  let confirm!: ConfirmFunction;
  render(<ConfirmProvider><Consumer capture={value => { confirm = value; }} /></ConfirmProvider>);
  expect(() => confirm({ title: " ", description: "后果", confirmLabel: "继续" })).toThrow(TypeError);
  expect(() => confirm({ title: "决定", description: null, confirmLabel: "继续" })).toThrow(TypeError);
  // confirmLabel 必填：确认钮必须说出具体动作，类型之外运行时也拒绝缺省与空白。
  expect(() => confirm({ title: "决定", description: "后果" } as ConfirmOptions)).toThrow(TypeError);
  expect(() => confirm({ title: "决定", description: "后果", confirmLabel: " " })).toThrow(TypeError);
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
});
