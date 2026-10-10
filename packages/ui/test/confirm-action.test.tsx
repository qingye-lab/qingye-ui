import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { ConfirmAction, type ConfirmActionSnapshot } from "../src/components/confirm-action";

const snapshot: ConfirmActionSnapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "确认后以 B 替换 A。" };
const labels = { title: "核对变更", triggerLabel: "核对 A", actionLabel: "应用 B", confirmationText: "A", confirmationLabel: "输入 A" };

test("every snapshot field invalidates reviewed text; rereading clears old acknowledgment", async () => {
  const confirm = vi.fn();
  const { rerender } = render(<ConfirmAction snapshot={snapshot} {...labels} onConfirm={confirm} />);
  await userEvent.click(screen.getByRole("button", { name: "核对 A" }));
  let current = { ...snapshot };
  for (const [field, value] of [["objectId", "B"], ["objectLabel", "B"], ["version", 2], ["change", "B → A"], ["consequence", "确认后以 A 替换 B。"]] as const) {
    await userEvent.type(screen.getByRole("textbox", { name: "输入 A" }), "A");
    current = { ...current, [field]: value };
    rerender(<ConfirmAction snapshot={current} {...labels} onConfirm={confirm} />);
    expect(screen.getByRole("status")).toHaveTextContent("已改变");
    expect(screen.getByRole("button", { name: "应用 B" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "应用 B" }));
    expect(confirm).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "重新阅读" }));
    expect(screen.getByRole("textbox", { name: "输入 A" })).toHaveValue("");
    expect(screen.getByRole("button", { name: "应用 B" })).toBeDisabled();
  }
  await userEvent.type(screen.getByRole("textbox", { name: "输入 A" }), "A");
  await userEvent.click(screen.getByRole("button", { name: "应用 B" }));
  expect(confirm).toHaveBeenCalledTimes(1);
  expect(confirm.mock.calls[0]![0]).toEqual(current);
  expect(Object.isFrozen(confirm.mock.calls[0]![0])).toBe(true);
  expect(screen.getByRole("alertdialog")).toBeInTheDocument();
});

test("returning to an earlier snapshot does not revive old approval; closing returns trigger focus", async () => {
  const confirm = vi.fn();
  const { rerender } = render(<ConfirmAction snapshot={snapshot} {...labels} onConfirm={confirm} />);
  const trigger = screen.getByRole("button", { name: "核对 A" });
  await userEvent.click(trigger);
  await userEvent.type(screen.getByRole("textbox", { name: "输入 A" }), "A");
  rerender(<ConfirmAction snapshot={{ ...snapshot, version: 2 }} {...labels} onConfirm={confirm} />);
  rerender(<ConfirmAction snapshot={snapshot} {...labels} onConfirm={confirm} />);
  expect(screen.getByRole("button", { name: "应用 B" })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "返回" }));
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(confirm).not.toHaveBeenCalled();
});

test("confirmation is only a request; event cancellation and controlled open refusal preserve facts", async () => {
  const confirm = vi.fn(() => Promise.resolve());
  const ref = createRef<HTMLInputElement>();
  const { rerender } = render(<ConfirmAction snapshot={snapshot} {...labels} onConfirm={confirm} inputProps={{ ref, render: <input data-custom="yes" /> }} confirmProps={{ onClick: event => event.preventDefault() }} />);
  await userEvent.click(screen.getByRole("button", { name: "核对 A" }));
  const input = screen.getByRole("textbox", { name: "输入 A" });
  expect(ref.current).toBe(input);
  expect(input).toHaveAttribute("data-custom", "yes");
  await userEvent.type(input, "A");
  await userEvent.click(screen.getByRole("button", { name: "应用 B" }));
  expect(confirm).not.toHaveBeenCalled();
  rerender(<ConfirmAction snapshot={snapshot} {...labels} onConfirm={confirm} />);
  await userEvent.click(screen.getByRole("button", { name: "应用 B" }));
  await Promise.resolve();
  expect(confirm).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "应用 B" })).toBeEnabled();
  await userEvent.click(screen.getByRole("button", { name: "返回" }));
  const openChange = vi.fn();
  rerender(<ConfirmAction snapshot={snapshot} {...labels} onConfirm={confirm} open={false} onOpenChange={openChange} />);
  await userEvent.click(screen.getByRole("button", { name: "核对 A" }));
  expect(openChange).toHaveBeenCalled();
  expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
});

test.each(["loading", "disabled"])("%s blocks a repeated confirmation without inferring a result", async state => {
  const confirm = vi.fn();
  render(<ConfirmAction snapshot={snapshot} title="核对变更" triggerLabel="核对 A" actionLabel="应用 B" onConfirm={confirm} defaultOpen loading={state === "loading"} disabled={state === "disabled"} />);
  const action = screen.getByRole("button", { name: "应用 B" });
  if (state === "disabled") expect(action).toBeDisabled();
  else expect(action).toHaveAttribute("aria-disabled", "true");
  fireEvent.click(action);
  expect(confirm).not.toHaveBeenCalled();
  expect(screen.getByRole("alertdialog")).toBeInTheDocument();
});

test("the consequence is the dialog's description; the entry is a plain button that only opens it", async () => {
  const user = userEvent.setup();
  render(<ConfirmAction snapshot={snapshot} title="替换" triggerLabel="替换" actionLabel="确认替换" onConfirm={() => {}} />);
  const entry = screen.getByRole("button", { name: "替换" });
  expect(entry).not.toHaveAttribute("aria-describedby");
  expect(screen.queryByText(snapshot.consequence)).not.toBeInTheDocument();
  await user.click(entry);
  const dialog = await screen.findByRole("alertdialog");
  await waitFor(() => expect(dialog).toHaveAccessibleDescription(snapshot.consequence));
  expect(within(dialog).getByText(snapshot.consequence)).toHaveAttribute("data-slot", "alert-dialog-description");
});
