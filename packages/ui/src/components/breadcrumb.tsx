"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { IconChevronRight, IconDots } from "@tabler/icons-react";
import { Button } from "./button";
import { Menu, MenuLinkItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "./menu";

export type BreadcrumbProps = useRender.ComponentProps<"nav">;
/**
 * 面包屑是一条路径（基础层 §6、§7）：成排的上级由位置表明可去，平时是浓墨、不加下划线，
 * 悬停才加深并出现下划线；当前页是焦墨。分隔是一枚重墨的小箭头，只作装饰，对读屏隐藏。
 */
export function Breadcrumb({ render, className, ...props }: BreadcrumbProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "nav", render, props: mergeProps({ "data-slot": "breadcrumb", "aria-label": messages.breadcrumb, className: cn("min-w-0 text-body", className) }, props) });
}
export type BreadcrumbListProps = useRender.ComponentProps<"ol"> & {
  /**
   * 路径最多显示几项（整数，≥ 3）；超过时保留第一项与最后 `maxItems - 2` 项，中间折叠成一个「更多」入口，点开是一个菜单，
   * 每个被折叠的 BreadcrumbItem 里的 BreadcrumbLink 成为菜单里的链接（href、render、事件原样转发）。
   * 不设置则完整显示。折叠只看项数，不看宽度：宽度驱动的折叠会让同一页面在不同窗口下露出不同的路径，也需要测量，留作观察。
   */
  maxItems?: number;
};
/** Fragment 只是分组，不是一项：展开后再数。 */
function flatten(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap(node => React.isValidElement<{ children?: React.ReactNode }>(node) && node.type === React.Fragment ? flatten(node.props.children) : [node]);
}
/** 3 是下限：首项、折叠入口各占一格，至少还要留当前页（最后一项）。 */
function foldItems(children: React.ReactNode, maxItems: number): React.ReactNode {
  if (!Number.isInteger(maxItems) || maxItems < 3) throw new RangeError("BreadcrumbList maxItems must be an integer of at least 3.");
  const items = flatten(children);
  if (items.length <= maxItems) return children;
  const hidden = items.slice(1, items.length - (maxItems - 2));
  const parts = hidden.map(item => React.isValidElement<{ children?: React.ReactNode }>(item) ? flatten(item.props.children) : []);
  const links = parts.map(part => part.find((node): node is React.ReactElement<BreadcrumbLinkProps> => React.isValidElement(node) && node.type === BreadcrumbLink));
  if (links.some(link => !link)) throw new Error("BreadcrumbList maxItems folds only BreadcrumbItems that hold a BreadcrumbLink.");
  const separator = parts[0]!.find(node => React.isValidElement(node) && node.type === BreadcrumbSeparator);
  return <>
    {items[0]}
    <BreadcrumbItem key="breadcrumb-more" data-slot="breadcrumb-more-item"><BreadcrumbMore links={links as React.ReactElement<BreadcrumbLinkProps>[]} />{separator}</BreadcrumbItem>
    {items.slice(items.length - (maxItems - 2))}
  </>;
}
function BreadcrumbMore({ links }: { links: readonly React.ReactElement<BreadcrumbLinkProps>[] }) {
  const { messages } = useUILocale();
  return <Menu>
    <MenuTrigger data-slot="breadcrumb-more" aria-label={messages.more} render={<Button variant="quiet" size="xs" shape="icon" />}><IconDots aria-hidden="true" /></MenuTrigger>
    <MenuPortal><MenuPositioner><MenuPopup>{links.map((link, index) => {
      const { className: _className, children, ...rest } = link.props;
      return <MenuLinkItem key={link.key ?? index} {...(rest as object)}>{children}</MenuLinkItem>;
    })}</MenuPopup></MenuPositioner></MenuPortal>
  </Menu>;
}
export function BreadcrumbList({ render, className, maxItems, children, ...props }: BreadcrumbListProps) {
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "breadcrumb-list", className: cn("m-0 flex min-w-0 list-none flex-wrap items-center gap-(--qy-control-content-gap) p-0", className), children: maxItems === undefined ? children : foldItems(children, maxItems) }, props) });
}
export type BreadcrumbItemProps = useRender.ComponentProps<"li">;
export function BreadcrumbItem({ render, className, ...props }: BreadcrumbItemProps) {
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "breadcrumb-item", className: cn("flex min-w-0 items-center gap-(--qy-control-content-gap) wrap-anywhere", className) }, props) });
}
export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;
export function BreadcrumbLink({ render, className, ...props }: BreadcrumbLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "breadcrumb-link", className: cn("touch-target min-w-0 rounded-marker text-muted-foreground underline-offset-[round(0.25em,1px)] outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring", className) }, props) });
}
export type BreadcrumbCurrentProps = useRender.ComponentProps<"span">;
export function BreadcrumbCurrent({ render, className, ...props }: BreadcrumbCurrentProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "breadcrumb-current", "aria-current": "page", className: cn("min-w-0 text-foreground", className) }, props) });
}
export type BreadcrumbSeparatorProps = useRender.ComponentProps<"span">;
export function BreadcrumbSeparator({ render, className, children = <IconChevronRight className="size-(--qy-control-sm-icon)" />, ...props }: BreadcrumbSeparatorProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "breadcrumb-separator", "aria-hidden": true, children, className: cn("inline-flex shrink-0 text-input", className) }, props) });
}
