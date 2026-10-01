"use client";

import { useUILocale } from "../locale";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "./button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import type { InputProps } from "./input";

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

