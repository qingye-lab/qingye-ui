import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { cn } from "@qingye_lab/ui/utils";
import { useUILocale } from "@qingye_lab/ui/locale";

/** The site's code-copy presentation; clipboard state belongs to the library. */
export function CopyCodeButton({ value, className, label }: { value: string; className?: string; label?: string }) {
  const { messages } = useUILocale();
  return <CopyButton shape="icon"
    className={cn("text-muted-foreground hover:text-foreground", className)}
    aria-label={label ?? messages.copyCode}
    size="sm"
    value={value}
    variant="quiet"
  />;
}
