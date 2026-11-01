"use client";

import type * as React from "react";
import { useUILocale } from "../locale";
import { isList, isName, received } from "../require-name";
import { cn } from "../utils";
import { Avatar, AvatarFallback, AvatarImage, type AvatarSize } from "./avatar";

export type AvatarGroupItem = {
  /** 稳定标识；省略时用位置。两个人可以同名，标识不可以重复。 */
  key?: string;
  /** 这个人的名称，必填：头像是图形，名称是它唯一的文字身份。 */
  label: string;
  src?: string;
  /** 图片缺失或加载失败时显示的字。省略时取名称的第一个字。 */
  fallback?: React.ReactNode;
};
export type AvatarGroupProps = Omit<React.ComponentProps<"div">, "children"> & {
  items: readonly AvatarGroupItem[];
  /** 最多露出几个头像，其余收进末尾的「+N」。默认 5。 */
  max?: number;
  size?: AvatarSize;
};

/*
 * 叠放量 = 头像直径的 1/4（关系：头像中央是名称的字，字占直径中间约一半，即两侧各 1/4 直径；
 * 后一个头像只许盖进前一个的外侧 1/4，字始终在外面）。直径来自 --qy-avatar-*（即控件高度档），
 * 所以 24/28/32/36/40 的叠放量是 6/7/8/9/10px，都是整像素（材有美）。
 * 头像之间用一圈纸色隔开（2px，与 CornerMark 的纸色圈同一机制），读者看到的是两个圆而不是一个粘连的形状。
 * 用 margin-inline-start 的逻辑方向，从右向左排版时自动反向。
 */
const overlaps: Record<AvatarSize, string> = {
  xs: "[&>*+*]:-ms-[calc(var(--qy-avatar-xs)/4)]",
  sm: "[&>*+*]:-ms-[calc(var(--qy-avatar-sm)/4)]",
  md: "[&>*+*]:-ms-[calc(var(--qy-avatar-md)/4)]",
  lg: "[&>*+*]:-ms-[calc(var(--qy-avatar-lg)/4)]",
  xl: "[&>*+*]:-ms-[calc(var(--qy-avatar-xl)/4)]",
};

/**
 * 一组头像：表达「这件事涉及哪些人」。与 Avatar 的分工：Avatar 是一个人的身份样本，
 * AvatarGroup 只负责叠放、截断与整组的名称。
 * - 整组是 role="group"，必须有名称（aria-label 或 aria-labelledby），与 ButtonGroup 同一契约；
 *   每个头像仍是自己的 role="img"，名称读各自的人。
 * - 超过 max 时末尾是「+N」，它的可访问名称列出被收起的全部名称（locale：avatarGroupMore），
 *   读屏用户不会因为视觉截断而丢掉名单。
 * - 它不是可点击的范围：要点击整组或其中一个，把它放进 Button 或链接里，名称与焦点归外层（见 Avatar 文档）。
 */
export function AvatarGroup({ items, max = 5, size = "md", className, ...props }: AvatarGroupProps) {
  const { messages } = useUILocale();
  if (!isName(props["aria-label"]) && !isName(props["aria-labelledby"])) throw new Error(`AvatarGroup requires a nonempty aria-label or aria-labelledby naming the group; received aria-label ${received(props["aria-label"])} and aria-labelledby ${received(props["aria-labelledby"])}.`);
  if (!isList(items)) throw new Error(`AvatarGroup items must be an array; received ${received(items)}.`);
  items.forEach((item, index) => {
    if (typeof item !== "object" || item === null || !isName(item.label)) throw new Error(`AvatarGroup items[${index}] requires a nonempty label; received ${received((item as { label?: unknown } | null)?.label)}.`);
  });
  const limit = Math.max(1, Math.floor(max) || 1);
  const shown = items.slice(0, limit);
  const hidden = items.slice(limit);
  return (
    <div role="group" data-slot="avatar-group" data-size={size} {...props}
      className={cn("inline-flex items-center [&>*]:shrink-0 [&>*]:ring-2 [&>*]:ring-(--qy-surface)", overlaps[size], className)}>
      {shown.map((item, index) => (
        <Avatar key={item.key ?? `#${index}`} label={item.label} size={size}>
          {item.src && <AvatarImage src={item.src} />}
          <AvatarFallback>{item.fallback ?? Array.from(item.label.trim())[0]}</AvatarFallback>
        </Avatar>
      ))}
      {hidden.length > 0 && (
        <Avatar label={messages.avatarGroupMore(hidden.length, hidden.map(item => item.label))} size={size} data-overflow="true">
          <AvatarFallback><span aria-hidden="true" className="numeric">+{hidden.length}</span></AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
