import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Button } from "../src/components/button";
import { Field, FieldError, FieldLabel } from "../src/components/field";
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

test("collapses form-library errors and lists distinct messages", () => {
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
  expect(document.querySelector("[data-slot=field-error]")).toBeNull();
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
  expect(screen.queryByText("编号已被占用")).not.toBeInTheDocument();
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
