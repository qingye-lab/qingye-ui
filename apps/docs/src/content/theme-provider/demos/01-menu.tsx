import { useTheme, type Theme } from "@qingye_lab/ui/components/theme-provider";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

export const meta = { title: "外观选择", titleEn: "Appearance choice" };

export default function Demo() {
  const { theme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: IconSun },
    { value: "dark", label: messages.darkTheme, icon: IconMoon },
    { value: "system", label: messages.systemTheme, icon: IconDeviceDesktop },
  ] as const;
  return <SegmentedControl aria-label={messages.theme} value={theme} onValueChange={next => setTheme(next as Theme)}>
    {options.map(({ value, label, icon: Icon }) => <SegmentedControlItem key={value} value={value}>
      <Inline gap="field" render={<span />}><Icon aria-hidden="true" />{label}</Inline>
    </SegmentedControlItem>)}
  </SegmentedControl>;
}
