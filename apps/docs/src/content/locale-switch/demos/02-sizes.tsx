import { useState } from "react";
import { LocaleSwitch } from "@qingye/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
export const meta = { title: "五档与禁用", titleEn: "Sizes and disabled" };
export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  return <UILocaleProvider locale={locale}><div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(controlSize => <LocaleSwitch key={controlSize} controlSize={controlSize} aria-label={controlSize} className="w-auto" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={setLocale} disabled={controlSize === "xl"} />)}</div></UILocaleProvider>;
}
