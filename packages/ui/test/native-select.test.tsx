import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { NativeSelect, NativeSelectOption } from "../src/components/native-select";

test("fires onValueChange and reports the value", async () => {
  const onValueChange = vi.fn();
  render(
    <NativeSelect aria-label="城市" onValueChange={onValueChange}>
      <NativeSelectOption value="beijing">北京</NativeSelectOption>
      <NativeSelectOption value="shanghai">上海</NativeSelectOption>
    </NativeSelect>,
  );

  await userEvent.selectOptions(screen.getByLabelText("城市"), "上海");
  expect(onValueChange).toHaveBeenCalledWith("shanghai");
});

test("placeholder option shows the locale text and is disabled when required", () => {
  render(
    <NativeSelect aria-label="城市" placeholder required>
      <NativeSelectOption value="beijing">北京</NativeSelectOption>
    </NativeSelect>,
  );

  const select = screen.getByLabelText<HTMLSelectElement>("城市");
  expect(select.value).toBe("");
  expect(select.options[0]).toHaveTextContent("请选择");
  expect(select.options[0]).toBeDisabled();
});

test("a non-required placeholder can be chosen again", async () => {
  render(
    <NativeSelect aria-label="城市" defaultValue="beijing" placeholder>
      <NativeSelectOption value="beijing">北京</NativeSelectOption>
      <NativeSelectOption value="shanghai">上海</NativeSelectOption>
    </NativeSelect>,
  );

  const select = screen.getByLabelText<HTMLSelectElement>("城市");
  expect(select.options[0]).not.toBeDisabled();
  await userEvent.selectOptions(select, "");
  expect(select.value).toBe("");
});

test("inside a Field the label and the hidden name reach the native select", () => {
  const { container } = render(
    <Field>
      <FieldLabel>城市</FieldLabel>
      <NativeSelect defaultValue="beijing" name="city">
        <NativeSelectOption value="beijing">北京</NativeSelectOption>
        <NativeSelectOption value="shanghai">上海</NativeSelectOption>
      </NativeSelect>
    </Field>,
  );

  const select = screen.getByRole("combobox", { name: "城市" });
  expect(select).toHaveValue("beijing");
  expect(select).toHaveAttribute("name", "city");
  expect(container.querySelector("select")?.id).toBe(select.id);
});
