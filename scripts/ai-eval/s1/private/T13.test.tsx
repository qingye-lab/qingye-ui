import "./_env";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MemberList } from "../MemberList";

function deferred<T>() {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}
const refreshButton = () => screen.getByRole("button", { name: "刷新" });

describe("T13 MemberList", () => {
  it("[state] 首次加载期间不显示“还没有成员”", async () => {
    const first = deferred<string[]>();
    render(<MemberList team="设计组" load={() => first.promise} />);
    expect(screen.queryByText("还没有成员")).toBeNull();
    await act(async () => { first.resolve(["林青"]); });
    expect(await screen.findByText("林青")).toBeTruthy();
    expect(screen.queryByText("还没有成员")).toBeNull();
  });

  it("[behavior] 加载完成按行列出成员", async () => {
    const load = vi.fn(() => Promise.resolve(["林青", "周岚"]));
    render(<MemberList team="设计组" load={load} />);
    expect(await screen.findByText("林青")).toBeTruthy();
    expect(screen.getByText("周岚")).toBeTruthy();
    expect(load).toHaveBeenCalledWith("设计组");
  });

  it("[state] 刷新期间保留原有列表节点", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const second = deferred<string[]>();
    const load = vi.fn().mockResolvedValueOnce(["林青"]).mockReturnValueOnce(second.promise);
    render(<MemberList team="设计组" load={load} />);
    const row = await screen.findByText("林青");
    await user.click(refreshButton());
    await waitFor(() => expect(load).toHaveBeenCalledTimes(2));
    // 刷新还在等待中：原来的那一行仍在文档里
    expect(row.isConnected).toBe(true);
    expect(screen.getByText("林青")).toBe(row);
    await act(async () => { second.resolve(["林青", "周岚"]); });
    expect(await screen.findByText("周岚")).toBeTruthy();
  });

  it("[state] 刷新失败保留原列表并告知失败", async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const load = vi.fn().mockResolvedValueOnce(["林青"]).mockRejectedValueOnce(new Error("boom")).mockResolvedValueOnce(["林青", "周岚"]);
    render(<MemberList team="设计组" load={load} />);
    const row = await screen.findByText("林青");
    await user.click(refreshButton());
    // 失败要立刻让读屏知道（live 区域），原列表仍在
    const alert = await screen.findByRole("alert");
    expect(alert.textContent?.trim().length).toBeGreaterThan(0);
    expect(row.isConnected).toBe(true);
    expect(screen.queryByText("还没有成员")).toBeNull();
    // 可以再次刷新
    await user.click(refreshButton());
    expect(await screen.findByText("周岚")).toBeTruthy();
  });

  it("[state] 切换团队期间不显示上一团队的成员", async () => {
    const next = deferred<string[]>();
    const load = vi.fn((team: string) => (team === "设计组" ? Promise.resolve(["林青"]) : next.promise));
    const { rerender } = render(<MemberList team="设计组" load={load} />);
    expect(await screen.findByText("林青")).toBeTruthy();
    rerender(<MemberList team="研发组" load={load} />);
    await waitFor(() => expect(load).toHaveBeenLastCalledWith("研发组"));
    // 新团队还在加载：上一团队的成员已不属于当前范围，不能继续显示
    expect(screen.queryByText("林青")).toBeNull();
    expect(screen.queryByText("还没有成员")).toBeNull();
    await act(async () => { next.resolve(["周岚"]); });
    expect(await screen.findByText("周岚")).toBeTruthy();
    expect(screen.queryByText("林青")).toBeNull();
  });

  it("[state] 成功且为空时显示“还没有成员”", async () => {
    render(<MemberList team="设计组" load={() => Promise.resolve([])} />);
    expect(await screen.findByText("还没有成员")).toBeTruthy();
  });
});
