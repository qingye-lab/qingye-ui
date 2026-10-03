import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { LocaleSwitch } from "../src/components/locale-switch";
import { UILocaleProvider, zhCN } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const options = [{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }];

test("selection reflects Provider acceptance, while rejected requests retain the current fact", async () => {
  const request = vi.fn();
  const { rerender } = render(<UILocaleProvider locale={zhCN}><LocaleSwitch options={options} onLocaleChange={request} /></UILocaleProvider>);
  await userEvent.selectOptions(screen.getByRole("combobox", { name: "语言" }), "en-US");
  expect(request).toHaveBeenCalledWith(enUS, expect.anything());
  expect(screen.getByRole("combobox")).toHaveValue("zh-CN");
  function Accepted() {
    const [locale, setLocale] = useState(zhCN);
    return <UILocaleProvider locale={locale}><LocaleSwitch options={options} onLocaleChange={setLocale} /></UILocaleProvider>;
  }
  rerender(<Accepted />);
  await userEvent.selectOptions(screen.getByRole("combobox"), "en-US");
  expect(screen.getByRole("combobox", { name: "Language" })).toHaveValue("en-US");
});

test("current locale remains visible if omitted, and disabled/canceled changes preserve native form/ref/render", () => {
  const ref = createRef<HTMLSelectElement>();
  const request = vi.fn();
  const { container, rerender } = render(<form><UILocaleProvider locale={enUS}><LocaleSwitch options={[options[0]!]} onLocaleChange={request} ref={ref} render={<select data-custom="yes" />} name="locale" disabled /></UILocaleProvider></form>);
  const select = screen.getByRole("combobox");
  expect(ref.current).toBe(select);
  expect(select).toHaveValue("en-US");
  expect(screen.getByRole("option", { name: "en-US" })).toBeDisabled();
  expect(select).toBeDisabled();
  fireEvent.change(select, { target: { value: "zh-CN" } });
  expect(request).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).has("locale")).toBe(false);
  expect(select).toHaveAttribute("data-custom", "yes");
  rerender(<LocaleSwitch options={options} onLocaleChange={request} onChange={event => event.preventDefault()} />);
  fireEvent.change(screen.getByRole("combobox"), { target: { value: "en-US" } });
  expect(request).not.toHaveBeenCalled();
  expect(screen.getByRole("combobox")).toHaveValue("zh-CN");
});
