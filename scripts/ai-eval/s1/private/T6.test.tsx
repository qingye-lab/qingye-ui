import "./_env";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { InviteForm } from "../InviteForm";

function deferred<T>() {
  let resolve!: (v: T) => void, reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function setup(over: Partial<{ checkEmail: (e: string) => Promise<boolean>; sendInvite: (e: string) => Promise<void> }> = {}) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const checkEmail = vi.fn(over.checkEmail ?? (async () => true));
  const sendInvite = vi.fn(over.sendInvite ?? (async () => {}));
  render(<InviteForm checkEmail={checkEmail} sendInvite={sendInvite} />);
  const email = screen.getByLabelText("邮箱") as HTMLInputElement;
  return { user, checkEmail, sendInvite, email };
}
// 发送中可以换成“发送中…”之类的文字，按“发送”找按钮
const sendButton = () => screen.getByRole("button", { name: /发送/ });
// 立刻告知：role=alert，或 aria-live=assertive 的区域（库 Toast 的 alert 消息即如此）
const urgent = () => [...document.querySelectorAll("[role='alert'], [aria-live='assertive']")].filter(el => el.textContent?.trim());

describe("T6 InviteForm", () => {
  it("[a11y] 邮箱已是成员：输入框无效，并关联错误原因", async () => {
    const check = deferred<boolean>();
    const { user, checkEmail, email } = setup({ checkEmail: () => check.promise });
    await user.type(email, "lin@atlas.io");
    await user.tab();
    await waitFor(() => expect(checkEmail).toHaveBeenCalledWith("lin@atlas.io"));
    await act(async () => { check.resolve(false); });
    await waitFor(() => expect(email).toHaveAttribute("aria-invalid", "true"));
    // aria-describedby 或 aria-errormessage 关联都可以
    const ids = [email.getAttribute("aria-describedby"), email.getAttribute("aria-errormessage")].join(" ").split(/\s+/).filter(id => id && id !== "null");
    const described = ids.map(id => document.getElementById(id)?.textContent ?? "").join(" ");
    expect(described).toContain("该邮箱已是成员");
  });

  it("[behavior] 修改邮箱后错误消失，已是成员时不发送", async () => {
    const { user, sendInvite, email } = setup({ checkEmail: async () => false });
    await user.type(email, "lin@atlas.io");
    await user.tab();
    await screen.findByText("该邮箱已是成员");
    await user.click(sendButton());
    expect(sendInvite).not.toHaveBeenCalled();
    await user.type(email, "x");
    await waitFor(() => expect(screen.queryByText("该邮箱已是成员")).not.toBeInTheDocument());
    expect(email).not.toHaveAttribute("aria-invalid", "true");
  });

  it("[a11y] 发送中按钮表现为正在处理，重复点击只发送一次", async () => {
    const send = deferred<void>();
    const { user, sendInvite, email } = setup({ sendInvite: () => send.promise });
    await user.type(email, "su@atlas.io");
    await user.click(sendButton());
    await waitFor(() => expect(sendInvite).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(sendButton()).toHaveAttribute("aria-busy", "true"));
    await user.click(sendButton());
    expect(sendInvite).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("邀请已发送")).not.toBeInTheDocument();
    await act(async () => { send.resolve(); });
    expect(await screen.findByText("邀请已发送")).toBeInTheDocument();
  });

  it("[a11y] 发送失败立即告知，保留邮箱并可重试", async () => {
    let attempt = 0;
    const { user, sendInvite, email } = setup({ sendInvite: async () => { attempt++; if (attempt === 1) throw new Error("network"); } });
    await user.type(email, "su@atlas.io");
    await user.click(sendButton());
    await waitFor(() => expect(urgent().length).toBeGreaterThan(0));
    expect(email.value).toBe("su@atlas.io");
    await user.click(sendButton());
    await waitFor(() => expect(sendInvite).toHaveBeenCalledTimes(2));
    expect(await screen.findByText("邀请已发送")).toBeInTheDocument();
  });

  it("[a11y] 只有图标的“清空”按钮清空邮箱", async () => {
    const { user, email } = setup();
    await user.type(email, "su@atlas.io");
    await user.click(screen.getByRole("button", { name: "清空" }));
    expect(email.value).toBe("");
  });
});
