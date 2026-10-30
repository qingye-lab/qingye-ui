"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import * as React from "react";
import { fillStateByData } from "../fill-state";
import { useInputFacts } from "../input-facts";
import { InField } from "../labelable-scope";
import { useUILocale } from "../locale";
import { cn } from "../utils";

/**
 * 纯时间输入：值是与原生 `input[type=time]` 同形的无时区文本（`HH:mm` 或 `HH:mm:ss`），空为 `null`。
 * 日期与时间一起填用 DateTimePicker；只有时刻（营业时间、提醒时间）用这里。
 */
export type TimeFieldProps = Omit<React.ComponentProps<"div">, "children" | "defaultValue" | "onChange" | "role" | "render"> & {
  /** 受控的时间文本；`null` 表示空。**传了 `value` 这个属性**（含 `value={null}`）就是受控，不传才是非受控。 */
  value?: string | null | undefined;
  /** 非受控的初值，原生表单 reset 会回到它。 */
  defaultValue?: string | null | undefined;
  /** 填完整得出时间，或把已有的完整时间清掉（`null`）时请求变更；还差几段的中间态不上报。 */
  onValueChange?: ((value: string | null) => void) | undefined;
  /** 填到哪一段为止。`minute` 的值是 `HH:mm`，`second` 的值是 `HH:mm:ss`。 */
  granularity?: "minute" | "second";
  /** 12 或 24 小时制。省略时跟随当前 locale 的习惯（`Intl.DateTimeFormat` 解析出的 hourCycle）。 */
  hourCycle?: 12 | 24;
  /** 最早 / 最晚时刻（同形文本）。越界的值照常上报，但分段标为无效并让表单提交被拦下。 */
  min?: string | undefined; max?: string | undefined;
  name?: string | undefined; form?: string | undefined;
  disabled?: boolean; readOnly?: boolean; required?: boolean;
};

type Segment = "hour" | "minute" | "second" | "period";
type Period = "am" | "pm";
type Parts = { hour: number | null; minute: number | null; second: number | null; period: Period | null };

const emptyParts: Parts = { hour: null, minute: null, second: null, period: null };
const validTime = (text: string) => /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(text);
// 长度不同的两段文本放在一起比较时补齐到秒；定宽的 ISO 文本可直接按字典序比较。
const withSeconds = (text: string) => text.length === 5 ? `${text}:00` : text;
const outOfRange = (value: string, min: string | undefined, max: string | undefined) => Boolean(min && withSeconds(value) < withSeconds(min) || max && withSeconds(value) > withSeconds(max));
const pad = (n: number) => String(n).padStart(2, "0");

/** 跟随 locale：`Intl` 解析出的 h11 / h12 都是 12 小时制，h23 / h24 是 24 小时制。显示一律用 1–12，不区分 h11 的 0–11。 */
function localeHourCycle(code: string): 12 | 24 {
  try {
    const cycle = new Intl.DateTimeFormat(code, { hour: "numeric" }).resolvedOptions().hourCycle;
    return cycle === "h11" || cycle === "h12" ? 12 : 24;
  } catch { return 24; }
}

function partsFromValue(value: string | null, cycle: 12 | 24, seconds: boolean): Parts {
  if (!value) return emptyParts;
  const [h = 0, m = 0, s = 0] = value.split(":").map(Number);
  return { hour: cycle === 24 ? h : h % 12 || 12, minute: m, second: seconds ? s : null, period: cycle === 24 ? null : h < 12 ? "am" : "pm" };
}

/** 每一段都填了才有值；缺任何一段都不是值。 */
function valueFromParts(parts: Parts, cycle: 12 | 24, seconds: boolean): string | null {
  const { hour, minute, second, period } = parts;
  if (hour === null || minute === null || (seconds && second === null) || (cycle === 12 && period === null)) return null;
  const hour24 = cycle === 24 ? hour : (hour % 12) + (period === "pm" ? 12 : 0);
  return `${pad(hour24)}:${pad(minute)}${seconds ? `:${pad(second!)}` : ""}`;
}

const filledCount = (parts: Parts) => [parts.hour, parts.minute, parts.second, parts.period].filter(part => part !== null).length;

/**
 * 外壳与 Input 同一套：高度、留白、字号、圆角读填值控件角色层（跟随密度轴，不带 size）；
 * 状态用根上的 data-disabled / data-readonly / data-invalid 呈现（fill-state.ts 的 data 写法），焦点用 focus-within——
 * 分段是 div 而非原生输入，:focus-visible 对它不可靠。
 */
const shellClassName = cn(
  "relative inline-flex w-fit max-w-full min-w-0 items-center",
  "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target)",
  "px-(--qy-fill-padding) text-control-md-mobile sm:text-control-md",
  "rounded-(--qy-fill-radius) border border-input bg-surface-field text-foreground transition-[border-color,box-shadow,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
  "focus-within:border-ring data-invalid:border-destructive data-invalid:focus-within:border-destructive-foreground",
  "not-data-disabled:not-data-readonly:not-data-invalid:not-focus-within:hover:border-border-strong",
  fillStateByData,
);
// 分段：宽度由内容（两位数字，等宽数字）决定，圆角取外框同心内圆角（外圆角 − 一道线宽）；
// 当前分段用 bg-accent 标出（与菜单的键盘位置同一档），空段用辅助色。内边距 space-1 是预设。
const segmentClassName = "rounded-[max(0px,calc(var(--qy-fill-radius)-var(--qy-line-width)))] px-(--qy-space-1) text-center tabular-nums outline-none focus:bg-accent data-empty:text-muted-foreground aria-disabled:cursor-not-allowed";

export function TimeField(allProps: TimeFieldProps) {
  const { value: valueProp, defaultValue = null, onValueChange, granularity = "minute", hourCycle, min, max, name, form, disabled = false, readOnly = false, required = false, className, ref, ...props } = allProps;
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<string | null>(defaultValue);
  const value = controlled ? valueProp ?? null : uncontrolled;
  if (value !== null && !validTime(value)) throw new RangeError("TimeField requires HH:mm or HH:mm:ss text without a zone.");
  if (min && !validTime(min) || max && !validTime(max)) throw new RangeError("TimeField min and max require HH:mm or HH:mm:ss text.");
  const inField = React.useContext(InField);
  // 名称契约同 Chart / Avatar：有 Field 时名称来自 FieldLabel；字段外必须自带，否则读屏读不出这是什么时间。
  if (!inField && !props["aria-label"] && !props["aria-labelledby"]) throw new Error("TimeField requires an accessible name: place it in a Field with a FieldLabel, or pass aria-label / aria-labelledby.");

  const { code, messages } = useUILocale();
  const followedCycle = React.useMemo(() => localeHourCycle(code), [code]);
  const cycle = hourCycle ?? followedCycle;
  const seconds = granularity === "second";
  const order: Segment[] = ["hour", "minute", ...(seconds ? ["second" as const] : []), ...(cycle === 12 ? ["period" as const] : [])];

  // 草稿：键入中的中间态（缺几段）不是值，既不上报也不能被受控的 value 立刻覆盖。
  // base 是草稿对应的已接受值；调用方不接受变更（value 与 base 不同）时草稿自动放弃，显示回已接受值。
  const [typing, setTyping] = React.useState<{ parts: Parts; base: string | null } | undefined>();
  if (typing && typing.base !== value) setTyping(undefined);
  const parts = typing && typing.base === value ? typing.parts : partsFromValue(value, cycle, seconds);
  const [lapsed, setLapsed] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const hiddenRef = React.useRef<HTMLInputElement | null>(null);
  const segmentRefs = React.useRef<(HTMLElement | null)[]>([]);
  const buffer = React.useRef<{ segment: Segment; text: string } | undefined>(undefined);

  // 禁用可能来自 Field 或祖先 fieldset，不经过自己的 props：问真实的隐藏输入（同 DateTimePicker）。
  const facts = useInputFacts(hiddenRef, { disabled }, { value: false });
  const blocked = disabled || facts.disabled;
  const editable = !blocked && !readOnly;
  const rangeInvalid = value !== null && outOfRange(value, min, max);
  // 越界与未采纳的键入如实标为无效：原生 customValidity 让表单提交被浏览器拦下，而不是悄悄提交旧值。
  const problem = rangeInvalid ? messages.timeOutOfRange : lapsed ? messages.timeIncomplete : "";
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
      setTyping(undefined); setLapsed(false); buffer.current = undefined;
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [form]);

  const commit = (next: Parts) => {
    const nextValue = valueFromParts(next, cycle, seconds);
    setTyping({ parts: next, base: nextValue });
    setLapsed(false);
    if (nextValue === value) return;
    if (!controlled) setUncontrolled(nextValue);
    onValueChange?.(nextValue);
  };
  const focusSegment = (index: number) => segmentRefs.current[Math.max(0, Math.min(order.length - 1, index))]?.focus();
  // 第一个还空着的分段；都填了就回到第一段。
  const focusFirstEmpty = () => focusSegment(Math.max(0, order.findIndex(segment => parts[segment] === null)));

  const range = (segment: Segment): [number, number] => segment === "hour" ? (cycle === 24 ? [0, 23] : [1, 12]) : segment === "period" ? [0, 1] : [0, 59];
  const withSegment = (segment: Segment, next: number | null): Parts => segment === "period"
    ? { ...parts, period: next === null ? null : next === 0 ? "am" : "pm" }
    : { ...parts, [segment]: next };
  const current = (segment: Segment) => segment === "period" ? (parts.period === null ? null : parts.period === "am" ? 0 : 1) : parts[segment];
  const nudge = (segment: Segment, direction: 1 | -1) => {
    const [low, high] = range(segment);
    const at = current(segment);
    // 空段第一次按上从最小开始、按下从最大开始；有值时越界回绕（不进位到相邻分段）。
    const next = at === null ? (direction === 1 ? low : high) : at + direction > high ? low : at + direction < low ? high : at + direction;
    commit(withSegment(segment, next));
  };
  const typeDigit = (segment: Segment, index: number, digit: string) => {
    const [low, high] = range(segment);
    const before = buffer.current?.segment === segment ? buffer.current.text : "";
    // 两位凑不成合法数时，这一位当作新的第一位重新开始。
    let text = before + digit;
    if (Number(text) > high) text = digit;
    const n = Number(text);
    if (n < low) { buffer.current = { segment, text }; return; } // 12 小时制的「0」：等第二位
    commit(withSegment(segment, n));
    // 已满两位，或再添一位必然越界：自动跳到下一段。
    if (text.length >= 2 || n * 10 > high) { buffer.current = undefined; if (index < order.length - 1) focusSegment(index + 1); } else buffer.current = { segment, text };
  };
  const onSegmentKeyDown = (event: React.KeyboardEvent<HTMLElement>, segment: Segment, index: number) => {
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey) return;
    const key = event.key;
    // 时间没有书写方向（同 OtpField）：整组固定 ltr，左右键就是视觉上的左右。
    if (key === "ArrowLeft" || key === "ArrowRight") { event.preventDefault(); buffer.current = undefined; focusSegment(index + (key === "ArrowRight" ? 1 : -1)); return; }
    if (!editable) return;
    if (key === "ArrowUp" || key === "ArrowDown") { event.preventDefault(); buffer.current = undefined; nudge(segment, key === "ArrowUp" ? 1 : -1); return; }
    if (key === "Home" || key === "End") { event.preventDefault(); buffer.current = undefined; commit(withSegment(segment, range(segment)[key === "Home" ? 0 : 1])); return; }
    if (key === "Backspace" || key === "Delete") { event.preventDefault(); buffer.current = undefined; commit(withSegment(segment, null)); return; }
    if (segment === "period") {
      const letter = key.toLowerCase();
      if (letter === "a" || letter === messages.timeAm.charAt(0).toLowerCase()) { event.preventDefault(); commit(withSegment(segment, 0)); }
      else if (letter === "p" || letter === messages.timePm.charAt(0).toLowerCase()) { event.preventDefault(); commit(withSegment(segment, 1)); }
      return;
    }
    if (/^[0-9]$/.test(key)) { event.preventDefault(); typeDigit(segment, index, key); }
  };

  const label = (segment: Segment) => ({ hour: messages.timeHour, minute: messages.timeMinute, second: messages.timeSecond, period: messages.timeDayPeriod })[segment];
  const shown = (segment: Segment) => {
    const at = current(segment);
    return at === null ? null : segment === "period" ? (at === 0 ? messages.timeAm : messages.timePm) : pad(at);
  };

  return <InputPrimitive
    name={name} form={form} value={value ?? ""} required={required} disabled={disabled} ref={hiddenRef} type="text"
    render={(control: React.ComponentPropsWithRef<"input">) => {
      const fieldInvalid = control["aria-invalid"] === true || control["aria-invalid"] === "true";
      const invalid = fieldInvalid || props["aria-invalid"] === true || props["aria-invalid"] === "true" || rangeInvalid || lapsed;
      const { "aria-invalid": _ignored, "aria-describedby": ownDescribedBy, ...rest } = props;
      const describedBy = [ownDescribedBy, control["aria-describedby"]].filter(Boolean).join(" ") || undefined;
      return <div
        data-slot="time-field" {...rest} ref={ref} role="group" dir="ltr"
        aria-labelledby={props["aria-labelledby"] ?? control["aria-labelledby"]} aria-describedby={describedBy}
        data-disabled={blocked ? "" : undefined} data-readonly={readOnly && !blocked ? "" : undefined} data-invalid={invalid ? "" : undefined}
        className={cn(shellClassName, className)}
        // 点在分段之外（留白、冒号）落到当前分段，不丢焦点。
        onPointerDown={event => {
          props.onPointerDown?.(event);
          if (event.defaultPrevented || blocked || (event.target as Element).closest("[role=spinbutton]")) return;
          event.preventDefault();
          focusSegment(active);
        }}
        onFocus={event => {
          props.onFocus?.(event);
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) (control.onFocus as React.FocusEventHandler<HTMLElement> | undefined)?.(event);
        }}
        onBlur={event => {
          props.onBlur?.(event);
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          buffer.current = undefined;
          // 同 DateTimePicker：未采纳的键入在焦点离开时如实标为无效；全空（含刚被清掉的）不算。
          setLapsed(filledCount(parts) > 0 && valueFromParts(parts, cycle, seconds) === null);
          (control.onBlur as React.FocusEventHandler<HTMLElement> | undefined)?.(event);
        }}
      >
        {/* 真实的提交值与 Field 登记点：不显示，label 的 for 指向它，点标签时把焦点交给分段。 */}
        <input hidden type="text" id={control.id} name={control.name} value={control.value} disabled={control.disabled} required={required} form={form} ref={control.ref}
          onChange={() => undefined} onClick={focusFirstEmpty} onInvalid={focusFirstEmpty} />
        {order.map((segment, index) => {
          const text = shown(segment);
          const [low, high] = range(segment);
          const at = current(segment);
          return <React.Fragment key={segment}>
            {index > 0 && segment !== "period" && <span aria-hidden="true" data-slot="time-field-separator" className="text-muted-foreground">:</span>}
            <span
              data-slot="time-field-segment" data-segment={segment} data-empty={text === null ? "" : undefined}
              ref={node => { segmentRefs.current[index] = node; }}
              role="spinbutton" aria-label={label(segment)}
              aria-valuemin={low} aria-valuemax={high} aria-valuenow={at ?? undefined} aria-valuetext={text ?? messages.timeEmpty}
              aria-required={required || undefined} aria-readonly={readOnly || undefined} aria-disabled={blocked || undefined} aria-invalid={invalid || undefined}
              // 只有一个分段在 Tab 序里：Tab 离开整组，段间用左右键（APG 的复合部件做法）。
              tabIndex={blocked ? undefined : index === active ? 0 : -1}
              className={cn(segmentClassName, segment === "period" && "ms-(--qy-space-1)")}
              onFocus={() => setActive(index)}
              onKeyDown={event => onSegmentKeyDown(event, segment, index)}
            >{text ?? "––"}</span>
          </React.Fragment>;
        })}
        {readOnly && !blocked && <span data-slot="time-field-readonly" aria-hidden="true" className="ms-(--qy-fill-padding) text-caption text-muted-foreground">{messages.readOnly}</span>}
      </div>;
    }}
  />;
}
