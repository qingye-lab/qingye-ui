import { createContext, useContext, useMemo, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as Coss from "./coss/field";
import type { Label } from "./label";
import { Separator } from "./separator";
import { cn } from "./utils";
const FieldContext = createContext(false);

export function FieldSet({ className, ...props }: ComponentProps<"fieldset">) { return <fieldset data-slot="field-set" className={cn("flex flex-col gap-4", className)} {...props} />; }
export function FieldLegend({ className, variant = "legend", ...props }: ComponentProps<"legend"> & { variant?: "legend" | "label" }) { return <legend data-slot="field-legend" data-variant={variant} className={cn("mb-1.5 font-medium data-[variant=label]:text-body data-[variant=legend]:text-section", className)} {...props} />; }
export function FieldGroup({ className, ...props }: ComponentProps<"div">) { return <div data-slot="field-group" className={cn("flex w-full flex-col gap-5", className)} {...props} />; }
const fieldVariants = cva("group/field flex w-full gap-2 data-[invalid=true]:text-destructive", { variants: { orientation: { vertical: "flex-col *:w-full", horizontal: "flex-row items-center", responsive: "flex-col" } }, defaultVariants: { orientation: "vertical" } });
export function Field({ className, orientation = "vertical", ...props }: ComponentProps<"div"> & VariantProps<typeof fieldVariants>) { return <FieldContext.Provider value={true}><Coss.Field role="group" data-orientation={orientation} className={cn(fieldVariants({ orientation }), className)} {...props} /></FieldContext.Provider>; }
export function FieldContent({ className, ...props }: ComponentProps<"div">) { return <div data-slot="field-content" className={cn("flex flex-1 flex-col gap-0.5 leading-snug", className)} {...props} />; }
export function FieldLabel({ className, ...props }: ComponentProps<typeof Label>) { return <Coss.FieldLabel className={className} {...props} />; }
export function FieldTitle({ className, ...props }: ComponentProps<"div">) { return <div data-slot="field-title" className={cn("flex w-fit items-center gap-2 text-body font-medium", className)} {...props} />; }
export function FieldDescription({ className, ...props }: ComponentProps<"p">) { return <Coss.FieldDescription className={className} {...props} />; }
export function FieldSeparator({ children, className, ...props }: ComponentProps<"div"> & { children?: React.ReactNode }) { return <div data-slot="field-separator" className={cn("relative -my-2 h-5 text-body", className)} {...props}><Separator className="absolute inset-0 top-1/2" />{children ? <span className="relative mx-auto block w-fit bg-background px-2 text-muted-foreground">{children}</span> : null}</div>; }
export function FieldError({ className, children, errors, ...props }: ComponentProps<"div"> & { errors?: Array<{ message?: string } | undefined> }) {
  const inField = useContext(FieldContext);
  const content = useMemo(() => {
    if (children) return children;
    const unique = [...new Set((errors ?? []).map((error) => error?.message).filter(Boolean))];
    return unique.length > 1 ? <ul className="ml-4 list-disc">{unique.map((message) => <li key={message}>{message}</li>)}</ul> : unique[0];
  }, [children, errors]);
  if (!content) return null;
  const error = <Coss.FieldError match={true} role="alert" className={className} {...props}>{content}</Coss.FieldError>;
  return inField ? error : <Coss.Field>{error}</Coss.Field>;
}
