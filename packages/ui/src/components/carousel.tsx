"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type CarouselItem = { id: string; label: string; content: React.ReactNode };
export type CarouselProps = Omit<useRender.ComponentProps<"section">, "children"> & {
  label: string;
  items: readonly CarouselItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (id: string) => void;
  emptyContent?: React.ReactNode;
};

/** Finite, manually advanced reading. Position never implies completion. */
export function Carousel({ label, items, value, defaultValue, onValueChange, emptyContent, render, ref, className, tabIndex = 0, onKeyDown, onFocusCapture, onBlurCapture, ...props }: CarouselProps) {
  if (!label.trim()) throw new Error("Carousel requires a nonempty accessible label.");
  const ids = new Set<string>();
  for (const item of items) {
    if (!item.id.trim() || ids.has(item.id) || !item.label.trim()) throw new Error("Carousel items require unique stable ids and nonempty labels.");
    ids.add(item.id);
  }
  const { messages } = useUILocale();
  const viewportId = React.useId();
  const [localValue, setLocalValue] = React.useState(() => defaultValue ?? items[0]?.id);
  const controlled = value !== undefined;
  if (controlled && items.length && !ids.has(value)) throw new RangeError("Carousel value must identify a current item.");
  const chosen = controlled ? value : localValue;
  const found = items.findIndex(item => item.id === chosen);
  const index = items.length ? Math.max(0, found) : -1;
  const current = items[index];
  const root = React.useRef<HTMLElement | null>(null);
  const panels = React.useRef(new Map<string, HTMLElement>());
  const previous = React.useRef(current?.id);
  const lastItemFocus = React.useRef<{ id: string; node: HTMLElement; panel: HTMLElement } | null>(null);

  React.useLayoutEffect(() => {
    if (!controlled && localValue !== current?.id) setLocalValue(current?.id);
    if (previous.current !== current?.id) {
      const focus = lastItemFocus.current;
      const active = root.current?.ownerDocument.activeElement;
      if (focus && focus.id === previous.current && (active === focus.node || (active === focus.node.ownerDocument.body && (!focus.node.isConnected || focus.panel.hidden)))) root.current?.focus();
      previous.current = current?.id;
    }
  }, [controlled, current?.id, localValue]);

  function go(next: number) {
    const item = items[next];
    if (!item || item.id === current?.id) return;
    onValueChange?.(item.id);
    if (!controlled) setLocalValue(item.id);
  }
  const rootProps = mergeProps(props, {
    "data-slot": "carousel", role: "region", "aria-label": label,
    "aria-roledescription": messages.carousel, tabIndex,
    className: cn("grid min-w-0 max-w-full gap-(--qy-panel-gap) rounded-item text-body outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring", className),
    onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
      onKeyDown?.(event);
      if (event.defaultPrevented || event.target !== event.currentTarget || !items.length) return;
      const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
      if (event.key === "Home") { event.preventDefault(); go(0); }
      else if (event.key === "End") { event.preventDefault(); go(items.length - 1); }
      else if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); go(index + ((event.key === "ArrowRight") !== rtl ? 1 : -1)); }
    },
    onFocusCapture(event: React.FocusEvent<HTMLElement>) {
      onFocusCapture?.(event);
      const node = event.target as HTMLElement;
      const panel = [...panels.current].find(([, element]) => element.contains(node));
      lastItemFocus.current = panel ? { id: panel[0], node, panel: panel[1] } : null;
    },
    onBlurCapture(event: React.FocusEvent<HTMLElement>) {
      onBlurCapture?.(event);
      const focus = lastItemFocus.current;
      if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget as Node)) lastItemFocus.current = null;
      else if (!event.relatedTarget && focus?.node.isConnected && !focus.panel.hidden) lastItemFocus.current = null;
    },
    children: <>
      <ScrollArea id={viewportId} tabIndex={-1} data-slot="carousel-viewport">
        {items.map(item => <section key={item.id} ref={element => { if (element) panels.current.set(item.id, element); else panels.current.delete(item.id); }} data-slot="carousel-item" role="group" aria-roledescription={messages.slide} aria-label={item.label} hidden={item.id !== current?.id} className="min-w-0 wrap-anywhere">{item.content}</section>)}
        {!items.length && emptyContent}
      </ScrollArea>
      {!!current && <div data-slot="carousel-controls" className="flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)">
        <Button variant="bordered" aria-disabled={index === 0} aria-controls={viewportId} className="aria-disabled:opacity-64" onClick={() => go(index - 1)}>{messages.previousSlide}</Button>
        <span data-slot="carousel-position" className="min-w-0 text-support wrap-anywhere" aria-live="polite" aria-atomic="true">{current.label} · {messages.slideOf(index + 1, items.length)}</span>
        <Button variant="bordered" aria-disabled={index === items.length - 1} aria-controls={viewportId} className="aria-disabled:opacity-64" onClick={() => go(index + 1)}>{messages.nextSlide}</Button>
      </div>}
    </>,
  });
  return useRender({ defaultTagName: "section", render, ref: [root, ref ?? null], props: rootProps });
}
