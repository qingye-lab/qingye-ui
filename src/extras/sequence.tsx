"use client";

import { useUILocale } from "../locale";
import type { ReactNode } from "react";
import { CheckIcon, CircleIcon } from "lucide-react";
import { cn } from "../utils";

export type StepItem = { id: string; title: ReactNode; description?: ReactNode };
export type StepsProps = { items: readonly StepItem[]; current: number; label?: string; className?: string };
export function Steps(props: StepsProps) {
  const { messages } = useUILocale();
  const { items, current, label = messages.steps, className } = props;
  return <ol aria-label={label} className={cn("m-0 flex list-none flex-wrap gap-6 p-0", className)}>{items.map((item, index) => <li key={item.id} aria-current={index === current ? "step" : undefined} className="flex min-w-0 items-start gap-3">
    <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border text-xs", index <= current ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground")}>{index < current ? <CheckIcon aria-hidden="true" className="size-4" /> : index + 1}</span>
    <div><div className="font-medium">{item.title}</div>{item.description ? <div className="text-sm text-muted-foreground">{item.description}</div> : null}</div>
  </li>)}</ol>;
}

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
