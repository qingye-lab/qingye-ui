"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type TagInputSize = "sm" | "default" | "lg";

type InputAttributes = Omit<
  React.ComponentProps<"input">,
  | "value"
  | "defaultValue"
  | "onChange"
  | "size"
  | "type"
  | "max"
  | "name"
  | "className"
  | "style"
  | "children"
>;

export interface TagInputProps extends InputAttributes {
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  /** Submits one hidden input per tag under this name (`formData.getAll`). */
  name?: string;
  /** Maximum number of tags. */
  max?: number;
  /** Return a message to reject a tag; `null` accepts it. */
  validate?: (tag: string, tags: readonly string[]) => string | null | undefined;
  size?: TagInputSize;
  /** Commit the pending text when focus leaves the control. */
  addOnBlur?: boolean;
  /** Accessible name for each chip's remove button. */
  removeLabel?: (tag: string) => string;
  /** Classes for the control box. */
  className?: string;
  style?: React.CSSProperties;
  /** Classes for the text input inside the box. */
  inputClassName?: string;
}

/** Characters that commit the pending text while typing. */
const TYPED_DELIMITER = /[,，]/g;
/** Pasted text splits on commas, line breaks and tabs (spreadsheet cells). */
const PASTE_DELIMITER = /[,，\n\r\t]+/;

function countDelimiters(text: string): number {
  return text.match(TYPED_DELIMITER)?.length ?? 0;
}

function unique(tags: readonly string[]): string[] {
  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
}

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null): void {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as React.RefObject<T | null>).current = value;
}

type Notice = { tone: "error" | "info"; text: string };

/**
 * Free-form tags in an input. Enter or a comma commits the text; pasting a
 * list splits it; Backspace in the empty input removes the last tag. Arrow
 * keys move between tags, and Backspace or Delete removes the focused one.
 */
export function TagInput({
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
}: TagInputProps): React.ReactElement {
  const { messages } = useUILocale();
  const [internal, setInternal] = React.useState<string[]>(() =>
    unique(defaultValue ?? []),
  );
  const tags = value ?? internal;
  const [draft, setDraft] = React.useState("");
  const [notice, setNotice] = React.useState<Notice | null>(null);
  const [flashed, setFlashed] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const tagRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const pendingFocus = React.useRef<number | "input" | null>(null);
  const delimitersAtCompositionStart = React.useRef(0);
  const flashTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const hintId = React.useId();
  const noticeId = React.useId();
  const interactive = !disabled && !readOnly;

  React.useEffect(() => () => clearTimeout(flashTimer.current), []);

  React.useLayoutEffect(() => {
    const target = pendingFocus.current;
    if (target === null) return;
    pendingFocus.current = null;
    if (target === "input") inputRef.current?.focus();
    else tagRefs.current[target]?.focus();
  });

  const update = (next: string[]) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const flash = (tag: string) => {
    clearTimeout(flashTimer.current);
    setFlashed(tag);
    flashTimer.current = setTimeout(() => setFlashed(null), 900);
  };

  /** Adds what it can and returns the texts it rejected, in order. */
  const add = (candidates: readonly string[]): string[] => {
    const next = [...tags];
    const rejected: string[] = [];
    let message: Notice | null = null;
    let duplicate: string | null = null;
    for (const candidate of candidates) {
      const tag = candidate.trim();
      if (!tag) continue;
      if (next.includes(tag)) {
        duplicate ??= tag;
        message ??= { tone: "info", text: messages.tagExists(tag) };
        continue;
      }
      if (max !== undefined && next.length >= max) {
        message = { tone: "error", text: messages.tagLimit(max) };
        rejected.push(tag);
        continue;
      }
      const invalid = validate?.(tag, next);
      if (invalid) {
        if (message?.tone !== "error") message = { tone: "error", text: invalid };
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

  const commit = (text: string) => {
    setDraft(add(text.split(PASTE_DELIMITER)).join(", "));
  };

  const remove = (index: number, focus: number | "input" | null) => {
    if (!interactive || index < 0 || index >= tags.length) return;
    pendingFocus.current = focus;
    setNotice(null);
    update(tags.filter((_, i) => i !== index));
  };

  const isRtl = (element: Element) =>
    getComputedStyle(element).direction === "rtl";

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = event.currentTarget.value;
    const composing = (event.nativeEvent as InputEvent).isComposing;
    if (notice) setNotice(null);
    if (!composing && countDelimiters(next) > countDelimiters(draft)) {
      const parts = next.split(TYPED_DELIMITER);
      const rest = parts.pop() ?? "";
      setDraft([...add(parts), rest.trimStart()].filter(Boolean).join(", "));
      return;
    }
    setDraft(next);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
    } else if (
      event.key === (isRtl(input) ? "ArrowRight" : "ArrowLeft") &&
      atStart &&
      tags.length > 0
    ) {
      event.preventDefault();
      tagRefs.current[tags.length - 1]?.focus();
    } else if (event.key === "Escape" && (draft || notice)) {
      event.stopPropagation();
      setDraft("");
      setNotice(null);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    if (!addOnBlur || !interactive || !draft.trim()) return;
    const root = event.currentTarget.closest("[data-slot=tag-input]");
    if (root?.contains(event.relatedTarget as Node | null)) return;
    commit(draft);
  };

  const handleCompositionStart = (
    event: React.CompositionEvent<HTMLInputElement>,
  ) => {
    onCompositionStart?.(event);
    delimitersAtCompositionStart.current = countDelimiters(
      event.currentTarget.value,
    );
  };

  const handleCompositionEnd = (
    event: React.CompositionEvent<HTMLInputElement>,
  ) => {
    onCompositionEnd?.(event);
    const next = event.currentTarget.value;
    // An IME may commit a full-width comma as part of a composition.
    if (countDelimiters(next) > delimitersAtCompositionStart.current) {
      const parts = next.split(TYPED_DELIMITER);
      const rest = parts.pop() ?? "";
      setDraft([...add(parts), rest.trimStart()].filter(Boolean).join(", "));
    }
  };

  const handleTagKeyDown = (
    event: React.KeyboardEvent<HTMLSpanElement>,
    index: number,
  ) => {
    if (event.target !== event.currentTarget || disabled) return;
    const rtl = isRtl(event.currentTarget);
    const previous = rtl ? "ArrowRight" : "ArrowLeft";
    const next = rtl ? "ArrowLeft" : "ArrowRight";
    const focusTag = (i: number) => tagRefs.current[i]?.focus();
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
        // Typing on a tag continues in the input.
        if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          inputRef.current?.focus();
        }
    }
  };

  const handleControlMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || event.target === inputRef.current) return;
    // Clicking the box or a tag places the caret in the input.
    event.preventDefault();
    inputRef.current?.focus();
  };

  const invalid =
    notice?.tone === "error" ||
    (ariaInvalid !== undefined && ariaInvalid !== false && ariaInvalid !== "false");
  const describedBy =
    [ariaDescribedBy, hintId, notice ? noticeId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  tagRefs.current.length = tags.length;

  return (
    <>
      <div
        className={cn(
          "relative inline-flex min-h-9 w-full cursor-text flex-wrap gap-(--qy-space-1) rounded-control border border-input bg-background not-dark:bg-clip-padding p-[calc(var(--qy-space-1)-1px)] text-base shadow-xs/5 outline-none ring-ring/24 ring-offset-[length:var(--qy-focus-input-offset)] ring-offset-background transition-shadow *:min-h-7 before:pointer-events-none before:absolute before:inset-0 before:rounded-[max(0px,calc(var(--qy-radius-control)-1px))] not-has-disabled:not-focus-within:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[length:var(--qy-focus-input-width)] has-disabled:pointer-events-none has-aria-invalid:border-destructive/36 has-disabled:opacity-64 has-[:disabled,[aria-invalid=true]]:shadow-none focus-within:shadow-none focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 pointer-coarse:min-h-11 pointer-coarse:*:min-h-9 sm:min-h-8 sm:text-sm sm:*:min-h-6 dark:not-has-disabled:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-focus-within:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
          size === "sm" && "min-h-8 *:min-h-6 sm:min-h-7 sm:*:min-h-5",
          size === "lg" && "min-h-10 *:min-h-8 sm:min-h-9 sm:*:min-h-7",
          className,
        )}
        data-disabled={disabled ? "" : undefined}
        data-size={size}
        data-slot="tag-input"
        data-testid="tag-input"
        onMouseDown={handleControlMouseDown}
        style={style}
      >
        {tags.map((tag, index) => (
          <span
            className={cn(
              "flex min-w-0 max-w-full items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-(--qy-space-2) font-medium text-accent-foreground text-sm outline-none transition-[background-color,box-shadow] duration-(--qy-duration-fast) focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring data-duplicate:bg-foreground/12 sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
              !interactive && "pe-(--qy-space-2)",
            )}
            data-duplicate={flashed === tag ? "" : undefined}
            data-slot="tag-input-tag"
            data-testid={`tag:${tag}`}
            key={tag}
            onKeyDown={(event) => handleTagKeyDown(event, index)}
            ref={(node) => {
              tagRefs.current[index] = node;
            }}
            tabIndex={-1}
          >
            <span className="truncate">{tag}</span>
            {interactive ? (
              <button
                aria-label={
                  removeLabel?.(tag) ?? `${messages.remove} ${tag}`
                }
                className="h-full shrink-0 cursor-pointer rounded-e-[inherit] px-[calc(var(--qy-space-1)*1.5)] opacity-80 outline-none hover:opacity-100 pointer-coarse:px-[calc(var(--qy-space-1)*2.5)] [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5"
                data-slot="tag-input-tag-remove"
                data-testid={`tag-remove:${tag}`}
                onClick={() => remove(index, "input")}
                tabIndex={-1}
                type="button"
              >
                <XIcon aria-hidden="true" />
              </button>
            ) : null}
          </span>
        ))}
        <FieldPrimitive.Control
          {...inputProps}
          aria-describedby={describedBy}
          aria-invalid={invalid || undefined}
          autoComplete={inputProps.autoComplete ?? "off"}
          className={cn(
            "min-w-12 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/72 sm:text-sm [[data-slot=tag-input-tag]+&]:ps-[calc(var(--qy-space-1)*0.5)]",
            size === "sm" ? "ps-[calc(var(--qy-space-1)*1.5)]" : "ps-(--qy-space-2)",
            inputClassName,
          )}
          data-slot="tag-input-input"
          disabled={disabled}
          enterKeyHint="enter"
          onBlur={handleBlur}
          onChange={handleChange}
          onCompositionEnd={handleCompositionEnd}
          onCompositionStart={handleCompositionStart}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={
            tags.length === 0 ? (placeholder ?? messages.addTag) : undefined
          }
          readOnly={readOnly}
          ref={(node: HTMLInputElement | null) => {
            inputRef.current = node;
            setRef(ref, node);
          }}
          required={Boolean(required) && tags.length === 0}
          type="text"
          value={draft}
        />
        <span className="sr-only" id={hintId}>
          {messages.tagInputHint}
        </span>
        <span aria-live="polite" className="sr-only">
          {notice?.text}
        </span>
      </div>
      {notice ? (
        <p
          aria-live="polite"
          className={cn(
            "mt-(--qy-space-2) text-xs in-data-[slot=field]:mt-0",
            notice.tone === "error"
              ? "text-destructive-foreground"
              : "text-muted-foreground",
          )}
          data-slot="tag-input-message"
          data-testid="tag-message"
          id={noticeId}
        >
          {notice.text}
        </p>
      ) : null}
      {name
        ? tags.map((tag) => (
            <input
              disabled={disabled}
              key={tag}
              name={name}
              type="hidden"
              value={tag}
            />
          ))
        : null}
    </>
  );
}
