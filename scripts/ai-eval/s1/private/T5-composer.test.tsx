import "./_env";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MentionComposer } from "../MentionComposer";

const people = [{ id: "u1", name: "林青" }, { id: "u2", name: "苏野" }, { id: "u3", name: "苏木" }];

function setup() {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onSend = vi.fn();
  render(<MentionComposer people={people} onSend={onSend} />);
  const editor = screen.getByRole("textbox", { name: "消息" });
  editor.focus();
  return { user, onSend, editor };
}

const content = (editor: HTMLElement) => (editor instanceof HTMLTextAreaElement || editor instanceof HTMLInputElement ? editor.value : editor.textContent ?? "").trim();

describe("T5 MentionComposer", () => {
  it("[api] 消息框来自库（带 data-slot）", () => {
    const { editor } = setup();
    expect(editor.closest("[data-slot^='composer']")).not.toBeNull();
  });

  it("[behavior] 输入 @ 弹出候选，选中后发送带提及 id", async () => {
    const { user, onSend } = setup();
    await user.keyboard("请@苏");
    const options = await screen.findAllByRole("option");
    expect(options.map(option => option.textContent)).toEqual(expect.arrayContaining([expect.stringContaining("苏野"), expect.stringContaining("苏木")]));
    expect(options.some(option => option.textContent?.includes("林青"))).toBe(false);
    await user.click(options.find(option => option.textContent?.includes("苏野"))!);
    await user.keyboard(" 看一下{Enter}");
    await waitFor(() => expect(onSend).toHaveBeenCalledTimes(1));
    const message = onSend.mock.calls[0]![0];
    expect(message.mentionIds).toEqual(["u2"]);
    expect(message.text).toMatch(/请\s*@苏野\s*看一下/);
  });

  it("[behavior] Enter 发送纯文字后清空输入区", async () => {
    const { user, onSend, editor } = setup();
    await user.keyboard("你好{Enter}");
    await waitFor(() => expect(onSend).toHaveBeenCalledWith({ text: "你好", mentionIds: [] }));
    await waitFor(() => expect(content(editor)).toBe(""));
  });
});
