import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Steps } from "../src/components/steps";

const items = [
  { id: "info", title: "填写信息" },
  { id: "verify", title: "实名认证", description: "上传身份证照片" },
  { id: "done", title: "开通完成" },
];

test("derives each status from current and announces it", () => {
  render(<Steps current={1} items={items} />);
  const list = screen.getByRole("list", { name: "步骤" });
  const steps = list.querySelectorAll("[data-slot=steps-item]");
  expect([...steps].map((step) => step.getAttribute("data-status"))).toEqual(["complete", "current", "upcoming"]);
  expect(steps[1]).toHaveAttribute("aria-current", "step");
  expect(steps[0]).toHaveTextContent("填写信息 已完成");
  expect(steps[2]).toHaveTextContent("开通完成 未开始");
  expect(list.querySelector("[data-slot=steps-connector]")).toHaveAttribute("data-status", "complete");
});

test("an explicit error status overrides the derived one", () => {
  render(<Steps current={1} items={[items[0]!, { ...items[1]!, status: "error" }, items[2]!]} />);
  const step = screen.getByText("实名认证").closest("li");
  expect(step).toHaveAttribute("data-status", "error");
  expect(step).toHaveAttribute("aria-current", "step");
});

test("clickable steps are buttons with arrow-key movement", async () => {
  const user = userEvent.setup();
  const onStepClick = vi.fn();
  render(
    <Steps current={1} items={[items[0]!, items[1]!, { ...items[2]!, disabled: true }]} onStepClick={onStepClick} />,
  );
  const buttons = screen.getAllByRole("button");
  expect(buttons[1]).toHaveAttribute("aria-current", "step");
  expect(buttons[2]).toBeDisabled();

  await user.click(buttons[0]!);
  expect(onStepClick).toHaveBeenCalledWith(0, items[0]);

  await user.keyboard("{ArrowRight}");
  expect(buttons[1]).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(buttons[1]).toHaveFocus();
  await user.keyboard("{Home}");
  expect(buttons[0]).toHaveFocus();
});

test("vertical steps move with up and down", async () => {
  const user = userEvent.setup();
  render(<Steps current={0} items={items} onStepClick={() => {}} orientation="vertical" />);
  const buttons = screen.getAllByRole("button");
  buttons[0]!.focus();
  await user.keyboard("{ArrowDown}");
  expect(buttons[1]).toHaveFocus();
  await user.keyboard("{End}");
  expect(buttons[2]).toHaveFocus();
});
