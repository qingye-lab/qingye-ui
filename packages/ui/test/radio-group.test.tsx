import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldItem, FieldLabel, FieldTitle } from "../src/components/field";
import { RadioGroup, Radio } from "../src/components/radio-group";

function Options() {
  return <><Radio value="alpha" aria-label="选项一" /><Radio value="beta" aria-label="选项二" disabled /><Radio value="gamma" aria-label="选项三" /></>;
}

test("no initial value leaves every visible candidate unchecked and submits no default", () => {
  const { container } = render(<form><RadioGroup name="choice" aria-label="选项"><Options /></RadioGroup></form>);
  expect(screen.getAllByRole("radio")).toHaveLength(3);
  screen.getAllByRole("radio").forEach(radio => expect(radio).not.toBeChecked());
  expect(new FormData(container.querySelector("form")!).has("choice")).toBe(false);
});

test("uncontrolled arrows skip disabled options, select the focused candidate and loop", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(<RadioGroup aria-label="选项" onValueChange={change}><Options /></RadioGroup>);
  await user.tab();
  expect(screen.getByRole("radio", { name: "选项一" })).toHaveFocus();
  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("radio", { name: "选项三" })).toHaveFocus();
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("radio", { name: "选项一" })).toHaveFocus();
  expect(screen.getByRole("radio", { name: "选项一" })).toBeChecked();
  expect(change).toHaveBeenLastCalledWith("alpha", expect.any(Object));
});

test("Home/End leave Radio's value in place; its primitive uses arrows for group navigation", async () => {
  const user = userEvent.setup();
  render(<RadioGroup defaultValue="gamma" aria-label="选项"><Options /></RadioGroup>);
  await user.tab();
  await user.keyboard("{Home}");
  expect(screen.getByRole("radio", { name: "选项三" })).toHaveFocus();
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
  await user.keyboard("{End}");
  expect(screen.getByRole("radio", { name: "选项三" })).toHaveFocus();
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
});

test("Space selects and Tab leaves the group through one stop", async () => {
  const user = userEvent.setup();
  render(<><RadioGroup aria-label="选项"><Options /></RadioGroup><button>应用</button></>);
  await user.tab();
  await user.keyboard(" ");
  expect(screen.getByRole("radio", { name: "选项一" })).toBeChecked();
  await user.tab();
  expect(screen.getByRole("button", { name: "应用" })).toHaveFocus();
});

test("controlled selection waits for the application's value and can return to null", async () => {
  const change = vi.fn();
  const fixture = (value: string | null) => <RadioGroup value={value} onValueChange={change} aria-label="选项"><Options /></RadioGroup>;
  const { rerender } = render(fixture(null));
  await userEvent.click(screen.getByRole("radio", { name: "选项三" }));
  expect(change).toHaveBeenCalledWith("gamma", expect.any(Object));
  expect(screen.getByRole("radio", { name: "选项三" })).not.toBeChecked();
  rerender(fixture("gamma"));
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
  rerender(fixture(null));
  screen.getAllByRole("radio").forEach(radio => expect(radio).not.toBeChecked());
});

test("controlled changes can retain a real draft when the application supplies an error", async () => {
  function Fixture({ invalid }: { invalid: boolean }) {
    const [value, setValue] = useState("alpha");
    return <Field invalid={invalid}><RadioGroup value={value} onValueChange={setValue} aria-label="选项"><Options /></RadioGroup><FieldError>输入无效</FieldError></Field>;
  }
  const { rerender } = render(<Fixture invalid={false} />);
  await userEvent.click(screen.getByRole("radio", { name: "选项三" }));
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "选项三" })).not.toHaveAttribute("aria-invalid", "true");
  rerender(<Fixture invalid />);
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "选项三" })).toHaveAttribute("aria-invalid", "true");
});

test("Field names the group, local labels activate items, help and error describe every radio", async () => {
  render(<Field invalid><FieldTitle id="choice-title">选项</FieldTitle><RadioGroup aria-labelledby="choice-title"><FieldItem><Radio value="alpha" /><FieldLabel>选项一</FieldLabel></FieldItem><FieldItem><Radio value="gamma" /><FieldLabel>选项三</FieldLabel></FieldItem></RadioGroup><FieldDescription id="choice-help">说明</FieldDescription><FieldError id="choice-error">输入无效</FieldError></Field>);
  expect(screen.getByRole("radiogroup", { name: "选项" })).toBeInTheDocument();
  for (const radio of screen.getAllByRole("radio")) {
    expect(radio).toHaveAccessibleDescription("说明 输入无效");
    expect(radio.getAttribute("aria-describedby")?.split(/\s+/)).toEqual(expect.arrayContaining(["choice-help", "choice-error"]));
    expect(radio).toHaveAttribute("aria-invalid", "true");
  }
  await userEvent.click(screen.getByText("选项三"));
  expect(screen.getByRole("radio", { name: "选项三" })).toBeChecked();
});

test("required, blur and supplied error text do not infer invalid", async () => {
  const { container, rerender } = render(<form><Field><RadioGroup required aria-label="选项"><Options /></RadioGroup><FieldError>应用给出的说明</FieldError></Field></form>);
  await userEvent.tab();
  await userEvent.tab();
  const input = container.querySelector<HTMLInputElement>("input[type=radio]")!;
  fireEvent.invalid(input);
  screen.getAllByRole("radio").forEach(radio => expect(radio).not.toHaveAttribute("aria-invalid", "true"));
  rerender(<Field invalid><RadioGroup aria-label="选项"><Options /></RadioGroup></Field>);
  await waitFor(() => expect(screen.getByRole("radio", { name: "选项一" })).toHaveAttribute("aria-invalid", "true"));
});

test("empty string and zero are selected values with distinct form serialization", async () => {
  const { container } = render(<form><RadioGroup name="code"><Radio value="" aria-label="不分组" /><Radio value={0} aria-label="零号组" /></RadioGroup></form>);
  const form = container.querySelector("form")!;
  expect(new FormData(form).has("code")).toBe(false);
  await userEvent.click(screen.getByRole("radio", { name: "不分组" }));
  expect(screen.getByRole("radio", { name: "不分组" })).toBeChecked();
  expect(new FormData(form).get("code")).toBe("");
  await userEvent.click(screen.getByRole("radio", { name: "零号组" }));
  expect(new FormData(form).getAll("code")).toEqual(["0"]);
});

test("disabled groups and items ignore selection and do not contribute a form value", async () => {
  const change = vi.fn();
  const { container } = render(<form><Field disabled><RadioGroup defaultValue="alpha" name="choice" onValueChange={change}><Options /></RadioGroup></Field><button>继续</button></form>);
  await userEvent.click(screen.getByRole("radio", { name: "选项三" }));
  await userEvent.tab();
  expect(screen.getByRole("button")).toHaveFocus();
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).has("choice")).toBe(false);
});

test("readonly and canceled changes preserve the chosen form value", async () => {
  const change = vi.fn();
  const { container, rerender } = render(<form><RadioGroup readOnly defaultValue="alpha" name="choice" onValueChange={change}><Options /></RadioGroup></form>);
  await userEvent.click(screen.getByRole("radio", { name: "选项三" }));
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("choice")).toBe("alpha");
  rerender(<RadioGroup defaultValue="alpha" onValueChange={(_, details) => details.cancel()}><Options /></RadioGroup>);
  await userEvent.click(screen.getByRole("radio", { name: "选项三" }));
  expect(screen.getByRole("radio", { name: "选项一" })).toBeChecked();
});

test("render, refs, state classes, local style and explicit ARIA survive composition", () => {
  const ref = createRef<HTMLElement>();
  render(<RadioGroup defaultValue="alpha"><Radio value="alpha" ref={ref} nativeButton render={<button data-rendered="yes" />} aria-label="选项一" aria-describedby="extra" className={state => state.checked ? "caller-checked" : "caller-unchecked"} style={{ color: "var(--qy-foreground)" }} /></RadioGroup>);
  const radio = screen.getByRole("radio");
  expect(ref.current).toBe(radio);
  expect(radio.tagName).toBe("BUTTON");
  expect(radio).toHaveAttribute("data-rendered", "yes");
  expect(radio).toHaveAttribute("aria-describedby", "extra");
  expect(radio).toHaveClass("caller-checked");
  expect(radio).toHaveStyle({ color: "var(--qy-foreground)" });
});
