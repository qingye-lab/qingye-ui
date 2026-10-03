import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { Label } from "../src/components/label";
import { NativeSelect } from "../src/components/native-select";

test("native label, optgroup and selected value remain part of the actual form", async () => {
  const { container } = render(<form><Label htmlFor="choice">选项</Label><NativeSelect id="choice" name="choice" defaultValue="a"><optgroup label="可用"><option value="a">一</option><option value="b">二</option></optgroup><optgroup label="不可用" disabled><option value="c">三</option></optgroup></NativeSelect></form>);
  const select = screen.getByRole("combobox", { name: "选项" });
  expect(select.tagName).toBe("SELECT");
  await userEvent.selectOptions(select, "b");
  await userEvent.selectOptions(select, "c");
  expect(select).toHaveValue("b");
  expect(new FormData(container.querySelector("form")!).get("choice")).toBe("b");
  expect(screen.getByRole("group", { name: "不可用" })).toBeDisabled();
});

test("multiple and native size preserve array form values and platform list capacity", async () => {
  const { container } = render(<form><NativeSelect aria-label="选项" name="choice" multiple size={4} controlSize="xl" defaultValue={["a"]}><option value="a">一</option><option value="b">二</option><option value="c">三</option></NativeSelect></form>);
  const select = screen.getByRole("listbox", { name: "选项" });
  await userEvent.selectOptions(select, ["a", "b"]);
  expect(select).toHaveAttribute("size", "4");
  expect(select).toHaveValue(["a", "b"]);
  expect(select).toHaveClass("text-control-xl-mobile");
  expect(select).not.toHaveClass("min-h-(--qy-control-xl-narrow)");
  expect(new FormData(container.querySelector("form")!).getAll("choice")).toEqual(["a", "b"]);
});

test("disabled native select does not submit or change while controlled changes remain application-owned", async () => {
  const change = vi.fn();
  const { container } = render(<form><NativeSelect aria-label="选项" name="choice" disabled defaultValue="a" onChange={change}><option value="a">一</option><option value="b">二</option></NativeSelect></form>);
  await userEvent.selectOptions(screen.getByRole("combobox"), "b");
  expect(change).not.toHaveBeenCalled();
  expect(screen.getByRole("combobox")).toHaveValue("a");
  expect(new FormData(container.querySelector("form")!).has("choice")).toBe(false);
});

test("controlled selection uses the native onChange chain", async () => {
  function Fixture() {
    const [value, setValue] = useState("a");
    return <NativeSelect aria-label="选项" value={value} onChange={event => setValue(event.target.value)}><option value="a">一</option><option value="b">二</option></NativeSelect>;
  }
  render(<Fixture />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "b");
  expect(screen.getByRole("combobox")).toHaveValue("b");
});

test("FieldControl render composes single-value selection with one name and declared error", async () => {
  render(<Field name="choice" invalid><FieldLabel>选项</FieldLabel><FieldControl render={<NativeSelect defaultValue="a"><option value="a">一</option><option value="b">二</option></NativeSelect>} /><FieldDescription>说明</FieldDescription><FieldError>不可用</FieldError></Field>);
  const select = screen.getByRole("combobox", { name: "选项" });
  expect(select).toHaveAttribute("aria-invalid", "true");
  expect(select).toHaveAccessibleDescription("说明 不可用");
  await userEvent.selectOptions(select, "b");
  expect(select).toHaveValue("b");
});

test("native attrs, render events, ref and class precedence remain at the select", () => {
  const ref = createRef<HTMLSelectElement>();
  const caller = vi.fn();
  const rendered = vi.fn();
  render(<NativeSelect aria-label="选项" ref={ref} required autoComplete="off" className="px-0" render={<select data-rendered="yes" onChange={rendered} />} onChange={caller}><option value="">请选择</option><option value="a">一</option></NativeSelect>);
  const select = screen.getByRole("combobox");
  expect(ref.current).toBe(select);
  expect(select).toHaveAttribute("required");
  expect(select).toHaveAttribute("data-rendered", "yes");
  expect(select).toHaveClass("px-0");
  expect(select).not.toHaveClass("px-(--qy-control-md-padding-bordered)");
  expect((select as HTMLSelectElement).validity.valid).toBe(false);
  fireEvent.change(select, { target: { value: "a" } });
  expect(caller).toHaveBeenCalledOnce();
  expect(rendered).toHaveBeenCalledOnce();
});
