import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxClear, ComboboxCollection, ComboboxControl, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxSeparator, ComboboxStatus, ComboboxTrigger, ComboboxValue } from "../src/components/combobox";
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

test("grouped candidates expose each group with its label, in single and multiple mode", async () => {
  const teams = [{ value: "设计", items: ["甲", "乙"] }, { value: "工程", items: ["丙"] }];
  const list = <ComboboxList>{(group: (typeof teams)[number]) => <ComboboxGroup key={group.value} items={group.items}><ComboboxGroupLabel>{group.value}</ComboboxGroupLabel><ComboboxSeparator /><ComboboxCollection>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxCollection></ComboboxGroup>}</ComboboxList>;
  for (const multiple of [false, true]) {
    const { unmount } = render(<Combobox items={teams} multiple={multiple as never}><ComboboxInput aria-label="成员" /><ComboboxPopup>{list}</ComboboxPopup></Combobox>);
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.keyboard("{ArrowDown}");
    expect(await screen.findByRole("group", { name: "设计" })).toContainElement(screen.getByRole("option", { name: "乙" }));
    expect(screen.getByRole("group", { name: "工程" })).toContainElement(screen.getByRole("option", { name: "丙" }));
    // 组名与分隔线不是选项，不入键盘序列。
    expect(screen.getAllByRole("option")).toHaveLength(3);
    unmount();
  }
});

test("status announces loading and result count through one polite region, and at zero goes quiet while staying mounted", async () => {
  function Example({ loading, count }: { loading: boolean; count: number }) {
    return <Combobox items={items} open><ComboboxInput aria-label="位置" /><ComboboxPopup><ComboboxStatus loading={loading} count={count} /><ComboboxEmpty>没有匹配项</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox>;
  }
  const { rerender } = render(<Example loading count={0} />);
  const status = await screen.findByText("正在加载");
  expect(status).toHaveAttribute("aria-live", "polite");
  rerender(<Example loading={false} count={3} />);
  expect(status).toHaveTextContent("找到 3 项");
  rerender(<Example loading={false} count={0} />);
  expect(status).toBeEmptyDOMElement();
  expect(status.isConnected).toBe(true);
});
