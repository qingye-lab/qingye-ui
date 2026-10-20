import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";

// Exercise the actual application example; Vitest maps public entries to source
// so this also runs before the first package build in a clean checkout.
import AsyncDemo from "../../../apps/docs/src/content/combobox/demos/05-async";

function deferred() {
  let resolve!: (value: string[]) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<string[]>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

test("the remote example aborts old queries and rejects late successes even when the transport ignores cancellation", async () => {
  const requests: { query: string; signal: AbortSignal; result: ReturnType<typeof deferred> }[] = [];
  const searchPlaces = vi.fn((query: string, signal: AbortSignal) => {
    const result = deferred();
    requests.push({ query, signal, result });
    return result.promise;
  });
  const { unmount } = render(<AsyncDemo searchPlaces={searchPlaces} />);
  const input = screen.getByRole("combobox", { name: "位置" });
  await userEvent.click(input);
  expect(await screen.findByText("正在加载")).toBeVisible();
  expect(screen.queryByText("没有匹配的位置")).not.toBeInTheDocument();
  await act(async () => requests[0]!.result.resolve(["西区车库"]));
  expect(await screen.findByRole("option", { name: "西区车库" })).toBeInTheDocument();

  fireEvent.change(input, { target: { value: "东" } });
  expect(requests[0]!.signal.aborted).toBe(true);
  expect(screen.queryByRole("option", { name: "西区车库" })).not.toBeInTheDocument();
  fireEvent.change(input, { target: { value: "西" } });
  expect(requests[1]!.signal.aborted).toBe(true);
  fireEvent.change(input, { target: { value: "东" } });
  expect(requests[2]!.signal.aborted).toBe(true);
  await act(async () => requests[3]!.result.resolve(["东区车库"]));
  expect(await screen.findByRole("option", { name: "东区车库" })).toBeInTheDocument();
  await act(async () => requests[1]!.result.resolve(["东侧旧结果"]));
  expect(screen.queryByRole("option", { name: "东侧旧结果" })).not.toBeInTheDocument();
  expect(screen.getByRole("option", { name: "东区车库" })).toBeInTheDocument();
  expect(input).not.toHaveAttribute("aria-busy");
  unmount();
  expect(requests[3]!.signal.aborted).toBe(true);
});

test("the remote example preserves a confirmed form value while a newer query loads, fails, or has no match", async () => {
  const requests: ReturnType<typeof deferred>[] = [];
  const searchPlaces = vi.fn((_query: string, _signal: AbortSignal) => {
    const result = deferred();
    requests.push(result);
    return result.promise;
  });
  const { container } = render(<AsyncDemo searchPlaces={searchPlaces} />);
  const input = screen.getByRole("combobox", { name: "位置" });
  await userEvent.click(input);
  await act(async () => requests[0]!.resolve(["东区车库"]));
  await userEvent.keyboard("{ArrowDown}{Enter}");
  const selected = () => new FormData(container.querySelector("form")!).get("place");
  expect(selected()).toBe("东区车库");
  await userEvent.clear(input);
  await userEvent.type(input, "西");
  expect(selected()).toBe("东区车库");
  expect(await screen.findByText("正在加载")).toBeVisible();
  const failed = requests.at(-1)!;
  await act(async () => failed.reject(new Error("network unavailable")));
  expect(await screen.findByText("查询失败，请修改搜索后重试")).toBeVisible();
  expect(screen.queryByText("没有匹配的位置")).not.toBeInTheDocument();
  expect(selected()).toBe("东区车库");
  fireEvent.change(input, { target: { value: "不存在" } });
  await act(async () => requests.at(-1)!.resolve([]));
  expect(await screen.findByText("没有匹配的位置")).toBeVisible();
  expect(selected()).toBe("东区车库");
  await userEvent.keyboard("{Escape}");
  await userEvent.click(screen.getByRole("button", { name: "清除选择" }));
  expect(selected()).toBe("");
});

test("an obsolete rejection cannot remove newer results or turn them into an error", async () => {
  const requests: ReturnType<typeof deferred>[] = [];
  render(<AsyncDemo searchPlaces={() => {
    const result = deferred();
    requests.push(result);
    return result.promise;
  }} />);
  const input = screen.getByRole("combobox", { name: "位置" });
  await userEvent.click(input);
  fireEvent.change(input, { target: { value: "北" } });
  await act(async () => requests[1]!.resolve(["4 号楼北门"]));
  expect(await screen.findByRole("option", { name: "4 号楼北门" })).toBeInTheDocument();
  await act(async () => requests[0]!.reject(new Error("obsolete failure")));
  expect(screen.queryByText("查询失败，请修改搜索后重试")).not.toBeInTheDocument();
  expect(screen.getByRole("option", { name: "4 号楼北门" })).toBeInTheDocument();
  await waitFor(() => expect(input).not.toHaveAttribute("aria-busy"));
});
