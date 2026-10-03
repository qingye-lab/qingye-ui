import { Label } from "@qingye/ui/components/label";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { Text } from "@qingye/ui/components/typography";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";
import { useUILocale } from "@qingye/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export const meta = { title: "外观设置", titleEn: "Appearance settings" };

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: SunIcon },
    { value: "dark", label: messages.darkTheme, icon: MoonIcon },
    { value: "system", label: messages.systemTheme, icon: MonitorIcon },
  ] as const;
  return <Stack gap="field">
    <fieldset className="min-w-0">
      <legend className="mb-(--qy-field-gap) text-label">{messages.theme}</legend>
      <RadioGroup value={theme} onValueChange={setTheme} aria-label={messages.theme} render={<Inline gap="actions" />}>
        {options.map(({ value, label, icon: Icon }) => <Label key={value}>
          <Inline gap="field" render={<span />}>
            <Radio value={value} aria-label={label} />
            <Icon aria-hidden="true" className="size-(--qy-control-md-icon)" />
            <Text render={<span />}>{label}</Text>
          </Inline>
        </Label>)}
      </RadioGroup>
    </fieldset>
    <Text step="support" className="text-muted-foreground">当前：{resolvedTheme === "dark" ? messages.darkTheme : messages.lightTheme}</Text>
  </Stack>;
}
