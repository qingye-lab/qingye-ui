"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";
import { fillStateByData } from "../fill-state";
import { useInputFacts } from "../input-facts";
import { InField } from "../labelable-scope";
import { comparableTime } from "../local-time";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { TimeField, type TimeFieldProps } from "./time-field";

/** 起止两个时刻，各自沿用 TimeField 的值（`HH:mm[:ss[.SSS]]` 无时区文本，空为 `null`）。 */
export type TimeRangeValue = { start: string | null; end: string | null };

export type TimeRangeFieldProps = Omit<React.ComponentProps<"div">, "children" | "defaultValue" | "onChange" | "role" | "render"> & {
  /** 受控的起止；任一端可为 `null`。**传了 `value` 这个属性**才是受控，不传才是非受控。 */
  value?: TimeRangeValue | undefined;
  /** 非受控的初值，原生表单 reset 会回到它。 */
  defaultValue?: TimeRangeValue | undefined;
  /** 任一端填完整或被清掉时请求变更，值是两端的当前内容；还差几段的中间态不上报（同 TimeField）。 */
  onValueChange?: ((value: TimeRangeValue) => void) | undefined;
  /**
   * 允许结束早于开始，此时结束落在次日（22:00–06:00）。默认不允许：结束早于开始标为无效，并让表单提交被拦下。
   * 相等永远有效（零长度）；跨零点时相等同样按零长度，不解释成整整 24 小时。
   */
  allowCrossMidnight?: boolean;
  /** 分段粒度与小时制，起止两端相同；含义同 TimeField。 */
  granularity?: TimeFieldProps["granularity"] | undefined; hourCycle?: TimeFieldProps["hourCycle"] | undefined;
  /** 起止各自的最早 / 最晚时刻（同 TimeField）；与「结束早于开始」是两件事，两者都成立才有效。 */
  min?: string | undefined; max?: string | undefined;
  /** 提交两个值：`${name}.start` 与 `${name}.end`（同 DateRangePicker 的 `.from` / `.to`）；某端未填完整时该项提交空串。 */
  name?: string | undefined; form?: string | undefined;
  disabled?: boolean; readOnly?: boolean; required?: boolean;
};

const emptyRange: TimeRangeValue = { start: null, end: null };
const endsBeforeStart = (value: TimeRangeValue, crossMidnight: boolean) => !crossMidnight && value.start !== null && value.end !== null && comparableTime(value.end) < comparableTime(value.start);

/**
 * 外框与 TimeField / Input 同一套（高度、留白、字号、圆角读填值控件角色层，跟随密度轴，不带 size）。
 * 两个 TimeField 在框内去掉自己的外壳（边、底、留白、最小高度），只留分段；起止之间是控件内间隔（--qy-control-content-gap）——
 * 与图标和文字、前缀和值同一关系：它们是同一个范围的两端，读作一体。
 */
const boundaryClassName = cn(
  "relative inline-flex w-fit max-w-full min-w-0 items-stretch gap-(--qy-control-content-gap)",
  "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target)",
  "px-(--qy-fill-padding) text-control-md-mobile sm:text-control-md",
  "rounded-(--qy-fill-radius) border border-input bg-surface-field text-foreground transition-[border-color,box-shadow,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
  "focus-within:border-ring data-invalid:border-destructive data-invalid:focus-within:border-destructive-foreground",
  "not-data-disabled:not-data-readonly:not-data-invalid:not-focus-within:hover:border-border-strong",
  fillStateByData,
);
// 去壳：同一属性、同一变体的类由 cn 去重，后写的赢；readonly 说明在边界末尾只出现一次，所以隐藏两端各自的。
const bareClassName = "min-h-0 sm:min-h-0 pointer-coarse:min-h-0 self-stretch rounded-none border-0 bg-transparent px-0 data-disabled:bg-transparent [&_[data-slot=time-field-readonly]]:hidden";

/** 起止各开一个独立的 Field 作用域：它们不抢外层 Field 的标签、不使用 Field 的 name（提交名由这里按 `.start` / `.end` 给出）。 */
function Isolated({ name, disabled, children }: { name: string | undefined; disabled: boolean; children: React.ReactNode }) {
  return <FieldPrimitive.Root name={name} disabled={disabled} render={() => <>{children}</>} />;
}

export function TimeRangeField(allProps: TimeRangeFieldProps) {
  const { value: valueProp, defaultValue = emptyRange, onValueChange, allowCrossMidnight = false, granularity, hourCycle, min, max, name, form, disabled = false, readOnly = false, required = false, className, ref, ...props } = allProps;
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<TimeRangeValue>(defaultValue);
  const value = (controlled ? valueProp : uncontrolled) ?? emptyRange;
  const inField = React.useContext(InField);
  // 名称契约同 TimeField：有 Field 时名称来自 FieldLabel；字段外必须自带。起止各自的名称是「开始时间」「结束时间」，整组的名称在这里。
  if (!inField && !props["aria-label"] && !props["aria-labelledby"]) throw new Error("TimeRangeField requires an accessible name: place it in a Field with a FieldLabel, or pass aria-label / aria-labelledby.");

  const { messages } = useUILocale();
  const hiddenRef = React.useRef<HTMLInputElement | null>(null);
  const startRef = React.useRef<HTMLDivElement | null>(null);
  const endRef = React.useRef<HTMLDivElement | null>(null);
  // 禁用可能来自 Field 或祖先 fieldset，不经过自己的 props：问真实的隐藏输入（同 TimeField）。
  const facts = useInputFacts(hiddenRef, { disabled }, { value: false });
  const blocked = disabled || facts.disabled;

  const reversed = endsBeforeStart(value, allowCrossMidnight);
  const problem = reversed ? messages.timeRangeOrder : "";
  React.useLayoutEffect(() => {
    const input = hiddenRef.current;
    input?.setCustomValidity(problem);
    return () => input?.setCustomValidity("");
  }, [problem]);

  const latest = React.useRef({ controlled, defaultValue });
  latest.current = { controlled, defaultValue };
  React.useEffect(() => {
    const owner = hiddenRef.current?.form;
    if (!owner) return;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (!latest.current.controlled) setUncontrolled(latest.current.defaultValue);
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [form]);

  const change = (next: TimeRangeValue) => {
    if (next.start === value.start && next.end === value.end) return;
    if (!controlled) setUncontrolled(next);
    onValueChange?.(next);
  };
  const spinbuttons = (root: HTMLElement | null) => Array.from(root?.querySelectorAll<HTMLElement>("[role=spinbutton]") ?? []);
  // 标签、点击与原生校验失败都把焦点交给分段：先到还空着的，都填了就是起点的第一段；顺序错了落在结束。
  const focusFirstEmpty = () => {
    const target = reversed ? spinbuttons(endRef.current)[0] : [...spinbuttons(startRef.current), ...spinbuttons(endRef.current)].find(segment => segment.hasAttribute("data-empty")) ?? spinbuttons(startRef.current)[0];
    target?.focus();
  };

  const shared = { ...(granularity ? { granularity } : {}), ...(hourCycle ? { hourCycle } : {}), ...(min !== undefined ? { min } : {}), ...(max !== undefined ? { max } : {}), ...(form !== undefined ? { form } : {}), required, readOnly, disabled: blocked };
  const summary = value.start === null && value.end === null ? "" : `${value.start ?? ""}/${value.end ?? ""}`;

  return <InputPrimitive
    name={name} form={form} value={summary} disabled={disabled} ref={hiddenRef} type="text"
    render={(control: React.ComponentPropsWithRef<"input">) => {
      const fieldInvalid = control["aria-invalid"] === true || control["aria-invalid"] === "true";
      const invalid = fieldInvalid || props["aria-invalid"] === true || props["aria-invalid"] === "true" || reversed;
      const { "aria-invalid": _ignored, "aria-describedby": ownDescribedBy, ...rest } = props;
      const describedBy = [ownDescribedBy, control["aria-describedby"]].filter(Boolean).join(" ") || undefined;
      const field = control.name;
      return <div
        data-slot="time-range-field" {...rest} ref={ref} role="group" dir="ltr"
        aria-labelledby={props["aria-labelledby"] ?? control["aria-labelledby"]} aria-describedby={describedBy}
        data-disabled={blocked ? "" : undefined} data-readonly={readOnly && !blocked ? "" : undefined} data-invalid={invalid ? "" : undefined}
        className={cn(boundaryClassName, className)}
        // 点在两个时间之外（留白、分隔符）落到该去的分段，不丢焦点。
        onPointerDown={event => {
          props.onPointerDown?.(event);
          if (event.defaultPrevented || blocked || (event.target as Element).closest("[role=spinbutton]")) return;
          event.preventDefault();
          focusFirstEmpty();
        }}
        // Field 的聚焦 / 失焦（touched、校验时机）以整组为单位，不随起止之间的移动抖动。
        onFocus={event => {
          props.onFocus?.(event);
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) (control.onFocus as React.FocusEventHandler<HTMLElement> | undefined)?.(event);
        }}
        onBlur={event => {
          props.onBlur?.(event);
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          (control.onBlur as React.FocusEventHandler<HTMLElement> | undefined)?.(event);
        }}
      >
        {/* Field 登记点：不显示、不提交（提交的是下面两个 TimeField 各自的隐藏输入）；承载「结束早于开始」的原生校验。 */}
        <input hidden type="text" id={control.id} value={control.value} disabled={control.disabled} form={form} ref={control.ref}
          onChange={() => undefined} onClick={focusFirstEmpty} onInvalid={focusFirstEmpty} />
        <Isolated name={field ? `${field}.start` : undefined} disabled={blocked}>
          <TimeField {...shared} ref={startRef} className={bareClassName} aria-label={messages.startTime} aria-invalid={reversed || undefined}
            value={value.start} onValueChange={start => change({ start, end: value.end })} />
        </Isolated>
        <span aria-hidden="true" data-slot="time-range-field-separator" className="flex items-center text-muted-foreground">—</span>
        <Isolated name={field ? `${field}.end` : undefined} disabled={blocked}>
          <TimeField {...shared} ref={endRef} className={bareClassName} aria-label={messages.endTime} aria-invalid={reversed || undefined}
            value={value.end} onValueChange={end => change({ start: value.start, end })} />
        </Isolated>
        {readOnly && !blocked && <span data-slot="time-range-field-readonly" aria-hidden="true" className="flex items-center text-caption text-muted-foreground">{messages.readOnly}</span>}
      </div>;
    }}
  />;
}
