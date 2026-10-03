import { useState } from "react";
import { CopyButton } from "@qingye/ui/components/copy-button";
import { LocaleSwitch } from "@qingye/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
export const meta = { title: "当前语言", titleEn: "Current locale" };
export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  return <UILocaleProvider locale={locale}><div className="flex flex-wrap items-center gap-(--qy-action-gap)"><LocaleSwitch className="w-auto" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={setLocale} /><CopyButton value="Qingye" /></div></UILocaleProvider>;
}
