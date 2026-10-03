import { Inline, Stack } from "@qingye/ui/components/layout";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { Text } from "@qingye/ui/components/typography";
import { useUILocale } from "@qingye/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useId } from "react";

export const meta = { title: "外观设置", titleEn: "Appearance settings" };

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const name = useId();
  const options = [
    { value: "light", label: messages.lightTheme, icon: SunIcon },
    { value: "dark", label: messages.darkTheme, icon: MoonIcon },
    { value: "system", label: messages.systemTheme, icon: MonitorIcon },
  ] as const;
  return <Stack gap="field">
    <fieldset className="min-w-0">
      <legend className="mb-(--qy-field-gap) text-label">{messages.theme}</legend>
      <Inline gap="actions">
        {options.map(({ value, label, icon: Icon }) => <label key={value}>
          <Inline gap="field" render={<span />}>
            <input type="radio" className="focus-visible:outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset" name={name} value={value} checked={theme === value} onChange={() => setTheme(value)} />
            <Icon aria-hidden="true" className="size-(--qy-control-md-icon)" />
            <Text render={<span />}>{label}</Text>
          </Inline>
        </label>)}
      </Inline>
    </fieldset>
    <Text step="support" className="text-muted-foreground">当前：{resolvedTheme === "dark" ? messages.darkTheme : messages.lightTheme}</Text>
  </Stack>;
}
