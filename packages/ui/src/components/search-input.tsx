"use client";

import { IconSearch, IconX } from "@tabler/icons-react";
import * as React from "react";
import { withClassName } from "../input-adjunct";
import { useInputFacts, useInputRef, writeInputValue } from "../input-facts";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Input, type InputProps } from "./input";
import { InputGroup, InputGroupAddon, InputGroupButton } from "./input-group";

export type SearchInputProps = Omit<InputProps, "type" | "unstyled"> & {
  /** 清空按钮的名称，默认从 locale 读取。 */
  clearLabel?: string;
  /** 清空之后调用；值的变化仍走 onChange / onValueChange。清空不提交表单。 */
  onClear?: () => void;
};

/**
 * 搜索输入 = 编辑边界（InputGroup）+ 搜索图标 + 输入 + 清空动作，全部由公开部件组合。
 * 输入框本身不内置这些（用户裁决 2026-10-10：功能要纯粹）；需要别的组合时照此自行搭。
 * className / style / render / ref 仍属于真实输入，controlClassName 属于编辑边界。
 */
export function SearchInput({ clearLabel, onClear, controlClassName, className, ref, onChange, onKeyDown, ...props }: SearchInputProps): React.ReactElement {
  const { messages } = useUILocale();
  const [inputRef, setInputRef] = useInputRef(ref);
  const facts = useInputFacts(inputRef, { value: String(props.value ?? props.defaultValue ?? ""), disabled: Boolean(props.disabled), readOnly: Boolean(props.readOnly) }, { key: props.nativeInput });
  const canClear = facts.value !== "" && !facts.disabled && !facts.readOnly;
  const clear = () => {
    const input = inputRef.current;
    if (!input || input.disabled || input.matches(":disabled") || input.readOnly) return;
    writeInputValue(input, "");
    onClear?.();
    input.focus();
  };
  return (
    <InputGroup data-slot="search-input" data-readonly={facts.readOnly ? "" : undefined} className={cn("flex-nowrap", controlClassName)}>
      {/* 保持 InputGroupAddon 自己的 data-slot：附件与输入之间的贴合间距由 InputGroup 按它识别。 */}
      <InputGroupAddon aria-hidden="true"><IconSearch className="size-(--qy-fill-icon-narrow) sm:size-(--qy-fill-icon)" /></InputGroupAddon>
      <Input
        {...props}
        ref={setInputRef}
        type="search"
        unstyled
        controlClassName="min-w-0 flex-1"
        // 平台自带的清除与装饰和这里的清空动作重复，隐藏前者。
        className={withClassName("[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none", className)}
        onChange={(event) => { onChange?.(event); facts.sync(); }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          // 基础层 §11/§15：首个 Escape 只清本字段；取消、空值和输入法事件留给原有焦点链。
          if (event.defaultPrevented || event.key !== "Escape" || !canClear || event.nativeEvent.isComposing || event.keyCode === 229) return;
          event.preventDefault();
          event.stopPropagation();
          clear();
        }}
      />
      {canClear ? <InputGroupButton shape="icon" data-slot="search-input-clear" aria-label={clearLabel ?? messages.clearSearch} onClick={clear}><IconX aria-hidden="true" /></InputGroupButton> : null}
    </InputGroup>
  );
}
