import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RichNote } from "../RichNote";

describe("T5 RichNote", () => {
  it("[behavior] 正文编辑区可输入，内容变化回调 HTML", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    render(<RichNote onChange={onChange} />);
    expect(screen.getByRole("button", { name: "加粗" })).toBeTruthy();
    const editor = screen.getByRole("textbox", { name: "正文" });
    await user.click(editor);
    await user.keyboard("会议纪要");
    expect(onChange).toHaveBeenCalled();
    expect(String(onChange.mock.lastCall?.[0])).toContain("会议纪要");
  });
});
