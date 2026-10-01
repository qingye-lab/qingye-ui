import { TooltipPopup } from "@qingye/ui/components/tooltip";
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";
import { Tooltip, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { cn } from "@qingye/ui";
import { useUILocale } from "@qingye/ui/locale";
import { CheckIcon, CopyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyCodeButton({ value, className }: { value: string; className?: string }) {
  const { messages } = useUILocale();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      toastManager.add({ title: messages.copyError, type: "error" });
    }
  };

  const label = copied ? messages.copied : messages.copyCode;
  return (
    <>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              aria-label={label}
              className={cn("text-muted-foreground hover:text-foreground", className)}
              onClick={copy}
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
        </TooltipTrigger>
        <TooltipPopup>{label}</TooltipPopup>
      </Tooltip>
      <span aria-live="polite" className="sr-only">
        {copied ? messages.copied : ""}
      </span>
    </>
  );
}
