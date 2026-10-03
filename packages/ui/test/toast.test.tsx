import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  AnchoredToastProvider,
  ToastPrimitive,
  ToastProvider,
  anchoredToastManager,
  toastManager,
} from "../src/components/toast";

/**
 * The manager API is imperative and global, so each test mounts a provider,
 * drives the manager, and closes everything afterwards.
 */
function mount(props: Parameters<typeof ToastProvider>[0] = {}) {
  return render(
    <ToastProvider {...props}>
      <div>应用</div>
    </ToastProvider>,
  );
}

test.afterEach(() => {
  act(() => toastManager.close());
  act(() => anchoredToastManager.close());
});

test("add renders a titled toast and close removes it", async () => {
  mount();
  act(() => {
    toastManager.add({ title: "已保存草稿" });
  });
  expect(await screen.findByText("已保存草稿")).toBeInTheDocument();
  act(() => toastManager.close());
  await waitFor(() => expect(screen.queryByText("已保存草稿")).not.toBeInTheDocument());
});

test("a title and description both render", async () => {
  mount();
  act(() => {
    toastManager.add({ title: "名称", description: "说明" });
  });
  expect(await screen.findByText("名称")).toBeInTheDocument();
  expect(screen.getByText("说明")).toBeInTheDocument();
});

test("adding the same id updates in place instead of stacking", async () => {
  mount();
  act(() => {
    toastManager.add({ id: "draft", title: "正在保存…" });
  });
  expect(await screen.findByText("正在保存…")).toBeInTheDocument();

  act(() => {
    toastManager.add({ id: "draft", title: "草稿已保存", type: "success" });
  });
  expect(await screen.findByText("草稿已保存")).toBeInTheDocument();
  // The first title was replaced rather than left beside it.
  expect(screen.queryByText("正在保存…")).not.toBeInTheDocument();
});

test("update replaces the content of an existing toast", async () => {
  mount();
  let id = "";
  act(() => {
    id = toastManager.add({ title: "处理中…", type: "loading" });
  });
  expect(await screen.findByText("处理中…")).toBeInTheDocument();
  act(() => {
    toastManager.update(id, { title: "处理完成", type: "success" });
  });
  expect(await screen.findByText("处理完成")).toBeInTheDocument();
  expect(screen.queryByText("处理中…")).not.toBeInTheDocument();
});

test("close(id) dismisses only the named toast", async () => {
  mount();
  let first = "";
  act(() => {
    first = toastManager.add({ title: "第一条消息" });
    toastManager.add({ title: "第二条消息" });
  });
  expect(await screen.findByText("第一条消息")).toBeInTheDocument();
  act(() => toastManager.close(first));
  await waitFor(() => expect(screen.queryByText("第一条消息")).not.toBeInTheDocument());
  expect(screen.getByText("第二条消息")).toBeInTheDocument();
});

test("the close button is labelled, hidden from AT while collapsed, and reachable by keyboard", async () => {
  mount();
  act(() => {
    toastManager.add({ title: "通知", description: "说明。" });
  });
  await screen.findByText("通知");
  const close = document.querySelector("[data-slot=toast-close]") as HTMLButtonElement;
  expect(close).toBeTruthy();
  // It carries the locale label and stays focusable even though a collapsed
  // stacked toast hides it from assistive tech (Base UI's rule).
  expect(close).toHaveAttribute("aria-label", "关闭提示");
  expect(close).toHaveAttribute("aria-hidden", "true");

  // Focusing it reveals it to assistive tech and to the keyboard user.
  fireEvent.focus(close);
  await waitFor(() => expect(close).not.toHaveAttribute("aria-hidden", "true"));

  fireEvent.click(close);
  await waitFor(() => expect(screen.queryByText("通知")).not.toBeInTheDocument());
});

test("actionProps renders an action button that runs its handler", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  mount();
  act(() => {
    toastManager.add({ title: "通知", actionProps: { children: "撤销", onClick } });
  });
  const action = await screen.findByRole("button", { name: "撤销" });
  await user.click(action);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("promise resolves to the success toast", async () => {
  mount();
  let resolve!: (value: string) => void;
  const pending = new Promise<string>((r) => {
    resolve = r;
  });
  act(() => {
    void toastManager.promise(pending, {
      loading: { title: "处理中…" },
      success: (data: string) => ({ title: `完成：${data}` }),
      error: { title: "处理失败" },
    });
  });
  expect(await screen.findByText("处理中…")).toBeInTheDocument();
  await act(async () => {
    resolve("内容");
    await pending;
  });
  expect(await screen.findByText("完成：内容")).toBeInTheDocument();
});

test("promise rejection shows the error toast", async () => {
  mount();
  let reject!: (reason?: unknown) => void;
  const pending = new Promise<string>((_r, rj) => {
    reject = rj;
  });
  // Base UI's own catch() re-rejects, so the promise the manager returns always
  // ends rejected. Attach a handler up front to keep the failure from being
  // reported as an unhandled rejection by the test runner.
  act(() => {
    void toastManager
      .promise(pending, {
        loading: { title: "处理中…" },
        success: { title: "处理完成" },
        error: { title: "处理失败" },
      })
      .catch(() => {});
  });
  expect(await screen.findByText("处理中…")).toBeInTheDocument();
  await act(async () => {
    reject(new Error("offline"));
    await pending.catch(() => {});
  });
  expect(await screen.findByText("处理失败")).toBeInTheDocument();
});

test("anchored toasts render beside their trigger", async () => {
  const anchor = document.createElement("button");
  document.body.append(anchor);
  render(
    <AnchoredToastProvider>
      <div>应用</div>
    </AnchoredToastProvider>,
  );
  act(() => {
    anchoredToastManager.add({ title: "已复制", positionerProps: { anchor }, data: { tooltipStyle: true } });
  });
  expect(await screen.findByText("已复制")).toBeInTheDocument();
  anchor.remove();
});

test("the toast region is a labelled landmark", async () => {
  mount();
  act(() => {
    toastManager.add({ title: "通知" });
  });
  await screen.findByText("通知");
  // The viewport carries the shared locale label so the region is announced.
  expect(screen.getByRole("region", { name: "操作提示" })).toBeInTheDocument();
});

test("overdue loading becomes persistent unknown, preserving recovery until a real result arrives", () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    const onRetry = vi.fn();
    let id = "";
    act(() => {
      id = toastManager.add({ title: "正在处理", type: "loading", description: "说明", timeout: 1, actionProps: { children: "核对", onClick: onRetry } });
    });
    act(() => vi.advanceTimersByTime(999));
    expect(screen.getByText("正在处理")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    const root = document.querySelector("[data-slot=toast-root]");
    expect(root).toHaveAttribute("data-type", "unknown");
    expect(root).not.toHaveClass("animate-toast-success-odd");
    expect(document.querySelector("[data-slot=toast-icon] svg")).toHaveClass("lucide-circle-question-mark");
    expect(document.querySelector("[data-slot=toast-icon] svg")).not.toHaveClass("lucide-loader-circle");
    expect(screen.getByText(/说明/)).toHaveTextContent("正在处理 说明 请核对结果。");
    fireEvent.click(screen.getByRole("button", { name: "核对" }));
    expect(onRetry).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    act(() => toastManager.update(id, { title: "处理完成", type: "success", timeout: 4000 }));
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-description]")).toHaveTextContent(/^说明$/);
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

test("a completed loading toast is not overwritten by its expired deadline", () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let id = "";
    act(() => { id = toastManager.add({ title: "正在处理", type: "loading" }); });
    act(() => vi.advanceTimersByTime(500));
    act(() => toastManager.update(id, { title: "处理完成", type: "success", timeout: 0 }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

test("an overdue promise can later settle from unknown to its real result", async () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let resolve!: (value: string) => void;
    const pending = new Promise<string>((done) => { resolve = done; });
    act(() => { void toastManager.promise(pending, { loading: "正在处理", success: "处理完成", error: "处理失败" }); });
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    await act(async () => { resolve("confirmed"); await pending; });
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-title]")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-root]")).not.toHaveAttribute("aria-labelledby");
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

test.each(["success", "error"] as const)("a late %s title preserves application context without the unknown description", async (outcome) => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let resolve!: () => void;
    let reject!: (reason: Error) => void;
    const pending = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
    act(() => {
      void toastManager.promise(pending, {
        loading: { title: "正在处理", description: "原说明" },
        success: { title: "处理完成" },
        error: () => ({ title: "处理失败" }),
      }).catch(() => {});
    });
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    await act(async () => {
      if (outcome === "success") resolve();
      else reject(new Error("offline"));
      await pending.catch(() => {});
    });
    expect(document.querySelector("[data-slot=toast-root]")).toHaveAttribute("data-type", outcome);
    expect(screen.getByText(outcome === "success" ? "处理完成" : "处理失败")).toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-description]")).toHaveTextContent(/^原说明$/);
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

test.each(["success", "error"] as const)("a late %s string preserves the application's original title", async (outcome) => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let resolve!: () => void;
    let reject!: (reason: Error) => void;
    const pending = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
    act(() => {
      void toastManager.promise(pending, {
        loading: { title: "原名称", description: "正在处理" },
        success: () => "处理完成",
        error: "处理失败",
      }).catch(() => {});
    });
    act(() => vi.advanceTimersByTime(1000));
    await act(async () => {
      if (outcome === "success") resolve();
      else reject(new Error("offline"));
      await pending.catch(() => {});
    });
    expect(document.querySelector("[data-slot=toast-title]")).toHaveTextContent(/^原名称$/);
    expect(document.querySelector("[data-slot=toast-description]")).toHaveTextContent(outcome === "success" ? /^处理完成$/ : /^处理失败$/);
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

test.each([false, true])("anchored late results clear unknown copy with tooltipStyle=%s", async (tooltipStyle) => {
  vi.useFakeTimers();
  const anchor = document.createElement("button");
  document.body.append(anchor);
  try {
    render(<AnchoredToastProvider loadingTimeout={1000} />);
    let resolve!: () => void;
    const pending = new Promise<void>((done) => { resolve = done; });
    act(() => {
      void anchoredToastManager.promise(pending, {
        loading: { title: "正在处理", description: "原说明", positionerProps: { anchor }, data: { tooltipStyle } },
        success: { title: "处理完成" },
        error: "处理失败",
      });
    });
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    expect(screen.getByText(/原说明/)).toHaveTextContent("正在处理 原说明 请核对结果。");
    await act(async () => { resolve(); await pending; });
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-description]")).toHaveTextContent(/^原说明$/);
  } finally {
    act(() => anchoredToastManager.close());
    anchor.remove();
    vi.useRealTimers();
  }
});

test.each([
  ["success", false],
  ["error", false],
  ["success", true],
  ["error", true],
] as const)("tooltip promise shows its %s string result after deadline=%s", async (outcome, overdue) => {
  vi.useFakeTimers();
  const anchor = document.createElement("button");
  document.body.append(anchor);
  try {
    render(<AnchoredToastProvider loadingTimeout={1000} />);
    let resolve!: () => void;
    let reject!: (reason: Error) => void;
    const pending = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
    act(() => {
      void anchoredToastManager.promise(pending, {
        loading: { description: "正在处理", positionerProps: { anchor }, data: { tooltipStyle: true } },
        success: "处理完成",
        error: "处理失败",
      }).catch(() => {});
    });
    expect(screen.getByText("正在处理")).toBeInTheDocument();
    if (overdue) {
      act(() => vi.advanceTimersByTime(1000));
      expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    }
    await act(async () => {
      if (outcome === "success") resolve();
      else reject(new Error("offline"));
      await pending.catch(() => {});
    });
    expect(screen.getByText(outcome === "success" ? "处理完成" : "处理失败")).toBeInTheDocument();
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
  } finally {
    act(() => anchoredToastManager.close());
    anchor.remove();
    vi.useRealTimers();
  }
});

test("deadline presentation leaves application fields in the store untouched", () => {
  vi.useFakeTimers();
  let toasts: ReturnType<typeof ToastPrimitive.useToastManager>["toasts"] = [];
  function StoreProbe() {
    toasts = ToastPrimitive.useToastManager().toasts;
    return null;
  }
  try {
    render(<ToastProvider loadingTimeout={1000}><StoreProbe /></ToastProvider>);
    let id = "";
    act(() => { id = toastManager.add({ title: "操作结果尚未确认", description: "请核对结果。", type: "loading" }); });
    act(() => vi.advanceTimersByTime(1000));
    expect(toasts[0]).toMatchObject({ type: "unknown", title: "操作结果尚未确认", description: "请核对结果。", timeout: 0 });
    act(() => toastManager.update(id, { type: "success", timeout: 4000 }));
    expect(document.querySelector("[data-slot=toast-title]")).toHaveTextContent(/^操作结果尚未确认$/);
    expect(document.querySelector("[data-slot=toast-description]")).toHaveTextContent(/^请核对结果。$/);
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

test("application-owned unknown messages keep their own presentation", () => {
  mount();
  act(() => toastManager.add({ type: "unknown", title: "结果待核对", description: "调用方说明。", timeout: 0 }));
  expect(document.querySelector("[data-slot=toast-title]")).toHaveTextContent(/^结果待核对$/);
  expect(document.querySelector("[data-slot=toast-description]")).toHaveTextContent(/^调用方说明。$/);
});

test("anchored loading follows the same unknown deadline", () => {
  vi.useFakeTimers();
  const anchor = document.createElement("button");
  document.body.append(anchor);
  try {
    render(<AnchoredToastProvider loadingTimeout={1000} />);
    act(() => anchoredToastManager.add({ title: "正在处理", type: "loading", positionerProps: { anchor } }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-popup]")).toHaveAttribute("data-type", "unknown");
  } finally {
    act(() => anchoredToastManager.close());
    anchor.remove();
    vi.useRealTimers();
  }
});

test.each([0, Number.NaN, Infinity, 2_147_483_648])("loading deadline rejects unsupported timer value %s", (loadingTimeout) => {
  expect(() => mount({ loadingTimeout })).toThrow(RangeError);
});

test("a real result in the same batch as its deadline wins over unknown", () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let id = "";
    act(() => { id = toastManager.add({ title: "正在处理", type: "loading" }); });
    act(() => {
      toastManager.update(id, { title: "处理完成", type: "success", timeout: 0 });
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
  } finally {
    act(() => toastManager.close());
    vi.useRealTimers();
  }
});

// Public state facts are independent of colour and of automatic dismissal.
test.each([
  ["waiting", "等待中"], ["in-progress", "进行中"], ["loading", "进行中"],
  ["unknown", "结果未知"], ["failed", "操作失败"], ["error", "操作失败"], ["success", "成功"],
])("%s has a polite atomic status with its object", (type, label) => {
  mount();
  act(() => toastManager.add({ type, title: "名称" }));
  const status = screen.getByRole("status");
  expect(status).toHaveAttribute("aria-live", "polite");
  expect(status).toHaveAttribute("aria-atomic", "true");
  expect(status).toHaveTextContent(label);
  expect(status).toHaveTextContent("名称");
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getByRole("region", { name: "操作提示" })).toHaveAttribute("aria-live", "off");
});

test("urgency is explicitly selected, not inferred from failure", () => {
  mount();
  act(() => toastManager.add({ type: "failed", priority: "high", title: "输入无效", description: "请补充名称。" }));
  const alert = screen.getByRole("alert");
  expect(alert).toHaveAttribute("aria-atomic", "true");
  expect(alert).toHaveTextContent("输入无效");
  expect(alert).toHaveTextContent("请补充名称。");
  expect(screen.queryByRole("status")).not.toBeInTheDocument();
});

test.each(["failed", "error", "unknown", "waiting", "in-progress"])("%s remains until dismissed even with timeout=1", async (type) => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 120_000 });
    act(() => toastManager.add({ type, title: "名称", timeout: 1 }));
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("名称")).toBeInTheDocument();
    expect(document.querySelector("[data-slot=toast-root]")).not.toHaveAttribute("data-ending-style");
    fireEvent.click(document.querySelector("[data-slot=toast-close]")!);
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(screen.queryByText("名称")).not.toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});

test("hover pauses dismissal and leaving resumes the remaining time", async () => {
  vi.useFakeTimers();
  try {
    mount();
    act(() => toastManager.add({ type: "success", title: "处理完成", timeout: 1000 }));
    act(() => vi.advanceTimersByTime(400));
    const viewport = screen.getByRole("region", { name: "操作提示" });
    fireEvent.mouseEnter(viewport);
    act(() => vi.advanceTimersByTime(10_000));
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    fireEvent.mouseLeave(viewport);
    act(() => vi.advanceTimersByTime(599));
    expect(screen.getByText("处理完成")).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    await act(async () => { await vi.advanceTimersByTimeAsync(100); });
    expect(screen.queryByText("处理完成")).not.toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});

test("focus does not pause the result deadline", () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    act(() => toastManager.add({ type: "loading", title: "名称", timeout: 10 }));
    act(() => (document.querySelector("[data-slot=toast-root]") as HTMLElement).focus());
    expect(document.querySelector("[data-slot=toast-root]")).toHaveFocus();
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("status")).toHaveTextContent("操作结果尚未确认");
    expect(document.querySelector("[data-slot=toast-root]")).toHaveFocus();
    act(() => vi.advanceTimersByTime(60_000));
    expect(screen.getByText("操作结果尚未确认")).toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});

test("an arriving toast and its updates do not steal the current input focus", () => {
  render(<ToastProvider><input aria-label="备注" /></ToastProvider>);
  const input = screen.getByRole("textbox", { name: "备注" });
  act(() => input.focus());
  expect(input).toHaveFocus();
  fireEvent.change(input, { target: { value: "保留这段备注" } });
  let id = "";
  act(() => { id = toastManager.add({ type: "in-progress", title: "名称" }); });
  expect(input).toHaveFocus();
  act(() => toastManager.update(id, { type: "unknown" }));
  expect(input).toHaveFocus();
  act(() => toastManager.update(id, { type: "failed", description: "内容缺失" }));
  expect(input).toHaveFocus();
  act(() => toastManager.close(id));
  expect(input).toHaveFocus();
  expect(input).toHaveValue("保留这段备注");
});

test.each(["success", "error"] as const)("promise %s is a real transition on the same notification", async (result) => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let resolve!: () => void; let reject!: (error: Error) => void;
    const pending = new Promise<void>((done, fail) => { resolve = done; reject = fail; });
    act(() => { void toastManager.promise(pending, { loading: { title: "名称" }, success: { title: "处理完成" }, error: { title: "处理失败" } }).catch(() => {}); });
    const root = document.querySelector("[data-slot=toast-root]");
    expect(screen.getByRole("status")).toHaveTextContent("进行中");
    act(() => vi.advanceTimersByTime(1000));
    expect(root).toHaveAttribute("data-type", "unknown");
    expect(root).not.toHaveAttribute("data-type", "error");
    await act(async () => { if (result === "success") resolve(); else reject(new Error("invalid value")); await pending.catch(() => {}); });
    expect(document.querySelector("[data-slot=toast-root]")).toBe(root);
    expect(root).toHaveAttribute("data-type", result);
    expect(screen.getByRole("status")).toHaveTextContent(result === "success" ? "成功" : "操作失败");
    act(() => vi.advanceTimersByTime(60_000));
    if (result === "error") expect(screen.getByText("处理失败")).toBeInTheDocument();
    else {
      await act(async () => { await vi.advanceTimersByTimeAsync(100); });
      expect(screen.queryByText("处理完成")).not.toBeInTheDocument();
    }
  } finally { vi.useRealTimers(); }
});

test("closing a pending promise does not claim cancellation or resurrect on settlement", async () => {
  mount();
  let resolve!: () => void;
  const pending = new Promise<void>((done) => { resolve = done; });
  act(() => { void toastManager.promise(pending, { loading: { title: "名称" }, success: "已完成", error: "失败" }); });
  fireEvent.click(document.querySelector("[data-slot=toast-close]")!);
  await act(async () => { resolve(); await pending; });
  await waitFor(() => expect(screen.queryByText("名称")).not.toBeInTheDocument());
  expect(screen.queryByText("已完成")).not.toBeInTheDocument();
});

test("focus pauses a success timer and blur resumes it", async () => {
  vi.useFakeTimers();
  try {
    mount();
    act(() => toastManager.add({ title: "已完成", type: "success", timeout: 1000 }));
    act(() => vi.advanceTimersByTime(400));
    const root = document.querySelector("[data-slot=toast-root]") as HTMLElement;
    act(() => root.focus());
    act(() => vi.advanceTimersByTime(10_000));
    expect(root).not.toHaveAttribute("data-ending-style");
    act(() => root.blur());
    await act(async () => { await vi.advanceTimersByTimeAsync(700); });
    expect(screen.queryByText("已完成")).not.toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});

test("urgent text stays accessible when the user enters the notification", () => {
  mount();
  act(() => toastManager.add({ type: "failed", priority: "high", title: "处理失败" }));
  const root = document.querySelector("[data-slot=toast-root]") as HTMLElement;
  act(() => root.focus());
  expect(screen.getAllByRole("alert")).toHaveLength(1);
  expect(screen.getByRole("alert")).toHaveTextContent("处理失败");
  expect(root).not.toHaveAttribute("aria-hidden", "true");
});

test("an urgent loading deadline announces uncertainty without mutating application copy", () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    act(() => toastManager.add({ type: "loading", priority: "high", title: "名称" }));
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByRole("status")).toHaveTextContent("操作结果尚未确认 名称");
    expect(screen.getByRole("alert")).toHaveTextContent("名称");
  } finally { vi.useRealTimers(); }
});

test("an application-confirmed new pending episode gets a fresh deadline", () => {
  vi.useFakeTimers();
  try {
    mount({ loadingTimeout: 1000 });
    let id = "";
    act(() => { id = toastManager.add({ type: "loading", title: "第一次处理" }); });
    act(() => vi.advanceTimersByTime(1000));
    expect(document.querySelector("[data-slot=toast-root]")).toHaveAttribute("data-type", "unknown");
    act(() => toastManager.update(id, { type: "loading", title: "第二次处理" }));
    expect(document.querySelector("[data-slot=toast-root]")).toHaveAttribute("data-type", "loading");
    expect(screen.queryByText("操作结果尚未确认")).not.toBeInTheDocument();
    act(() => vi.advanceTimersByTime(999));
    expect(document.querySelector("[data-slot=toast-root]")).toHaveAttribute("data-type", "loading");
    act(() => vi.advanceTimersByTime(1));
    expect(document.querySelector("[data-slot=toast-root]")).toHaveAttribute("data-type", "unknown");
    expect(screen.getByText(/第二次处理/)).toBeInTheDocument();
  } finally { vi.useRealTimers(); }
});
