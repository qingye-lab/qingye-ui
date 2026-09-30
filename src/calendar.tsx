import type { ComponentProps } from "react";
import { Calendar as CossCalendar } from "./coss/calendar";
import { cn } from "./utils";

export function Calendar({ className, ...props }: ComponentProps<typeof CossCalendar>) {
  return <CossCalendar className={cn(className)} {...props} />;
}
