import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { useTheme, type Theme } from "@qingye_lab/ui/components/theme-provider";
import { useUILocale } from "@qingye_lab/ui/locale";

export default function Cover() {
  const { theme, setTheme } = useTheme();
  const { messages } = useUILocale();
  return <SegmentedControl aria-label={messages.theme} value={theme} onValueChange={value => setTheme(value as Theme)}>
    <SegmentedControlItem value="light" aria-label={messages.lightTheme}><IconSun aria-hidden="true" /></SegmentedControlItem>
    <SegmentedControlItem value="dark" aria-label={messages.darkTheme}><IconMoon aria-hidden="true" /></SegmentedControlItem>
    <SegmentedControlItem value="system" aria-label={messages.systemTheme}><IconDeviceDesktop aria-hidden="true" /></SegmentedControlItem>
  </SegmentedControl>;
}
