import "./_env";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileRow } from "../FileRow";

const NAME = "季度报告.docx";
const isCtx = (el: Element) => (el.getAttribute("data-slot") ?? "").startsWith("context-menu");
// 按钮的可访问名称近似：优先 aria-label，否则取文字（图标按钮也能被识别）
const nameOf = (el: Element) => (el.getAttribute("aria-label") ?? el.textContent ?? "").trim();

function setup() {
  const onRename = vi.fn();
  const onDelete = vi.fn();
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const { unmount } = render(<FileRow name={NAME} onRename={onRename} onDelete={onDelete} />);
  return { user, onRename, onDelete, unmount };
}

async function openContext() {
  fireEvent.contextMenu(screen.getByText(NAME));
  return screen.findAllByRole("menuitem");
}

// 不使用右键的入口：排除右键触发区本身；可以是带 aria-haspopup 的触发器，也可以是直接的命令按钮（名称全等，与命令集合比较一致）
async function visibleCommand(user: ReturnType<typeof userEvent.setup>, label: string) {
  const buttons = screen.queryAllByRole("button").filter((b) => !isCtx(b));
  const direct = buttons.find((b) => b.getAttribute("aria-haspopup") == null && nameOf(b) === label);
  if (direct) return direct;
  const trigger = buttons.find((b) => b.getAttribute("aria-haspopup") != null);
  if (!trigger) return null;
  await user.click(trigger);
  const items = await screen.findAllByRole("menuitem");
  return items.find((i) => nameOf(i) === label) ?? null;
}

describe("T21 FileRow", () => {
  it("[behavior] 在文件名所在行点右键出现菜单并执行重命名", async () => {
    const { user, onRename } = setup();
    expect(screen.getByText(NAME)).toBeTruthy();
    const items = await openContext();
    expect(items.map((i) => (i.textContent ?? "").trim())).toEqual(expect.arrayContaining(["重命名", "删除"]));
    await user.click(screen.getByRole("menuitem", { name: "重命名" }));
    expect(onRename).toHaveBeenCalledTimes(1);
  });

  it("[behavior] 不使用右键也能执行重命名", async () => {
    const { user, onRename } = setup();
    const target = await visibleCommand(user, "重命名");
    expect(target).not.toBeNull();
    await user.click(target!);
    expect(onRename).toHaveBeenCalledTimes(1);
  });

  it("[behavior] 不使用右键也能执行删除", async () => {
    const { user, onDelete } = setup();
    const target = await visibleCommand(user, "删除");
    expect(target).not.toBeNull();
    await user.click(target!);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("[behavior] 不用右键的入口提供的命令集合与右键菜单一致", async () => {
    const first = setup();
    const ctxItems = (await openContext()).map(nameOf).sort();
    expect(ctxItems.length).toBeGreaterThan(0);
    first.unmount();
    const second = setup();
    const buttons = screen.queryAllByRole("button").filter((b) => !isCtx(b));
    const trigger = buttons.find((b) => b.getAttribute("aria-haspopup") != null);
    let visible: string[];
    if (trigger) {
      await second.user.click(trigger);
      visible = (await screen.findAllByRole("menuitem")).map(nameOf).sort();
    } else {
      visible = buttons.map(nameOf).filter((t) => ctxItems.includes(t)).sort();
    }
    expect(visible).toEqual(ctxItems);
  });

  it("[api] 右键菜单来自库（带 context-menu 的 data-slot）", async () => {
    setup();
    await openContext();
    const trigger = document.querySelector('[data-slot="context-menu-trigger"]');
    const popup = Array.from(document.querySelectorAll("[data-slot]")).some((el) => isCtx(el) && el.getAttribute("data-slot") !== "context-menu-trigger");
    expect(trigger != null || popup).toBe(true);
    expect(within(document.body).getAllByRole("menuitem")[0].getAttribute("data-slot")).toBeTruthy();
  });
});
