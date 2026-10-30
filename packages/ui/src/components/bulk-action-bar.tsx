"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { useUILocale } from "../locale";
import { useStuck, stickyBarClassName } from "../sticky-bar";
import { cn } from "../utils";

export interface BulkActionTarget { readonly id: string; readonly label: string; readonly version: string | number }
/** 应用定义的整个集合（如「符合当前筛选的全部订单」）；对象无法逐个列出，范围与查询条件由应用持有。 */
export interface BulkActionExtent { readonly count: number; readonly label: string }
/** `extent` 存在时，`targets` 只是界面上已知的那部分对象，不代表全部对象；应用须按自己持有的查询与范围执行。 */
export interface BulkActionSnapshot { readonly targets: readonly BulkActionTarget[]; readonly scope: string; readonly extent?: BulkActionExtent }
type BulkState = { snapshot: BulkActionSnapshot; disabled: boolean; onClear?: ((snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void) | undefined };
const BulkContext = React.createContext<BulkState | null>(null);
function useBulk() { const context = React.useContext(BulkContext); if (!context) throw new Error("BulkActionBar parts require BulkActionBar."); return context; }
export type BulkActionBarProps = useRender.ComponentProps<"div"> & { targets: readonly BulkActionTarget[]; scope: string; extent?: BulkActionExtent | undefined; /** 吸附在最近的滚动容器顶端（Workspace 中即 `WorkspaceContent`）；不能放进带 overflow 的中间容器，否则吸在那个容器里。只在吸住且下面有内容滚过时才画分界线。 */ sticky?: boolean; disabled?: boolean; onClear?: (snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void };
/*
 * 批量动作条一行说完：已选几项、是哪些（浓墨，放不下就截断），右边是动作。
 * 范围名与每个对象的版本是执行前要核对的事实，完整交给读屏与快照，不铺在界面上（NG8）。
 */
export function BulkActionBar({ targets, scope, extent, sticky = false, disabled = false, onClear, render, className, children, ...props }: BulkActionBarProps) {
  if (!scope.trim() || targets.some(target => !target.id.trim() || !target.label.trim() || (typeof target.version === "number" ? !Number.isFinite(target.version) : typeof target.version !== "string" || !target.version.trim())) || new Set(targets.map(target => target.id)).size !== targets.length) throw new Error("BulkActionBar requires explicit scope and unique named targets with versions.");
  if (extent && (!Number.isInteger(extent.count) || extent.count < 1 || !extent.label.trim())) throw new Error("BulkActionBar extent requires a positive integer count and a nonempty label.");
  const { code, messages } = useUILocale(); const descriptionId = React.useId();
  // 分隔符跟随界面语言（中文「、」，英文「, 」），不写死在组件里。
  const separators = React.useMemo(() => new Intl.ListFormat(code, { type: "conjunction", style: "narrow" }).formatToParts(targets.map(target => target.id)).filter(part => part.type === "literal").map(part => part.value), [code, targets]);
  const { target, stuck } = useStuck<HTMLDivElement>(sticky);
  const snapshot: BulkActionSnapshot = { scope, targets: targets.map(target => ({ ...target })), ...(extent ? { extent: { count: extent.count, label: extent.label } } : null) };
  const element = useRender({ defaultTagName: "div", render, ref: target, props: mergeProps({ "data-slot": "bulk-action-bar", role: "group", "aria-labelledby": `${descriptionId}-scope`, "aria-describedby": descriptionId, "data-selection-count": extent?.count ?? targets.length, "data-extent": extent ? "" : undefined, "data-sticky": sticky ? "" : undefined, "data-stuck": stuck ? "" : undefined, className: cn("flex min-w-0 flex-wrap items-center justify-between gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) text-body", sticky && stickyBarClassName, className), children: <><p id={`${descriptionId}-scope`} className="sr-only">{scope}</p><div id={descriptionId} data-slot="bulk-action-bar-scope" className="flex min-w-0 flex-1 items-baseline gap-(--qy-field-gap)"><p className="m-0 shrink-0 text-body text-foreground">{messages.selectedCount(extent?.count ?? targets.length)}</p>{extent ? <p data-slot="bulk-action-bar-extent" className="m-0 min-w-0 truncate text-support text-muted-foreground">{extent.label}</p> : <ul data-slot="bulk-action-bar-targets" className="m-0 flex min-w-0 list-none truncate p-0 text-support text-muted-foreground">{targets.map((target, index) => <li key={target.id} className="inline">{index > 0 && separators[index - 1]}{target.label}<span className="sr-only"> · {messages.bulkVersion} {target.version}</span></li>)}</ul>}</div>{children}</> }, props) });
  return <BulkContext.Provider value={{ snapshot, disabled: disabled || (targets.length === 0 && !extent), onClear }}>{element}</BulkContext.Provider>;
}
export type BulkActionBarActionsProps = useRender.ComponentProps<"div">;
export function BulkActionBarActions({ render, className, ...props }: BulkActionBarActionsProps) { return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "bulk-action-bar-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) }); }
export type BulkActionBarActionProps = ButtonProps & { onExecute: (snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void };
export function BulkActionBarAction({ disabled, onClick, onExecute, ...props }: BulkActionBarActionProps) { const context = useBulk(); return <Button data-slot="bulk-action-bar-action" variant="bordered" {...props} disabled={Boolean(disabled || context.disabled)} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) onExecute(context.snapshot, event); }} />; }
export type BulkActionBarClearProps = ButtonProps;
export function BulkActionBarClear({ disabled, onClick, children, ...props }: BulkActionBarClearProps) { const context = useBulk(); const { messages } = useUILocale(); return <Button data-slot="bulk-action-bar-clear" variant="quiet" {...props} disabled={Boolean(disabled || context.disabled || (!onClick && !context.onClear))} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) context.onClear?.(context.snapshot, event); }}>{children ?? messages.clearSelection}</Button>; }
export type BulkActionBarExtendProps = Omit<ButtonProps, "onClick"> & { count: number; onExtend: (event: React.MouseEvent<HTMLButtonElement>) => void; onClick?: ButtonProps["onClick"] };
/** 「本页已选 → 选择全部 N 项」的入口。组件不推断是否还有更多：只在调用方渲染时出现；点击后由应用改传 `extent`。 */
export function BulkActionBarExtend({ count, onExtend, disabled, onClick, children, ...props }: BulkActionBarExtendProps) { const context = useBulk(); const { messages } = useUILocale(); return <Button data-slot="bulk-action-bar-extend" variant="quiet" {...props} disabled={Boolean(disabled || context.disabled)} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) onExtend(event); }}>{children ?? messages.selectAllMatching(count)}</Button>; }
