import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { PublishBar } from "../PublishBar";

const REASON = "还缺一位审批人";
const publishButton = () => screen.getByRole("button", { name: "发布" });

describe("T7 PublishBar", () => {
  it("[behavior] 可以发布时点击“发布”调用 onPublish", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onPublish = vi.fn();
    render(<PublishBar blockedReason={null} onPublish={onPublish} />);
    await user.click(publishButton());
    expect(onPublish).toHaveBeenCalledTimes(1);
  });

  it("[state] 有阻止原因时发布按钮仍显示但不能执行", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onPublish = vi.fn();
    render(<PublishBar blockedReason={REASON} onPublish={onPublish} />);
    const button = publishButton();
    // disabled 或 aria-disabled 都算不能执行
    expect(button.hasAttribute("disabled") || button.getAttribute("aria-disabled") === "true").toBe(true);
    await user.click(button);
    expect(onPublish).not.toHaveBeenCalled();
  });

  it("[a11y] 阻止原因无需悬停或聚焦即可读到", () => {
    render(<PublishBar blockedReason={REASON} onPublish={() => {}} />);
    // 不做任何悬停、聚焦：原因已经是页面上的文字，且不在提示浮层里
    const nodes = screen.queryAllByText(REASON).filter(el => !el.closest("[data-slot^='tooltip']"));
    expect(nodes.length).toBeGreaterThan(0);
  });

  it("[api] 发布按钮来自库（带 data-slot）", () => {
    render(<PublishBar blockedReason={REASON} onPublish={() => {}} />);
    // 库组件都带 data-slot；经 TooltipTrigger 等组合后 slot 名会变，只要求来自库
    expect(publishButton().getAttribute("data-slot")).toBeTruthy();
  });
});
