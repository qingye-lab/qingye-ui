"use client";

import { CheckIcon, CopyIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button, type ButtonProps } from "./button";

type CopyStatus = "idle" | "copied" | "failed";

export type CopyButtonProps = Omit<ButtonProps, "value" | "loading"> & {
  /** Text to copy, or a function that returns it when the button is pressed. */
  value: string | (() => string);
  /** How long the copied or failed state is shown, in milliseconds. */
  timeout?: number;
  onCopy?: () => void;
  /** Called when the clipboard is unavailable or the browser rejects the write. */
  onCopyError?: (error: unknown) => void;
  /** Accessible name, and the visible label when there are no children. */
  copyLabel?: string;
  /** Announced after a successful copy; the check icon confirms visually. */
  copiedLabel?: string;
  /** Shown (in place of the label) and announced after a failed copy. */
  errorLabel?: string;
};

const swapClassName =
  "col-start-1 row-start-1 transition-[opacity,scale] duration-(--qy-duration-fast) ease-(--qy-ease-out)";

/**
 * Copies a value to the clipboard and confirms in place: the icon crossfades
 * to a check (or a cross on failure) without changing the button's width, and
 * the result is announced to assistive technology through a polite live region.
 */
export function CopyButton({
  value,
  timeout = 2000,
  onCopy,
  onCopyError,
  copyLabel,
  copiedLabel,
  errorLabel,
  children,
  size,
  variant = "outline",
  onClick,
  ...props
}: CopyButtonProps): React.ReactElement {
  const { messages } = useUILocale();
  const labels = {
    idle: copyLabel ?? messages.copy,
    copied: copiedLabel ?? messages.copied,
    failed: errorLabel ?? messages.copyFailed,
  };
  const [failed, setFailed] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState({ count: 0, text: "" });
  const failTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const announce = (text: string) =>
    setAnnouncement((previous) => ({ count: previous.count + 1, text }));

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    timeout,
    onCopy: () => {
      setFailed(false);
      announce(labels.copied);
      onCopy?.();
    },
    onError: (error) => {
      setFailed(true);
      announce(labels.failed);
      if (failTimer.current) clearTimeout(failTimer.current);
      if (timeout !== 0) failTimer.current = setTimeout(() => setFailed(false), timeout);
      onCopyError?.(error);
    },
  });

  React.useEffect(
    () => () => {
      if (failTimer.current) clearTimeout(failTimer.current);
    },
    [],
  );

  const status: CopyStatus = failed ? "failed" : isCopied ? "copied" : "idle";

  // Once the confirmation lapses, drop it so it is not read out of context.
  React.useEffect(() => {
    if (status === "idle") setAnnouncement((previous) => ({ ...previous, text: "" }));
  }, [status]);
  const iconOnly = typeof size === "string" && size.startsWith("icon");
  const showLabel = !iconOnly && children == null;

  const icons = [
    { key: "idle", Icon: CopyIcon },
    { key: "copied", Icon: CheckIcon },
    { key: "failed", Icon: XIcon },
  ] as const;

  return (
    <>
      <Button
        aria-label={iconOnly ? labels.idle : undefined}
        data-slot="copy-button"
        data-status={status}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          setFailed(false);
          copyToClipboard(typeof value === "function" ? value() : value);
        }}
        size={size}
        variant={variant}
        {...props}
      >
        <span aria-hidden="true" className="grid place-items-center" data-slot="copy-button-icons">
          {icons.map(({ key, Icon }) => (
            <Icon
              className={cn(
                swapClassName,
                status === key ? "scale-100 opacity-80" : "scale-60 opacity-0",
              )}
              data-slot="copy-button-icon"
              key={key}
            />
          ))}
        </span>
        {showLabel ? (
          // The label keeps its width on success (the icon confirms); only the
          // rare failure state swaps in its own, longer text.
          <span data-slot="copy-button-label">{status === "failed" ? labels.failed : labels.idle}</span>
        ) : (
          children
        )}
      </Button>
      <span className="sr-only" role="status">
        {announcement.text ? <span key={announcement.count}>{announcement.text}</span> : null}
      </span>
    </>
  );
}
