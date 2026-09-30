"use client";

import { useUILocale } from "../locale";

import { useRef, useState } from "react";
import { EyeIcon, EyeOffIcon, SearchIcon, XIcon } from "lucide-react";
import { Button } from "../button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group";
import type { InputProps } from "../input";

export type PasswordInputProps = Omit<InputProps, "type"> & {
  showLabel?: string;
  hideLabel?: string;
};

export function PasswordInput(options: PasswordInputProps) {
  const { messages } = useUILocale();
  const { showLabel = messages.showPassword, hideLabel = messages.hidePassword, disabled, ...props } = options;
  const [visible, setVisible] = useState(false);
  return <InputGroup>
    <InputGroupInput {...props} disabled={disabled} type={visible ? "text" : "password"} />
    <InputGroupAddon align="inline-end"><Button type="button" size="icon" variant="ghost" disabled={disabled} aria-label={visible ? hideLabel : showLabel} aria-pressed={visible} onClick={() => setVisible(!visible)}>
      {visible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
    </Button></InputGroupAddon>
  </InputGroup>;
}

export type SearchInputProps = Omit<InputProps, "type" | "value" | "defaultValue" | "onChange" | "ref"> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  clearLabel?: string;
};

export function SearchInput(options: SearchInputProps) {
  const { messages } = useUILocale();
  const { value, defaultValue = "", onValueChange, clearLabel = messages.clearSearch, disabled, readOnly, ...props } = options;
  const [internal, setInternal] = useState(defaultValue);
  const input = useRef<HTMLInputElement>(null);
  const current = value ?? internal;
  const update = (next: string) => { if (value === undefined) setInternal(next); onValueChange?.(next); };
  return <InputGroup>
    <InputGroupAddon><SearchIcon aria-hidden="true" /></InputGroupAddon>
    <InputGroupInput {...props} ref={input} type="search" value={current} disabled={disabled} readOnly={readOnly} onChange={(event) => update(event.currentTarget.value)} />
    {current && !readOnly ? <InputGroupAddon align="inline-end"><Button type="button" size="icon" variant="ghost" disabled={disabled} aria-label={clearLabel} onClick={() => { update(""); input.current?.focus(); }}><XIcon aria-hidden="true" /></Button></InputGroupAddon> : null}
  </InputGroup>;
}
