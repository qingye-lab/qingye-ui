import "./_env";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConflictError, DraftEditor } from "../DraftEditor";

// hidden: true —— 用确认对话框呈现决定时，背景会被设为 aria-hidden，草稿仍应保留
const box = () => screen.getByRole("textbox", { name: "草稿", hidden: true }) as HTMLTextAreaElement;

// 不属于 Toast：自身不在 toast 部位里，也不在通知用的 portal 里
// （priority=high 的通知会在通知区域之外另放一份视觉隐藏的 alert 副本，副本与通知视口同处一个 portal）
function outsideToast(el: Element) {
  if (el.closest("[data-slot^='toast']")) return false;
  const portal = el.closest("[data-base-ui-portal]");
  return !(portal && portal.querySelector("[data-slot^='toast']"));
}

async function setup(overrides: Partial<React.ComponentProps<typeof DraftEditor>> = {}) {
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const save = (overrides.save ?? vi.fn(async (_t: string, _o?: { force?: boolean }) => {})) as ReturnType<typeof vi.fn>;
  const reload = vi.fn(async () => "服务器上的新文字");
  render(<DraftEditor initial="初稿" save={save} reload={reload} {...overrides} />);
  return { user, save, reload };
}

async function conflictSetup() {
  const save = vi.fn(async (_t: string, o?: { force?: boolean }) => {
    if (!o?.force) throw new ConflictError("conflict");
  });
  const ctx = await setup({ save });
  await ctx.user.clear(box());
  await ctx.user.click(box());
  await ctx.user.paste("我的改动");
  await ctx.user.click(screen.getByRole("button", { name: "保存" }));
  return ctx;
}

describe("T8 DraftEditor", () => {
  it("[behavior] 保存调用 save", async () => {
    const { user, save } = await setup();
    await user.click(screen.getByRole("button", { name: "保存" }));
    expect(save).toHaveBeenCalledWith("初稿");
  });

  it("[state] 冲突后草稿文字保留", async () => {
    await conflictSetup();
    await screen.findAllByText(/已被他人修改/);
    expect(box().value).toBe("我的改动");
  });

  it("[state] 冲突说明与两项决定留在工作面或确认结构", async () => {
    await conflictSetup();
    await waitFor(() => expect(screen.queryAllByText(/已被他人修改/).length).toBeGreaterThan(0));
    // 冲突说明：role=alert（或 assertive 的 live 区域，或确认用的 alertdialog），含“已被他人修改”，且不在 Toast 里
    const live = Array.from(document.querySelectorAll("[role='alert'], [aria-live='assertive'], [role='alertdialog']"))
      .filter(el => /已被他人修改/.test(el.textContent ?? "") && outsideToast(el));
    expect(live.length).toBeGreaterThan(0);
    // 两项决定是按钮，同样不在 Toast 里
    for (const name of ["覆盖保存", "重新载入"]) {
      const buttons = screen.queryAllByRole("button", { name }).filter(outsideToast);
      expect(buttons.length, name).toBeGreaterThan(0);
    }
  });

  it("[behavior] 覆盖保存以 force 重新提交", async () => {
    const { user, save } = await conflictSetup();
    const button = (await screen.findAllByRole("button", { name: "覆盖保存" }))[0]!;
    await user.click(button);
    await waitFor(() => expect(save).toHaveBeenLastCalledWith("我的改动", { force: true }));
  });

  it("[behavior] 重新载入用服务器文本替换草稿", async () => {
    const { user, reload } = await conflictSetup();
    const button = (await screen.findAllByRole("button", { name: "重新载入" }))[0]!;
    await user.click(button);
    expect(reload).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(box().value).toBe("服务器上的新文字"));
  });
});
