import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { NicknameField, UnknownOutcomeError } from "../NicknameField";

const rename = async (user: ReturnType<typeof userEvent.setup>, next: string) => {
  const input = screen.getByLabelText("昵称");
  await user.clear(input);
  await user.type(input, next);
  await user.click(screen.getByRole("button", { name: "保存" }));
};

describe("T18 NicknameField", () => {
  it("[behavior] 保存成功后显示新昵称", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const save = vi.fn().mockResolvedValue(undefined);
    render(<NicknameField value="阿青" save={save} />);
    await rename(user, "青叶");
    expect(save).toHaveBeenCalledWith("青叶");
    expect((await screen.findAllByText("青叶")).length).toBeGreaterThan(0);
    expect(screen.queryByText("阿青")).toBeNull();
  });

  it("[state] 结果未知时不报告失败", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<NicknameField value="阿青" save={() => Promise.reject(new UnknownOutcomeError("timeout"))} />);
    await rename(user, "青叶");
    await new Promise(r => setTimeout(r, 100));
    // 未知不是失败：页面上不出现“失败”，也没有 alert
    expect(container.textContent).not.toMatch(/失败/);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("[state] 结果未知时保留原值", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<NicknameField value="阿青" save={() => Promise.reject(new UnknownOutcomeError("timeout"))} />);
    await rename(user, "青叶");
    await new Promise(r => setTimeout(r, 100));
    // 结果未知：原值仍作为当前昵称可见，新值不被当作已写入显示
    expect(screen.queryAllByText("阿青").length).toBeGreaterThan(0);
    expect(screen.queryByText("青叶")).toBeNull();
  });

  it("[behavior] 结果未知时不自动重试", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const save = vi.fn().mockRejectedValue(new UnknownOutcomeError("timeout"));
    render(<NicknameField value="阿青" save={save} />);
    await rename(user, "青叶");
    await new Promise(r => setTimeout(r, 300));
    expect(save).toHaveBeenCalledTimes(1);
  });

  it("[api] 未知状态来自库（带 data-slot）", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<NicknameField value="阿青" save={() => Promise.reject(new UnknownOutcomeError("timeout"))} />);
    await rename(user, "青叶");
    await vi.waitFor(() => expect(container.querySelector("[data-slot='pending-value']")).not.toBeNull());
    expect(container.querySelector("[data-slot='pending-value-state']")).not.toBeNull();
  });
});
