import { Empty, EmptyActions, EmptyDescription, EmptyTitle, type EmptyState } from "@qingye/ui/components/empty";
import { cn } from "@qingye/ui/utils";
import type { ReactNode } from "react";
export function PageState({ state = "unknown", title, description, children, headingLevel = 2, role, className }: { state?: EmptyState; title: ReactNode; description?: ReactNode; children?: ReactNode; headingLevel?: 1 | 2 | 3; role?: "status" | "alert"; className?: string }) {
  return <Empty state={state} className={cn("py-(--qy-section-gap)", className)} role={role}><EmptyTitle level={headingLevel} tabIndex={-1}>{title}</EmptyTitle>{description ? <EmptyDescription>{description}</EmptyDescription> : null}{children ? <EmptyActions>{children}</EmptyActions> : null}</Empty>;
}
