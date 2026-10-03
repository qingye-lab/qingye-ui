"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export interface BulkActionTarget { readonly id: string; readonly label: string; readonly version: string | number }
export interface BulkActionSnapshot { readonly targets: readonly BulkActionTarget[]; readonly scope: string }
type BulkState = { snapshot: BulkActionSnapshot; disabled: boolean; onClear?: ((snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void) | undefined };
const BulkContext = React.createContext<BulkState | null>(null);
function useBulk() { const context = React.useContext(BulkContext); if (!context) throw new Error("BulkActionBar parts require BulkActionBar."); return context; }
export type BulkActionBarProps = useRender.ComponentProps<"div"> & { targets: readonly BulkActionTarget[]; scope: string; disabled?: boolean; onClear?: (snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void };
export function BulkActionBar({ targets, scope, disabled = false, onClear, render, className, children, ...props }: BulkActionBarProps) {
  if (!scope.trim() || targets.some(target => !target.id.trim() || !target.label.trim() || (typeof target.version === "number" ? !Number.isFinite(target.version) : typeof target.version !== "string" || !target.version.trim())) || new Set(targets.map(target => target.id)).size !== targets.length) throw new Error("BulkActionBar requires explicit scope and unique named targets with versions.");
  const { messages } = useUILocale(); const descriptionId = React.useId();
  const snapshot = { scope, targets: targets.map(target => ({ ...target })) };
  const element = useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "bulk-action-bar", role: "group", "aria-labelledby": `${descriptionId}-scope`, "aria-describedby": descriptionId, "data-selection-count": targets.length, className: cn("flex min-w-0 flex-col gap-(--qy-panel-gap) text-body", className), children: <><div id={descriptionId} data-slot="bulk-action-bar-scope" className="flex min-w-0 flex-col gap-(--qy-field-gap)"><p id={`${descriptionId}-scope`} className="m-0 text-body-strong wrap-anywhere">{scope}</p><p className="m-0 text-support">{messages.selectedCount(targets.length)}</p><ul data-slot="bulk-action-bar-targets" className="m-0 min-w-0 list-none p-0 text-support text-muted-foreground">{targets.map(target => <li key={target.id} className="wrap-anywhere">{target.label} · {messages.bulkVersion} {target.version}</li>)}</ul></div>{children}</> }, props) });
  return <BulkContext.Provider value={{ snapshot, disabled: disabled || targets.length === 0, onClear }}>{element}</BulkContext.Provider>;
}
export type BulkActionBarActionsProps = useRender.ComponentProps<"div">;
export function BulkActionBarActions({ render, className, ...props }: BulkActionBarActionsProps) { return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "bulk-action-bar-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) }); }
export type BulkActionBarActionProps = ButtonProps & { onExecute: (snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void };
export function BulkActionBarAction({ disabled, onClick, onExecute, ...props }: BulkActionBarActionProps) { const context = useBulk(); return <Button data-slot="bulk-action-bar-action" variant="bordered" {...props} disabled={Boolean(disabled || context.disabled)} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) onExecute(context.snapshot, event); }} />; }
export type BulkActionBarClearProps = ButtonProps;
export function BulkActionBarClear({ disabled, onClick, children, ...props }: BulkActionBarClearProps) { const context = useBulk(); const { messages } = useUILocale(); return <Button data-slot="bulk-action-bar-clear" variant="quiet" {...props} disabled={Boolean(disabled || context.disabled || (!onClick && !context.onClear))} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.onClear?.(context.snapshot, event); }}>{children ?? messages.clearSelection}</Button>; }
