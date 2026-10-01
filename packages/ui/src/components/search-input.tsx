"use client";

import { SearchIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import type { InputProps } from "./input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { Spinner } from "./spinner";

export type SearchInputProps = Omit<InputProps, "type" | "size" | "value" | "defaultValue" | "className"> & {
  /** Classes for the outer group. */
  className?: string;
  size?: "sm" | "default" | "lg";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called after the clear button or Escape empties the field. */
  onClear?: () => void;
  /** Accessible name of the clear button. */
  clearLabel?: string;
  /** Trailing hint shown while the field is empty, e.g. `<Kbd>⌘K</Kbd>`. */
  shortcut?: React.ReactNode;
  /** Replaces the search icon with a spinner while results load. */
  loading?: boolean;
};

/**
 * A search field: leading icon, a clear button once there is text (it
 * returns focus to the field), Escape to clear, and an optional shortcut hint.
 * `className` styles the outer group; every other prop goes to the `<input>`.
 */
export function SearchInput({
  className,
  size = "default",
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onClear,
  clearLabel,
  shortcut,
  loading = false,
  placeholder,
  disabled,
  readOnly,
  onChange,
  onKeyDown,
  ref,
  ...props
}: SearchInputProps): React.ReactElement {
  const { messages } = useUILocale();
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  // An enclosing Field or Fieldset can disable the input without this prop.
  const [inheritedDisabled, setInheritedDisabled] = React.useState(false);
  React.useLayoutEffect(() => {
    const next = Boolean(inputRef.current?.disabled);
    if (next !== inheritedDisabled) setInheritedDisabled(next);
  });

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    },
    [ref],
  );

  const update = (next: string) => {
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };

  const clear = () => {
    update("");
    onClear?.();
  };

  const isDisabled = Boolean(disabled) || inheritedDisabled;
  const canClear = value !== "" && !isDisabled && !readOnly;

  return (
    <InputGroup className={className}>
      <InputGroupInput
        disabled={disabled}
        enterKeyHint="search"
        onChange={(event) => {
          onChange?.(event);
          update(event.currentTarget.value);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.key !== "Escape" || !canClear) return;
          // Clear first; a second Escape reaches enclosing dialogs and popovers.
          event.preventDefault();
          event.stopPropagation();
          clear();
        }}
        placeholder={placeholder ?? messages.searchPlaceholder}
        readOnly={readOnly}
        ref={setRefs}
        size={size}
        {...props}
        type="search"
        value={value}
      />
      <InputGroupAddon>
        {loading ? <Spinner /> : <SearchIcon aria-hidden="true" data-slot="search-input-icon" />}
      </InputGroupAddon>
      {canClear ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={clearLabel ?? messages.clearSearch}
            className="text-muted-foreground hover:text-foreground"
            data-slot="search-input-clear"
            onClick={() => {
              clear();
              inputRef.current?.focus();
            }}
            size={size === "lg" ? "icon-sm" : "icon-xs"}
          >
            <XIcon aria-hidden="true" />
          </InputGroupButton>
        </InputGroupAddon>
      ) : shortcut && !isDisabled ? (
        <InputGroupAddon align="inline-end" aria-hidden="true">
          {shortcut}
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
