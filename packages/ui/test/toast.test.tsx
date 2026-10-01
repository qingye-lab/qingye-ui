import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  AnchoredToastProvider,
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
    toastManager.add({ title: "华东仓储新增 4 台设备", description: "其中 1 台需要更新固件后才能上线。" });
  });
  expect(await screen.findByText("华东仓储新增 4 台设备")).toBeInTheDocument();
  expect(screen.getByText("其中 1 台需要更新固件后才能上线。")).toBeInTheDocument();
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
    id = toastManager.add({ title: "上传中…", type: "loading" });
  });
  expect(await screen.findByText("上传中…")).toBeInTheDocument();
  act(() => {
    toastManager.update(id, { title: "上传完成", type: "success" });
  });
  expect(await screen.findByText("上传完成")).toBeInTheDocument();
  expect(screen.queryByText("上传中…")).not.toBeInTheDocument();
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
    toastManager.add({ title: "已归档 3 张工单", description: "可在 8 秒内撤销。" });
  });
  await screen.findByText("已归档 3 张工单");
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
  await waitFor(() => expect(screen.queryByText("已归档 3 张工单")).not.toBeInTheDocument());
});

test("actionProps renders an action button that runs its handler", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  mount();
  act(() => {
    toastManager.add({ title: "已归档 3 张工单", actionProps: { children: "撤销", onClick } });
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
      loading: { title: "正在上传固件…" },
      success: (data: string) => ({ title: `上传完成：${data}` }),
      error: { title: "上传失败" },
    });
  });
  expect(await screen.findByText("正在上传固件…")).toBeInTheDocument();
  await act(async () => {
    resolve("v2.8.0");
    await pending;
  });
  expect(await screen.findByText("上传完成：v2.8.0")).toBeInTheDocument();
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
        loading: { title: "正在上传固件…" },
        success: { title: "上传完成" },
        error: { title: "上传失败，请检查网络" },
      })
      .catch(() => {});
  });
  expect(await screen.findByText("正在上传固件…")).toBeInTheDocument();
  await act(async () => {
    reject(new Error("offline"));
    await pending.catch(() => {});
  });
  expect(await screen.findByText("上传失败，请检查网络")).toBeInTheDocument();
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
    toastManager.add({ title: "周以宁接受了工单 #2318" });
  });
  await screen.findByText("周以宁接受了工单 #2318");
  // The viewport carries the shared locale label so the region is announced.
  expect(screen.getByRole("region", { name: "操作提示" })).toBeInTheDocument();
});
