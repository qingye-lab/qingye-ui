import type { Theme } from "@qingye/ui/components/theme-provider";
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qingye/ui/components/menu";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { useUILocale } from "@qingye/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export function ThemeMenu() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options: { value: Theme; label: string; icon: typeof SunIcon }[] = [
    { value: "light", label: messages.lightTheme, icon: SunIcon },
    { value: "dark", label: messages.darkTheme, icon: MoonIcon },
    { value: "system", label: messages.systemTheme, icon: MonitorIcon },
  ];
  const Current = resolvedTheme === "dark" ? MoonIcon : SunIcon;
  return (
    <Menu>
      <Tooltip>
        <TooltipTrigger
          render={
            <MenuTrigger
              render={<Button shape="icon" aria-label={`${messages.theme}：${options.find((o) => o.value === theme)?.label ?? ""}`} size="md" variant="quiet" />}
            />
          }
        >
          <Current aria-hidden="true" />
        </TooltipTrigger>
        <TooltipPopup>{messages.theme}</TooltipPopup>
      </Tooltip>
      <MenuPortal><MenuPositioner align="end"><MenuPopup className="min-w-36">
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
      </MenuPopup></MenuPositioner></MenuPortal>
    </Menu>
  );
}
