import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "../src/components/disclosure";

test("toggles the panel and wires aria-expanded and aria-controls", async () => {
  const onOpenChange = vi.fn();
  render(
    <Disclosure onOpenChange={onOpenChange}>
      <DisclosureTrigger>高级设置</DisclosureTrigger>
      <DisclosurePanel>
        <label>
          超时时间
          <input defaultValue="30" />
        </label>
      </DisclosurePanel>
    </Disclosure>,
  );
  const trigger = screen.getByRole("button", { name: "高级设置" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");

  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(onOpenChange).toHaveBeenLastCalledWith(true, expect.anything());
  const panel = document.getElementById(trigger.getAttribute("aria-controls")!);
  expect(panel).toHaveAttribute("data-slot", "disclosure-panel");
  expect(screen.getByLabelText("超时时间")).toBeVisible();
});

test("keeps fields mounted while closed so their values survive", async () => {
  render(
    <Disclosure defaultOpen>
      <DisclosureTrigger>高级设置</DisclosureTrigger>
      <DisclosurePanel>
        <input aria-label="重试次数" defaultValue="3" />
      </DisclosurePanel>
    </Disclosure>,
  );
  const input = screen.getByLabelText<HTMLInputElement>("重试次数");
  await userEvent.clear(input);
  await userEvent.type(input, "5");
  await userEvent.click(screen.getByRole("button", { name: "高级设置" }));
  await userEvent.click(screen.getByRole("button", { name: "高级设置" }));
  expect(screen.getByLabelText<HTMLInputElement>("重试次数").value).toBe("5");
});

test("marks the variant for styling", () => {
  render(
    <Disclosure data-testid="root" variant="inset">
      <DisclosureTrigger>构建日志</DisclosureTrigger>
      <DisclosurePanel>…</DisclosurePanel>
    </Disclosure>,
  );
  expect(screen.getByTestId("root")).toHaveAttribute("data-variant", "inset");
});
