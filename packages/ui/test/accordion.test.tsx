import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "../src/components/accordion";

test("a section matches its document heading level while keeping disclosure semantics", async () => {
  render(
    <Accordion>
      <AccordionItem value="delivery">
        <AccordionTrigger headerProps={{ render: <h2 />, className: "section-heading" }}>配送范围</AccordionTrigger>
        <AccordionPanel>支持中国大陆配送。</AccordionPanel>
      </AccordionItem>
    </Accordion>,
  );
  const heading = screen.getByRole("heading", { name: "配送范围", level: 2 });
  expect(heading).toHaveClass("section-heading");
  const trigger = screen.getByRole("button", { name: "配送范围" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText("支持中国大陆配送。")).toBeVisible();
  expect(trigger.getAttribute("aria-controls")).toBe(screen.getByText("支持中国大陆配送。").parentElement?.id);
});

test("retained form fields survive closing and keyboard reopening a section", async () => {
  render(
    <Accordion defaultValue={["settings"]}>
      <AccordionItem value="settings">
        <AccordionTrigger>配送设置</AccordionTrigger>
        <AccordionPanel keepMounted><input aria-label="运费" defaultValue="10" /></AccordionPanel>
      </AccordionItem>
      <AccordionItem value="notes" disabled><AccordionTrigger>归档备注</AccordionTrigger><AccordionPanel>已归档</AccordionPanel></AccordionItem>
    </Accordion>,
  );
  const input = screen.getByRole("textbox", { name: "运费" });
  await userEvent.clear(input);
  await userEvent.type(input, "20");
  const trigger = screen.getByRole("button", { name: "配送设置" });
  await userEvent.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await userEvent.keyboard("{Enter}");
  expect(screen.getByRole("textbox", { name: "运费" })).toHaveValue("20");
  expect(screen.getByRole("button", { name: "归档备注" })).toHaveAttribute("aria-disabled", "true");
});
