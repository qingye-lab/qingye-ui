import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Field, FieldContent, FieldControl, FieldDescription, FieldError, FieldGroup, FieldItem, FieldLabel, FieldSeparator, FieldTitle, FieldValidity } from "../src/components/field";
import { Input } from "../src/components/input";

test("a label names and focuses its registered Input", async () => {
  const user = userEvent.setup();
  render(<Field><FieldLabel>邮箱</FieldLabel><Input /></Field>);
  const input = screen.getByLabelText("邮箱");
  await user.click(screen.getByText("邮箱"));
  expect(input).toHaveFocus();
});

test("description and supplied error both describe the same control", () => {
  render(<Field invalid><FieldLabel>邮箱</FieldLabel><Input /><FieldDescription id="email-help">说明</FieldDescription><FieldError id="email-error">邮箱地址不完整</FieldError></Field>);
  const input = screen.getByLabelText("邮箱");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input.getAttribute("aria-describedby")?.split(/\s+/)).toEqual(expect.arrayContaining(["email-help", "email-error"]));
  expect(input).toHaveAccessibleDescription("说明 邮箱地址不完整");
});

test("supplied errors do not infer invalid; only the caller toggles it and the draft survives", async () => {
  const fixture = (invalid?: boolean) => <Field invalid={invalid}><FieldLabel>邮箱</FieldLabel><Input defaultValue="li.na@" /><FieldError>邮箱地址不完整</FieldError></Field>;
  const { rerender } = render(fixture());
  const input = screen.getByLabelText("邮箱");
  expect(screen.getByText("邮箱地址不完整")).toBeInTheDocument();
  expect(input).not.toHaveAttribute("aria-invalid", "true");
  rerender(fixture(true));
  expect(input).toHaveAttribute("aria-invalid", "true");
  rerender(fixture(false));
  await waitFor(() => expect(input).not.toHaveAttribute("aria-invalid", "true"));
  expect(input).toHaveValue("li.na@");
});

test("native validity and blur do not infer invalid or invent an error", async () => {
  const user = userEvent.setup();
  render(<form><Field><FieldLabel>邮箱</FieldLabel><Input required type="email" /><FieldError /></Field><button type="button">继续</button></form>);
  const input = screen.getByLabelText("邮箱") as HTMLInputElement;
  await user.type(input, "li.na@");
  await user.tab();
  expect(input.validity.valid).toBe(false);
  expect(input).not.toHaveAttribute("aria-invalid", "true");
  expect(document.querySelector("[data-slot=field-error]")).toBeNull();
});

test("native invalid events keep browser constraints and caller handlers without inferring invalid", () => {
  let observed = false;
  render(<form><Field onInvalidCapture={() => { observed = true; }}><FieldLabel>邮箱</FieldLabel><Input required type="email" /><FieldError /></Field></form>);
  const input = screen.getByLabelText("邮箱") as HTMLInputElement;
  fireEvent.invalid(input);
  expect(observed).toBe(true);
  expect(input.validity.valid).toBe(false);
  expect(input).not.toHaveAttribute("aria-invalid", "true");
  expect(document.querySelector("[data-slot=field-error]")).toBeNull();
});

test("an empty supplied error list removes its association without removing help", async () => {
  const fixture = (errors: {message: string}[]) => <Field invalid><FieldLabel>编号</FieldLabel><Input /><FieldDescription id="code-help">说明</FieldDescription><FieldError id="code-error" errors={errors} /></Field>;
  const { rerender } = render(fixture([{message: "编号已被占用"}]));
  expect(screen.getByLabelText("编号")).toHaveAccessibleDescription("说明 编号已被占用");
  rerender(fixture([]));
  await waitFor(() => expect(screen.getByLabelText("编号")).toHaveAttribute("aria-describedby", "code-help"));
  expect(screen.queryByText("编号已被占用")).not.toBeInTheDocument();
});

test("errors ignore empty entries, deduplicate, list distinct messages, and prefer children", () => {
  const { rerender } = render(<Field><Input aria-label="密码" /><FieldError errors={[undefined, {}, {message: ""}, {message: "  "}, {message: "至少 8 位"}, {message: "至少 8 位"}, {message: "包含数字"}]} /></Field>);
  expect(screen.getAllByRole("listitem").map(item => item.textContent)).toEqual(["至少 8 位", "包含数字"]);
  rerender(<Field><Input aria-label="密码" /><FieldError errors={[{message: "列表错误"}]}>调用方内容</FieldError></Field>);
  expect(screen.getByText("调用方内容")).toBeInTheDocument();
  expect(screen.queryByText("列表错误")).not.toBeInTheDocument();
});

test("a single supplied error has no unnecessary list", () => {
  render(<Field invalid><Input aria-label="编号" /><FieldError errors={[{message: "编号已被占用"}]} /></Field>);
  expect(screen.getByText("编号已被占用").tagName).toBe("DIV");
  expect(screen.queryByRole("list")).toBeNull();
});

test("empty or whitespace-only content creates no error node or description association", () => {
  const { rerender } = render(<Field invalid><Input aria-label="编号" /><FieldError>{""}</FieldError></Field>);
  expect(document.querySelector("[data-slot=field-error]")).toBeNull();
  expect(screen.getByLabelText("编号")).not.toHaveAttribute("aria-describedby");
  rerender(<Field invalid><Input aria-label="编号" /><FieldError>{"  "}</FieldError></Field>);
  expect(document.querySelector("[data-slot=field-error]")).toBeNull();
});

test("standalone errors forward native props, refs, and render without a Field", () => {
  const ref = createRef<HTMLDivElement>();
  render(<FieldError role="alert" ref={ref} render={<section />} className="text-body" data-owner="upload">文件过大</FieldError>);
  const error = screen.getByRole("alert");
  expect(error.tagName).toBe("SECTION");
  expect(error).toHaveAttribute("data-owner", "upload");
  expect(error).toHaveClass("text-body");
  expect(ref.current).toBe(error);
});

test("explicit match=false hides a supplied error", () => {
  render(<Field invalid><FieldLabel>邮箱</FieldLabel><Input /><FieldError match={false}>暂不显示</FieldError></Field>);
  expect(screen.queryByText("暂不显示")).toBeNull();
  expect(screen.getByLabelText("邮箱")).not.toHaveAttribute("aria-describedby");
});

test("horizontal native checkbox keeps label and description associations", async () => {
  const user = userEvent.setup();
  render(<Field orientation="horizontal"><FieldControl type="checkbox" /><FieldContent><FieldLabel>选项</FieldLabel><FieldDescription>说明</FieldDescription></FieldContent></Field>);
  const control = screen.getByLabelText("选项");
  expect(control).toHaveAccessibleDescription("说明");
  expect(control.closest("[data-slot=field]")).toHaveAttribute("data-orientation", "horizontal");
  await user.click(screen.getByText("选项"));
  expect(control).toBeChecked();
});

test("disabled Field propagates to the control; readOnly retains form data", () => {
  render(<form data-testid="form"><Field disabled name="locked"><FieldLabel>名称</FieldLabel><Input defaultValue="原值" /></Field><Field name="code"><FieldLabel>编号</FieldLabel><Input readOnly defaultValue="value" /></Field></form>);
  expect(screen.getByLabelText("名称")).toBeDisabled();
  expect(screen.getByLabelText("编号")).not.toBeDisabled();
  const data = new FormData(screen.getByTestId("form") as HTMLFormElement);
  expect(data.has("locked")).toBe(false);
  expect(data.get("code")).toBe("value");
});

test("FieldTitle is a fact heading and never automatically labels a control", () => {
  render(<Field><FieldTitle id="fact-name">名称</FieldTitle><FieldDescription>待核实</FieldDescription><button>填写</button></Field>);
  expect(screen.getByText("名称").tagName).toBe("DIV");
  expect(screen.getByText("名称")).not.toHaveAttribute("for");
  expect(screen.getByRole("button", {name: "填写"})).not.toHaveAttribute("aria-labelledby");
});

test("FieldItem scopes each repeated control's label", () => {
  render(<Field><FieldTitle>选项</FieldTitle><FieldItem><FieldControl type="checkbox" id="option-alpha" /><FieldLabel htmlFor="option-alpha">选项一</FieldLabel></FieldItem><FieldItem><FieldControl type="checkbox" id="option-beta" /><FieldLabel htmlFor="option-beta">选项二</FieldLabel></FieldItem></Field>);
  expect(screen.getByLabelText("选项一")).toHaveAttribute("id", "option-alpha");
  expect(screen.getByLabelText("选项二")).toHaveAttribute("id", "option-beta");
});

test("FieldValidity remains an unwrapped primitive outlet", () => {
  render(<Field invalid><FieldControl aria-label="编号" /><FieldValidity>{validity => <output>{String(validity.state.valid)}</output>}</FieldValidity></Field>);
  expect(screen.getByRole("status")).toHaveTextContent("false");
});

test("layout parts preserve slots, refs, render and caller class precedence", () => {
  const ref = createRef<HTMLDivElement>();
  const { container } = render(<FieldGroup render={<section />} ref={ref} className="gap-8"><Field data-owner="test" className={() => "gap-3"}><FieldTitle>编号</FieldTitle><FieldDescription>不适用</FieldDescription></Field><FieldSeparator>或</FieldSeparator></FieldGroup>);
  expect(ref.current?.tagName).toBe("SECTION");
  expect(ref.current).toHaveClass("gap-8");
  expect(ref.current).not.toHaveClass("gap-(--qy-field-group-gap)");
  expect(container.querySelector("[data-slot=field]")).toHaveClass("gap-3");
  expect(container.querySelector("[data-slot=field]")).toHaveAttribute("data-owner", "test");
  expect(screen.getByText("编号")).toHaveAttribute("data-slot", "field-title");
  expect(screen.queryByRole("separator")).toBeNull();
  expect(container.querySelectorAll('[data-slot=separator][aria-hidden=true]')).toHaveLength(2);
});

test("FieldSeparator without text reuses one semantic separator", () => {
  render(<FieldSeparator />);
  expect(screen.getAllByRole("separator")).toHaveLength(1);
});

test("FieldControl can register an explicitly native Input without a second registration", () => {
  render(<Field><FieldLabel>备注</FieldLabel><FieldControl render={<Input nativeInput />} /><FieldDescription>说明</FieldDescription></Field>);
  expect(screen.getByLabelText("备注")).toHaveAccessibleDescription("说明");
  fireEvent.change(screen.getByLabelText("备注"), { target: { value: "内容" } });
  expect(screen.getByLabelText("备注")).toHaveValue("内容");
});
