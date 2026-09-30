import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as Coss from "./coss/card";
import { cn } from "./utils";

export const cardVariants = cva("group/card min-w-0 [--card-spacing:var(--density-panel-padding)]", {
  variants: {
    size: { default: "", sm: "[--card-spacing:var(--density-panel-padding-sm)] [&>[data-slot=card-header]]:p-(--card-spacing) [&>[data-slot=card-panel]]:p-(--card-spacing) [&>[data-slot=card-footer]]:p-(--card-spacing)" },
    variant: { panel: "", inset: "bg-muted", floating: "", plain: "border-0 bg-transparent shadow-none before:hidden", auth: "border-0 shadow-none before:hidden [--card-spacing:0] [&>[data-slot=card-header]]:p-0 [&>[data-slot=card-panel]]:p-0" },
  }, defaultVariants: { size: "default", variant: "panel" },
});
export function Card({ className, size = "default", variant = "panel", ...props }: ComponentProps<typeof Coss.Card> & VariantProps<typeof cardVariants>) {
  return <Coss.Card data-size={size} data-variant={variant} className={cn(cardVariants({ size, variant }), className)} {...props} />;
}
export function CardHeader({ className, variant = "default", ...props }: ComponentProps<typeof Coss.CardHeader> & { variant?: "default" | "divided" | "flush" }) {
  return <Coss.CardHeader className={cn(variant === "divided" && "border-b border-border-subtle pb-(--card-spacing)", variant === "flush" && "gap-2 px-0 pt-0", className)} {...props} />;
}
export function CardTitle({ as: Tag = "h2", className, variant = "default", ...props }: ComponentProps<"h2"> & { as?: "h1" | "h2" | "h3"; variant?: "default" | "page" }) {
  return <Coss.CardTitle render={<Tag />} className={cn(variant === "page" && "text-page", className)} {...props} />;
}
export function CardDescription(props: ComponentProps<"p">) { return <Coss.CardDescription render={<p />} {...props} />; }
export { CardAction } from "./coss/card";
export function CardContent({ className, inset = "default", ...props }: ComponentProps<typeof Coss.CardPanel> & { inset?: "default" | "flush" }) {
  return <Coss.CardPanel data-inset={inset} className={cn(inset === "flush" && "p-0", className)} {...props} />;
}
export function CardFooter({ className, variant = "default", ...props }: ComponentProps<typeof Coss.CardFooter> & { variant?: "default" | "plain" }) {
  return <Coss.CardFooter className={cn(variant === "plain" && "p-0", className)} {...props} />;
}
