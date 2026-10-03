import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Autocomplete, AutocompleteClear, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "../src/components/autocomplete";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";

const items = ["青叶", "青山", "白云"];
const popup = <AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup>;

test("free text is the form value; highlight remains a suggestion until explicit keyboard selection", async () => {
  const ref = createRef<HTMLInputElement>();
  function Example() {
    const [value, setValue] = useState("");
    return <form><Field name="text" invalid><FieldLabel>文字</FieldLabel><Autocomplete items={items} value={value} onValueChange={setValue}><AutocompleteInput ref={ref} render={<input data-custom="yes" />} /><AutocompleteClear />{popup}</Autocomplete><FieldDescription>可自由输入</FieldDescription><FieldError>待核对</FieldError></Field></form>;
  }
  const { container } = render(<Example />);
  const input = screen.getByRole("combobox", { name: "文字" });
  expect(ref.current).toBe(input);
  expect(input).toHaveAccessibleDescription("可自由输入 待核对");
  expect(input).toHaveAttribute("data-custom", "yes");
  await userEvent.type(input, "青");
  await userEvent.keyboard("{ArrowDown}");
  expect(input).toHaveValue("青");
  expect(new FormData(container.querySelector("form")!).getAll("text")).toEqual(["青"]);
  await userEvent.keyboard("{Enter}");
  expect(input).toHaveValue("青叶");
  expect(new FormData(container.querySelector("form")!).getAll("text")).toEqual(["青叶"]);
  await userEvent.click(screen.getByRole("button", { name: "清除选择" }));
  expect(input).toHaveValue("");
});

test("canceled text updates and Escape preserve the caller value and return input focus", async () => {
  const change = vi.fn((_value, details) => details.cancel());
  render(<Autocomplete items={items} value="青" onValueChange={change}><AutocompleteInput aria-label="文字" />{popup}</Autocomplete>);
  const input = screen.getByRole("combobox");
  await userEvent.type(input, "山");
  expect(change).toHaveBeenCalled();
  expect(input).toHaveValue("青");
  await userEvent.keyboard("{ArrowDown}{Escape}");
  expect(input).toHaveFocus();
  expect(input).toHaveValue("青");
});

test.each(["readOnly", "disabled"])("%s preserves free text and correct native submission", async state => {
  const change = vi.fn();
  const { container } = render(<form><Autocomplete items={items} name="text" defaultValue="自由文本" onValueChange={change} {...{ [state]: true }}><AutocompleteInput aria-label="文字" /><AutocompleteClear />{popup}</Autocomplete></form>);
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "青叶" } });
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).getAll("text")).toEqual(state === "readOnly" ? ["自由文本"] : []);
});
