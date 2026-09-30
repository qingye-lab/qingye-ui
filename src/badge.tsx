import { Badge as CossBadge, badgeVariants as cossBadgeVariants } from "./coss/badge";
import type { BadgeProps as CossBadgeProps } from "./coss/badge";

type Variant = NonNullable<CossBadgeProps["variant"]> | "critical" | "neutral" | "ghost" | "link";
const toCossVariant = (variant?: Variant | null): CossBadgeProps["variant"] => variant === "critical" ? "error" : variant === "neutral" || variant === "ghost" ? "secondary" : variant === "link" ? "outline" : variant;
export type BadgeProps = Omit<CossBadgeProps, "variant"> & { variant?: Variant };
export function badgeVariants(props: Omit<Parameters<typeof cossBadgeVariants>[0], "variant"> & { variant?: Variant | null } = {}) {
  return cossBadgeVariants({ ...props, variant: toCossVariant(props.variant) });
}
export function Badge({ variant, ...props }: BadgeProps) {
  return <CossBadge variant={toCossVariant(variant)} {...props} />;
}
