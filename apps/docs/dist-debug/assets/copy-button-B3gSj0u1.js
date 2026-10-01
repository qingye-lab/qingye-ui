import { r as reactExports, q as useUILocale, j as jsxRuntimeExports, B as Button, C as Check, bp as X, e as cn } from "./index-DM02Iz28.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
function useCopyToClipboard({
  timeout = 2e3,
  onCopy,
  onError
} = {}) {
  const [isCopied, setIsCopied] = reactExports.useState(false);
  const timeoutIdRef = reactExports.useRef(null);
  const copyToClipboard = (value) => {
    if (typeof window === "undefined" || !navigator.clipboard?.writeText) {
      onError?.(new Error("Clipboard API unavailable"));
      return;
    }
    if (!value) return;
    navigator.clipboard.writeText(value).then(
      () => {
        if (timeoutIdRef.current) {
          clearTimeout(timeoutIdRef.current);
        }
        setIsCopied(true);
        if (onCopy) {
          onCopy();
        }
        if (timeout !== 0) {
          timeoutIdRef.current = setTimeout(() => {
            setIsCopied(false);
            timeoutIdRef.current = null;
          }, timeout);
        }
      },
      (error) => {
        if (onError) onError(error);
        else console.error(error);
      }
    );
  };
  reactExports.useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);
  return { copyToClipboard, isCopied };
}
const swapClassName = "col-start-1 row-start-1 transition-[opacity,scale] duration-(--qy-duration-fast) ease-(--qy-ease-out)";
function CopyButton({
  value,
  timeout = 2e3,
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
}) {
  const { messages } = useUILocale();
  const labels = {
    idle: copyLabel ?? messages.copy,
    copied: copiedLabel ?? messages.copied,
    failed: errorLabel ?? messages.copyFailed
  };
  const [failed, setFailed] = reactExports.useState(false);
  const [announcement, setAnnouncement] = reactExports.useState({ count: 0, text: "" });
  const failTimer = reactExports.useRef(null);
  const announce = (text) => setAnnouncement((previous) => ({ count: previous.count + 1, text }));
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
    }
  });
  reactExports.useEffect(
    () => () => {
      if (failTimer.current) clearTimeout(failTimer.current);
    },
    []
  );
  const status = failed ? "failed" : isCopied ? "copied" : "idle";
  reactExports.useEffect(() => {
    if (status === "idle") setAnnouncement((previous) => ({ ...previous, text: "" }));
  }, [status]);
  const iconOnly = typeof size === "string" && size.startsWith("icon");
  const showLabel = !iconOnly && children == null;
  const icons = [
    { key: "idle", Icon: Copy },
    { key: "copied", Icon: Check },
    { key: "failed", Icon: X }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        "aria-label": iconOnly ? labels.idle : void 0,
        "data-slot": "copy-button",
        "data-status": status,
        onClick: (event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;
          setFailed(false);
          copyToClipboard(typeof value === "function" ? value() : value);
        },
        size,
        variant,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "grid place-items-center", "data-slot": "copy-button-icons", children: icons.map(({ key, Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Icon,
            {
              className: cn(
                swapClassName,
                status === key ? "scale-100 opacity-80" : "scale-60 opacity-0"
              ),
              "data-slot": "copy-button-icon"
            },
            key
          )) }),
          showLabel ? (
            // The label keeps its width on success (the icon confirms); only the
            // rare failure state swaps in its own, longer text.
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-slot": "copy-button-label", children: status === "failed" ? labels.failed : labels.idle })
          ) : children
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", role: "status", children: announcement.text ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: announcement.text }, announcement.count) : null })
  ] });
}
export {
  CopyButton as C
};
