import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxClear, ComboboxControl, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "../src/components/combobox";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";

const items = ["甲", "乙", "丙"];
const parts = <><div className="flex"><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></div><ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></>;

test("query draft does not submit as a candidate; keyboard confirmation and clear update one Field value", async () => {
  function Example() {
    const [value, setValue] = useState<string | null>("甲");
    return <form><Field name="choice" invalid><FieldLabel>候选</FieldLabel><Combobox items={items} value={value} onValueChange={setValue}>{parts}</Combobox><FieldDescription>三个候选</FieldDescription><FieldError>待核对</FieldError></Field></form>;
  }
  const { container } = render(<Example />);
  const input = screen.getByRole("combobox", { name: "候选" });
  expect(input).toHaveAccessibleDescription("三个候选 待核对");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(new FormData(container.querySelector("form")!).getAll("choice")).toEqual(["甲"]);
  await userEvent.clear(input);
  await userEvent.type(input, "乙");
  expect(new FormData(container.querySelector("form")!).getAll("choice")).toEqual(["甲"]);
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(input).toHaveValue("乙");
  expect(new FormData(container.querySelector("form")!).getAll("choice")).toEqual(["乙"]);
  await userEvent.click(screen.getByRole("button", { name: "清除选择" }));
  expect(new FormData(container.querySelector("form")!).getAll("choice")).toEqual([""]);
});

test("controlled refusal and canceled changes retain the selected value, Escape preserves input focus/ref/render", async () => {
  const ref = createRef<HTMLInputElement>();
  const change = vi.fn((_value, details) => details.cancel());
  render(<Combobox items={items} value="甲" onValueChange={change}><ComboboxInput aria-label="候选" ref={ref} render={<input data-custom="yes" />} /><ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox>);
  const input = screen.getByRole("combobox");
  expect(ref.current).toBe(input);
  expect(input).toHaveAttribute("data-custom", "yes");
  await userEvent.clear(input);
  await userEvent.type(input, "乙");
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(change).toHaveBeenCalled();
  await userEvent.keyboard("{Escape}");
  expect(input).toHaveFocus();
  await userEvent.tab();
  await waitFor(() => expect(input).toHaveValue("甲"));
});

test.each(["readOnly", "disabled", "fieldDisabled"])("%s prevents candidate changes and preserves correct submission", async state => {
  const change = vi.fn();
  const { container } = render(<form><Field name="choice" disabled={state === "fieldDisabled"}><FieldLabel>候选</FieldLabel><Combobox items={items} defaultValue="甲" onValueChange={change} disabled={state === "disabled"} readOnly={state === "readOnly"}>{parts}</Combobox></Field></form>);
  await userEvent.click(screen.getByRole("button", { name: "展开选项" }));
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "乙" } });
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).getAll("choice")).toEqual(state === "readOnly" ? ["甲"] : []);
  await waitFor(() => expect(screen.queryByRole("option")).not.toBeInTheDocument());
});

test("multiple confirms a set: each value is a removable chip and its own form entry", async () => {
  function Example() {
    const [value, setValue] = useState<string[]>(["甲"]);
    return <form><Field name="choices"><FieldLabel>候选</FieldLabel><Combobox multiple items={items} value={value} onValueChange={setValue}>
      <ComboboxControl><ComboboxChips><ComboboxValue>{(selected: string[]) => selected.map(item => <ComboboxChip key={item}>{item}</ComboboxChip>)}</ComboboxValue><ComboboxInput /></ComboboxChips><ComboboxTrigger /></ComboboxControl>
      <ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
    </Combobox></Field></form>;
  }
  const { container } = render(<Example />);
  const form = () => new FormData(container.querySelector("form")!).getAll("choices");
  const input = screen.getByRole("combobox", { name: "候选" });
  expect(form()).toEqual(["甲"]);
  await userEvent.type(input, "乙");
  // 过滤草稿不是候选值。
  expect(form()).toEqual(["甲"]);
  await userEvent.keyboard("{ArrowDown}{Enter}");
  expect(form()).toEqual(["甲", "乙"]);
  expect(input).toHaveValue("");
  expect(container.querySelectorAll("[data-slot=combobox-chip]")).toHaveLength(2);
  await userEvent.click(screen.getByRole("button", { name: "移除 甲" }));
  expect(form()).toEqual(["乙"]);
});

test("read-only multiple shows its values without remove actions", () => {
  render(<Combobox multiple readOnly items={items} defaultValue={["甲", "丙"]}>
    <ComboboxControl><ComboboxChips><ComboboxValue>{(selected: string[]) => selected.map(item => <ComboboxChip key={item}>{item}</ComboboxChip>)}</ComboboxValue><ComboboxInput aria-label="候选" /></ComboboxChips></ComboboxControl>
  </Combobox>);
  expect(screen.getByText("甲")).toBeInTheDocument();
  expect(screen.getByText("丙")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /移除/ })).not.toBeInTheDocument();
});
