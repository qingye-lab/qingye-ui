import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldLabel } from "../src/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "../src/components/number-field";

test("a root accessible name and description reach the actual number input", () => {
  render(<><p id="range">1 至 10 件</p><NumberField aria-label="采购数量" aria-describedby="range" defaultValue={3}><NumberFieldGroup><NumberFieldInput /></NumberFieldGroup></NumberField></>);
  expect(screen.getByRole("textbox", { name: "采购数量" })).toHaveAccessibleDescription("1 至 10 件");
});

test("an explicit input name overrides root defaults", () => {
  render(<NumberField aria-label="数量"><NumberFieldInput aria-label="装箱数量" /></NumberField>);
  expect(screen.getByRole("textbox", { name: "装箱数量" })).toBeInTheDocument();
});

test("an explicit input label overrides a root labelledby default", () => {
  render(<><span id="root-name">数量</span><NumberField aria-labelledby="root-name"><NumberFieldInput aria-label="装箱数量" /></NumberField></>);
  expect(screen.getByRole("textbox", { name: "装箱数量" })).toBeInTheDocument();
});

test("an explicit input labelledby overrides a root label default", () => {
  render(<><span id="input-name">装箱数量</span><NumberField aria-label="数量"><NumberFieldInput aria-labelledby="input-name" /></NumberField></>);
  expect(screen.getByRole("textbox", { name: "装箱数量" })).toBeInTheDocument();
});

test("an explicit input label overrides the automatic Field label", () => {
  render(<Field><FieldLabel>数量</FieldLabel><NumberField><NumberFieldInput aria-label="装箱数量" /></NumberField></Field>);
  expect(screen.getByRole("textbox", { name: "装箱数量" })).toBeInTheDocument();
});

test("without root defaults the Field label and description stay associated", () => {
  render(<Field><FieldLabel>温度阈值</FieldLabel><NumberField defaultValue={24}><NumberFieldInput /></NumberField><FieldDescription>单位：摄氏度</FieldDescription></Field>);
  expect(screen.getByRole("textbox", { name: "温度阈值" })).toHaveAccessibleDescription("单位：摄氏度");
});

test("a labelled numeric field steps within its range and keeps the value when readOnly", async () => {
  const onValueChange = vi.fn();
  const content = (readOnly: boolean) => <NumberField aria-label="数量" defaultValue={2} min={1} max={3} readOnly={readOnly} onValueChange={onValueChange}><NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup></NumberField>;
  const { rerender } = render(content(false));
  const input = screen.getByRole("textbox", { name: "数量" });
  input.focus();
  await userEvent.keyboard("{ArrowUp}");
  expect(input).toHaveValue("3");
  await userEvent.keyboard("{ArrowUp}");
  expect(input).toHaveValue("3");
  await userEvent.click(screen.getByRole("button", { name: "减少" }));
  expect(input).toHaveValue("2");
  rerender(content(true));
  onValueChange.mockClear();
  input.focus();
  await userEvent.keyboard("{ArrowUp}");
  expect(input).toHaveValue("2");
  expect(onValueChange).not.toHaveBeenCalled();
});
