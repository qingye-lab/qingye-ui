import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import { ThemeProvider } from "@qingye/ui/components/theme-provider";
import { PreviewContent } from "../src/preview";
import { azure, amber, type FrameSettings } from "../src/shared";
afterEach(cleanup);
function scene(settings: FrameSettings) { return <ThemeProvider storageKey={null}><PreviewContent settings={settings}/></ThemeProvider>; }
const settings: FrameSettings = { theme: azure, css: "", scheme: "light", density: "default", mode: "class", inspect: false };
test("theme updates preserve draft, selection and explicit invalid field", async () => {
  const user = userEvent.setup(); const view = render(scene(settings));
  await user.clear(screen.getByRole("textbox", { name: "标题", exact: true }));
  await user.type(screen.getByRole("textbox", { name: "标题", exact: true }), "独立草稿");
  await user.click(screen.getByRole("checkbox", { name: "选择 B", exact: true }));
  await user.click(screen.getByRole("button", { name: "切换输入错误", exact: true }));
  view.rerender(scene({ ...settings, theme: amber, scheme: "dark", density: "compact" }));
  expect(screen.getByRole("textbox", { name: "标题", exact: true })).toHaveValue("独立草稿");
  expect(screen.getByRole("textbox", { name: "标题", exact: true })).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("checkbox", { name: "选择 B", exact: true })).toBeChecked();
  expect(screen.getByText("当前显式错误")).toBeVisible();
  expect(document.documentElement).toHaveAttribute("data-brand", "amber");
});
test("inspection consumes the preview click without mutating its state", async () => {
  const user = userEvent.setup(); const view = render(scene({ ...settings, inspect: true }));
  await user.click(screen.getByRole("button", { name: "切换输入错误", exact: true }));
  expect(screen.getByRole("textbox", { name: "标题", exact: true })).not.toHaveAttribute("aria-invalid", "true");
  view.rerender(scene(settings));
  await user.click(screen.getByRole("button", { name: "切换输入错误", exact: true }));
  expect(screen.getByRole("textbox", { name: "标题", exact: true })).toHaveAttribute("aria-invalid", "true");
});
