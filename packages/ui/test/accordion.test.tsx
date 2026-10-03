import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "../src/components/accordion";
import { Input } from "../src/components/input";

const item = (value: string, disabled = false) => <AccordionItem value={value} disabled={disabled}><AccordionHeader><AccordionTrigger>{value}</AccordionTrigger></AccordionHeader><AccordionPanel><Input aria-label={`${value}值`} name={value} defaultValue="" /></AccordionPanel></AccordionItem>;
test("native heading/button associations and multiple disclosure retain entered form values", async () => {
  const user = userEvent.setup();
  const { container } = render(<form><Accordion multiple defaultValue={["第一段"]}>{item("第一段")}{item("第二段")}</Accordion></form>);
  const first = screen.getByRole("button", { name: "第一段" });
  expect(first.closest("h3")).toBe(screen.getByRole("heading", { name: "第一段" }));
  expect(first).toHaveAttribute("aria-expanded", "true");
  const input = screen.getByRole("textbox", { name: "第一段值" });
  await user.type(input, "保留");
  await user.click(screen.getByRole("button", { name: "第二段" }));
  expect(first).toHaveAttribute("aria-expanded", "true");
  await user.click(first);
  expect(first).toHaveAttribute("aria-expanded", "false");
  expect(input).toHaveValue("保留");
  expect(new FormData(container.querySelector("form")!).get("第一段")).toBe("保留");
  await user.click(first);
  expect(screen.getByRole("textbox", { name: "第一段值" })).toBe(input);
});
test("keyboard disclosure, disabled items and canceled requests preserve actual state", async () => {
  const change = vi.fn((_: unknown, details: { cancel: () => void }) => details.cancel());
  const user = userEvent.setup();
  const { rerender } = render(<Accordion>{item("第一段")}{item("禁用段", true)}</Accordion>);
  await user.tab(); await user.keyboard("{Enter}");
  expect(screen.getByRole("button", { name: "第一段" })).toHaveAttribute("aria-expanded", "true");
  await user.click(screen.getByRole("button", { name: "禁用段" }));
  expect(screen.getByRole("button", { name: "禁用段" })).toHaveAttribute("aria-expanded", "false");
  rerender(<Accordion onValueChange={change}>{item("第一段")}</Accordion>);
  await user.click(screen.getByRole("button", { name: "第一段" }));
  expect(change).toHaveBeenCalledOnce();
  expect(screen.getByRole("button", { name: "第一段" })).toHaveAttribute("aria-expanded", "true");
});
