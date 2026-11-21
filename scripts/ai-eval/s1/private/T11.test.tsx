import "./_env";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SettingsPage } from "../SettingsPage";

const setup = (onSignOut = () => {}) => render(<SettingsPage name="林青" email="lin@example.com" onSignOut={onSignOut} />);

describe("T11 SettingsPage", () => {
  it("[a11y] 页面名称是唯一的一级标题", () => {
    setup();
    const h1 = screen.getAllByRole("heading", { level: 1 });
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent).toBe("账户设置");
  });

  it("[a11y] 每个分节是由标题命名的区域", () => {
    setup();
    const profile = screen.getByRole("region", { name: "个人资料" });
    const notify = screen.getByRole("region", { name: "通知" });
    expect(within(profile).getByText("lin@example.com")).toBeTruthy();
    expect(within(notify).getByText("每周一发送摘要邮件")).toBeTruthy();
  });

  it("[api] 分节不使用卡片外框", () => {
    const { container } = setup();
    expect(container.querySelector("[data-slot='card']")).toBeNull();
  });

  it("[api] 页面标题行与分节来自库", () => {
    const { container } = setup();
    expect(container.querySelector("[data-slot='page-header']")).not.toBeNull();
    expect(container.querySelectorAll("[data-slot='section']").length).toBeGreaterThanOrEqual(2);
  });

  it("[behavior] 编辑链接位于个人资料分节并指向资料编辑页", () => {
    setup();
    const link = screen.getByRole("link", { name: "编辑" });
    expect(link.getAttribute("href")).toBe("/settings/profile");
    // 从链接向上找到最近的、含有“个人资料”标题的祖先：它不能同时含有“通知”标题（即链接属于个人资料这一块）
    const title = (el: Element, text: string) => within(el as HTMLElement).queryByRole("heading", { name: text });
    let node: Element | null = link.parentElement;
    while (node && !title(node, "个人资料")) node = node.parentElement;
    expect(node).not.toBeNull();
    expect(title(node!, "通知")).toBeNull();
  });

  it("[behavior] 退出登录调用 onSignOut", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onSignOut = vi.fn();
    setup(onSignOut);
    await user.click(screen.getByRole("button", { name: "退出登录" }));
    expect(onSignOut).toHaveBeenCalledTimes(1);
  });
});
