import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, bp as X, e as cn } from "./index-DM02Iz28.js";
import { F as FieldControl } from "./FieldControl-CFc5_9rC.js";
const TYPED_DELIMITER = /[,，]/g;
const PASTE_DELIMITER = /[,，\n\r\t]+/;
function countDelimiters(text) {
  return text.match(TYPED_DELIMITER)?.length ?? 0;
}
function unique(tags) {
  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
}
function setRef(ref, value) {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
}
function TagInput({
  value,
  defaultValue,
  onValueChange,
  name,
  max,
  validate,
  size = "default",
  addOnBlur = true,
  removeLabel,
  className,
  style,
  inputClassName,
  disabled,
  readOnly,
  required,
  placeholder,
  ref,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  onKeyDown,
  onPaste,
  onBlur,
  onCompositionStart,
  onCompositionEnd,
  ...inputProps
}) {
  const { messages } = useUILocale();
  const [internal, setInternal] = reactExports.useState(
    () => unique(defaultValue ?? [])
  );
  const tags = value ?? internal;
  const [draft, setDraft] = reactExports.useState("");
  const [notice, setNotice] = reactExports.useState(null);
  const [flashed, setFlashed] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const tagRefs = reactExports.useRef([]);
  const pendingFocus = reactExports.useRef(null);
  const delimitersAtCompositionStart = reactExports.useRef(0);
  const flashTimer = reactExports.useRef(void 0);
  const hintId = reactExports.useId();
  const noticeId = reactExports.useId();
  const interactive = !disabled && !readOnly;
  reactExports.useEffect(() => () => clearTimeout(flashTimer.current), []);
  reactExports.useLayoutEffect(() => {
    const target = pendingFocus.current;
    if (target === null) return;
    pendingFocus.current = null;
    if (target === "input") inputRef.current?.focus();
    else tagRefs.current[target]?.focus();
  });
  const update = (next) => {
    if (value === void 0) setInternal(next);
    onValueChange?.(next);
  };
  const flash = (tag) => {
    clearTimeout(flashTimer.current);
    setFlashed(tag);
    flashTimer.current = setTimeout(() => setFlashed(null), 900);
  };
  const add = (candidates) => {
    const next = [...tags];
    const rejected = [];
    let message = null;
    let duplicate = null;
    for (const candidate of candidates) {
      const tag = candidate.trim();
      if (!tag) continue;
      if (next.includes(tag)) {
        duplicate ??= tag;
        message ??= { tone: "info", text: messages.tagExists(tag) };
        continue;
      }
      if (max !== void 0 && next.length >= max) {
        message = { tone: "error", text: messages.tagLimit(max) };
        rejected.push(tag);
        continue;
      }
      const invalid2 = validate?.(tag, next);
      if (invalid2) {
        if (message?.tone !== "error") message = { tone: "error", text: invalid2 };
        rejected.push(tag);
        continue;
      }
      next.push(tag);
    }
    if (next.length !== tags.length) update(next);
    setNotice(message);
    if (duplicate) flash(duplicate);
    return rejected;
  };
  const commit = (text) => {
    setDraft(add(text.split(PASTE_DELIMITER)).join(", "));
  };
  const remove = (index, focus) => {
    if (!interactive || index < 0 || index >= tags.length) return;
    pendingFocus.current = focus;
    setNotice(null);
    update(tags.filter((_, i) => i !== index));
  };
  const isRtl = (element) => getComputedStyle(element).direction === "rtl";
  const handleChange = (event) => {
    const next = event.currentTarget.value;
    const composing = event.nativeEvent.isComposing;
    if (notice) setNotice(null);
    if (!composing && countDelimiters(next) > countDelimiters(draft)) {
      const parts = next.split(TYPED_DELIMITER);
      const rest = parts.pop() ?? "";
      setDraft([...add(parts), rest.trimStart()].filter(Boolean).join(", "));
      return;
    }
    setDraft(next);
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !interactive) return;
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;
    const input = event.currentTarget;
    const atStart = input.selectionStart === 0 && input.selectionEnd === 0;
    if (event.key === "Enter") {
      if (draft.trim()) {
        event.preventDefault();
        commit(draft);
      }
    } else if (event.key === "Backspace") {
      if (draft === "" && tags.length > 0) {
        event.preventDefault();
        remove(tags.length - 1, null);
      }
    } else if (event.key === (isRtl(input) ? "ArrowRight" : "ArrowLeft") && atStart && tags.length > 0) {
      event.preventDefault();
      tagRefs.current[tags.length - 1]?.focus();
    } else if (event.key === "Escape" && (draft || notice)) {
      event.stopPropagation();
      setDraft("");
      setNotice(null);
    }
  };
  const handlePaste = (event) => {
    onPaste?.(event);
    if (event.defaultPrevented || !interactive) return;
    const text = event.clipboardData.getData("text/plain");
    if (!PASTE_DELIMITER.test(text)) return;
    event.preventDefault();
    const input = event.currentTarget;
    const start = input.selectionStart ?? draft.length;
    const end = input.selectionEnd ?? draft.length;
    commit(draft.slice(0, start) + text + draft.slice(end));
  };
  const handleBlur = (event) => {
    onBlur?.(event);
    if (!addOnBlur || !interactive || !draft.trim()) return;
    const root = event.currentTarget.closest("[data-slot=tag-input]");
    if (root?.contains(event.relatedTarget)) return;
    commit(draft);
  };
  const handleCompositionStart = (event) => {
    onCompositionStart?.(event);
    delimitersAtCompositionStart.current = countDelimiters(
      event.currentTarget.value
    );
  };
  const handleCompositionEnd = (event) => {
    onCompositionEnd?.(event);
    const next = event.currentTarget.value;
    if (countDelimiters(next) > delimitersAtCompositionStart.current) {
      const parts = next.split(TYPED_DELIMITER);
      const rest = parts.pop() ?? "";
      setDraft([...add(parts), rest.trimStart()].filter(Boolean).join(", "));
    }
  };
  const handleTagKeyDown = (event, index) => {
    if (event.target !== event.currentTarget || disabled) return;
    const rtl = isRtl(event.currentTarget);
    const previous = rtl ? "ArrowRight" : "ArrowLeft";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const focusTag = (i) => tagRefs.current[i]?.focus();
    switch (event.key) {
      case previous:
        event.preventDefault();
        focusTag(Math.max(0, index - 1));
        break;
      case next:
        event.preventDefault();
        if (index < tags.length - 1) focusTag(index + 1);
        else inputRef.current?.focus();
        break;
      case "Home":
        event.preventDefault();
        focusTag(0);
        break;
      case "End":
        event.preventDefault();
        inputRef.current?.focus();
        break;
      case "Backspace":
        event.preventDefault();
        remove(index, index > 0 ? index - 1 : tags.length > 1 ? 0 : "input");
        break;
      case "Delete":
        event.preventDefault();
        remove(index, index < tags.length - 1 ? index : "input");
        break;
      case "Escape":
        inputRef.current?.focus();
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          inputRef.current?.focus();
        }
    }
  };
  const handleControlMouseDown = (event) => {
    if (disabled || event.target === inputRef.current) return;
    event.preventDefault();
    inputRef.current?.focus();
  };
  const invalid = notice?.tone === "error" || ariaInvalid !== void 0 && ariaInvalid !== false && ariaInvalid !== "false";
  const describedBy = [ariaDescribedBy, hintId, notice ? noticeId : null].filter(Boolean).join(" ") || void 0;
  tagRefs.current.length = tags.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "relative inline-flex min-h-9 w-full cursor-text flex-wrap gap-1 rounded-lg border border-input bg-background not-dark:bg-clip-padding p-[calc(--spacing(1)-1px)] text-base shadow-xs/5 outline-none ring-ring/24 transition-shadow *:min-h-7 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-focus-within:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[3px] has-disabled:pointer-events-none has-aria-invalid:border-destructive/36 has-disabled:opacity-64 has-[:disabled,[aria-invalid=true]]:shadow-none focus-within:shadow-none focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 pointer-coarse:min-h-11 pointer-coarse:*:min-h-9 sm:min-h-8 sm:text-sm sm:*:min-h-6 dark:not-has-disabled:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-focus-within:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
          size === "sm" && "min-h-8 *:min-h-6 sm:min-h-7 sm:*:min-h-5",
          size === "lg" && "min-h-10 *:min-h-8 sm:min-h-9 sm:*:min-h-7",
          className
        ),
        "data-disabled": disabled ? "" : void 0,
        "data-size": size,
        "data-slot": "tag-input",
        "data-testid": "tag-input",
        onMouseDown: handleControlMouseDown,
        style,
        children: [
          tags.map((tag, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "flex min-w-0 max-w-full items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none transition-[background-color,box-shadow] duration-(--qy-duration-fast) focus-visible:ring-2 focus-visible:ring-ring data-duplicate:bg-foreground/12 sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
                !interactive && "pe-2"
              ),
              "data-duplicate": flashed === tag ? "" : void 0,
              "data-slot": "tag-input-tag",
              "data-testid": `tag:${tag}`,
              onKeyDown: (event) => handleTagKeyDown(event, index),
              ref: (node) => {
                tagRefs.current[index] = node;
              },
              tabIndex: -1,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: tag }),
                interactive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    "aria-label": removeLabel?.(tag) ?? `${messages.remove} ${tag}`,
                    className: "h-full shrink-0 cursor-pointer rounded-e-[inherit] px-1.5 opacity-80 outline-none hover:opacity-100 pointer-coarse:px-2.5 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
                    "data-slot": "tag-input-tag-remove",
                    "data-testid": `tag-remove:${tag}`,
                    onClick: () => remove(index, "input"),
                    tabIndex: -1,
                    type: "button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" })
                  }
                ) : null
              ]
            },
            tag
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FieldControl,
            {
              ...inputProps,
              "aria-describedby": describedBy,
              "aria-invalid": invalid || void 0,
              autoComplete: inputProps.autoComplete ?? "off",
              className: cn(
                "min-w-12 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/72 sm:text-sm [[data-slot=tag-input-tag]+&]:ps-0.5",
                size === "sm" ? "ps-1.5" : "ps-2",
                inputClassName
              ),
              "data-slot": "tag-input-input",
              disabled,
              enterKeyHint: "enter",
              onBlur: handleBlur,
              onChange: handleChange,
              onCompositionEnd: handleCompositionEnd,
              onCompositionStart: handleCompositionStart,
              onKeyDown: handleKeyDown,
              onPaste: handlePaste,
              placeholder: tags.length === 0 ? placeholder ?? messages.addTag : void 0,
              readOnly,
              ref: (node) => {
                inputRef.current = node;
                setRef(ref, node);
              },
              required: Boolean(required) && tags.length === 0,
              type: "text",
              value: draft
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", id: hintId, children: messages.tagInputHint }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-live": "polite", className: "sr-only", children: notice?.text })
        ]
      }
    ),
    notice ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        "aria-live": "polite",
        className: cn(
          "mt-2 text-xs in-data-[slot=field]:mt-0",
          notice.tone === "error" ? "text-destructive-foreground" : "text-muted-foreground"
        ),
        "data-slot": "tag-input-message",
        "data-testid": "tag-message",
        id: noticeId,
        children: notice.text
      }
    ) : null,
    name ? tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        disabled,
        name,
        type: "hidden",
        value: tag
      },
      tag
    )) : null
  ] });
}
export {
  TagInput as T
};
