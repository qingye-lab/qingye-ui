import "./_env";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApplyForm } from "../ApplyForm";

const fillAndSubmit = async (user: ReturnType<typeof userEvent.setup>, text: string) => {
  await user.type(screen.getByLabelText("申请理由"), text);
  await user.click(screen.getByRole("button", { name: "提交申请" }));
};

describe("T17 ApplyForm", () => {
  it("[behavior] 提交成功后显示结局与去向", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const submit = vi.fn().mockResolvedValue({ id: "42" });
    render(<ApplyForm submit={submit} />);
    await fillAndSubmit(user, "需要权限");
    expect(submit).toHaveBeenCalledWith("需要权限");
    expect(await screen.findByText("申请已提交")).toBeTruthy();
    expect(screen.getByRole("link", { name: "查看申请" }).getAttribute("href")).toBe("/applications/42");
  });

  it("[state] 结局取代申请表单", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    render(<ApplyForm submit={() => Promise.resolve({ id: "42" })} />);
    await fillAndSubmit(user, "需要权限");
    await screen.findByText("申请已提交");
    // 结局独占这一块：表单与提交按钮不再在场
    expect(screen.queryByLabelText("申请理由")).toBeNull();
    expect(screen.queryByRole("button", { name: "提交申请" })).toBeNull();
  });

  it("[api] 结局来自库（带 data-slot）", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { container } = render(<ApplyForm submit={() => Promise.resolve({ id: "42" })} />);
    await fillAndSubmit(user, "需要权限");
    await screen.findByText("申请已提交");
    // 一次提交的结局：库的 Result（data-slot="result"）
    expect(container.querySelector("[data-slot='result']")).not.toBeNull();
  });

  it("[state] 提交失败时保留已填内容并告知", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const submit = vi.fn().mockRejectedValueOnce(new Error("boom")).mockResolvedValue({ id: "7" });
    render(<ApplyForm submit={submit} />);
    await fillAndSubmit(user, "需要权限");
    // 读屏立刻得知：assertive 的 alert
    expect((await screen.findByRole("alert")).textContent).toMatch(/失败/);
    expect((screen.getByLabelText("申请理由") as HTMLTextAreaElement).value).toBe("需要权限");
    await user.click(screen.getByRole("button", { name: "提交申请" }));
    expect(submit).toHaveBeenCalledTimes(2);
    expect(await screen.findByRole("link", { name: "查看申请" })).toBeTruthy();
  });
});
