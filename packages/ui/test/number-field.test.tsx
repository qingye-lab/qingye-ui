import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "../src/components/number-field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const parts = <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>;

test.each([false, true])("native form reset restores the uncontrolled number unless canceled=%s", async canceled => {
  const { container } = render(<form onReset={event => { if (canceled) event.preventDefault(); }}><NumberField name="n" defaultValue={2}>{parts}</NumberField></form>);
  const form = container.querySelector("form")!;
  const increment = screen.getByRole("button", { name: "增加" });
  for (let index = 0; index < 3; index++) await userEvent.click(increment);
  expect(screen.getByRole("textbox")).toHaveValue("5");
  await act(async () => form.reset());
  expect(screen.getByRole("textbox")).toHaveValue(canceled ? "5" : "2");
  expect(new FormData(form).get("n")).toBe(canceled ? "5" : "2");
  await userEvent.click(increment);
  expect(screen.getByRole("textbox")).toHaveValue(canceled ? "6" : "3");
});

test("one Field registration retains name, description, caller error and input ref", () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<form><Field invalid><FieldLabel>数量</FieldLabel><NumberField name="count" defaultValue={0}><NumberFieldGroup><NumberFieldInput ref={ref} data-record="count" render={<input data-custom="yes" />} /></NumberFieldGroup></NumberField><FieldDescription>每盒数量</FieldDescription><FieldError>数量待确认</FieldError></Field></form>);
  const input = screen.getByRole("textbox", { name: "数量" });
  expect(ref.current).toBe(input);
  expect(input).toHaveValue("0");
  expect(input).toHaveAccessibleDescription("每盒数量 数量待确认");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAttribute("data-custom", "yes");
  expect(new FormData(container.querySelector("form")!).get("count")).toBe("0");
});

test("empty, minus and decimal drafts survive editing without forcing zero", async () => {
  const change = vi.fn();
  render(<NumberField onValueChange={change}>{parts}</NumberField>);
  const input = screen.getByRole("textbox");
  expect(input).toHaveValue("");
  await userEvent.type(input, "-");
  expect(input).toHaveValue("-");
  expect(change).not.toHaveBeenCalled();
  await userEvent.type(input, "1.");
  expect(input).toHaveValue("-1.");
  await userEvent.clear(input);
  expect(input).toHaveValue("");
  expect(change).toHaveBeenLastCalledWith(null, expect.objectContaining({ reason: "input-clear" }));
});

test("direct out-of-range edits stay visible on blur and retain native range validation", async () => {
  const { container } = render(<form><NumberField name="amount" min={0} max={10}>{parts}</NumberField></form>);
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "15");
  await userEvent.tab();
  expect(input).toHaveValue("15");
  expect(new FormData(container.querySelector("form")!).get("amount")).toBe("15");
  const hidden = container.querySelector<HTMLInputElement>('input[type="number"]')!;
  expect(hidden.validity.rangeOverflow).toBe(true);
});

test("stepping uses the declared step and bounds while buttons never submit", async () => {
  const submit = vi.fn(event => event.preventDefault());
  render(<form onSubmit={submit}><NumberField defaultValue={1} min={0} max={2} step={0.5}>{parts}</NumberField></form>);
  await userEvent.click(screen.getByRole("button", { name: "增加" }));
  expect(screen.getByRole("textbox")).toHaveValue("1.5");
  await userEvent.click(screen.getByRole("button", { name: "增加" }));
  expect(screen.getByRole("textbox")).toHaveValue("2");
  expect(screen.getByRole("button", { name: "增加" })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: "减少" }));
  expect(screen.getByRole("textbox")).toHaveValue("1.5");
  expect(submit).not.toHaveBeenCalled();
});

test("controlled changes require caller acceptance", async () => {
  function Example() {
    const [value, setValue] = useState<number | null>(3);
    return <NumberField value={value} onValueChange={next => { if (next !== null && next <= 4) setValue(next); }}>{parts}</NumberField>;
  }
  render(<Example />);
  await userEvent.click(screen.getByRole("button", { name: "增加" }));
  expect(screen.getByRole("textbox")).toHaveValue("4");
  await userEvent.click(screen.getByRole("button", { name: "增加" }));
  expect(screen.getByRole("textbox")).toHaveValue("4");
});

test.each(["disabled", "readOnly"] as const)("%s blocks editing and stepping with correct form participation", async (state) => {
  const change = vi.fn();
  const { container } = render(<UILocaleProvider locale={enUS}><form><NumberField name="count" defaultValue={2} {...{ [state]: true }} onValueChange={change}>{parts}</NumberField></form></UILocaleProvider>);
  const input = screen.getByRole("textbox");
  await userEvent.type(input, "9");
  await userEvent.click(screen.getByRole("button", { name: "Increase" }));
  expect(input).toHaveValue("2");
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("count")).toBe(state === "disabled" ? null : "2");
  expect(input).toHaveAttribute("aria-roledescription", "Number input");
});

test("caller input event cancellation prevents primitive edits", () => {
  render(<NumberField defaultValue={2}><NumberFieldInput onChange={event => event.preventBaseUIHandler()} /></NumberField>);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "9" } });
  expect(screen.getByRole("textbox")).toHaveValue("2");
});

test("render callbacks retain NumberField state through shared Input and Button composition", async () => {
  const ref = createRef<HTMLButtonElement>();
  render(<NumberField defaultValue={3}><NumberFieldGroup>
    <NumberFieldInput render={(props, state) => <input {...props} data-number-draft={state.inputValue} />} />
    <NumberFieldIncrement ref={ref} render={(props, state) => <button {...props} data-number-value={state.value} />} />
  </NumberFieldGroup></NumberField>);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-number-draft", "3");
  expect(ref.current).toBe(screen.getByRole("button", { name: "增加" }));
  await userEvent.click(ref.current!);
  expect(screen.getByRole("textbox")).toHaveAttribute("data-number-draft", "4");
  expect(ref.current).toHaveAttribute("data-number-value", "4");
});

test("Field disabled blocks the actual input and excludes its hidden numeric form value", async () => {
  const { container } = render(<form><Field disabled><FieldLabel>数量</FieldLabel><NumberField name="count" defaultValue={2}>{parts}</NumberField></Field></form>);
  expect(screen.getByRole("textbox", { name: "数量" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "增加" })).toBeDisabled();
  expect(new FormData(container.querySelector("form")!).has("count")).toBe(false);
});

test("a legal nonnative stepper render retains role and keyboard stepping", async () => {
  render(<NumberField defaultValue={3}><NumberFieldGroup><NumberFieldInput /><NumberFieldIncrement nativeButton={false} render={<div />} /></NumberFieldGroup></NumberField>);
  const increment = screen.getByRole("button", { name: "增加" });
  await userEvent.click(increment);
  expect(screen.getByRole("textbox")).toHaveValue("4");
  expect(increment.tagName).toBe("DIV");
  expect(screen.getByRole("textbox")).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}");
  expect(screen.getByRole("textbox")).toHaveValue("5");
});
