import "./_env";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { StatusFilter } from "../StatusFilter";

const openPanel = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "筛选" }));
  await screen.findByRole("checkbox", { name: "待处理" });
};
const closed = () => waitFor(() => expect(screen.queryByRole("checkbox", { name: "待处理" })).toBeNull());

describe("T27 StatusFilter", () => {
  it("[behavior] 勾选后点“应用”以新勾选调用 onApply 并收起浮层", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onApply = vi.fn();
    render(<StatusFilter value={["待处理"]} onApply={onApply} />);
    await openPanel(user);
    expect(screen.getByRole("checkbox", { name: "待处理" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "进行中" })).not.toBeChecked();
    await user.click(screen.getByRole("checkbox", { name: "进行中" }));
    await user.click(screen.getByRole("button", { name: "应用" }));
    expect(onApply).toHaveBeenCalledTimes(1);
    expect([...onApply.mock.calls[0][0]].sort()).toEqual(["待处理", "进行中"]);
    await closed();
  });

  it("[behavior] 勾选时不立即调用 onApply", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onApply = vi.fn();
    render(<StatusFilter value={[]} onApply={onApply} />);
    await openPanel(user);
    await user.click(screen.getByRole("checkbox", { name: "进行中" }));
    await user.click(screen.getByRole("checkbox", { name: "已完成" }));
    expect(onApply).not.toHaveBeenCalled();
  });

  it("[state] 未点“应用”就收起浮层不调用 onApply", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onApply = vi.fn();
    const { unmount } = render(<StatusFilter value={["待处理"]} onApply={onApply} />);
    await openPanel(user);
    await user.click(screen.getByRole("checkbox", { name: "进行中" }));
    await user.keyboard("{Escape}");
    await closed();
    expect(onApply).not.toHaveBeenCalled();
    unmount();

    const user2 = userEvent.setup({ pointerEventsCheck: 0 });
    render(<StatusFilter value={["待处理"]} onApply={onApply} />);
    await openPanel(user2);
    await user2.click(screen.getByRole("checkbox", { name: "已完成" }));
    await user2.click(document.body);
    await closed();
    expect(onApply).not.toHaveBeenCalled();
  });

  it("[api] 浮层来自库（popover 相关 data-slot）", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<StatusFilter value={[]} onApply={() => {}} />);
    await openPanel(user);
    expect(document.querySelector("[data-slot^='popover']")).not.toBeNull();
  });
});
