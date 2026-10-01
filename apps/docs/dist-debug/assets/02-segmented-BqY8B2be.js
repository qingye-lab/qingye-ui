const e=`import type { Theme } from "@qingye/ui/components/theme-provider";
import { RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";
import { useTheme } from "@qingye/ui/components/theme-provider";
import { useUILocale } from "@qingye/ui/locale";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

export const meta = {
  title: "设置页中的分段选择",
  description: "设置页里直接平铺三个选项；下方显示用户的选择与实际生效的主题。",
};

const item = segmentedControlItemVariants({ state: "checked" });

export default function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  return (
    <div className="flex flex-col items-center gap-3">
      <RadioGroupPrimitive
        aria-label={messages.theme}
        className={segmentedControlRootClassName}
        onValueChange={(value) => setTheme(value as Theme)}
        value={theme}
      >
        <RadioPrimitive.Root className={item} value="light">
          <SunIcon />
          {messages.lightTheme}
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="dark">
          <MoonIcon />
          {messages.darkTheme}
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="system">
          <MonitorIcon />
          {messages.systemTheme}
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
      <p className="text-muted-foreground text-xs">
        theme = <code className="font-mono text-foreground">{theme}</code>，resolvedTheme ={" "}
        <code className="font-mono text-foreground">{resolvedTheme}</code>
      </p>
    </div>
  );
}
`;export{e as default};
