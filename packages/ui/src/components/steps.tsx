"use client";

import { useUILocale } from "../locale";
import type { ReactNode } from "react";
import { CheckIcon } from "lucide-react";
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

