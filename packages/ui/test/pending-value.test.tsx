import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { PendingValue } from "../src/components/pending-value";
test("unknown retains object and numeric zero; only an explicit verification action can run", async () => {
  const verify = vi.fn();
  render(<PendingValue label="值" actions={<Button onClick={verify}>核实</Button>}>{0}</PendingValue>);
  expect(screen.getByRole("group", { name: "值" })).toHaveTextContent("0结果未知");
  expect(screen.queryByRole("button", { name: "重试" })).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "核实" })); expect(verify).toHaveBeenCalledOnce();
  expect(screen.getByText("结果未知")).toBeInTheDocument();
});
test("absent original value stays absent and a disabled verification action stays disabled", async () => {
  const verify = vi.fn();
  const { container } = render(<PendingValue label="值" actions={<Button disabled onClick={verify}>核实</Button>} />);
  expect(container.querySelector("[data-slot=pending-value-original]")).toBeEmptyDOMElement();
  await userEvent.click(screen.getByRole("button")); expect(verify).not.toHaveBeenCalled();
});
test("an empty object name is rejected", () => { expect(() => render(<PendingValue label="" />)).toThrow("object label"); });
