"use client";

import { IconEye, IconEyeOff } from "@tabler/icons-react";
import * as React from "react";
import { withClassName } from "../input-adjunct";
import { useInputFacts, useInputRef } from "../input-facts";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Input, type InputProps } from "./input";
import { InputGroup, InputGroupButton } from "./input-group";

declare const process: { env: { NODE_ENV?: string } };

export type PasswordInputProps = Omit<InputProps, "type" | "unstyled"> & {
  /** 密码当前是否以明文显示；与 defaultVisible 分别支持受控与非受控。 */
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  /** 开关的稳定名称，默认从 locale 读取；aria-pressed 表达密码当前是否可见。 */
  showLabel?: string;
};

/**
 * 密码输入 = 编辑边界（InputGroup）+ 输入 + 显示密码的开关，全部由公开部件组合。
 * 输入框本身不内置开关（用户裁决 2026-10-10：功能要纯粹）。开关不改内容、不提交表单。
 * 不阻止粘贴也不阻止自动填充（WCAG 3.3.8 可访问认证）：组件没有任何 paste / drop / 关闭自动填充的处理，
 * 调用方也不应通过 onPaste、autoComplete="off" 之类拦住密码管理器；`autoComplete` 应写明
 * `current-password`（登录）或 `new-password`（设置），开发环境缺失时给出警告。
 * className / style / render / ref 仍属于真实输入，controlClassName 属于编辑边界。
 */
export function PasswordInput({ visible: visibleProp, defaultVisible = false, onVisibleChange, showLabel, controlClassName, className, id, ref, ...props }: PasswordInputProps): React.ReactElement {
  const { messages } = useUILocale();
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [inputRef, setInputRef] = useInputRef(ref);
  const facts = useInputFacts(inputRef, { disabled: Boolean(props.disabled), readOnly: Boolean(props.readOnly) }, { value: false, key: props.nativeInput });
  const missingAutoComplete = props.autoComplete === undefined;
  React.useEffect(() => {
    if (missingAutoComplete && typeof process !== "undefined" && process.env.NODE_ENV !== "production") console.warn("PasswordInput: `autoComplete` is missing, so password managers cannot tell a sign-in field from a new password. Pass \"current-password\" or \"new-password\" (WCAG 3.3.8).");
  }, [missingAutoComplete]);
  const [uncontrolledVisible, setUncontrolledVisible] = React.useState(defaultVisible);
  const visible = visibleProp ?? uncontrolledVisible;
  return (
    <InputGroup data-slot="password-input" data-readonly={facts.readOnly ? "" : undefined} className={cn("flex-nowrap", controlClassName)}>
      <Input
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        {...props}
        id={inputId}
        ref={setInputRef}
        type={visible ? "text" : "password"}
        unstyled
        controlClassName="min-w-0 flex-1"
        // 平台自带的显示密码入口和这里的开关重复，隐藏前者。
        className={withClassName("[&::-ms-reveal]:hidden", className)}
      />
      <InputGroupButton shape="icon" data-slot="password-input-toggle" aria-controls={inputId} aria-label={showLabel ?? messages.showPassword} aria-pressed={visible} disabled={facts.disabled}
        onClick={() => {
          if (inputRef.current?.disabled || inputRef.current?.matches(":disabled")) return;
          const next = !visible;
          if (visibleProp === undefined) setUncontrolledVisible(next);
          onVisibleChange?.(next);
        }}>
        {visible ? <IconEyeOff aria-hidden="true" /> : <IconEye aria-hidden="true" />}
      </InputGroupButton>
    </InputGroup>
  );
}
