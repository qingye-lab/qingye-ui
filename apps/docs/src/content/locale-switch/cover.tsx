import { LocaleSwitch } from "@qingye_lab/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";

export default function Cover() {
  return <UILocaleProvider locale={zhCN}><LocaleSwitch aria-label="语言" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={() => {}} /></UILocaleProvider>;
}
