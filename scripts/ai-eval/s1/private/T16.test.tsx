import "./_env";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BillingHelp } from "../BillingHelp";

const helpButton = () => screen.getByRole("button", { name: "计费说明" });

// 点击或按键打开的帮助应在这次操作后立刻出现。只等 300ms：悬停延迟后才出现的提示
// （Base UI 提示默认悬停 600ms）不算“点击后出现”，也避免测试结果取决于悬停计时。
const linkSoon = () => waitFor(() => screen.getByRole("link", { name: "查看计费规则" }), { timeout: 300 });

describe("T16 BillingHelp", () => {
  it("[behavior] 点击帮助按钮后出现计费规则链接", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<BillingHelp />);
    await user.click(helpButton());
    const link = await linkSoon();
    expect(link.getAttribute("href")).toBe("/docs/billing");
    expect(screen.getByText("按自然月计费，月中升级按天折算")).toBeTruthy();
  });

  it("[a11y] 键盘打开说明后可以聚焦到链接", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<BillingHelp />);
    await user.tab();
    expect(document.activeElement).toBe(helpButton());
    await user.keyboard("{Enter}");
    const link = await linkSoon();
    // 等浮层的初始焦点安排完成（真实用户不会在同一毫秒内接着按 Tab）
    await act(() => new Promise(resolve => setTimeout(resolve, 100)));
    for (let i = 0; i < 4 && document.activeElement !== link; i++) await user.tab();
    expect(document.activeElement).toBe(link);
  });

  it("[api] 说明来自库的浮层（带 data-slot）", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<BillingHelp />);
    await user.click(helpButton());
    const link = await linkSoon();
    expect(link.closest("[data-slot]")).toBeTruthy();
    expect(helpButton().getAttribute("data-slot")).toBeTruthy();
  });
});
