"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import type * as React from "react";
import { cn } from "../utils";
import { MenuPopup } from "./menu";

/**
 * A desktop-style row of menus (文件 / 编辑 / 视图). Each menu is a `Menu`
 * from menu.tsx; the bar adds roving focus between triggers and opens the
 * neighbouring menu with the arrow keys once one is open.
 */
export function Menubar({
  className,
  ...props
}: MenubarPrimitive.Props): React.ReactElement {
  return (
    <MenubarPrimitive
      className={cn(
        "relative flex w-fit items-center gap-0.5 rounded-xl border bg-card not-dark:bg-clip-padding p-1 text-card-foreground data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className,
      )}
      data-slot="menubar"
      {...props}
    />
  );
}

export function MenubarTrigger({
  className,
  ...props
}: MenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <MenuPrimitive.Trigger
      className={cn(
        "relative inline-flex h-8 shrink-0 cursor-default select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base text-foreground outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:pointer-events-none data-popup-open:bg-accent data-pressed:bg-accent data-disabled:opacity-64 sm:h-7 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
        className,
      )}
      data-slot="menubar-trigger"
      {...props}
    />
  );
}

/**
 * The menu panel of one menubar menu. Aligned to the trigger's start edge so
 * item labels line up with the trigger label.
 */
export function MenubarPopup({
  align = "start",
  alignOffset = -3,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenuPopup>): React.ReactElement {
  return (
    <MenuPopup
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

export {
  MenubarPrimitive,
  MenubarPopup as MenubarContent,
};

export {
  Menu as MenubarMenu,
  MenuCheckboxItem as MenubarCheckboxItem,
  MenuGroup as MenubarGroup,
  MenuGroupLabel as MenubarLabel,
  MenuItem as MenubarItem,
  MenuLinkItem as MenubarLinkItem,
  MenuPortal as MenubarPortal,
  MenuRadioGroup as MenubarRadioGroup,
  MenuRadioItem as MenubarRadioItem,
  MenuSeparator as MenubarSeparator,
  MenuShortcut as MenubarShortcut,
  MenuSub as MenubarSub,
  MenuSubPopup as MenubarSubContent,
  MenuSubTrigger as MenubarSubTrigger,
} from "./menu";
