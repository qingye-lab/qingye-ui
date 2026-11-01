import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../src/components/tabs";
import { getLocaleDirection, UILocaleProvider, useUIDirection, useUILocale, zhCN } from "../src/locale";
import { enUS } from "../src/locales/en-US";

afterEach(() => vi.restoreAllMocks());

function Probe() { const { dir, code } = useUILocale(); return <output data-testid="probe">{code}:{dir}:{useUIDirection()}</output>; }
const probe = () => screen.getByTestId("probe").textContent;
const arabic = { ...enUS, code: "ar-EG" };

test("direction follows the locale code, an explicit dir wins, and nesting inherits until a new locale is given", () => {
  expect(getLocaleDirection("zh-CN")).toBe("ltr"); expect(getLocaleDirection("he")).toBe("rtl"); expect(getLocaleDirection("not a tag")).toBe("ltr");
  // 脚本子标签优先于语言：库不能把 ku 或 pa 一概当作 rtl。
  expect(getLocaleDirection("ku-Arab")).toBe("rtl"); expect(getLocaleDirection("ku-Latn")).toBe("ltr");
  const { rerender } = render(<Probe />); expect(probe()).toBe("zh-CN:ltr:ltr");
  rerender(<UILocaleProvider locale={arabic}><Probe /></UILocaleProvider>); expect(probe()).toBe("ar-EG:rtl:rtl");
  rerender(<UILocaleProvider locale={arabic} dir="ltr"><Probe /></UILocaleProvider>); expect(probe()).toBe("ar-EG:ltr:ltr");
  rerender(<UILocaleProvider locale={arabic}><UILocaleProvider messages={{ close: "x" }}><Probe /></UILocaleProvider></UILocaleProvider>); expect(probe()).toBe("ar-EG:rtl:rtl");
  rerender(<UILocaleProvider locale={arabic}><UILocaleProvider locale={zhCN}><Probe /></UILocaleProvider></UILocaleProvider>); expect(probe()).toBe("zh-CN:ltr:ltr");
  rerender(<UILocaleProvider dir="rtl"><Probe /></UILocaleProvider>); expect(probe()).toBe("zh-CN:rtl:rtl");
});

test("without a platform text direction the minimal table decides, script subtag first", () => {
  const original = Intl.Locale.prototype;
  // 平台给方向的方式有两种：较新的 getTextInfo()，与较早的 textInfo 访问器（例如 Node 22 只有后者）。
  // 只拦截当前平台真有的那一种——spyOn 一个不存在的属性会直接抛错，测试就没测到回退表。
  if ("getTextInfo" in original) vi.spyOn(original, "getTextInfo" as never).mockImplementation((() => ({})) as never);
  if ("textInfo" in original) vi.spyOn(original, "textInfo" as never, "get").mockImplementation((() => undefined) as never);
  expect(getLocaleDirection("ar")).toBe("rtl"); expect(getLocaleDirection("fa-IR")).toBe("rtl"); expect(getLocaleDirection("en")).toBe("ltr");
  expect(getLocaleDirection("ku-Arab")).toBe("rtl"); expect(getLocaleDirection("ku-Latn")).toBe("ltr"); expect(getLocaleDirection("ku")).toBe("ltr");
});

test("the provider hands its direction to Base UI: a horizontal tablist reverses its arrow keys under rtl", async () => {
  const tabs = <Tabs defaultValue="b"><TabsList aria-label="t"><TabsTab value="a">甲</TabsTab><TabsTab value="b">乙</TabsTab><TabsTab value="c">丙</TabsTab></TabsList><TabsPanel value="a">a</TabsPanel><TabsPanel value="b">b</TabsPanel><TabsPanel value="c">c</TabsPanel></Tabs>;
  const { unmount } = render(<UILocaleProvider>{tabs}</UILocaleProvider>);
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}"); expect(screen.getByRole("tab", { name: "丙" })).toHaveFocus();
  unmount();
  render(<UILocaleProvider dir="rtl">{tabs}</UILocaleProvider>);
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}"); expect(screen.getByRole("tab", { name: "甲" })).toHaveFocus();
});
