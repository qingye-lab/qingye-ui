import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { Input } from "../src/components/input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test.each([false, true])("readonly is named, focusable, immutable and submitted (native=%s)", async (nativeInput) => {
  const user = userEvent.setup();
  const { container, rerender } = render(<form><Input aria-label="名称" name="example" nativeInput={nativeInput} readOnly defaultValue="value" /></form>);
  const input = screen.getByRole("textbox", { name: "名称" });
  expect(screen.getByText("只读")).toBeInTheDocument();
  expect(container.querySelector("[data-slot=input-control]")).toHaveAttribute("data-readonly");
  await user.tab();
  expect(input).toHaveFocus();
  await user.type(input, "999");
  expect(input).toHaveValue("value");
  expect(new FormData(container.querySelector("form")!).get("example")).toBe("value");
  rerender(<form><Input aria-label="名称" nativeInput={nativeInput} defaultValue="value" /></form>);
  expect(screen.queryByText("只读")).not.toBeInTheDocument();
  await user.type(input, "x");
  expect(input).toHaveValue("valuex");
});

test("unstyled readonly retains native semantics and explicit consumer hook", () => {
  const { container } = render(<Input aria-label="编号" readOnly unstyled />);
  expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  expect(container.querySelector("[data-readonly]")).toBeInTheDocument();
  expect(screen.queryByText("只读")).not.toBeInTheDocument();
});

test("disabled does not submit while readonly still submits and translates its state", () => {
  const { container } = render(<UILocaleProvider locale={enUS}><form><Input aria-label="Disabled" name="disabled" defaultValue="omit" disabled /><Input aria-label="Readonly" name="readonly" defaultValue="keep" readOnly /></form></UILocaleProvider>);
  const data = new FormData(container.querySelector("form")!);
  expect(data.has("disabled")).toBe(false);
  expect(data.get("readonly")).toBe("keep");
  expect(screen.getByText("Read only")).toBeInTheDocument();
});

test.each([false, true])("native props, style, className, render, refs and events belong to the real input (native=%s)", async (nativeInput) => {
  const ref = createRef<HTMLInputElement>();
  const focus = vi.fn();
  const change = vi.fn();
  const { container } = render(<Input nativeInput={nativeInput} aria-label="标题" name="title" id="title" maxLength={12} autoComplete="off" data-record="draft" data-slot="consumer-input" style={{ color: "var(--qy-foreground)" }} className="consumer-input" controlClassName="consumer-boundary" ref={ref} onFocus={focus} onChange={change} render={<input data-rendered="yes" />} />);
  const input = screen.getByRole("textbox");
  expect(ref.current).toBe(input);
  expect(input).toHaveClass("consumer-input");
  expect(input).toHaveAttribute("data-rendered", "yes");
  expect(input).toHaveAttribute("data-record", "draft");
  expect(input).toHaveAttribute("data-slot", "consumer-input");
  expect(input).toHaveAttribute("maxlength", "12");
  expect(input).toHaveAttribute("autocomplete", "off");
  expect(input).toHaveStyle({ color: "var(--qy-foreground)" });
  expect(container.querySelector("[data-slot=input-control]")).toHaveClass("consumer-boundary");
  await userEvent.type(input, "abc");
  expect(focus).toHaveBeenCalledOnce();
  expect(change).toHaveBeenCalledTimes(3);
});

test("React ref callback cleanup is preserved", () => {
  const cleanup = vi.fn();
  const ref = vi.fn(() => cleanup);
  const { unmount } = render(<Input aria-label="标题" ref={ref} />);
  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
  unmount();
  expect(cleanup).toHaveBeenCalledOnce();
});

test.each([false, true])("state class/style callbacks compose with the Field or native outlet (native=%s)", (nativeInput) => {
  render(<Input nativeInput={nativeInput} disabled aria-label="名称" className={(state) => state.disabled ? "disabled-consumer" : "enabled-consumer"} style={(state) => ({ opacity: state.disabled ? 0.5 : 1 })} />);
  expect(screen.getByRole("textbox")).toHaveClass("disabled-consumer");
  expect(screen.getByRole("textbox")).toHaveStyle({ opacity: 0.5 });
});

test("FieldControl may register the native outlet once, retaining label and field error association", () => {
  render(<Field invalid><FieldLabel>名称</FieldLabel><FieldControl render={<Input nativeInput defaultValue="草稿" />} /><FieldDescription>显示名称</FieldDescription><FieldError>名称已被使用</FieldError></Field>);
  const input = screen.getByRole("textbox", { name: "名称" });
  expect(input).toHaveValue("草稿");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAccessibleDescription("显示名称 名称已被使用");
});

test("invalid is an external fact; false stays false and a format-looking value is not inferred invalid", () => {
  const { rerender } = render(<Input type="email" aria-label="邮箱" defaultValue="unverified" aria-invalid="false" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
  rerender(<Input type="email" aria-label="邮箱" defaultValue="unverified" aria-invalid="true" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("textbox")).toHaveValue("unverified");
});

test("empty and numeric zero are different native values; Input adds no unknown or N/A sentinel", () => {
  render(<><Input aria-label="空值" defaultValue="" /><Input aria-label="零值" value={0} readOnly /></>);
  expect(screen.getByRole("textbox", { name: "空值" })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: "零值" })).toHaveValue("0");
  expect(screen.queryByText("未知")).not.toBeInTheDocument();
  expect(screen.queryByText("不适用")).not.toBeInTheDocument();
});

test.each(["", "initial"])("native form reset synchronizes render, class and style state (default=%s)", async (defaultValue) => {
  const onValueChange = vi.fn();
  const { container } = render(<form><Input nativeInput aria-label="查询" defaultValue={defaultValue} onValueChange={onValueChange}
    className={(state) => state.dirty ? "dirty-value" : "clean-value"}
    style={(state) => ({ opacity: state.filled ? 1 : 0.5 })}
    render={(props, state) => <input {...props} data-render-dirty={String(state.dirty)} data-render-filled={String(state.filled)} data-render-touched={String(state.touched)} />}
  /></form>);
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "draft");
  await userEvent.tab();
  expect(input).toHaveAttribute("data-render-dirty", "true");
  expect(input).toHaveAttribute("data-render-filled", "true");
  expect(input).toHaveAttribute("data-render-touched", "true");
  onValueChange.mockClear();

  await act(async () => { container.querySelector("form")!.reset(); });
  expect(input).toHaveValue(defaultValue);
  expect(input).toHaveAttribute("data-render-dirty", "false");
  expect(input).toHaveAttribute("data-render-filled", String(defaultValue !== ""));
  expect(input).toHaveAttribute("data-render-touched", "false");
  expect(input).toHaveClass("clean-value");
  expect(input).toHaveStyle({ opacity: defaultValue ? 1 : 0.5 });
  expect(onValueChange).not.toHaveBeenCalled();
});

test("a canceled native reset retains the value and render state", async () => {
  const { container } = render(<form onReset={(event) => event.preventDefault()}><Input nativeInput aria-label="查询"
    render={(props, state) => <input {...props} data-render-dirty={String(state.dirty)} data-render-filled={String(state.filled)} data-render-touched={String(state.touched)} />}
  /></form>);
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "draft");
  await userEvent.tab();
  await act(async () => { container.querySelector("form")!.reset(); });
  expect(input).toHaveValue("draft");
  expect(input).toHaveAttribute("data-render-dirty", "true");
  expect(input).toHaveAttribute("data-render-filled", "true");
  expect(input).toHaveAttribute("data-render-touched", "true");
});

test("native reset preserves a caller-owned controlled value and emits no change", async () => {
  const onValueChange = vi.fn();
  const { container, rerender } = render(<form><Input nativeInput aria-label="查询" value="initial" onValueChange={onValueChange}
    render={(props, state) => <input {...props} data-render-dirty={String(state.dirty)} data-render-filled={String(state.filled)} />}
  /></form>);
  rerender(<form><Input nativeInput aria-label="查询" value="draft" onValueChange={onValueChange}
    render={(props, state) => <input {...props} data-render-dirty={String(state.dirty)} data-render-filled={String(state.filled)} />}
  /></form>);
  await act(async () => { container.querySelector("form")!.reset(); });
  expect(screen.getByRole("textbox")).toHaveValue("draft");
  expect(screen.getByRole("textbox")).toHaveAttribute("data-render-dirty", "true");
  expect(screen.getByRole("textbox")).toHaveAttribute("data-render-filled", "true");
  expect(onValueChange).not.toHaveBeenCalled();
});

test("the native reset observer preserves caller ref cleanup", () => {
  const cleanup = vi.fn();
  const ref = vi.fn(() => cleanup);
  const { unmount } = render(<Input nativeInput aria-label="查询" ref={ref} />);
  expect(ref).toHaveBeenCalledWith(screen.getByRole("textbox"));
  unmount();
  expect(cleanup).toHaveBeenCalledOnce();
});

// 用户裁决 2026-10-05：填值控件只有一套几何，跟随密度轴，不再按档位放大。
// 这组断言把契约钉在角色 token 上：组件不写死尺寸，只读角色层；
// 密度改绑角色层时无需改组件。值文字始终是正文尺寸，不随容器变化。
test("one geometry reads the fill-control role, not a size step", () => {
  const { container } = render(<Input aria-label="名称" />);
  const shell = container.querySelector<HTMLElement>("[data-slot=input-control]")!;
  expect(shell).not.toHaveAttribute("data-size");
  expect(shell).not.toHaveStyle({ "--qy-input-height": "var(--qy-control-md)" });
  expect(shell.className).toContain("min-h-(--qy-fill-height)");
  expect(shell.className).toContain("rounded-(--qy-fill-radius)");
  expect(screen.getByRole("textbox")).toHaveClass("text-control-md-mobile", "sm:text-control-md");
});

test("numeric size keeps its native character-width meaning", () => {
  render(<Input aria-label="名称" size={24} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("size", "24");
});


test("render-supplied readonly is a real attribute and visible fact", async () => {
  render(<Input aria-label="名称" defaultValue="value" render={<input readOnly />} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  expect(screen.getByText("只读")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "清空输入" })).not.toBeInTheDocument();
});

test("the input carries a value and nothing else: no built-in action for search or password types", () => {
  // 用户裁决 2026-10-10：功能要纯粹。清空与显示密码由 SearchInput、PasswordInput 或 InputGroup 组合。
  const { container } = render(<><Input type="search" aria-label="搜索" defaultValue="青野" /><Input type="password" aria-label="密码" defaultValue="qingye" /></>);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(container.querySelector("svg")).not.toBeInTheDocument();
  expect(screen.getByRole("searchbox", { name: "搜索" })).toHaveAttribute("type", "search");
  expect(screen.getByLabelText("密码")).toHaveAttribute("type", "password");
  // @ts-expect-error 清空不是输入框的属性。
  void (<Input clearable />);
  // @ts-expect-error 显示密码不是输入框的属性。
  void (<Input visibilityToggle />);
});
