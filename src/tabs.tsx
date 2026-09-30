import type { ComponentProps } from "react";
import { cva } from "class-variance-authority";
import { Tabs as CossTabs, TabsList as CossTabsList, TabsTab as CossTabsTab } from "./coss/tabs";
import { cn } from "./utils";
export { TabsPanel as TabsContent } from "./coss/tabs";
export function Tabs({ orientation = "horizontal", className, ...props }: ComponentProps<typeof CossTabs>) {
  return <CossTabs orientation={orientation} data-orientation={orientation} className={cn("group/tabs", className)} {...props} />;
}
export const tabsListVariants = cva("", { variants: { variant: { default: "", line: "max-w-full justify-start group-data-horizontal/tabs:overflow-x-auto group-data-horizontal/tabs:overscroll-x-contain", underline: "max-w-full justify-start group-data-horizontal/tabs:overflow-x-auto group-data-horizontal/tabs:overscroll-x-contain" } }, defaultVariants: { variant: "default" } });
export function TabsList({ variant = "default", className, ...props }: Omit<ComponentProps<typeof CossTabsList>, "variant"> & { variant?: "default" | "line" | "underline" }) {
  return <CossTabsList variant={variant === "line" ? "underline" : variant} className={cn(tabsListVariants({ variant }), className)} {...props} />;
}
export function TabsTrigger({ className, ...props }: ComponentProps<typeof CossTabsTab>) {
  return <CossTabsTab className={cn("pointer-coarse:min-h-(--control-hit-target) pointer-coarse:min-w-(--control-hit-target)", className)} {...props} />;
}
