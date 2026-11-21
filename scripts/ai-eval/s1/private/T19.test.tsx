import "./_env";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RecipientList } from "../RecipientList";

const people = [
  { id: "a", name: "Alice" },
  { id: "b", name: "Bob" },
  { id: "c", name: "Carol" },
];
const removeBtn = (name: string) => screen.getByRole("button", { name: new RegExp(`移除.*${name}`) });

// 所有移除按钮的最近共同祖先，即“收件人列表”的范围
function commonAncestor(nodes: HTMLElement[]): HTMLElement {
  let cur: HTMLElement | null = nodes[0].parentElement;
  while (cur && !nodes.every(n => cur!.contains(n))) cur = cur.parentElement;
  return cur as HTMLElement;
}

describe("T19 RecipientList", () => {
  it("[behavior] 点击移除后该收件人消失，onChange 收到剩余 id", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    render(<RecipientList initialRecipients={people} onChange={onChange} />);
    await user.click(removeBtn("Bob"));
    expect(screen.queryByText("Bob")).toBeNull();
    expect(screen.getByText("Alice")).toBeTruthy();
    expect(screen.getByText("Carol")).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith(["a", "c"]);
  });

  it("[a11y] 键盘移除中间一位后焦点仍留在收件人列表内", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<RecipientList initialRecipients={people} />);
    const buttons = [removeBtn("Alice"), removeBtn("Bob"), removeBtn("Carol")];
    const container = commonAncestor(buttons);
    const target = buttons[1];
    for (let i = 0; i < 10 && document.activeElement !== target; i++) await user.tab();
    expect(document.activeElement).toBe(target);
    await user.keyboard("{Enter}");
    expect(screen.queryByText("Bob")).toBeNull();
    // 允许在下一帧或定时器里移焦点
    await waitFor(() => {
      const active = document.activeElement as HTMLElement | null;
      expect(active).not.toBe(document.body);
      // “相邻记号或它所在的容器”：焦点在列表内，或落在包住整个列表的容器上（不含 body/html）
      const inList = !!active && container.contains(active);
      const onWrapper = !!active && active !== document.documentElement && active.contains(container);
      expect(inList || onWrapper).toBe(true);
    });
  });

  it("[a11y] 只剩一位时移除它后焦点不丢到页面开头", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<RecipientList initialRecipients={[people[0]]} />);
    const target = removeBtn("Alice");
    for (let i = 0; i < 10 && document.activeElement !== target; i++) await user.tab();
    expect(document.activeElement).toBe(target);
    await user.keyboard("{Enter}");
    expect(screen.queryByText("Alice")).toBeNull();
    await waitFor(() => {
      expect(document.activeElement).not.toBe(document.body);
      expect(document.activeElement).not.toBeNull();
    });
  });

  it("[api] 记号来自库（带 data-slot=chip）", () => {
    render(<RecipientList initialRecipients={people} />);
    const chip = screen.getByText("Bob").closest("[data-slot='chip']");
    expect(chip).not.toBeNull();
  });
});
