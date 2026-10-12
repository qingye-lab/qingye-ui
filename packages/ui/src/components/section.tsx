"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { cn } from "../utils";
import { Heading, type HeadingProps } from "./typography";

/**
 * 区块由标题命名：标题挂上来时把自己的 id 登记给区块，卸下时注销；区块没有标题就不产生引用。
 * 登记是一份列表而不是一个值：同一区块里有两个标题（例如条件渲染切换）时，卸下其中一个不会抹掉另一个的命名。
 */
const SectionContext = React.createContext<((id: string) => () => void) | null>(null);

export type SectionProps = useRender.ComponentProps<"section">;
/**
 * 页面里不带边框的一段内容，由标题命名（基础层 §3 疏密、NG4）。
 * 自己不画线、不铺底、不加圆角；区块之间的距离由调用方用节间距排布
 * （`Stack gap="section"`），需要线时在两个区块之间放 `Separator`。
 */
export function Section({ render, className, ...props }: SectionProps) {
  const [titleIds, setTitleIds] = React.useState<readonly string[]>([]);
  const register = React.useCallback((id: string) => {
    setTitleIds(ids => [...ids, id]);
    return () => setTitleIds(ids => { const index = ids.indexOf(id); return index < 0 ? ids : [...ids.slice(0, index), ...ids.slice(index + 1)]; });
  }, []);
  const titleId = titleIds[0];
  const named = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  const element = useRender({ defaultTagName: "section", render, props: mergeProps({ "data-slot": "section", "aria-labelledby": named ? undefined : titleId, className: cn("min-w-0", className) }, props) });
  return <SectionContext.Provider value={register}>{element}</SectionContext.Provider>;
}

export type SectionHeaderProps = useRender.ComponentProps<"div">;
/**
 * 标题栏一行：标题在左，操作在右，同一条行中线（与 ChartHeader 同一规则，NG3）。
 * 行高恒为一个小号控件高：标题折行时，操作落到下一行，第一行的中线不动。
 * 与内容之间隔一个组内间隔，标题与它所命名的内容是一组。
 */
export function SectionHeader({ render, className, ...props }: SectionHeaderProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "section-header", className: cn("mb-(--qy-field-gap) flex min-h-(--qy-control-sm) min-w-0 flex-wrap items-center gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) [&_[data-slot=button-content]]:whitespace-nowrap", className) }, props) });
}

export type SectionTitleProps = HeadingProps;
/** 区块标题，默认 `<h2>` 与 `heading` 档（16/24）；文档大纲层级用 `level` 改，不改字号。计数写成标题里的一段 `numeric text-muted-foreground`。 */
export function SectionTitle({ className, id, ...props }: SectionTitleProps) {
  const generated = React.useId(); const titleId = id ?? generated;
  const register = React.useContext(SectionContext);
  React.useLayoutEffect(() => register?.(titleId), [register, titleId]);
  // 标题所在的行恒为一个小号控件高，文字在行里垂直居中；标题是块，行内的计数与文字照常排。
  return <Heading data-slot="section-title" id={titleId} className={cn("min-h-(--qy-control-sm) grow [align-content:center]", className)} {...props} />;
}

export type SectionActionsProps = useRender.ComponentProps<"div">;
/**
 * 靠行尾的操作，用 `Link` 或 `Button variant="quiet" size="sm"`。
 * 行尾的无形入口以文字对齐右缘（基础层 §19），所以以 quiet 小按钮收尾时，整组抵消一个横向留白（负外边距放在容器上：弹性容器按子项的内在宽度取宽，子项自己的负边距不会缩小它）。
 */
export function SectionActions({ render, className, ...props }: SectionActionsProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "section-actions", className: cn("ms-auto flex min-w-0 shrink-0 items-center gap-(--qy-action-gap) [&:has(>[data-slot=button][data-variant=quiet][data-size=sm]:last-child)]:-me-(--qy-control-sm-padding)", className) }, props) });
}
