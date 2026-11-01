"use client";

import { useFieldRootContext } from "@base-ui/react/internals/field-root-context";
import { useLabelableContext } from "@base-ui/react/internals/labelable-provider";
import { IconChevronDown } from "@tabler/icons-react";
import * as React from "react";
import { PopoverPrimitive } from "./components/popover";
import { fillStateByData } from "./fill-state";
import { InField } from "./labelable-scope";
import type { UILocaleMessages } from "./locale";
import { isName } from "./require-name";
import { cn } from "./utils";

/*
 * 「弹层里选值」的填值控件（Cascader、TreeSelect）共用的触发器与表单值。
 * 触发器与 Select 同一套几何、边框与状态（基础层 §2、§5、§9）：值是内容，宽度跟着值走，
 * 长文字截断而完整文字留在 DOM 里供读屏；弹层本身由各组件自己的 Popover 面板提供。
 * 弹层里的候选结构不同（列、树），所以只共用这三件：Field 接入、触发器、表单值输入。
 * Field 接入读 Base UI 的 internals 子路径（包导出了它，但不在公开 API 的语义化版本承诺内）；
 * 依赖固定为精确版本，升级 @base-ui/react 时须先跑 cascader、tree-select 的 Field 测试。
 */

type PickerFieldInput = {
  /** 报错里的组件名。 */
  owner: string;
  ariaLabel: string | undefined;
  ariaLabelledBy: string | undefined;
  ariaDescribedBy: string | undefined;
  ariaInvalid: boolean | "true" | "false" | undefined;
  disabled: boolean;
  name: string | undefined;
};

/** 与 Field 的接入：名称必填、禁用/名称/invalid/描述跟随 Field。 */
export function usePickerField({ owner, ariaLabel, ariaLabelledBy, ariaDescribedBy, ariaInvalid, disabled: disabledProp, name: nameProp }: PickerFieldInput) {
  const inField = React.useContext(InField);
  const fieldRoot = useFieldRootContext(true);
  const { labelId, getDescriptionProps } = useLabelableContext();

  // 名称必填：缺名称是契约错误。Field 里的名称来自 FieldLabel，它在挂载后才登记，所以先等一轮再判。
  const explicitName = isName(ariaLabel) || isName(ariaLabelledBy);
  if (!explicitName && !inField) throw new Error(`${owner} requires an accessible name: pass aria-label or aria-labelledby, or place it in a Field with a FieldLabel.`);
  const [nameRound, setNameRound] = React.useState(0);
  React.useEffect(() => {
    if (explicitName || !inField || labelId !== undefined) return;
    if (nameRound === 0) setNameRound(1);
    else throw new Error(`${owner} requires an accessible name: this Field has no FieldLabel; add one or pass aria-label / aria-labelledby.`);
  });

  return {
    fieldRoot,
    disabled: disabledProp || Boolean(fieldRoot.disabled),
    name: nameProp ?? fieldRoot.name,
    invalid: ariaInvalid ?? (fieldRoot.state.valid === false ? true : undefined),
    describedBy: getDescriptionProps({ "aria-describedby": ariaDescribedBy })["aria-describedby"],
    /** 触发器与弹层里的主列表共用的名称引用：显式的优先，其次是 aria-label 自己，最后是 FieldLabel。 */
    labelledBy: ariaLabelledBy ?? (ariaLabel ? undefined : labelId),
  };
}

export type PickerTriggerProps = {
  /** data-slot 前缀：触发器是 `${slot}-trigger`，值文字是 `${slot}-value`。 */
  slot: string;
  ref?: React.Ref<HTMLButtonElement>;
  id?: string | undefined;
  className?: string | undefined;
  /** 弹层的角色，对应 aria-haspopup。 */
  popup: "listbox" | "tree";
  open: boolean;
  /** 触发器上按 ↓ / ↑ 请求打开；Enter / Space 走按钮本身的点击。 */
  onRequestOpen: () => void;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  invalid: boolean | "true" | "false" | undefined;
  ariaLabel: string | undefined;
  labelledBy: string | undefined;
  describedBy: string | undefined;
  /** 值文字；null 表示没有值，显示 placeholder。 */
  text: string | null;
  placeholder: React.ReactNode;
};

export function PickerTrigger({ slot, ref, id, className, popup, open, onRequestOpen, disabled, readOnly, required, invalid, ariaLabel, labelledBy, describedBy, text, placeholder }: PickerTriggerProps) {
  return <PopoverPrimitive.Trigger
    ref={ref} id={id} data-slot={`${slot}-trigger`} disabled={disabled}
    role="combobox" aria-haspopup={popup} aria-expanded={open}
    aria-label={ariaLabel} aria-labelledby={labelledBy} aria-describedby={describedBy}
    aria-required={required || undefined} aria-readonly={readOnly || undefined} aria-invalid={invalid}
    data-disabled={disabled ? "" : undefined} data-readonly={readOnly ? "" : undefined}
    onKeyDown={event => { if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp") && !event.defaultPrevented) { event.preventDefault(); onRequestOpen(); } }}
    className={cn(
      "inline-flex w-fit max-w-full items-center justify-between gap-(--qy-field-gap) min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target) rounded-(--qy-fill-radius) border border-input bg-surface-field px-(--qy-fill-padding) text-foreground outline-none transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong",
      // 宽度下限：左右留白 + 尾部标记 + 字段间隔 + 文字区下限（--qy-field-min-text，预设），与 Select 触发器同一关系。
      "min-w-[calc(var(--qy-fill-padding)*2+var(--qy-fill-icon)+var(--qy-field-gap)+var(--qy-field-min-text))]",
      "text-control-md-mobile sm:text-control-md",
      fillStateByData,
      className,
    )}
  >
    <span data-slot={`${slot}-value`} data-placeholder={text === null ? "" : undefined} className="min-w-0 flex-1 truncate text-start data-placeholder:text-muted-foreground">{text ?? placeholder}</span>
    <IconChevronDown aria-hidden="true" className="pointer-events-none size-(--qy-fill-icon-narrow) shrink-0 text-muted-foreground sm:size-(--qy-fill-icon)" />
  </PopoverPrimitive.Trigger>;
}

export type PickerFormValueProps = {
  slot: string;
  name: string | undefined;
  form: string | undefined;
  /** 字符串：一个值（未选择是空串，照常提交）。数组：多个值，每个一条同名输入；空数组时见下。 */
  value: string | readonly string[];
  required: boolean;
  disabled: boolean;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * 表单值。文字输入而非 hidden，是为了让 required 参与原生校验；它们不可见、不可聚焦，被校验聚焦时把焦点交给触发器。
 * 数组值为空时留一个空输入：required 时它让校验拦下提交；不 required 时它被禁用，不提交空条目（与原生 select multiple 一致）。
 */
export function PickerFormValue({ slot, name, form, value, required, disabled, triggerRef }: PickerFormValueProps) {
  const values = typeof value === "string" ? [value] : value.length > 0 ? value : [""];
  const emptyList = typeof value !== "string" && value.length === 0;
  return <>{values.map(item => <input
    key={emptyList ? "empty" : item} data-slot={`${slot}-input`} type="text" aria-hidden="true" tabIndex={-1} autoComplete="off" className="sr-only"
    name={name} form={form} value={item} required={required} disabled={disabled || (emptyList && !required)}
    onChange={() => {}} onFocus={() => triggerRef.current?.focus()}
  />)}</>;
}

/** 多选的触发器最多点名几项；超出写「首项及其余 N 项」。预设：两个名字在常见触发器宽度内通常不被截断。TreeSelect、Cascader 共用，所以多选的读法一致。 */
const NAMED = 2;
/** 多选触发器的值文字；没有已选项返回 null（显示 placeholder）。 */
export function pickerSummary(names: readonly string[], messages: Pick<UILocaleMessages, "treeSelectSeparator" | "treeSelectMore">): string | null {
  if (names.length === 0) return null;
  return names.length <= NAMED ? names.join(messages.treeSelectSeparator) : messages.treeSelectMore(names[0]!, names.length - 1);
}
