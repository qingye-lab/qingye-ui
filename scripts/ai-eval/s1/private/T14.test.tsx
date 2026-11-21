import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemberRowMenu } from "../MemberRowMenu";

async function open(onDeactivate = () => {}) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  render(<MemberRowMenu memberId="m1" onDeactivate={onDeactivate} />);
  await user.click(screen.getByRole("button", { name: "更多操作" }));
  return user;
}

describe("T14 MemberRowMenu", () => {
  it("[a11y] 触发按钮名称为“更多操作”", () => {
    render(<MemberRowMenu memberId="m1" onDeactivate={() => {}} />);
    expect(screen.getByRole("button", { name: "更多操作" })).toBeTruthy();
  });

  it("[api] 菜单来自库（带 data-slot）", async () => {
    await open();
    const item = await screen.findByRole("menuitem", { name: "停用" });
    expect(item.getAttribute("data-slot")).toBeTruthy();
    expect(screen.getByRole("menu").getAttribute("data-slot")).toBeTruthy();
  });

  it("[a11y] 查看资料是菜单里的链接", async () => {
    await open();
    const item = await screen.findByRole("menuitem", { name: "查看资料" });
    expect(item.tagName).toBe("A");
    expect(item.getAttribute("href")?.endsWith("/members/m1")).toBe(true);
  });

  it("[behavior] 停用调用 onDeactivate", async () => {
    const onDeactivate = vi.fn();
    const user = await open(onDeactivate);
    await user.click(await screen.findByRole("menuitem", { name: "停用" }));
    expect(onDeactivate).toHaveBeenCalledTimes(1);
  });
});
