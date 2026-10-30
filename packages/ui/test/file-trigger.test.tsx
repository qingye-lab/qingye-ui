import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { FileTrigger } from "../src/components/file-trigger";

const file = (name: string, text = "A", type = "text/plain") => new File([text], name, { type });
const nativeInput = (container: HTMLElement) => container.querySelector<HTMLInputElement>('input[type="file"]')!;

test("the button is the only entry: clicking it opens the native chooser", async () => {
  const { container } = render(<FileTrigger>导入</FileTrigger>);
  const input = nativeInput(container);
  const open = vi.spyOn(input, "click");
  await userEvent.click(screen.getByRole("button", { name: "导入" }));
  expect(open).toHaveBeenCalledTimes(1);
});

test("the native input is outside the tab order and not exposed", async () => {
  const { container } = render(<><FileTrigger>导入</FileTrigger><button type="button">后面</button></>);
  const input = nativeInput(container);
  expect(input).not.toBeVisible();
  expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "导入" })).toHaveFocus();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "后面" })).toHaveFocus();
});

test("a selected file is handed over at once, the input is cleared, and the same file can be chosen again", async () => {
  const onSelect = vi.fn();
  const { container } = render(<FileTrigger onSelect={onSelect}>导入</FileTrigger>);
  const input = nativeInput(container);
  const a = file("a.csv");
  await userEvent.upload(input, a);
  expect(onSelect).toHaveBeenCalledTimes(1);
  expect(onSelect.mock.calls[0]![0]).toEqual([a]);
  expect(onSelect.mock.calls[0]![1]).toMatchObject({ rejected: [] });
  expect(onSelect.mock.calls[0]![1].event).toBeDefined();
  expect(input.value).toBe("");
  await userEvent.upload(input, a);
  expect(onSelect).toHaveBeenCalledTimes(2);
});

test("accept, maxSize and validate rejections reach details.rejected; an all-rejected selection still calls back", async () => {
  const onSelect = vi.fn();
  const { container } = render(<FileTrigger accept=".csv" maxSize={1} validate={f => f.name.startsWith("tmp") ? "临时文件" : undefined} onSelect={onSelect}>导入</FileTrigger>);
  const input = nativeInput(container);
  // applyAccept 默认会让 user-event 按 accept 过滤；这里要让不合规的文件真的进来。
  const user = userEvent.setup({ applyAccept: false });
  const wrongType = file("a.txt");
  await user.upload(input, wrongType);
  expect(onSelect).toHaveBeenLastCalledWith([], expect.objectContaining({ rejected: [{ file: wrongType, reason: "type" }] }));
  const large = file("big.csv", "CC", "text/csv");
  await user.upload(input, large);
  expect(onSelect).toHaveBeenLastCalledWith([], expect.objectContaining({ rejected: [{ file: large, reason: "size" }] }));
  const custom = file("tmp.csv", "C", "text/csv");
  await user.upload(input, custom);
  expect(onSelect).toHaveBeenLastCalledWith([], expect.objectContaining({ rejected: [{ file: custom, reason: "custom", message: "临时文件" }] }));
});

test("maxFiles caps one selection: the surplus is rejected as count while the rest are accepted", async () => {
  const onSelect = vi.fn();
  const { container } = render(<FileTrigger multiple maxFiles={2} onSelect={onSelect}>导入</FileTrigger>);
  const [a, b, c] = [file("a.txt"), file("b.txt"), file("c.txt")];
  await userEvent.upload(nativeInput(container), [a, b, c]);
  expect(onSelect).toHaveBeenCalledWith([a, b], expect.objectContaining({ rejected: [{ file: c, reason: "count" }] }));
});

test("multiple defaults to false and is passed to the native input along with accept", () => {
  const { container, rerender } = render(<FileTrigger accept=".csv">导入</FileTrigger>);
  expect(nativeInput(container).multiple).toBe(false);
  expect(nativeInput(container)).toHaveAttribute("accept", ".csv");
  rerender(<FileTrigger multiple>导入</FileTrigger>);
  expect(nativeInput(container).multiple).toBe(true);
});

test("cancel (no files chosen) does not call back", () => {
  const onSelect = vi.fn();
  const { container } = render(<FileTrigger onSelect={onSelect}>导入</FileTrigger>);
  const input = nativeInput(container);
  input.dispatchEvent(new Event("change", { bubbles: true }));
  expect(onSelect).not.toHaveBeenCalled();
});

test("disabled disables both the button and the native input, and never opens the chooser", async () => {
  const { container } = render(<FileTrigger disabled>导入</FileTrigger>);
  const input = nativeInput(container);
  const open = vi.spyOn(input, "click");
  expect(screen.getByRole("button", { name: "导入" })).toBeDisabled();
  expect(input).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "导入" }));
  expect(open).not.toHaveBeenCalled();
});

test("onClick can prevent opening; button props and ref pass through; no name or form is submitted", async () => {
  const ref = createRef<HTMLButtonElement>();
  const { container } = render(<form><FileTrigger ref={ref} variant="bordered" aria-label="导入账单" onClick={event => event.preventDefault()}>导入</FileTrigger></form>);
  const input = nativeInput(container);
  const open = vi.spyOn(input, "click");
  const button = screen.getByRole("button", { name: "导入账单" });
  expect(ref.current).toBe(button);
  await userEvent.click(button);
  expect(open).not.toHaveBeenCalled();
  expect(input).not.toHaveAttribute("name");
  expect(input).not.toHaveAttribute("form");
  expect(button).toHaveAttribute("type", "button");
});

test("render swaps the button element and the chooser still opens", async () => {
  const { container } = render(<FileTrigger nativeButton={false} render={<a href="#import" />}>导入</FileTrigger>);
  const input = nativeInput(container);
  const open = vi.spyOn(input, "click");
  await userEvent.click(screen.getByText("导入"));
  expect(open).toHaveBeenCalledTimes(1);
});

test("invalid rule props are developer errors", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<FileTrigger maxFiles={-1}>导入</FileTrigger>)).toThrow(RangeError);
  expect(() => render(<FileTrigger accept="csv">导入</FileTrigger>)).toThrow(TypeError);
  error.mockRestore();
});
