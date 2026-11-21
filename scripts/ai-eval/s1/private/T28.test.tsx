import "./_env";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ImportPanel } from "../ImportPanel";

function deferred() {
  let resolve!: () => void;
  const promise = new Promise<void>(r => { resolve = r; });
  return { promise, resolve };
}
const bar = () => screen.queryByRole("progressbar", { name: "导入进度" });

describe("T28 ImportPanel", () => {
  beforeEach(() => {
    // Testing Library 在 jest 全局存在时才会随假计时器推进其内部的 setTimeout(0)；vitest 下补一个等价桥
    vi.stubGlobal("jest", { advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms) });
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval", "Date"] });
  });
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
  const setup = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime, pointerEventsCheck: 0 });

  it("[behavior] 点击“导入”调用 startImport，导入期间显示名为“导入进度”的进度条", async () => {
    const user = setup();
    const d = deferred();
    const startImport = vi.fn(() => d.promise);
    render(<ImportPanel startImport={startImport} />);
    expect(bar()).toBeNull();
    await user.click(screen.getByRole("button", { name: "导入" }));
    expect(startImport).toHaveBeenCalledTimes(1);
    expect(bar()).not.toBeNull();
  });

  it("[state] 导入期间进度条不报告比例", async () => {
    const user = setup();
    const d = deferred();
    render(<ImportPanel startImport={() => d.promise} />);
    await user.click(screen.getByRole("button", { name: "导入" }));
    for (const elapsed of [0, 5000, 15000]) {
      if (elapsed > 0) await act(async () => { await vi.advanceTimersByTimeAsync(elapsed); });
      const el = bar();
      expect(el).not.toBeNull();
      expect(el!.hasAttribute("aria-valuenow")).toBe(false);
    }
  });

  it("[behavior] Promise 完成后显示“导入完成”，进度条消失", async () => {
    const user = setup();
    const d = deferred();
    render(<ImportPanel startImport={() => d.promise} />);
    await user.click(screen.getByRole("button", { name: "导入" }));
    expect(screen.queryByText("导入完成")).toBeNull();
    await act(async () => { d.resolve(); await d.promise; });
    expect(screen.getByText("导入完成")).toBeTruthy();
    expect(bar()).toBeNull();
  });

  it("[api] 进度条来自库（progress 相关 data-slot）", async () => {
    const user = setup();
    const d = deferred();
    render(<ImportPanel startImport={() => d.promise} />);
    await user.click(screen.getByRole("button", { name: "导入" }));
    expect(bar()?.getAttribute("data-slot") ?? "").toMatch(/^progress/);
  });
});
