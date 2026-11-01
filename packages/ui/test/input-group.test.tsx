import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { Field, FieldControl, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupNumberField, InputGroupSelectTrigger, InputGroupText, InputGroupTextarea } from "../src/components/input-group";
import { NumberFieldGroup, NumberFieldInput } from "../src/components/number-field";
import { Select, SelectItem, SelectPopup } from "../src/components/select";

test("long static addons retain the real input name, description and form value without becoming submitted fields", async () => {
  const attachment = "VeryLongContinuousAttachmentNameWithoutBreaks";
  const { container } = render(<form><Field name="amount"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupAddon>{attachment}</InputGroupAddon><InputGroupInput defaultValue="1" /><InputGroupAddon>{attachment}</InputGroupAddon></InputGroup><FieldDescription>单位为像素</FieldDescription></Field></form>);
  const input = screen.getByRole("textbox", { name: "数值" });
  expect(input).toHaveAccessibleDescription("单位为像素");
  await userEvent.type(input, "2");
  expect(Array.from(new FormData(container.querySelector("form")!).entries())).toEqual([["amount", "12"]]);
  expect(screen.getAllByText(attachment)).toHaveLength(2);
});

test("static addons do not enter the tab order or redirect focus, explicit actions keep their own focus", async () => {
  const user = userEvent.setup();
  const action = vi.fn();
  render(<InputGroup><InputGroupAddon>px</InputGroupAddon><InputGroupInput aria-label="数值" /><InputGroupAddon><Button variant="quiet" onClick={action}>应用</Button></InputGroupAddon></InputGroup>);
  await user.tab();
  expect(screen.getByRole("textbox")).toHaveFocus();
  await user.click(screen.getByText("px"));
  expect(screen.getByText("px")).not.toHaveAttribute("tabindex");
  expect(screen.getByRole("textbox")).not.toHaveFocus();
  await user.click(screen.getByRole("button", { name: "应用" }));
  expect(screen.getByRole("button")).toHaveFocus();
  expect(action).toHaveBeenCalledOnce();
});

test("Field disabled and readonly values remain real native states", async () => {
  const { container } = render(<form><Field disabled name="disabled"><FieldLabel>禁用</FieldLabel><InputGroup><InputGroupInput defaultValue="omit" /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field name="readonly"><FieldLabel>只读值</FieldLabel><InputGroup><InputGroupInput readOnly defaultValue="keep" /></InputGroup></Field></form>);
  expect(screen.getByRole("textbox", { name: "禁用" })).toBeDisabled();
  await userEvent.type(screen.getByRole("textbox", { name: "只读值" }), "edit");
  expect(screen.getByRole("textbox", { name: "只读值" })).toHaveValue("keep");
  const data = new FormData(container.querySelector("form")!);
  expect(data.has("disabled")).toBe(false);
  expect(data.get("readonly")).toBe("keep");
});

test("FieldControl can register the native outlet once while the common boundary retains declared invalid", () => {
  render(<Field invalid><FieldLabel>数值</FieldLabel><InputGroup><FieldControl render={<InputGroupInput nativeInput defaultValue="draft" />} /><InputGroupAddon>px</InputGroupAddon></InputGroup><FieldError>不可用</FieldError></Field>);
  expect(screen.getByRole("textbox", { name: "数值" })).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("textbox")).toHaveAccessibleDescription("不可用");
  expect(screen.getByRole("textbox")).toHaveValue("draft");
});

test("root and addon render, refs, native props and caller classes compose independently of the input", async () => {
  const root = createRef<HTMLDivElement>();
  const input = createRef<HTMLInputElement>();
  const addon = createRef<HTMLSpanElement>();
  const changed = vi.fn();
  render(<InputGroup ref={root} data-owner="caller" className="w-auto" render={<section />}><InputGroupInput ref={input} aria-label="数值" id="number" onChange={changed} render={<input data-rendered="yes" />} /><InputGroupAddon ref={addon} className="px-0" render={<span id="unit" />}>px</InputGroupAddon></InputGroup>);
  expect(root.current?.tagName).toBe("SECTION");
  expect(root.current).toHaveAttribute("data-owner", "caller");
  expect(root.current).toHaveClass("w-auto");
  expect(input.current).toBe(screen.getByRole("textbox"));
  expect(addon.current).toHaveAttribute("id", "unit");
  expect(addon.current).toHaveClass("px-0");
  await userEvent.type(input.current!, "1");
  expect(changed).toHaveBeenCalledOnce();
});

test("InputGroupButton is a named action inside the boundary: frameless, inner-height square for icons, label padding kept for text", async () => {
  const user = userEvent.setup();
  const clear = vi.fn();
  render(<InputGroup><InputGroupInput aria-label="标题" defaultValue="季度复盘" /><InputGroupButton shape="icon" aria-label="清空标题" onClick={clear}><svg aria-hidden="true" /></InputGroupButton><InputGroupButton>应用</InputGroupButton></InputGroup>);
  const icon = screen.getByRole("button", { name: "清空标题" });
  const label = screen.getByRole("button", { name: "应用" });
  for (const button of [icon, label]) {
    expect(button).toHaveAttribute("data-slot", "input-group-button");
    expect(button).toHaveAttribute("data-variant", "quiet");
  }
  await user.click(icon);
  expect(clear).toHaveBeenCalledOnce();
  expect(icon).toHaveFocus();
});

test("loading marks the boundary busy and speaks once, while the input stays editable and submitted", async () => {
  const { container } = render(<form><InputGroup loading><InputGroupInput name="q" aria-label="搜索" /></InputGroup></form>);
  const group = container.querySelector("[data-slot=input-group]")!;
  expect(group).toHaveAttribute("aria-busy", "true");
  expect(screen.getByRole("status")).toHaveTextContent("正在加载");
  expect(container.querySelector("[data-slot=input-group-busy]")).toHaveAttribute("aria-hidden", "true");
  await userEvent.type(screen.getByRole("textbox", { name: "搜索" }), "青叶");
  expect(new FormData(container.querySelector("form")!).get("q")).toBe("青叶");
});

test("without loading there is no busy mark, status or aria-busy", () => {
  const { container } = render(<InputGroup><InputGroupInput aria-label="搜索" /></InputGroup>);
  expect(container.querySelector("[data-slot=input-group]")).not.toHaveAttribute("aria-busy");
  expect(container.querySelector("[data-slot=input-group-busy]")).toBeNull();
  expect(screen.queryByRole("status")).toBeNull();
});

test("a textarea member keeps its name, description and form value, with block addons around it", async () => {
  const { container } = render(<form><Field name="note"><FieldLabel>备注</FieldLabel><InputGroup><InputGroupAddon align="block-start"><InputGroupText>描述</InputGroupText></InputGroupAddon><InputGroupTextarea /><InputGroupAddon align="block-end">0 / 200</InputGroupAddon></InputGroup><FieldDescription>最多 200 字</FieldDescription></Field></form>);
  const textarea = screen.getByRole("textbox", { name: "备注" });
  expect(textarea).toHaveAccessibleDescription("最多 200 字");
  await userEvent.type(textarea, "第一行");
  expect(new FormData(container.querySelector("form")!).get("note")).toBe("第一行");
  expect(screen.getByText("描述").closest("[data-slot=input-group-addon]")).toHaveAttribute("data-align", "block-start");
  expect(screen.getByText("0 / 200")).toHaveAttribute("data-align", "block-end");
});

test("addons without align keep DOM order and carry no align fact", () => {
  render(<InputGroup><InputGroupAddon>px</InputGroupAddon><InputGroupInput aria-label="数值" /></InputGroup>);
  expect(screen.getByText("px")).not.toHaveAttribute("data-align");
});

test("InputGroupText is static: not focusable and not a form field", async () => {
  const user = userEvent.setup();
  render(<InputGroup><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupInput aria-label="网址" /></InputGroup>);
  await user.tab();
  expect(screen.getByRole("textbox")).toHaveFocus();
  expect(screen.getByText("https://")).toHaveAttribute("data-slot", "input-group-text");
  expect(screen.getByText("https://")).not.toHaveAttribute("tabindex");
});

test("number range: two named number inputs and a text separator share one boundary and submit separately", async () => {
  const { container } = render(<form><InputGroup role="group" aria-label="价格区间">
    <InputGroupNumberField name="min" defaultValue={10}><NumberFieldGroup unstyled><NumberFieldInput aria-label="最低价" /></NumberFieldGroup></InputGroupNumberField>
    <InputGroupAddon><InputGroupText>至</InputGroupText></InputGroupAddon>
    <InputGroupNumberField name="max" defaultValue={20}><NumberFieldGroup unstyled><NumberFieldInput aria-label="最高价" /></NumberFieldGroup></InputGroupNumberField>
  </InputGroup></form>);
  const group = screen.getByRole("group", { name: "价格区间" });
  expect(group.querySelectorAll("input[inputmode], input[aria-roledescription]").length).toBeGreaterThanOrEqual(2);
  const min = screen.getByRole("textbox", { name: "最低价" });
  const max = screen.getByRole("textbox", { name: "最高价" });
  expect(min).toHaveValue("10");
  await userEvent.clear(max);
  await userEvent.type(max, "35");
  const data = new FormData(container.querySelector("form")!);
  expect(data.get("min")).toBe("10");
  expect(data.get("max")).toBe("35");
  expect(screen.getByText("至")).toHaveAttribute("data-slot", "input-group-text");
});

test("a number member read-only keeps its value and is submitted; the group's read-only fact comes from the visible input", async () => {
  const { container } = render(<form><InputGroup><InputGroupNumberField name="n" defaultValue={3} readOnly><NumberFieldGroup unstyled><NumberFieldInput aria-label="数量" /></NumberFieldGroup></InputGroupNumberField></InputGroup></form>);
  await userEvent.type(screen.getByRole("textbox", { name: "数量" }), "9");
  expect(screen.getByRole("textbox", { name: "数量" })).toHaveValue("3");
  expect(new FormData(container.querySelector("form")!).get("n")).toBe("3");
  // 外框的只读说明由外框承担，成员自己不再另写一份。
  expect(container.querySelector("[data-slot=number-field-readonly]")).toBeNull();
});

test("a select trigger member opens its popup, chooses a value and submits it with the sibling input", async () => {
  const user = userEvent.setup();
  const { container } = render(<form><InputGroup>
    <Select name="currency" defaultValue="cny" items={[{ value: "cny", label: "人民币" }, { value: "usd", label: "美元" }]}>
      <InputGroupSelectTrigger aria-label="币种" />
      <SelectPopup><SelectItem value="cny">人民币</SelectItem><SelectItem value="usd">美元</SelectItem></SelectPopup>
    </Select>
    <InputGroupInput name="amount" aria-label="金额" />
  </InputGroup></form>);
  const trigger = screen.getByRole("combobox", { name: "币种" });
  expect(trigger).toHaveTextContent("人民币");
  await user.click(trigger);
  await user.click(await screen.findByRole("option", { name: "美元" }));
  expect(trigger).toHaveTextContent("美元");
  await user.type(screen.getByRole("textbox", { name: "金额" }), "88");
  const data = new FormData(container.querySelector("form")!);
  expect(data.get("currency")).toBe("usd");
  expect(data.get("amount")).toBe("88");
});
