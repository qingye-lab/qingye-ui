"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import * as React from "react";
import { cn } from "../utils.js";
import { Button } from "./button.js";
import { useFloatingLayer } from "../floating-layer";

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipCreateHandle = TooltipPrimitive.createHandle;

// Base UI 1.7 presents sighted hints; this layer adds descriptive ARIA without renaming actions.
type Association = { popup: HTMLElement | null; listeners: Set<() => void> };
const TooltipAssociation = React.createContext<Association | null>(null);
const handleAssociations = new WeakMap<object, Association>();
function associationFor(handle?: object): Association {
  if (handle) {
    const existing = handleAssociations.get(handle);
    if (existing) return existing;
  }
  const association: Association = { popup: null, listeners: new Set() };
  if (handle) handleAssociations.set(handle, association);
  return association;
}

function usePartRef<T extends HTMLElement>(external: React.Ref<T> | undefined, attach: (element: T) => () => void) {
  return React.useCallback((element: T | null) => {
    if (!element) return;
    const detach = attach(element);
    const release = typeof external === "function" ? external(element) : undefined;
    if (external && typeof external !== "function") external.current = element;
    return () => {
      detach();
      if (typeof release === "function") release();
      else if (typeof external === "function") external(null);
      else if (external) external.current = null;
    };
  }, [external, attach]);
}

function Tooltip<Payload>(props: TooltipPrimitive.Root.Props<Payload>) {
  const association = React.useMemo(() => associationFor(props.handle), [props.handle]);
  // Hoverability is an accessibility constraint, including when callers spread props.
  return <TooltipAssociation.Provider value={association}><TooltipPrimitive.Root {...props} disableHoverablePopup={false} trackCursorAxis={props.trackCursorAxis === "both" ? "none" : props.trackCursorAxis} /></TooltipAssociation.Provider>;
}

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props): React.ReactElement {
  const context = React.useContext(TooltipAssociation);
  const association = React.useMemo(() => props.handle ? associationFor(props.handle) : context, [props.handle, context]);
  const attach = React.useCallback((element: HTMLElement) => {
    if (!association) return () => {};
    let ownedId: string | null = null;
    function unlink() {
      if (!ownedId) return;
      const ids = (element.getAttribute("aria-describedby") ?? "").split(/\s+/).filter((id) => id && id !== ownedId);
      if (ids.length) element.setAttribute("aria-describedby", ids.join(" "));
      else element.removeAttribute("aria-describedby");
      ownedId = null;
    }
    function sync() {
      const popup = association!.popup;
      const id = element.hasAttribute("data-popup-open") && popup?.hasAttribute("data-open") ? popup.id : null;
      if (id === ownedId && (!id || (element.getAttribute("aria-describedby") ?? "").split(/\s+/).includes(id))) return;
      unlink();
      if (!id) return;
      const ids = (element.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean);
      if (!ids.includes(id)) {
        element.setAttribute("aria-describedby", [...ids, id].join(" "));
        ownedId = id;
      }
    }
    const observer = new MutationObserver(sync);
    observer.observe(element, { attributes: true, attributeFilter: ["data-popup-open", "aria-describedby"] });
    association.listeners.add(sync);
    sync();
    return () => { observer.disconnect(); association.listeners.delete(sync); unlink(); };
  }, [association]);
  const ref = usePartRef(props.ref, attach);
  const nativeDisabled = React.isValidElement<{ disabled?: boolean }>(props.render) && props.render.props.disabled === true;
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} disabled={nativeDisabled || props.disabled} render={props.render ?? <Button variant="quiet" />} ref={ref} />;
}

type TooltipPopupProps = TooltipPrimitive.Popup.Props & {
  align?: TooltipPrimitive.Positioner.Props["align"];
  alignOffset?: TooltipPrimitive.Positioner.Props["alignOffset"];
  side?: TooltipPrimitive.Positioner.Props["side"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
  anchor?: TooltipPrimitive.Positioner.Props["anchor"];
  portalProps?: TooltipPrimitive.Portal.Props;
  positionerProps?: TooltipPrimitive.Positioner.Props;
};

function TooltipPopup({
  align,
  alignOffset,
  side,
  sideOffset,
  anchor,
  portalProps,
  positionerProps,
  className,
  children,
  ...popupProps
}: TooltipPopupProps): React.ReactElement {
  const layer = useFloatingLayer("popup");
  // Foundation presets: raised surface/shadow and overlay radius. Motion owns entry/exit.
  const surface = "max-w-(--available-width) origin-(--transform-origin) rounded-overlay bg-surface-raised text-foreground shadow-raised text-control-sm-mobile sm:text-control-sm min-h-(--qy-control-sm-narrow) sm:min-h-(--qy-control-sm) px-(--qy-control-sm-padding) py-[calc((var(--qy-control-sm-narrow)-var(--qy-text-control-sm-mobile-leading))/2)] sm:py-[calc((var(--qy-control-sm)-var(--qy-text-control-sm-leading))/2)] [overflow-wrap:anywhere]";
  const association = React.useContext(TooltipAssociation);
  const generatedId = React.useId();
  const attach = React.useCallback((element: HTMLDivElement) => {
    if (!association) return () => {};
    association.popup = element;
    const sync = () => {
      // Exiting content must leave the accessibility tree before its visual transition ends.
      element.setAttribute("aria-hidden", String(!element.hasAttribute("data-open")));
      association.listeners.forEach((listener) => listener());
    };
    const observer = new MutationObserver(sync);
    observer.observe(element, { attributes: true, attributeFilter: ["id", "data-open"] });
    sync();
    return () => {
      observer.disconnect();
      if (association.popup === element) association.popup = null;
      sync();
    };
  }, [association]);
  const ref = usePartRef(popupProps.ref, attach);
  return (
    <TooltipPrimitive.Portal data-slot="tooltip-portal" {...portalProps}>
      <TooltipPrimitive.Positioner
        data-slot="tooltip-positioner"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        anchor={anchor}
        {...positionerProps}
        style={state => ({ ...layer, ...(typeof positionerProps?.style === "function" ? positionerProps.style(state) : positionerProps?.style) })}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-popup"
          {...popupProps}
          id={popupProps.id ?? generatedId}
          role="tooltip"
          ref={ref}
          className={typeof className === "function"
            ? (state) => cn(surface, className(state))
            : cn(surface, className)}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export {
  Tooltip,
  TooltipTrigger,
  TooltipPopup,
  TooltipPopup as TooltipContent,
  TooltipProvider,
  TooltipCreateHandle,
  TooltipPrimitive,
};
