"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import type { InputProps } from "./input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";

export type PasswordInputProps = Omit<InputProps, "type" | "size" | "className"> & {
  /** Classes for the outer group. */
  className?: string;
  size?: "sm" | "default" | "lg";
  /** Whether the password is shown as plain text (controlled). */
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  /** Accessible name of the visibility toggle; its pressed state says whether the password is shown. */
  showLabel?: string;
};

const iconClassName =
  "col-start-1 row-start-1 transition-[opacity,scale] duration-(--qy-duration-fast) ease-(--qy-ease-out)";

/**
 * Tracks whether the input ended up disabled through an enclosing Field or
 * Fieldset, so the addon button can follow it.
 */
function useInheritedDisabled(): [React.RefObject<HTMLInputElement | null>, boolean] {
  const ref = React.useRef<HTMLInputElement | null>(null);
  const [disabled, setDisabled] = React.useState(false);
  React.useLayoutEffect(() => {
    const next = Boolean(ref.current?.disabled);
    if (next !== disabled) setDisabled(next);
  });
  return [ref, disabled];
}

function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    }
  };
}

/**
 * A password field with a visibility toggle. `className` styles the outer
 * group; every other prop goes to the `<input>`.
 */
export function PasswordInput({
  className,
  size = "default",
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  showLabel,
  disabled,
  id,
  ref,
  ...props
}: PasswordInputProps): React.ReactElement {
  const { messages } = useUILocale();
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [uncontrolled, setUncontrolled] = React.useState(defaultVisible);
  const visible = visibleProp ?? uncontrolled;
  const [inputRef, inheritedDisabled] = useInheritedDisabled();
  const setRefs = React.useMemo(() => mergeRefs(inputRef, ref), [inputRef, ref]);

  const toggle = () => {
    const next = !visible;
    if (visibleProp === undefined) setUncontrolled(next);
    onVisibleChange?.(next);
  };

  return (
    <InputGroup className={className}>
      <InputGroupInput
        autoCapitalize="none"
        autoCorrect="off"
        className="[&_input::-ms-reveal]:hidden"
        disabled={disabled}
        id={inputId}
        size={size}
        spellCheck={false}
        {...props}
        ref={setRefs}
        type={visible ? "text" : "password"}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-controls={inputId}
          aria-label={showLabel ?? messages.showPassword}
          aria-pressed={visible}
          data-slot="password-input-toggle"
          disabled={disabled || inheritedDisabled}
          onClick={toggle}
          size={size === "lg" ? "icon-sm" : "icon-xs"}
        >
          <span aria-hidden="true" className="grid place-items-center">
            <EyeIcon
              className={cn(iconClassName, visible ? "scale-60 opacity-0" : "opacity-80")}
              data-slot="password-input-icon"
            />
            <EyeOffIcon
              className={cn(iconClassName, visible ? "opacity-80" : "scale-60 opacity-0")}
              data-slot="password-input-icon"
            />
          </span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
