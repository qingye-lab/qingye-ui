import type { PropsWithChildren, HTMLAttributes } from "react";
import { cn } from "./utils";
import { Card } from "./coss/card";

export function Surface({ children, className, padding = "default", ...props }: PropsWithChildren<HTMLAttributes<HTMLElement>> & { padding?: "default" | "none" }) {
  return (
    <Card render={<section />}
      data-slot="surface"
      data-padding={padding}
      className={cn(padding === "default" && "p-(--density-panel-padding)", className)}
      {...props}
    >
      {children}
    </Card>
  );
}
