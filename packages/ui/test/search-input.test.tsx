import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { SearchInput } from "../src/components/search-input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("it is a composition of public parts: one boundary holding the icon, the real search input and a named clear action", () => {
  const { container } = render(<SearchInput aria-label="搜索" defaultValue="青野" />);
  const boundary = container.querySelector("[data-slot=search-input]")!;
  expect(boundary).toHaveClass("border", "border-input");
  // 图标是 InputGroup 的静态附件：沿用它自己的 data-slot，贴合间距（图标与值之间是控件内间隔）才会生效。
  const icon = boundary.querySelector("[data-slot=input-group-addon]")!;
  expect(icon).toHaveAttribute("aria-hidden", "true");
  expect(icon.nextElementSibling).toHaveAttribute("data-slot", "input-control");
  const input = screen.getByRole("searchbox", { name: "搜索" });
  expect(boundary).toContainElement(input);
  // 边界只画一次：里面的输入不再有自己的框。
  expect(input.closest("[data-slot=input-control]")).not.toHaveClass("border");
  expect(screen.getByRole("button", { name: "清除搜索" })).toHaveAttribute("data-slot", "search-input-clear");
});

test("clearing goes through the native change path, calls onClear, returns focus and does not submit", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn(); const onValueChange = vi.fn(); const onClear = vi.fn(); const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
  render(<form onSubmit={onSubmit}><SearchInput aria-label="搜索" defaultValue="青野" onChange={onChange} onValueChange={onValueChange} onClear={onClear} /></form>);
  await user.click(screen.getByRole("button", { name: "清除搜索" }));
  const input = screen.getByRole("searchbox");
  expect(input).toHaveValue("");
  expect(onChange).toHaveBeenCalledOnce();
  expect(onValueChange).toHaveBeenCalledWith("", expect.anything());
  expect(onClear).toHaveBeenCalledOnce();
  expect(input).toHaveFocus();
  expect(onSubmit).not.toHaveBeenCalled();
  // 空值没有可清的东西，动作不出现。
  expect(screen.queryByRole("button", { name: "清除搜索" })).not.toBeInTheDocument();
  await user.type(input, "野");
  expect(screen.getByRole("button", { name: "清除搜索" })).toBeInTheDocument();
});

test("a controlled value clears only when the caller accepts the change", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();
  const { rerender } = render(<SearchInput aria-label="搜索" value="青野" onChange={onChange} />);
  await user.click(screen.getByRole("button", { name: "清除搜索" }));
  expect(onChange).toHaveBeenCalledOnce();
  expect(screen.getByRole("searchbox")).toHaveValue("青野");
  rerender(<SearchInput aria-label="搜索" value="" onChange={onChange} />);
  expect(screen.queryByRole("button", { name: "清除搜索" })).not.toBeInTheDocument();
});

test("the first Escape clears this field; an empty field, composition and a caller's cancellation leave Escape alone", async () => {
  const user = userEvent.setup();
  const outer = vi.fn();
  const { rerender } = render(<div onKeyDown={outer}><SearchInput aria-label="搜索" defaultValue="青野" /></div>);
  const input = screen.getByRole("searchbox");
  input.focus();
  await user.keyboard("{Escape}");
  expect(input).toHaveValue("");
  expect(outer).not.toHaveBeenCalled();
  await user.keyboard("{Escape}");
  expect(outer).toHaveBeenCalledOnce();

  await user.type(input, "野");
  fireEvent.keyDown(input, { key: "Escape", keyCode: 229 });
  expect(input).toHaveValue("野");

  rerender(<div onKeyDown={outer}><SearchInput aria-label="搜索" defaultValue="青野" onKeyDown={event => event.preventDefault()} /></div>);
  await user.keyboard("{Escape}");
  expect(screen.getByRole("searchbox")).toHaveValue("野");
});

test.each(["disabled", "field", "fieldset", "readOnly"] as const)("no clear action while the real input is blocked by %s", (source) => {
  const input = <SearchInput aria-label="搜索" defaultValue="青野" disabled={source === "disabled"} readOnly={source === "readOnly"} />;
  const { container } = render(source === "field" ? <Field disabled><FieldLabel>搜索</FieldLabel>{input}</Field> : source === "fieldset" ? <fieldset disabled>{input}</fieldset> : input);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  if (source === "readOnly") expect(container.querySelector("[data-slot=search-input]")).toHaveAttribute("data-readonly");
  else expect(screen.getByRole("searchbox")).toBeDisabled();
});

test("native reset restores an uncontrolled value and its clear action", async () => {
  const { container } = render(<form><SearchInput aria-label="搜索" defaultValue="initial" /></form>);
  await userEvent.click(screen.getByRole("button", { name: "清除搜索" }));
  expect(screen.getByRole("searchbox")).toHaveValue("");
  container.querySelector("form")!.reset();
  await vi.waitFor(() => expect(screen.getByRole("button", { name: "清除搜索" })).toBeInTheDocument());
  expect(screen.getByRole("searchbox")).toHaveValue("initial");
});

test("className, style and ref belong to the real input, controlClassName to the boundary, and names follow the locale", () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<UILocaleProvider locale={enUS}><SearchInput ref={ref} aria-label="Search" defaultValue="a" className="caller-input" controlClassName="caller-boundary" style={{ letterSpacing: "1px" }} /></UILocaleProvider>);
  const input = screen.getByRole("searchbox", { name: "Search" });
  expect(ref.current).toBe(input);
  expect(input).toHaveClass("caller-input");
  expect(input).toHaveStyle({ letterSpacing: "1px" });
  expect(container.querySelector("[data-slot=search-input]")).toHaveClass("caller-boundary");
  expect(screen.getByRole("button", { name: enUS.messages.clearSearch })).toBeInTheDocument();
});

test("a Field label names the search input and clearLabel renames the action", () => {
  render(<Field><FieldLabel>目录</FieldLabel><SearchInput defaultValue="春" clearLabel="清空目录筛选" /></Field>);
  expect(screen.getByRole("searchbox", { name: "目录" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "清空目录筛选" })).toBeInTheDocument();
});
