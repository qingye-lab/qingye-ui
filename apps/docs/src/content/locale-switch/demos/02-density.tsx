import { useState } from "react";
import { LocaleSwitch } from "@qingye_lab/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";

export const meta = { title: "密度与禁用", titleEn: "Density and disabled" };

export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  const options = [{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }];
  return (
    <UILocaleProvider locale={locale}>
      <div className="flex flex-wrap items-start gap-(--qy-panel-gap)">
        {(["default", "compact"] as const).map((density) => (
          <div data-density={density} key={density}>
            <LocaleSwitch aria-label={density === "compact" ? "语言 · 紧凑" : "语言"} className="w-auto" options={options} onLocaleChange={setLocale} />
          </div>
        ))}
        <LocaleSwitch aria-label="语言 · 禁用" className="w-auto" options={options} onLocaleChange={setLocale} disabled />
      </div>
    </UILocaleProvider>
  );
}
