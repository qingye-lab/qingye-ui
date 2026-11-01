"use client";

import { IconStar, IconStarFilled } from "@tabler/icons-react";
import * as React from "react";
import { OptionScope } from "../labelable-scope";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { RadioGroupPrimitive, RadioPrimitive } from "./radio-group";

export type RatingProps = Omit<RadioGroupPrimitive.Props<number>, "value" | "defaultValue" | "onValueChange" | "children" | "render"> & {
  /** 受控的分值，0 表示未评分；整数，范围 0..max。 */
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  /** 最高分，也是星的个数；正整数，默认 5。 */
  max?: number;
  /** 再点一次当前分值就清除（回到 0）。默认开启；关闭后一旦评过分只能改不能撤。 */
  allowClear?: boolean;
};

function assertScore(name: string, value: number, min: number, max: number) {
  if (!Number.isInteger(value) || value < min || value > max) throw new RangeError(`Rating ${name} must be an integer from ${min} to ${max}; received ${String(value)}.`);
}

/**
 * 评分：1..max 个互斥的单选项，选中第 n 项即分值 n，前 n 颗星一并点亮。
 * - 语义是单选组（radiogroup）：方向键移动并选中，Tab 进出整组，每颗星的名称是「n 星」；
 *   组的名称默认「评分」，放在 Field 里时由 FieldLabel 命名。
 * - 只读时不再是控件，而是一幅图（role="img"）加一行「4 / 5」——读屏读到的是结论，不是一串不能操作的单选项。
 * - 几何读填值角色层的图标尺寸（随密度），星间距取 space-1；星的状态（空 / 满）靠形状区分，不靠颜色，也不改变占位（NG9）。
 * - 满星用浓墨、空星用次要文字色：评分是数据不是状态，不借用任何状态色（预设）。
 */
export function Rating({ value: valueProp, defaultValue = 0, onValueChange, max = 5, allowClear = true, readOnly = false, disabled = false, name, className, ref, "aria-label": ariaLabel, ...props }: RatingProps) {
  const { messages } = useUILocale();
  if (!Number.isInteger(max) || max < 1) throw new RangeError(`Rating max must be a positive integer; received ${String(max)}.`);
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  assertScore("value", value, 0, max);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const shown = !readOnly && !disabled && hovered !== null ? hovered : value;
  const commit = (next: number) => {
    if (next === value) return;
    if (valueProp === undefined) setUncontrolled(next);
    onValueChange?.(next);
  };
  const stars = Array.from({ length: max }, (_, index) => index + 1);
  const icon = "size-(--qy-fill-icon-narrow) sm:size-(--qy-fill-icon)";

  if (readOnly) {
    const summary = value === 0 ? messages.ratingNone : messages.ratingValue(value, max);
    // 只读时不渲染单选组，但 ref 与 id 仍落在同一个根上：调用方测量、定位或用 aria-describedby 指向它都不因只读而失效。
    return <div data-slot="rating" data-readonly="" ref={ref} id={props.id} className={cn("inline-flex items-center gap-(--qy-space-2)", className)}>
      <span role="img" aria-label={summary} className="inline-flex items-center gap-(--qy-space-1)">
        {stars.map(star => star <= value
          ? <IconStarFilled key={star} aria-hidden="true" className={cn(icon, "text-foreground")} />
          : <IconStar key={star} aria-hidden="true" className={cn(icon, "text-muted-foreground")} />)}
      </span>
      {/* 图已经带着完整名称，可见的数字只给眼睛，避免读两遍。 */}
      <span aria-hidden="true" className="text-support-mobile text-muted-foreground tabular-nums sm:text-support">{value} / {max}</span>
      {name !== undefined && value > 0 && <input type="hidden" name={name} value={value} disabled={disabled} />}
    </div>;
  }

  return <RadioGroupPrimitive<number>
    data-slot="rating" ref={ref}
    {...props}
    name={name} disabled={disabled}
    aria-label={ariaLabel ?? (props["aria-labelledby"] ? undefined : messages.rating)}
    value={value}
    onValueChange={next => commit(next)}
    onPointerLeave={() => setHovered(null)}
    className={cn("inline-flex items-center gap-(--qy-space-1)", className)}
  >
    {stars.map(star => <OptionScope key={star}><RadioPrimitive.Root
      data-slot="rating-item" value={star} render={<button type="button" />} nativeButton
      aria-label={messages.ratingStar(star)}
      onPointerEnter={() => setHovered(star)}
      onClick={() => { if (allowClear && star === value) commit(0); }}
      className={cn(
        "touch-target inline-flex shrink-0 cursor-pointer items-center justify-center rounded-xs outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-disabled",
        star <= shown ? "text-foreground" : "text-muted-foreground",
      )}
    >{star <= shown ? <IconStarFilled aria-hidden="true" className={icon} /> : <IconStar aria-hidden="true" className={icon} />}</RadioPrimitive.Root></OptionScope>)}
  </RadioGroupPrimitive>;
}

