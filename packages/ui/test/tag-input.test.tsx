import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { TagInput } from "../src/components/tag-input";

function tags(): string[] {
  return Array.from(
    screen.getByTestId("tag-input").querySelectorAll('[data-slot="tag-input-tag"]'),
    (node) => node.querySelector("span")?.textContent ?? "",
  );
}

test("Enter adds a tag and clears the input", async () => {
  render(<TagInput aria-label="关键词" />);
  const input = screen.getByLabelText("关键词");
  await userEvent.type(input, "设计{Enter}");
  expect(input).toHaveValue("");
  expect(tags()).toEqual(["设计"]);
});

test("a typed comma commits the tag, including the full-width comma", async () => {
  render(<TagInput aria-label="关键词" />);
  const input = screen.getByLabelText("关键词");
  await userEvent.type(input, "增长，产品设计,");
  expect(tags()).toEqual(["增长", "产品设计"]);
  expect(input).toHaveValue("");
});

test("pasting a list splits on commas and line breaks", async () => {
  const onValueChange = vi.fn();
  render(<TagInput aria-label="关键词" onValueChange={onValueChange} />);
  const input = screen.getByLabelText("关键词");
  await userEvent.click(input);
  await userEvent.paste("设计\n运营,增长");
  expect(onValueChange).toHaveBeenLastCalledWith(["设计", "运营", "增长"]);
});

test("duplicates are not added twice", async () => {
  render(<TagInput aria-label="关键词" defaultValue={["设计"]} />);
  const input = screen.getByLabelText("关键词");
  await userEvent.type(input, "设计{Enter}");
  expect(tags()).toEqual(["设计"]);
  expect(screen.getByTestId("tag-message")).toHaveTextContent("已添加");
  const announcements = [...document.querySelectorAll('[aria-live="polite"]')]
    .filter((region) => region.textContent?.includes("已添加"));
  expect(announcements).toHaveLength(1);
  expect(input.getAttribute("aria-describedby")).toContain(screen.getByTestId("tag-message").id);
});

test("Backspace on the empty input removes the last tag", async () => {
  const onValueChange = vi.fn();
  render(<TagInput aria-label="关键词" defaultValue={["设计", "运营"]} onValueChange={onValueChange} />);
  const input = screen.getByLabelText("关键词");
  await userEvent.click(input);
  await userEvent.keyboard("{Backspace}");
  expect(onValueChange).toHaveBeenLastCalledWith(["设计"]);
});

test("max keeps the text and explains the limit", async () => {
  render(<TagInput aria-label="关键词" defaultValue={["设计", "运营"]} max={2} />);
  const input = screen.getByLabelText("关键词");
  await userEvent.type(input, "增长{Enter}");
  expect(tags()).toEqual(["设计", "运营"]);
  expect(input).toHaveValue("增长");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByTestId("tag-message")).toHaveTextContent("最多添加 2 个标签");
});

test("validate rejects a tag and surfaces its message", async () => {
  const validate = (tag: string) => (tag.includes("@") ? null : "不是有效的邮箱地址");
  render(<TagInput aria-label="抄送" validate={validate} />);
  const input = screen.getByLabelText("抄送");
  await userEvent.type(input, "周屹{Enter}");
  expect(tags()).toEqual([]);
  expect(input).toHaveValue("周屹");
  expect(screen.getByTestId("tag-message")).toHaveTextContent("不是有效的邮箱地址");

  await userEvent.clear(input);
  await userEvent.type(input, "zhou@qingyun.design{Enter}");
  expect(tags()).toEqual(["zhou@qingyun.design"]);
  expect(screen.queryByTestId("tag-message")).toBeNull();
});

test("each tag is focusable with the arrow keys and removable with Backspace", async () => {
  const onValueChange = vi.fn();
  render(<TagInput aria-label="关键词" defaultValue={["设计", "运营", "增长"]} onValueChange={onValueChange} />);
  const input = screen.getByLabelText("关键词");
  await userEvent.click(input);
  await userEvent.keyboard("{ArrowLeft}");
  expect(screen.getByTestId("tag:增长")).toHaveFocus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(screen.getByTestId("tag:运营")).toHaveFocus();
  await userEvent.keyboard("{Delete}");
  expect(onValueChange).toHaveBeenLastCalledWith(["设计", "增长"]);
  expect(screen.getByTestId("tag:增长")).toHaveFocus();
});

test("the remove button is labelled per tag", async () => {
  const onValueChange = vi.fn();
  render(<TagInput aria-label="关键词" defaultValue={["设计"]} onValueChange={onValueChange} />);
  await userEvent.click(screen.getByRole("button", { name: "移除 设计" }));
  expect(onValueChange).toHaveBeenLastCalledWith([]);
});

test("addOnBlur commits the pending text", async () => {
  render(
    <>
      <TagInput aria-label="关键词" />
      <button type="button">别处</button>
    </>,
  );
  const input = screen.getByLabelText("关键词");
  await userEvent.type(input, "增长");
  await userEvent.click(screen.getByRole("button", { name: "别处" }));
  expect(tags()).toEqual(["增长"]);
});

test("controlled usage submits one hidden input per tag", async () => {
  function Form() {
    const [value, setValue] = useState<string[]>(["设计"]);
    return (
      <form aria-label="表单">
        <TagInput aria-label="关键词" name="keywords" onValueChange={setValue} value={value} />
      </form>
    );
  }
  render(<Form />);
  await userEvent.type(screen.getByLabelText("关键词"), "运营{Enter}");
  const data = new FormData(screen.getByRole("form", { name: "表单" }) as HTMLFormElement);
  expect(data.getAll("keywords")).toEqual(["设计", "运营"]);
});

test("readOnly hides the remove buttons and keeps the tags", async () => {
  render(<TagInput aria-label="关键词" defaultValue={["设计"]} readOnly />);
  expect(screen.queryByRole("button", { name: "移除 设计" })).toBeNull();
  expect(within(screen.getByTestId("tag-input")).getByText("设计")).toBeInTheDocument();
});

test("inside a Field the label points at the text input", () => {
  render(
    <Field>
      <FieldLabel>关键词</FieldLabel>
      <TagInput />
    </Field>,
  );
  expect(screen.getByRole("textbox", { name: "关键词" })).toBeInTheDocument();
});
