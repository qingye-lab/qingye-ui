import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@qingye/ui/components/empty";
import { cn } from "@qingye/ui/utils";
import type { ReactNode } from "react";

/** Shared site composition for unavailable pages, empty sections and failures. */
export function PageState({ title, description, children, headingLevel = 2, role, className }: {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  headingLevel?: 1 | 2 | 3;
  role?: "status" | "alert";
  className?: string;
}) {
  const Heading = `h${headingLevel}` as const;
  return <Empty className={cn("py-(--qy-space-8) md:py-(--qy-space-12)", className)} role={role}>
    <EmptyHeader>
      <EmptyTitle><Heading tabIndex={-1}>{title}</Heading></EmptyTitle>
      {description ? <EmptyDescription>{description}</EmptyDescription> : null}
    </EmptyHeader>
    {children ? <EmptyContent><div className="flex flex-wrap justify-center gap-(--qy-space-2)">{children}</div></EmptyContent> : null}
  </Empty>;
}
