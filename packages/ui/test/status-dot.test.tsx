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

test("each state declares the category it is drawn in; uncategorised states carry no hue", () => {
  render(<>{(["online", "offline", "warning", "error", "info", "neutral", "pending", "in-progress", "unknown"] as const).map(status => <StatusDot key={status} status={status} label={status} />)}</>);
  const tone = (status: string) => screen.getByRole("img", { name: status }).getAttribute("data-tone");
  expect([tone("online"), tone("error"), tone("warning"), tone("info"), tone("pending"), tone("in-progress"), tone("unknown")]).toEqual(["success", "danger", "warning", "info", "info", "info", "warning"]);
  expect(tone("offline")).toBeNull(); expect(tone("neutral")).toBeNull();
});
test("a state is drawn in the same category a Badge of that category uses", async () => {
  const { Badge } = await import("../src/components/badge");
  render(<><StatusDot status="error" /><Badge tone="danger">失败</Badge></>);
  expect(screen.getByRole("img", { name: "异常" }).getAttribute("data-tone")).toBe(screen.getByText("失败").getAttribute("data-tone"));
});
