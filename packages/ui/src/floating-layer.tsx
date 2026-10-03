"use client";

import * as React from "react";

export type FloatingLayerRole = "backdrop" | "surface" | "popup" | "notification";
export type FloatingLayerStyle = React.CSSProperties & { "--qy-floating-modal-order": number };
type LayerContext = { order: number; depth: number };
const FloatingLayerContext = React.createContext<LayerContext>({ order: 0, depth: 0 });
// Only approved client openings advance the serial; SSR render is deterministic.
let activationSerial = 0;
function nextOrder(parent: number) {
  activationSerial = Math.max(activationSerial, parent) + 1;
  return activationSerial;
}

export type FloatingLayerScopeProps = { children: React.ReactNode; active?: boolean };

/** A modal's React ownership survives Portal; no DOM wrapper or global manager. */
export function FloatingLayerScope({ children, active = true }: FloatingLayerScopeProps) {
  const parent = React.useContext(FloatingLayerContext);
  const [order, setOrder] = React.useState(0);
  const wasActive = React.useRef(false);
  React.useLayoutEffect(() => {
    const opening = active && !wasActive.current;
    wasActive.current = active;
    if (active) setOrder(current => opening || current <= parent.order ? nextOrder(parent.order) : current);
  }, [active, parent.order]);
  // Child layout effects run first. Parent updates make the child allocate above
  // it before paint, including simultaneously default-open nested scopes.
  // Keep the last order during exit; closing must not jump to a new layer.
  const ownsLayer = active || order > 0;
  const value = React.useMemo(() => ({
    order: ownsLayer ? Math.max(order, parent.order + 1) : parent.order,
    depth: parent.depth + (ownsLayer ? 1 : 0),
  }), [order, ownsLayer, parent.order, parent.depth]);
  return <FloatingLayerContext.Provider value={value}>{children}</FloatingLayerContext.Provider>;
}

/** Merge first, then the caller's style/state callback on its own Positioner. */
export function useFloatingLayer(role: FloatingLayerRole): FloatingLayerStyle {
  const { order } = React.useContext(FloatingLayerContext);
  const base = "calc(var(--qy-layer-modal) + (var(--qy-floating-modal-order) - 1) * var(--qy-layer-modal-step))";
  let zIndex: React.CSSProperties["zIndex"];
  if (role === "notification") zIndex = "var(--qy-layer-notification)";
  else if (role === "popup" && order === 0) zIndex = "var(--qy-layer-popup)";
  else if (role === "backdrop") zIndex = base;
  else zIndex = `calc(var(--qy-layer-modal) + (var(--qy-floating-modal-order) - 1) * var(--qy-layer-modal-step) + var(--qy-layer-${role === "surface" ? "surface" : "owned-popup"}-offset))`;
  return { "--qy-floating-modal-order": order || 1, zIndex };
}
