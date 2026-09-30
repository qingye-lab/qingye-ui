import type { ComponentProps } from "react";
import * as Coss from "./coss/menu";
import { cn } from "./utils";
export { Menu as DropdownMenu, MenuGroup as DropdownMenuGroup, MenuGroupLabel as DropdownMenuLabel, MenuPortal as DropdownMenuPortal, MenuTrigger as DropdownMenuTrigger, MenuRadioGroup as DropdownMenuRadioGroup, MenuSeparator as DropdownMenuSeparator, MenuShortcut as DropdownMenuShortcut, MenuSub as DropdownMenuSub } from "./coss/menu";
export function DropdownMenuContent({ align = "start", ...props }: ComponentProps<typeof Coss.MenuPopup>) { return <Coss.MenuPopup align={align} {...props} />; }
export function DropdownMenuItem({ className, ...props }: ComponentProps<typeof Coss.MenuItem>) { return <Coss.MenuItem className={cn("pointer-coarse:min-h-(--control-hit-target)", className)} {...props} />; }
export function DropdownMenuCheckboxItem({ className, inset, ...props }: ComponentProps<typeof Coss.MenuCheckboxItem> & { inset?: boolean }) { return <Coss.MenuCheckboxItem className={cn("pointer-coarse:min-h-(--control-hit-target)", inset && "ps-7", className)} {...props} />; }
export function DropdownMenuRadioItem({ className, inset, ...props }: ComponentProps<typeof Coss.MenuRadioItem> & { inset?: boolean }) { return <Coss.MenuRadioItem className={cn("pointer-coarse:min-h-(--control-hit-target)", inset && "ps-7", className)} {...props} />; }
export function DropdownMenuSubTrigger({ className, ...props }: ComponentProps<typeof Coss.MenuSubTrigger>) { return <Coss.MenuSubTrigger className={cn("pointer-coarse:min-h-(--control-hit-target)", className)} {...props} />; }
export { MenuSubPopup as DropdownMenuSubContent } from "./coss/menu";
