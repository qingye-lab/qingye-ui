"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type TableContainerProps = useRender.ComponentProps<"div">;
export function TableContainer({ render, className, ...props }: TableContainerProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "table-container", tabIndex: 0, className: cn("min-w-0 max-w-full overflow-x-auto rounded-item outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
}
export type TableProps = useRender.ComponentProps<"table">;
export function Table({ render, className, ...props }: TableProps) {
  return useRender({ defaultTagName: "table", render, props: mergeProps({ "data-slot": "table", className: cn("w-full border-collapse text-body text-foreground", className) }, props) });
}
export type TableCaptionProps = useRender.ComponentProps<"caption">;
export function TableCaption({ render, className, ...props }: TableCaptionProps) {
  return useRender({ defaultTagName: "caption", render, props: mergeProps({ "data-slot": "table-caption", className: cn("pb-(--qy-panel-gap) text-start text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type TableHeaderProps = useRender.ComponentProps<"thead">;
export function TableHeader({ render, className, ...props }: TableHeaderProps) {
  return useRender({ defaultTagName: "thead", render, props: mergeProps({ "data-slot": "table-header", className: cn("border-b border-border-strong", className) }, props) });
}
export type TableBodyProps = useRender.ComponentProps<"tbody">;
export function TableBody({ render, className, ...props }: TableBodyProps) {
  return useRender({ defaultTagName: "tbody", render, props: mergeProps({ "data-slot": "table-body", className: cn("[&>tr:last-child]:border-b-0", className) }, props) });
}
export type TableFooterProps = useRender.ComponentProps<"tfoot">;
export function TableFooter({ render, className, ...props }: TableFooterProps) {
  return useRender({ defaultTagName: "tfoot", render, props: mergeProps({ "data-slot": "table-footer", className: cn("border-t border-border-strong text-body-strong", className) }, props) });
}
export type TableRowProps = useRender.ComponentProps<"tr">;
export function TableRow({ render, className, ...props }: TableRowProps) {
  return useRender({ defaultTagName: "tr", render, props: mergeProps({ "data-slot": "table-row", className: cn("h-(--qy-row-default) border-b border-border", className) }, props) });
}
export type TableHeadProps = useRender.ComponentProps<"th">;
export function TableHead({ render, className, scope = "col", ...props }: TableHeadProps) {
  return useRender({ defaultTagName: "th", render, props: mergeProps({ "data-slot": "table-head", scope, className: cn("px-(--qy-panel-gap) py-(--qy-field-gap) text-start align-top text-body-strong", className) }, props) });
}
export type TableCellProps = useRender.ComponentProps<"td">;
export function TableCell({ render, className, ...props }: TableCellProps) {
  return useRender({ defaultTagName: "td", render, props: mergeProps({ "data-slot": "table-cell", className: cn("px-(--qy-panel-gap) py-(--qy-field-gap) align-top", className) }, props) });
}
