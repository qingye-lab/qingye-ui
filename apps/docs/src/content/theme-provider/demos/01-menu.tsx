import type { Theme } from "@yanqing/ui/components/theme-provider";
import { Button } from "@yanqing/ui/components/button";
import { Menu, MenuPopup, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@yanqing/ui/components/menu";
import { useTheme } from "@yanqing/ui/components/theme-provider";
import { useUILocale } from "@yanqing/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export const meta = {
  title: "主题菜单",
  description: "顶栏里最常见的形式：图标显示当前生效的主题，菜单里三选一。文案来自语言包。",
};

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: SunIcon },
    { value: "dark", label: messages.darkTheme, icon: MoonIcon },
    { value: "system", label: messages.systemTheme, icon: MonitorIcon },
  ] as const;
  const Current = resolvedTheme === "dark" ? MoonIcon : SunIcon;

  return (
    <Menu>
      <MenuTrigger render={<Button aria-label={messages.theme} size="icon" variant="outline" />}>
        <Current />
      </MenuTrigger>
      <MenuPopup className="min-w-36">
        <MenuRadioGroup onValueChange={(value) => setTheme(value as Theme)} value={theme}>
          {options.map(({ value, label, icon: Icon }) => (
            <MenuRadioItem key={value} value={value}>
              <span className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4 opacity-72" />
                {label}
              </span>
            </MenuRadioItem>
          ))}
        </MenuRadioGroup>
      </MenuPopup>
    </Menu>
  );
}
