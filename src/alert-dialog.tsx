import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type { ComponentProps } from "react";
import { cn } from "./utils";

// Preserve Qingye's original namespace-style AlertDialog export while exposing
// the baseline-compatible named building blocks below.
const AlertDialog = DialogPrimitive;
const AlertDialogTrigger = DialogPrimitive.Trigger;
const AlertDialogClose = DialogPrimitive.Close;

function AlertDialogContent({ className, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="alert-dialog-overlay"
        className="fixed inset-0 z-50 bg-foreground/15 backdrop-blur-xs transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="alert-dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-[min(30rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-card p-5 shadow-raised outline-none transition data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
          className,
        )}
        {...props}
      />
    </DialogPrimitive.Portal>
  );
}
function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) { return <div className={cn("grid gap-2", className)} {...props} />; }
function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) { return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />; }
function AlertDialogTitle({ className, ...props }: DialogPrimitive.Title.Props) { return <DialogPrimitive.Title className={cn("text-section font-semibold", className)} {...props} />; }
function AlertDialogDescription({ className, ...props }: DialogPrimitive.Description.Props) { return <DialogPrimitive.Description className={cn("text-body leading-6 text-muted-foreground", className)} {...props} />; }

export { AlertDialog, AlertDialogTrigger, AlertDialogClose, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription };
