"use client";

import type * as React from "react";
import { useUILocale, type UILocale } from "../locale";
import { NativeSelect, type NativeSelectProps } from "./native-select";

export type LocaleSwitchOption = { locale: UILocale; label: string; disabled?: boolean };
export type LocaleSwitchProps = Omit<NativeSelectProps, "value" | "defaultValue" | "children" | "multiple" | "size" | "onChange"> & {
  options: readonly LocaleSwitchOption[];
  onLocaleChange: (locale: UILocale, event: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: NativeSelectProps["onChange"];
};

/**
 * Requests a Provider change; the Provider remains the sole source of the selected value.
 * 每个选项的文字用它自己的语言书写（「English」「中文」），所以选项带自己的 lang：读屏按该语言发音，
 * 断行与字体也按该语言选择，不被外层页面的语言带偏。
 */
export function LocaleSwitch({ options, onLocaleChange, onChange, ...props }: LocaleSwitchProps) {
  const current = useUILocale();
  const codes = new Set<string>();
  for (const option of options) {
    if (!option.locale.code || codes.has(option.locale.code)) throw new Error("LocaleSwitch requires unique, nonempty locale codes.");
    codes.add(option.locale.code);
  }
  return <NativeSelect {...props} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "locale-switch"} value={current.code} aria-label={props["aria-label"] ?? current.messages.language}
    onChange={event => {
      onChange?.(event);
      if (event.defaultPrevented || event.currentTarget.disabled) return;
      const next = options.find(option => option.locale.code === event.currentTarget.value);
      if (next && !next.disabled) onLocaleChange(next.locale, event);
    }}
  >
    {!codes.has(current.code) && <option value={current.code} lang={current.code} disabled>{current.code}</option>}
    {options.map(option => <option key={option.locale.code} value={option.locale.code} lang={option.locale.code} disabled={option.disabled}>{option.label}</option>)}
  </NativeSelect>;
}
