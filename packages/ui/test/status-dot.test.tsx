import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { StatusDot } from "../src/components/status-dot";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";
test("waiting, work and unknown retain different visible and accessible facts", () => {
  render(<><StatusDot status="pending" /><StatusDot status="in-progress" /><StatusDot status="unknown" /></>);
  for (const name of ["等待中", "进行中", "结果未知"]) expect(screen.getByRole("img", { name })).toHaveTextContent(name);
  expect(screen.queryByRole("status")).toBeNull();
});
test("locale and a caller's object-specific name preserve the state", () => {
  render(<UILocaleProvider locale={enUS}><StatusDot status="unknown" /><StatusDot status="pending" label="Value pending" /></UILocaleProvider>);
  expect(screen.getByRole("img", { name: enUS.messages.statusLabel("unknown") })).toBeInTheDocument();
  expect(screen.getByRole("img", { name: "Value pending" })).toHaveAttribute("data-status", "pending");
});
