import type { Theme } from "@qingye_lab/ui/components/theme-provider";
import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuPopup, MenuPortal, MenuPositioner, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { useTheme } from "@qingye_lab/ui/components/theme-provider";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { useUILocale } from "@qingye_lab/ui/locale";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

export function ThemeMenu() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options: { value: Theme; label: string; icon: typeof IconSun }[] = [
    { value: "light", label: messages.lightTheme, icon: IconSun },
    { value: "dark", label: messages.darkTheme, icon: IconMoon },
    { value: "system", label: messages.systemTheme, icon: IconDeviceDesktop },
  ];
  const Current = resolvedTheme === "dark" ? IconMoon : IconSun;
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
