import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ChevronDownIcon } from "lucide-react";
import { createContext, useContext, useId, type ComponentProps } from "react";

import { cn } from "./utils";

type DisclosureVariant = "plain" | "inset" | "separated";
type DisclosureContextValue = { contentId: string; variant: DisclosureVariant };

const DisclosureContext = createContext<DisclosureContextValue | null>(null);
type DisclosureTriggerProps = Omit<CollapsiblePrimitive.Trigger.Props, "aria-controls" | "nativeButton" | "render">;
type DisclosureContentProps = Omit<ComponentProps<typeof CollapsiblePrimitive.Panel>, "id">;
type DisclosureProps = CollapsiblePrimitive.Root.Props & { variant?: DisclosureVariant };

export function Disclosure({ className, variant = "plain", ...props }: DisclosureProps) {
  const contentId = `disclosure-${useId()}`;
  return (
    <DisclosureContext value={{ contentId, variant }}>
      <CollapsiblePrimitive.Root
        {...props}
        data-slot="disclosure"
        data-variant={variant}
        className={cn(
          variant === "inset" && "grid gap-3 rounded-lg border border-border-subtle bg-surface-subtle px-3 py-2 text-muted-foreground",
          variant === "separated" && "border-t border-border-subtle pt-4 text-muted-foreground",
          className,
        )}
      />
    </DisclosureContext>
  );
}

export function DisclosureTrigger({ children, className, ...props }: DisclosureTriggerProps) {
  const context = useContext(DisclosureContext);
  return (
    <CollapsiblePrimitive.Trigger
      {...props}
      data-slot="disclosure-trigger"
      aria-controls={context?.contentId}
      className={cn("group flex min-h-9 w-full items-center justify-between gap-2 rounded-lg text-left text-body font-medium text-muted-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/25 data-panel-open:text-foreground [@media(pointer:coarse)]:min-h-(--control-hit-target)", className)}
    >
      <span>{children}</span>
      <ChevronDownIcon aria-hidden="true" className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180" />
    </CollapsiblePrimitive.Trigger>
  );
}

export function DisclosureContent({ children, className, keepMounted = true, ...props }: DisclosureContentProps) {
  const context = useContext(DisclosureContext);
  return <CollapsiblePrimitive.Panel {...props} id={context?.contentId} data-slot="disclosure-content" keepMounted={keepMounted} className={cn("min-w-0", className)}><div className="min-w-0 pt-2">{children}</div></CollapsiblePrimitive.Panel>;
}
