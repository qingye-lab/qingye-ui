"use client";

import { PreviewCard as HoverCardPrimitive } from "@base-ui/react/preview-card";
import { useFloatingLayer } from "../floating-layer";
import { cn } from "../utils";
import { linkClassName } from "./link";

export function HoverCard<Payload = unknown>(props: HoverCardPrimitive.Root.Props<Payload>) { return <HoverCardPrimitive.Root {...props} />; }
export const HoverCardCreateHandle = HoverCardPrimitive.createHandle;
export function HoverCardTrigger<Payload = unknown>({ href, render, delay = 0, className, ...props }: HoverCardPrimitive.Trigger.Props<Payload>) {
  if (!href?.trim() && render === undefined) throw new Error("HoverCardTrigger requires a reachable link or an explicit keyboard-accessible render.");
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} href={href} render={render} delay={delay} className={state => cn(`touch-target ${linkClassName} min-w-0 text-body inline-flex max-w-full wrap-anywhere`, typeof className === "function" ? className(state) : className)} />;
}
export type HoverCardPopupProps = HoverCardPrimitive.Popup.Props & {
  portalProps?: HoverCardPrimitive.Portal.Props;
  positionerProps?: HoverCardPrimitive.Positioner.Props;
} & Pick<HoverCardPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset" | "anchor">;
export function HoverCardPopup({ portalProps, positionerProps, side = "bottom", align = "start", sideOffset, alignOffset, anchor, className, ...props }: HoverCardPopupProps) {
  const layer = useFloatingLayer("popup");
  return <HoverCardPrimitive.Portal {...portalProps}><HoverCardPrimitive.Positioner data-slot="hover-card-positioner" side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} anchor={anchor} {...positionerProps} style={state => ({ ...layer, ...(typeof positionerProps?.style === "function" ? positionerProps.style(state) : positionerProps?.style) })}>
    <HoverCardPrimitive.Popup data-slot="hover-card-popup" {...props} className={state => cn("grid min-w-0 max-h-(--available-height) max-w-(--available-width) gap-(--qy-field-gap) overflow-y-auto rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding-sm) text-body text-foreground shadow-raised outline-none focus-visible:border-ring origin-(--transform-origin) wrap-anywhere", typeof className === "function" ? className(state) : className)} />
  </HoverCardPrimitive.Positioner></HoverCardPrimitive.Portal>;
}
export { HoverCardPrimitive };
