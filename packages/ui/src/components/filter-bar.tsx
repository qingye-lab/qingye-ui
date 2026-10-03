"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

type FilterState = { dirty: boolean; disabled: boolean; canClear: boolean; appliedSummary: React.ReactNode; onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined; onClear?: React.MouseEventHandler<HTMLButtonElement> | undefined };
const FilterContext = React.createContext<FilterState | null>(null);
function useFilter() { const context = React.useContext(FilterContext); if (!context) throw new Error("FilterBar parts require FilterBar."); return context; }
export type FilterBarProps = Omit<useRender.ComponentProps<"form">, "action" | "method"> & { dirty: boolean; appliedSummary: React.ReactNode; disabled?: boolean; canClear?: boolean; onApply: React.FormEventHandler<HTMLFormElement>; onCancel?: React.MouseEventHandler<HTMLButtonElement>; onClear?: React.MouseEventHandler<HTMLButtonElement> };
export function FilterBar({ dirty, appliedSummary, disabled = false, canClear = false, onApply, onCancel, onClear, onSubmit, render, className, ...props }: FilterBarProps) {
  const element = useRender({ defaultTagName: "form", render, props: mergeProps({ "data-slot": "filter-bar", "data-state": dirty ? "draft" : "applied", "data-disabled": disabled || undefined, className: cn("flex min-w-0 flex-col gap-(--qy-panel-gap) text-body", className), onSubmit(event: React.FormEvent<HTMLFormElement>) { onSubmit?.(event); if (event.defaultPrevented) return; event.preventDefault(); if (!disabled && dirty) onApply(event); } }, props) });
  return <FilterContext.Provider value={{ dirty, appliedSummary, disabled, canClear, onCancel, onClear }}>{element}</FilterContext.Provider>;
}
export type FilterBarFieldsProps = useRender.ComponentProps<"fieldset">;
export function FilterBarFields({ render, className, disabled, ...props }: FilterBarFieldsProps) { const context = useFilter(); return useRender({ defaultTagName: "fieldset", render, props: mergeProps({ "data-slot": "filter-bar-fields", disabled: context.disabled || disabled, className: cn("m-0 flex min-w-0 flex-wrap items-start gap-(--qy-field-group-gap) border-0 p-0", className) }, props) }); }
export type FilterBarAppliedProps = useRender.ComponentProps<"p">;
export function FilterBarApplied({ render, className, children, ...props }: FilterBarAppliedProps) { const context = useFilter(); return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "filter-bar-applied", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className), children: children ?? context.appliedSummary }, props) }); }
export type FilterBarStatusProps = useRender.ComponentProps<"p">;
export function FilterBarStatus({ render, className, children, ...props }: FilterBarStatusProps) { const context = useFilter(); const { messages } = useUILocale(); return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "filter-bar-status", role: "status", className: cn("m-0 min-w-0 text-support wrap-anywhere", className), children: children ?? (context.dirty ? messages.filterUnapplied : null) }, props) }); }
export type FilterBarActionsProps = useRender.ComponentProps<"div">;
export function FilterBarActions({ render, className, ...props }: FilterBarActionsProps) { return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "filter-bar-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) }); }
export type FilterBarApplyProps = ButtonProps;
export function FilterBarApply({ children, disabled, ...props }: FilterBarApplyProps) { const context = useFilter(); const { messages } = useUILocale(); return <Button data-slot="filter-bar-apply" {...props} type="submit" disabled={Boolean(disabled || context.disabled || !context.dirty)}>{children ?? messages.apply}</Button>; }
export type FilterBarCancelProps = ButtonProps;
export function FilterBarCancel({ children, disabled, onClick, ...props }: FilterBarCancelProps) { const context = useFilter(); const { messages } = useUILocale(); return <Button data-slot="filter-bar-cancel" variant="quiet" {...props} type="button" disabled={Boolean(disabled || context.disabled || !context.dirty || (!onClick && !context.onCancel))} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.onCancel?.(event); }}>{children ?? messages.cancel}</Button>; }
export type FilterBarClearProps = ButtonProps;
export function FilterBarClear({ children, disabled, onClick, ...props }: FilterBarClearProps) { const context = useFilter(); const { messages } = useUILocale(); return <Button data-slot="filter-bar-clear" variant="quiet" {...props} type="button" disabled={Boolean(disabled || context.disabled || !context.canClear || (!onClick && !context.onClear))} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.onClear?.(event); }}>{children ?? messages.clear}</Button>; }
