import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { useTheme, type Theme } from "@qingye_lab/ui/components/theme-provider";
import { Text } from "@qingye_lab/ui/components/typography";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useId } from "react";

export const meta = { title: "按需选择外观", titleEn: "Choose appearance on demand" };

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const id = useId();
  const Current = resolvedTheme === "dark" ? IconMoon : IconSun;
  return <Popover>
    <PopoverTrigger render={<Button shape="icon" aria-label={messages.theme} variant="quiet" />}><Current aria-hidden="true" /></PopoverTrigger>
    <PopoverPopup>
      <Stack gap="field">
        <PopoverTitle>{messages.theme}</PopoverTitle>
        <NativeSelect id={id} aria-label={messages.theme} value={theme} onChange={event => setTheme(event.target.value as Theme)}>
          <option value="light">{messages.lightTheme}</option>
          <option value="dark">{messages.darkTheme}</option>
          <option value="system">{messages.systemTheme}</option>
        </NativeSelect>
        <Text step="support" className="text-muted-foreground">当前：{resolvedTheme === "dark" ? messages.darkTheme : messages.lightTheme}</Text>
      </Stack>
    </PopoverPopup>
  </Popover>;
}
