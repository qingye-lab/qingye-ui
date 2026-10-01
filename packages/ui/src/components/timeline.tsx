"use client";

import { useUILocale } from "../locale";
import type { ReactNode } from "react";
import { CircleIcon } from "lucide-react";
import { cn } from "../utils";

export type TimelineItem = { id: string; title: ReactNode; description?: ReactNode; time?: string; dateTime?: string; icon?: ReactNode };
export type TimelineProps = { items: readonly TimelineItem[]; label?: string; className?: string };
export function Timeline(props: TimelineProps) {
  const { messages } = useUILocale();
  const { items, label = messages.timeline, className } = props;
  return <ol aria-label={label} className={cn("m-0 flex list-none flex-col gap-0 p-0", className)}>{items.map((item, index) => <li key={item.id} className="relative flex min-w-0 gap-3 pb-5 last:pb-0">
    {index !== items.length - 1 ? <span aria-hidden="true" className="absolute start-3 top-7 bottom-0 border-s border-border" /> : null}
    <span aria-hidden="true" className="z-10 flex size-6 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground">{item.icon ?? <CircleIcon className="size-3" />}</span>
    <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><span className="font-medium">{item.title}</span>{item.time ? <time dateTime={item.dateTime} className="text-xs text-muted-foreground">{item.time}</time> : null}</div>{item.description ? <div className="mt-1 text-sm text-muted-foreground">{item.description}</div> : null}</div>
  </li>)}</ol>;
}
