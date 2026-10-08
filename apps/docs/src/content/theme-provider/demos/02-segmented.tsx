import { Label } from "@qingye_lab/ui/components/label";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { Text } from "@qingye_lab/ui/components/typography";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

export const meta = { title: "外观设置", titleEn: "Appearance settings" };

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: IconSun },
    { value: "dark", label: messages.darkTheme, icon: IconMoon },
    { value: "system", label: messages.systemTheme, icon: IconDeviceDesktop },
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
