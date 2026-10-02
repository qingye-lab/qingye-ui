import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../src/components/input-group";

test("addon focus coordination composes with the caller's mouse handler", () => {
  const onMouseDown = vi.fn();
  render(
    <InputGroup>
      <InputGroupAddon onMouseDown={onMouseDown}>https://</InputGroupAddon>
      <InputGroupInput aria-label="网址" />
    </InputGroup>,
  );
  fireEvent.mouseDown(screen.getByText("https://"));
  expect(onMouseDown).toHaveBeenCalledOnce();
  expect(screen.getByRole("textbox", { name: "网址" })).toHaveFocus();
});

test("the caller can cancel addon focus coordination with preventDefault", () => {
  render(
    <InputGroup>
      <InputGroupAddon onMouseDown={(event) => event.preventDefault()}>https://</InputGroupAddon>
      <InputGroupInput aria-label="网址" />
    </InputGroup>,
  );
  fireEvent.mouseDown(screen.getByText("https://"));
  expect(screen.getByRole("textbox", { name: "网址" })).not.toHaveFocus();
});

test("addon actions keep their own focus and do not submit an enclosing form", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn((event) => event.preventDefault());
  const onClick = vi.fn();
  render(
    <form onSubmit={onSubmit}>
      <InputGroup>
        <InputGroupInput aria-label="查询" defaultValue="青野" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={onClick}>清除查询</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>,
  );
  const action = screen.getByRole("button", { name: "清除查询" });
  await user.click(action);
  expect(action).toHaveFocus();
  expect(onClick).toHaveBeenCalledOnce();
  expect(onSubmit).not.toHaveBeenCalled();
});
