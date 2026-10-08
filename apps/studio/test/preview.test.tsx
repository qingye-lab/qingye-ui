import * as React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import { ThemeProvider } from "@qingye_lab/ui/components/theme-provider";
import { PreviewContent } from "../src/preview";
import { azure, amber, type FrameSettings } from "../src/shared";
afterEach(cleanup);
function scene(settings: FrameSettings) { return <ThemeProvider storageKey={null}><PreviewContent settings={settings}/></ThemeProvider>; }
const settings: FrameSettings = { theme: azure, css: "", scheme: "light", density: "default", mode: "class", inspect: false };
test("theme updates preserve draft, selection and the actual required-name error", async () => {
  const user = userEvent.setup(); const view = render(scene(settings));
  await user.clear(screen.getByRole("textbox", { name: "名称", exact: true }));
  await user.clear(screen.getByRole("textbox", { name: "备注", exact: true }));
  await user.type(screen.getByRole("textbox", { name: "备注", exact: true }), "独立草稿");
  await user.click(screen.getByRole("checkbox", { name: "选择 组件目录", exact: true }));
  await user.click(screen.getByRole("button", { name: "应用到预览", exact: true }));
  view.rerender(scene({ ...settings, theme: amber, scheme: "dark", density: "compact" }));
  expect(screen.getByRole("textbox", { name: "名称", exact: true })).toHaveValue("");
  expect(screen.getByRole("textbox", { name: "备注", exact: true })).toHaveValue("独立草稿");
  expect(screen.getByRole("textbox", { name: "名称", exact: true })).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("checkbox", { name: "选择 组件目录", exact: true })).toBeChecked();
  expect(screen.getByText("请输入文档名称。")).toBeVisible();
  expect(document.documentElement).toHaveAttribute("data-brand", "amber");
});
test("inspection consumes the preview click without mutating its state", async () => {
  const user = userEvent.setup(); const view = render(scene({ ...settings, inspect: true }));
  await user.clear(screen.getByRole("textbox", { name: "名称", exact: true }));
  await user.click(screen.getByRole("button", { name: "应用到预览", exact: true }));
  expect(screen.getByRole("textbox", { name: "名称", exact: true })).not.toHaveAttribute("aria-invalid", "true");
  view.rerender(scene(settings));
  await user.click(screen.getByRole("button", { name: "应用到预览", exact: true }));
  expect(screen.getByRole("textbox", { name: "名称", exact: true })).toHaveAttribute("aria-invalid", "true");
});

test("applying and restoring act on the local draft while filtering retains hidden selections", async () => {
  const user = userEvent.setup(); render(scene(settings));
  const name=screen.getByRole("textbox",{name:"名称",exact:true});
  await user.clear(name); await user.type(name,"接入记录");
  await user.click(screen.getByRole("button",{name:"应用到预览",exact:true}));
  await user.clear(name); await user.type(name,"未应用修改");
  await user.click(screen.getByRole("button",{name:"还原",exact:true}));
  expect(name).toHaveValue("接入记录");
  const search=screen.getByRole("textbox",{name:"筛选资料",exact:true});
  await user.type(search,"目录");
  expect(screen.queryByRole("checkbox",{name:"选择 设计指南",exact:true})).toBeNull();
  await user.clear(search);
  expect(screen.getByRole("checkbox",{name:"选择 设计指南",exact:true})).toBeChecked();
});
