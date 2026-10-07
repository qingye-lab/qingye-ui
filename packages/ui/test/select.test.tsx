import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "../src/components/select";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const items = [{ value: "alpha", label: "Alpha" }, { value: "beta", label: "Beta" }, { value: "charlie", label: "Charlie" }, { value: "delta", label: "Delta" }];
function Options() { return <>{items.map(item => <SelectItem key={item.value} value={item.value} disabled={item.value === "beta"}>{item.label}</SelectItem>)}</>; }
function Fixture() { return <Select items={items}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>; }

test("no initial selection displays the localized placeholder, never the first value", () => {
  render(<Fixture />);
  expect(screen.getByRole("combobox", { name: "选项" })).toHaveTextContent("请选择");
  expect(document.querySelector("[data-slot=select-value]")).toHaveAttribute("data-placeholder");
});

test("an explicit trigger name takes precedence over the enclosing FieldLabel", () => {
  render(<Field><FieldLabel>选项</FieldLabel><Select items={items} defaultValue="alpha"><SelectTrigger aria-label="修改选项" /></Select></Field>);
  expect(screen.getByRole("combobox", { name: "修改选项" })).toHaveTextContent("Alpha");
});

test("an explicit labelledby keeps priority even when an aria-label and FieldLabel exist", () => {
  render(<><span id="select-name">外部名称</span><Field><FieldLabel>选项</FieldLabel><Select items={items}><SelectTrigger aria-label="修改选项" aria-labelledby="select-name" /></Select></Field></>);
  expect(screen.getByRole("combobox", { name: "外部名称" })).toHaveAttribute("aria-labelledby", "select-name");
});

test("FieldLabel names the trigger when the caller supplies no accessible name", () => {
  render(<Field><FieldLabel>选项</FieldLabel><Select items={items}><SelectTrigger /></Select></Field>);
  expect(screen.getByRole("combobox", { name: "选项" })).toBeInTheDocument();
});

test("localization and the caller's explicit placeholder use the same Value part", () => {
  const { rerender } = render(<UILocaleProvider locale={enUS}><Fixture /></UILocaleProvider>);
  expect(screen.getByRole("combobox")).toHaveTextContent("Select…");
  rerender(<Select><SelectTrigger aria-label="选项"><SelectValue placeholder="选择一项" /></SelectTrigger></Select>);
  expect(screen.getByRole("combobox")).toHaveTextContent("选择一项");
});

test("empty value labels work in records and groups, with truthful render and style state", () => {
  const record = { "": "空值", alpha: "分组" };
  const fixture = (items: typeof record | { label: string; items: { value: string; label: string }[] }[]) => <Select items={items} value=""><SelectTrigger aria-label="选项" className={state => state.placeholder ? "caller-placeholder" : "caller-selected"}><SelectValue className={state => state.placeholder ? "value-placeholder" : "value-selected"} render={(props, state) => <span {...props} data-caller-placeholder={String(state.placeholder)} />} /></SelectTrigger></Select>;
  const { rerender } = render(fixture(record));
  expect(screen.getByRole("combobox")).toHaveTextContent("空值");
  expect(screen.getByRole("combobox")).toHaveClass("caller-selected");
  expect(screen.getByRole("combobox")).not.toHaveAttribute("data-placeholder");
  expect(document.querySelector("[data-slot=select-value]")).toHaveClass("value-selected");
  expect(document.querySelector("[data-slot=select-value]")).toHaveAttribute("data-caller-placeholder", "false");
  rerender(fixture([{ label: "选项", items: [{ value: "", label: "空值说明" }] }]));
  expect(screen.getByRole("combobox")).toHaveTextContent("空值说明");
});

test("custom Value formatting keeps the actual empty string and has priority over the label mapping", () => {
  render(<Select items={{ "": "空值" }} defaultValue=""><SelectTrigger aria-label="选项"><SelectValue>{value => value === "" ? "自定义空值" : String(value)}</SelectValue></SelectTrigger></Select>);
  expect(screen.getByRole("combobox")).toHaveTextContent("自定义空值");
  expect(document.querySelector("[data-slot=select-value]")).not.toHaveAttribute("data-placeholder");
});

test("controlled open waits for the application, while defaultOpen is an actual initial expansion", async () => {
  const change = vi.fn();
  const fixture = (open: boolean) => <Select items={items} open={open} onOpenChange={change}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>;
  const { rerender, unmount } = render(fixture(false));
  await userEvent.click(screen.getByRole("combobox"));
  expect(change).toHaveBeenCalledWith(true, expect.any(Object));
  expect(screen.queryByRole("listbox")).toBeNull();
  rerender(fixture(true));
  expect(await screen.findByRole("listbox")).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  expect(change).toHaveBeenLastCalledWith(false, expect.any(Object));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  unmount();
  render(<Select items={items} defaultOpen><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>);
  expect(await screen.findByRole("listbox")).toBeInTheDocument();
});

test("arrows and Home/End move highlight; disabled items cannot be chosen and Enter selects an enabled value", async () => {
  const user = userEvent.setup();
  render(<Fixture />);
  await user.tab();
  await user.keyboard("{ArrowDown}");
  await screen.findByRole("listbox");
  expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute("data-highlighted");
  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("option", { name: "Beta" })).toHaveAttribute("data-highlighted");
  await user.keyboard("{Enter}");
  expect(screen.getByRole("combobox")).toHaveTextContent("请选择");
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  await user.keyboard("{ArrowDown}");
  expect(screen.getByRole("option", { name: "Charlie" })).toHaveAttribute("data-highlighted");
  expect(screen.getByRole("combobox")).toHaveTextContent("请选择");
  expect(screen.getByRole("option", { name: "Charlie" })).toHaveAttribute("aria-selected", "false");
  await user.keyboard("{End}");
  expect(screen.getByRole("option", { name: "Delta" })).toHaveAttribute("data-highlighted");
  await user.keyboard("{Home}");
  expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute("data-highlighted");
  await user.keyboard("{Enter}");
  await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
  expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
});

test("keyboard typeahead highlights a matching item without changing the value", async () => {
  const user = userEvent.setup();
  render(<Fixture />);
  await user.tab();
  await user.keyboard("{Enter}char");
  await waitFor(() => expect(screen.getByRole("option", { name: "Charlie" })).toHaveAttribute("data-highlighted"));
  expect(screen.getByRole("combobox")).toHaveTextContent("请选择");
  await user.keyboard("{Enter}");
  expect(screen.getByRole("combobox")).toHaveTextContent("Charlie");
});

test("Esc closes and returns to its trigger, preserving the selected value", async () => {
  const user = userEvent.setup();
  render(<Select items={items} defaultValue="alpha"><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>);
  await user.tab();
  await user.keyboard("{Enter}{End}{Escape}");
  await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
  expect(screen.getByRole("combobox")).toHaveFocus();
  expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
});

test("selected and highlighted are separate simultaneous facts", async () => {
  render(<Select items={items} defaultValue="alpha"><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>);
  await userEvent.tab();
  await userEvent.keyboard("{Enter}{End}");
  expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("option", { name: "Alpha" })).toHaveAttribute("data-selected");
  expect(screen.getByRole("option", { name: "Delta" })).toHaveAttribute("data-highlighted");
  expect(screen.getByRole("option", { name: "Delta" })).toHaveAttribute("aria-selected", "false");
});

test("controlled values wait for application updates and return to null without inventing defaults", async () => {
  const change = vi.fn();
  const fixture = (value: string | null) => <Select value={value} items={items} onValueChange={change}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>;
  const { rerender } = render(fixture(null));
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "Charlie" }));
  expect(change).toHaveBeenCalledWith("charlie", expect.any(Object));
  expect(screen.getByRole("combobox")).toHaveTextContent("请选择");
  rerender(fixture("charlie"));
  expect(screen.getByRole("combobox")).toHaveTextContent("Charlie");
  rerender(fixture(null));
  expect(screen.getByRole("combobox")).toHaveTextContent("请选择");
});

test("uncontrolled values and caller cancellation keep the original choice", async () => {
  render(<Select items={items} defaultValue="alpha" onValueChange={(_, details) => details.cancel()}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>);
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "Charlie" }));
  expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
});

test("empty string and zero keep their labels and serialize as distinct real values", async () => {
  const values = [{ value: "", label: "空值" }, { value: 0, label: "零值" }];
  const { container } = render(<form><Select name="choice" items={values}><SelectTrigger aria-label="选项" /><SelectPopup>{values.map(item => <SelectItem key={String(item.value)} value={item.value}>{item.label}</SelectItem>)}</SelectPopup></Select></form>);
  const form = container.querySelector("form")!;
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "空值" }));
  expect(screen.getByRole("combobox")).toHaveTextContent("空值");
  expect(document.querySelector("[data-slot=select-value]")).not.toHaveAttribute("data-placeholder");
  expect(new FormData(form).get("choice")).toBe("");
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "零值" }));
  expect(screen.getByRole("combobox")).toHaveTextContent("零值");
  expect(new FormData(form).getAll("choice")).toEqual(["0"]);
});

test("Field label activates the trigger and description/error ids reach that same control", async () => {
  render(<Field invalid><FieldLabel>选项</FieldLabel><Select items={items}><SelectTrigger /><SelectPopup><Options /></SelectPopup></Select><FieldDescription id="choice-help">说明</FieldDescription><FieldError id="choice-error">输入无效</FieldError></Field>);
  const trigger = screen.getByRole("combobox", { name: "选项" });
  expect(trigger).toHaveAttribute("aria-invalid", "true");
  expect(trigger).toHaveAccessibleDescription("说明 输入无效");
  expect(trigger.getAttribute("aria-describedby")?.split(/\s+/)).toEqual(expect.arrayContaining(["choice-help", "choice-error"]));
  await userEvent.click(screen.getByText("选项"));
  expect(await screen.findByRole("listbox")).toBeInTheDocument();
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
  expect(trigger).toHaveFocus();
});

test("required, blur and a supplied error never infer invalid or destroy an existing value", async () => {
  const fixture = (invalid: boolean) => <Field invalid={invalid}><FieldLabel>选项</FieldLabel><Select required defaultValue="alpha" items={items}><SelectTrigger /><SelectPopup><Options /></SelectPopup></Select><FieldError>应用校验</FieldError></Field>;
  const { container, rerender } = render(fixture(false));
  await userEvent.tab(); await userEvent.tab();
  fireEvent.invalid(container.querySelector("input")!);
  expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-invalid", "true");
  rerender(fixture(true));
  expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  rerender(fixture(false));
  expect(screen.getByRole("combobox")).not.toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
});

test("application updates receive the chosen value and form submission uses it", async () => {
  function Controlled() {
    const [value, setValue] = useState<string | null>(null);
    return <form data-testid="form"><Select items={items} name="choice" value={value} onValueChange={setValue}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select></form>;
  }
  render(<Controlled />);
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "Delta" }));
  expect(new FormData(screen.getByTestId("form") as HTMLFormElement).get("choice")).toBe("delta");
});

test("disabled items ignore clicks, disabled Field prevents opening and is excluded from submission", async () => {
  const change = vi.fn();
  const { container, rerender } = render(<Select items={items} onValueChange={change}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>);
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(await screen.findByRole("option", { name: "Beta" }));
  expect(change).not.toHaveBeenCalled();
  expect(screen.getByRole("combobox")).toHaveTextContent("请选择");
  rerender(<form><Field disabled><Select name="choice" items={items} defaultValue="alpha"><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select></Field><button>继续</button></form>);
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "继续" })).toHaveFocus();
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(new FormData(container.querySelector("form")!).has("choice")).toBe(false);
});

test("readonly retains form data, remains focusable and cannot open", async () => {
  const change = vi.fn();
  const { container } = render(<form><Select readOnly name="choice" items={items} defaultValue="alpha" onValueChange={change}><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select></form>);
  await userEvent.tab();
  expect(screen.getByRole("combobox")).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(screen.queryByRole("listbox")).toBeNull();
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("choice")).toBe("alpha");
});

test("removing candidates during a failed refresh does not silently clear the selected value", async () => {
  const fixture = (failed: boolean) => <Select defaultValue="alpha" items={items} name="choice"><SelectTrigger aria-label="选项" /><SelectPopup>{failed ? <p>选项无法加载</p> : <Options />}</SelectPopup></Select>;
  const { rerender } = render(fixture(false));
  rerender(fixture(true));
  expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
  await userEvent.click(screen.getByRole("combobox"));
  expect(await screen.findByText("选项无法加载")).toBeInTheDocument();
  expect(screen.getByRole("combobox")).toHaveTextContent("Alpha");
});

test("refs, consumer render/styles/ARIA, explicit Portal container and group semantics survive", async () => {
  const ref = createRef<HTMLButtonElement>();
  const portal = document.createElement("div");
  document.body.append(portal);
  try {
    render(<Select items={items}><SelectTrigger ref={ref} render={<button data-rendered="yes" />} aria-label="选项" aria-describedby="extra" className="caller-trigger" style={{ color: "var(--qy-foreground)" }} /><SelectPopup container={portal}><SelectGroup><SelectGroupLabel>分组</SelectGroupLabel><Options /></SelectGroup></SelectPopup></Select>);
    const trigger = screen.getByRole("combobox");
    expect(ref.current).toBe(trigger);
    expect(trigger).toHaveAttribute("data-rendered", "yes");
    expect(trigger).toHaveAttribute("aria-describedby", "extra");
    expect(trigger).toHaveClass("caller-trigger");
    expect(trigger).toHaveStyle({ color: "var(--qy-foreground)" });
    await userEvent.click(trigger);
    expect(await screen.findByRole("group", { name: "分组" })).toBeInTheDocument();
    expect(portal.querySelector("[data-slot=select-popup]")).not.toBeNull();
  } finally { portal.remove(); }
});

test("a set value without items warns in development, because the trigger can only show the raw value", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const { unmount } = render(<Select defaultValue="alpha"><SelectTrigger aria-label="选项" /><SelectPopup><Options /></SelectPopup></Select>);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining("`items` is missing"));
  unmount();
  warn.mockClear();
  render(<Fixture />);
  expect(warn).not.toHaveBeenCalled();
  warn.mockRestore();
});
