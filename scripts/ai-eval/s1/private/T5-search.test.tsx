import "./_env";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NoteSearch } from "../NoteSearch";

function setup() {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onQueryChange = vi.fn();
  render(<NoteSearch onQueryChange={onQueryChange} />);
  const box = (screen.queryByRole("searchbox", { name: "搜索笔记" }) ?? screen.getByRole("textbox", { name: "搜索笔记" })) as HTMLInputElement;
  return { user, onQueryChange, box };
}

describe("T5 NoteSearch", () => {
  it("[api] 搜索框来自库（带 data-slot）", () => {
    const { box } = setup();
    expect(box.closest("[data-slot^='search-input']")).not.toBeNull();
  });

  it("[behavior] 输入时回调当前文字", async () => {
    const { user, onQueryChange, box } = setup();
    await user.type(box, "周报");
    expect(onQueryChange).toHaveBeenLastCalledWith("周报");
  });

  it("[behavior] 清除按钮清空搜索框并回调空字符串", async () => {
    const { user, onQueryChange, box } = setup();
    await user.type(box, "周报");
    await user.click(screen.getByRole("button", { name: /^清除/ }));
    await waitFor(() => expect(box.value).toBe(""));
    expect(onQueryChange).toHaveBeenLastCalledWith("");
  });
});
