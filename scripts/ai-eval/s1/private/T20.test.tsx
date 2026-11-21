import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExportTask } from "../ExportTask";

const cancelButton = () => screen.getByRole("button", { name: "取消" });

describe("T20 ExportTask", () => {
  it("[behavior] 运行中点击取消调用 onCancel 恰好一次", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onCancel = vi.fn();
    render(<ExportTask status="running" onCancel={onCancel} />);
    await user.click(cancelButton());
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it("[state] 点击取消后 status 仍为运行中时界面不出现已取消", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<ExportTask status="running" onCancel={() => {}} />);
    await user.click(cancelButton());
    expect(container.textContent).not.toContain("已取消");
  });

  it("[state] 点击取消后界面与点击前不同", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<ExportTask status="running" onCancel={() => {}} />);
    // 用户可感知的差异：文字变化，或按钮不再可执行（禁用/aria-disabled/移除），或出现忙碌标记；措辞不限
    const snapshot = () => {
      const buttons = [...container.querySelectorAll("button,[role='button']")]
        .map(b => `${b.textContent}:${b.hasAttribute("disabled") || b.getAttribute("aria-disabled") === "true"}`)
        .join(",");
      const busy = container.querySelectorAll("[aria-busy='true'],[role='progressbar']").length;
      return `${container.textContent}|${buttons}|${busy}`;
    };
    const before = snapshot();
    await user.click(cancelButton());
    expect(snapshot()).not.toBe(before);
  });

  it("[state] 点击后 status 回传 cancelled 时显示已取消", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container, rerender } = render(<ExportTask status="running" onCancel={() => {}} />);
    await user.click(cancelButton());
    rerender(<ExportTask status="cancelled" onCancel={() => {}} />);
    expect(container.textContent).toContain("已取消");
  });

  it("[state] 取消来晚了：点击后任务完成，显示已完成且不出现已取消", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container, rerender } = render(<ExportTask status="running" onCancel={() => {}} />);
    await user.click(cancelButton());
    rerender(<ExportTask status="done" onCancel={() => {}} />);
    expect(container.textContent).toContain("已完成");
    expect(container.textContent).not.toContain("已取消");
  });
});
