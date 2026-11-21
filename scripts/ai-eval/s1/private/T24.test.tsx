import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProjectActions } from "../ProjectActions";

function setup(archived: boolean) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const handlers = { onRename: vi.fn(), onTransfer: vi.fn(), onCopyLink: vi.fn() };
  render(<ProjectActions archived={archived} {...handlers} />);
  return { user, ...handlers };
}
const openMenu = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.click(screen.getByRole("button", { name: "项目操作" }));
};

describe("T24 ProjectActions", () => {
  it("[behavior] 未归档时三项都能执行", async () => {
    const { user, onRename, onTransfer, onCopyLink } = setup(false);
    await openMenu(user);
    await user.click(await screen.findByRole("menuitem", { name: "重命名" }));
    expect(onRename).toHaveBeenCalledTimes(1);
    await openMenu(user);
    await user.click(await screen.findByRole("menuitem", { name: "转交负责人" }));
    expect(onTransfer).toHaveBeenCalledTimes(1);
    await openMenu(user);
    await user.click(await screen.findByRole("menuitem", { name: "复制链接" }));
    expect(onCopyLink).toHaveBeenCalledTimes(1);
  });

  it("[state] 已归档时“重命名”“转交负责人”仍列在菜单里且不能执行", async () => {
    const { user, onRename, onTransfer } = setup(true);
    await openMenu(user);
    for (const name of ["重命名", "转交负责人"]) {
      const item = await screen.findByRole("menuitem", { name });
      expect(item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")).toBe(true);
      await user.click(item);
    }
    expect(onRename).not.toHaveBeenCalled();
    expect(onTransfer).not.toHaveBeenCalled();
  });

  it("[behavior] 已归档时“复制链接”仍能执行", async () => {
    const { user, onCopyLink } = setup(true);
    await openMenu(user);
    await user.click(await screen.findByRole("menuitem", { name: "复制链接" }));
    expect(onCopyLink).toHaveBeenCalledTimes(1);
  });

  it("[api] 菜单来自库（带 menu 相关 data-slot）", async () => {
    const { user } = setup(false);
    await openMenu(user);
    const item = await screen.findByRole("menuitem", { name: "重命名" });
    expect(item.getAttribute("data-slot")).toMatch(/^menu/);
    expect(document.querySelector("[data-slot='menu-popup']")).not.toBeNull();
  });
});
