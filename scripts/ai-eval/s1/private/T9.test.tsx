import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { TagField } from "../TagField";

const SUGGESTIONS = ["周会复盘", "季度目标", "复盘模板"];
const input = () => screen.getByLabelText("标签") as HTMLInputElement;

function setup() {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const onSubmit = vi.fn();
  render(<TagField suggestions={SUGGESTIONS} onSubmit={onSubmit} />);
  return { user, onSubmit };
}

describe("T9 TagField", () => {
  it("[behavior] 选择建议后提交该建议", async () => {
    const { user, onSubmit } = setup();
    await user.click(input());
    await user.paste("复盘");
    const option = await screen.findByRole("option", { name: "周会复盘" });
    // 只列出包含所输入文字的项
    expect(screen.queryByRole("option", { name: "季度目标" })).toBeNull();
    await user.click(option);
    await user.click(screen.getByRole("button", { name: "添加" }));
    expect(onSubmit).toHaveBeenCalledWith("周会复盘");
  });

  it("[behavior] 不在建议里的新标签名原样提交", async () => {
    const { user, onSubmit } = setup();
    await user.click(input());
    await user.paste("季度复盘");
    await user.tab(); // 写完离开输入框，建议浮层随之关闭
    await user.click(screen.getByRole("button", { name: "添加" }));
    expect(onSubmit).toHaveBeenCalledWith("季度复盘");
  });

  it("[api] 输入框来自库（带 data-slot）", () => {
    setup();
    expect(input().getAttribute("data-slot")).toBeTruthy();
  });
});
