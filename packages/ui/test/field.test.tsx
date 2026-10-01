import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Button } from "../src/components/button";
import { Switch } from "../src/components/switch";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "../src/components/field";
import { Fieldset, FieldsetLegend } from "../src/components/fieldset";
import { Form } from "../src/components/form";
import { Input } from "../src/components/input";

test("renders given content immediately and links it to the control", () => {
  render(
    <Field invalid>
      <FieldLabel>邮箱</FieldLabel>
      <Input />
      <FieldError>邮箱格式不正确</FieldError>
    </Field>,
  );
  const input = screen.getByLabelText("邮箱");
  const error = screen.getByText("邮箱格式不正确");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input.getAttribute("aria-describedby")).toContain(error.id);
});

test("collapses form-library errors and lists distinct messages", async () => {
  const { rerender } = render(
    <Field invalid>
      <Input aria-label="密码" />
      <FieldError errors={[{ message: "至少 8 位" }, undefined, { message: "至少 8 位" }]} />
    </Field>,
  );
  expect(screen.getByText("至少 8 位").tagName).toBe("DIV");

  rerender(
    <Field invalid>
      <Input aria-label="密码" />
      <FieldError errors={[{ message: "至少 8 位" }, { message: "至少包含 1 个数字" }]} />
    </Field>,
  );
  expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual(["至少 8 位", "至少包含 1 个数字"]);

  rerender(
    <Field>
      <Input aria-label="密码" />
      <FieldError errors={[]} />
    </Field>,
  );
  // The node stays mounted for its exit transition, then removes itself.
  await waitFor(() => expect(document.querySelector("[data-slot=field-error]")).toBeNull());
});

test("without content, follows Base UI: shows Form errors by field name", async () => {
  const user = userEvent.setup();
  render(
    <Form errors={{ code: "编号已被占用" }}>
      <Field name="code">
        <FieldLabel>设备编号</FieldLabel>
        <Input defaultValue="HZ-031" />
        <FieldError />
      </Field>
    </Form>,
  );
  expect(screen.getByText("编号已被占用")).toBeInTheDocument();
  await user.type(screen.getByLabelText("设备编号"), "2");
  // Clearing the message starts an exit transition; the text is gone from the
  // accessibility tree immediately, the node unmounts once it settles.
  await waitFor(() => expect(screen.queryByText("编号已被占用")).not.toBeInTheDocument());
});

test("match ties a custom message to one validity state on submit", async () => {
  const user = userEvent.setup();
  render(
    <Form onSubmit={(event) => event.preventDefault()}>
      <Field name="email">
        <FieldLabel>工作邮箱</FieldLabel>
        <Input required type="email" />
        <FieldError match="valueMissing">请填写工作邮箱</FieldError>
        <FieldError match="typeMismatch">邮箱格式不正确</FieldError>
      </Field>
      <Button type="submit">提交</Button>
    </Form>,
  );
  expect(screen.queryByText("请填写工作邮箱")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "提交" }));
  expect(screen.getByText("请填写工作邮箱")).toBeInTheDocument();
  expect(screen.queryByText("邮箱格式不正确")).not.toBeInTheDocument();
  expect(screen.getByLabelText("工作邮箱")).toHaveFocus();
});

test("renders standalone outside a Field", () => {
  render(<FieldError role="alert">文件过大</FieldError>);
  expect(screen.getByRole("alert")).toHaveTextContent("文件过大");
  expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "field-error");
});

test("orientation switches the layout and is exposed as a data attribute", () => {
  const { container, rerender } = render(
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel>每周运维报告</FieldLabel>
      </FieldContent>
      <Switch />
    </Field>,
  );
  const vertical = container.querySelector('[data-slot="field"]')!;
  expect(vertical).toHaveAttribute("data-orientation", "horizontal");

  rerender(
    <Field>
      <FieldLabel>组织 ID</FieldLabel>
      <Input />
    </Field>,
  );
  expect(container.querySelector('[data-slot="field"]')).toHaveAttribute(
    "data-orientation",
    "vertical",
  );
});

test("a horizontal field still links its label and description to the control", () => {
  render(
    <Field orientation="horizontal">
      <FieldContent>
        <FieldLabel>设备离线提醒</FieldLabel>
      </FieldContent>
      <Switch />
    </Field>,
  );
  expect(screen.getByRole("switch", { name: "设备离线提醒" })).toBeInTheDocument();
});

test("FieldGroup, FieldTitle and FieldSeparator keep their slots", () => {
  render(
    <FieldGroup className="gap-8">
      <Field>
        <FieldTitle>配送时段</FieldTitle>
        <Input aria-label="配送备注" />
      </Field>
      <FieldSeparator>或</FieldSeparator>
      <Field>
        <FieldLabel>手机号</FieldLabel>
        <Input />
      </Field>
    </FieldGroup>,
  );
  const group = screen.getByText("配送时段").closest("[data-slot=field-group]");
  expect(group).not.toBeNull();
  // External classes win over the internal gap.
  expect(group).toHaveClass("gap-8");
  expect(screen.getByText("配送时段")).toHaveAttribute("data-slot", "field-title");
  expect(
    document.querySelector("[data-slot=field-separator]"),
  ).toHaveTextContent("或");
});

test("FieldSet and FieldLegend alias the Fieldset parts and disable the whole group", () => {
  render(
    <Fieldset disabled>
      <FieldsetLegend>开户资料</FieldsetLegend>
      <Field>
        <FieldLabel>开户银行</FieldLabel>
        <Input defaultValue="招商银行杭州分行" />
      </Field>
    </Fieldset>,
  );
  const group = document.querySelector("[data-slot=fieldset]")!;
  expect(group.tagName).toBe("FIELDSET");
  expect(group).toBeDisabled();
  expect(screen.getByLabelText("开户银行")).toBeDisabled();
  // The legend labels the group, so a reader hears it before the controls.
  const legend = document.querySelector("[data-slot=fieldset-legend]")!;
  expect(group.getAttribute("aria-labelledby")).toBe(legend.id);
  expect(legend).toHaveTextContent("开户资料");
});

test("a field-set legend labelled as a question names the group for its controls", () => {
  render(
    <Fieldset>
      <FieldsetLegend variant="label">通过哪些方式通知你？</FieldsetLegend>
      <Field orientation="horizontal">
        <Switch defaultChecked />
        <FieldLabel>短信</FieldLabel>
      </Field>
    </Fieldset>,
  );
  const legend = screen.getByText("通过哪些方式通知你？");
  expect(legend).toHaveAttribute("data-variant", "label");
  expect(document.querySelector("[data-slot=fieldset]")!.getAttribute("aria-labelledby")).toBe(
    legend.id,
  );
});
