"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { cn } from "../utils";

export type SliderProps<Value extends number | readonly number[] = number | readonly number[]> = SliderPrimitive.Root.Props<Value> & {
  /** 保留焦点与表单值，取消所有原语值变化。 */
  readOnly?: boolean;
};
export type SliderControlProps = React.ComponentProps<typeof SliderPrimitive.Control>;
export type SliderTrackProps = React.ComponentProps<typeof SliderPrimitive.Track>;
export type SliderIndicatorProps = React.ComponentProps<typeof SliderPrimitive.Indicator>;
export type SliderThumbProps = React.ComponentProps<typeof SliderPrimitive.Thumb>;
export type SliderLabelProps = React.ComponentProps<typeof SliderPrimitive.Label>;
export type SliderValueProps = React.ComponentProps<typeof SliderPrimitive.Value>;
const ReadOnly = React.createContext(false);

function isStepAligned(value: number, min: number, step: number) {
  const steps = (value - min) / step;
  return Math.abs(steps - Math.round(steps)) <= Number.EPSILON * Math.max(1, Math.abs(steps)) * 16;
}

function assertRange(min: number, max: number, step: number, largeStep: number, minSteps: number, ...supplied: (number | readonly number[] | undefined)[]) {
  if (![min, max, step, largeStep, minSteps].every(Number.isFinite) || min >= max || step <= 0 || largeStep <= 0 || !isStepAligned(max, min, step) || !Number.isInteger(minSteps) || minSteps < 0) {
    throw new RangeError("Slider requires finite min < max, a max aligned to positive step, positive largeStep and a non-negative integer minStepsBetweenValues.");
  }
  for (const value of supplied) {
    if (value === undefined) continue;
    const values = typeof value === "number" ? [value] : value;
    if (!values.length || values.some((item, index) => !Number.isFinite(item) || item < min || item > max || !isStepAligned(item, min, step) || (index > 0 && item - values[index - 1]! < step * minSteps))) {
      throw new RangeError("Slider values must be finite, nonempty, ordered, within bounds, aligned to step and separated by minStepsBetweenValues.");
    }
  }
}

/** 区间输入，不替 Progress；显式无效值拒绝进入原语，不静默改写。 */
export function Slider<Value extends number | readonly number[]>({ readOnly = false, min = 0, max = 100, step = 1, largeStep = 10, minStepsBetweenValues = 0, value, defaultValue, thumbAlignment = "edge", onValueChange, className, style, ...props }: SliderProps<Value>) {
  assertRange(min, max, step, largeStep, minStepsBetweenValues, value, defaultValue);
  const variables = {
    // 滑块是填值控件：工作高度读角色层（用户裁决 2026-10-05），抓手跟随标签文字。
    "--qy-slider-control-size": "var(--qy-fill-height)",
    "--qy-slider-control-size-narrow": "var(--qy-fill-height-narrow)",
    "--qy-slider-thumb-size": "var(--qy-marker-size)",
    "--qy-slider-thumb-size-narrow": "var(--qy-marker-size-narrow)",
  } as React.CSSProperties;
  return <ReadOnly.Provider value={readOnly}><SliderPrimitive.Root data-slot="slider" data-readonly={readOnly ? "" : undefined} {...props}
    min={min} max={max} step={step} largeStep={largeStep} minStepsBetweenValues={minStepsBetweenValues}
    value={value} defaultValue={defaultValue ?? (min as Value)} thumbAlignment={thumbAlignment}
    onValueChange={(next, details) => { if (readOnly) details.cancel(); else onValueChange?.(next, details); }}
    className={(state) => cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-control-md-mobile sm:text-control-md", state.disabled && "opacity-64", typeof className === "function" ? className(state) : className)}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  /></ReadOnly.Provider>;
}

export function SliderControl({ className, ...props }: SliderControlProps) {
  const readOnly = React.useContext(ReadOnly);
  return <SliderPrimitive.Control data-slot="slider-control" data-readonly={readOnly ? "" : undefined} {...props}
    className={(state) => cn(
      "relative flex select-none items-center justify-center touch-none",
      state.orientation === "vertical" ? "h-(--qy-slider-vertical-length) w-(--qy-slider-control-size-narrow) sm:w-(--qy-slider-control-size)" : "min-h-(--qy-slider-control-size-narrow) w-full sm:min-h-(--qy-slider-control-size)",
      state.disabled ? "cursor-not-allowed" : readOnly ? "cursor-default" : "cursor-pointer",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export function SliderTrack({ className, ...props }: SliderTrackProps) {
  return <SliderPrimitive.Track data-slot="slider-track" {...props}
    className={(state) => cn("relative rounded-marker bg-(--qy-groove-surface)", state.orientation === "vertical" ? "h-full w-(--qy-slider-track-size)" : "h-(--qy-slider-track-size) w-full", typeof className === "function" ? className(state) : className)}
  />;
}

export function SliderIndicator({ className, ...props }: SliderIndicatorProps) {
  return <SliderPrimitive.Indicator data-slot="slider-indicator" {...props}
    className={(state) => cn("absolute rounded-marker bg-primary", state.orientation === "vertical" ? "w-(--qy-slider-track-size)" : "h-(--qy-slider-track-size)", typeof className === "function" ? className(state) : className)}
  />;
}

export function SliderThumb({ className, ...props }: SliderThumbProps) {
  const readOnly = React.useContext(ReadOnly);
  const { render, getAriaValueText, "aria-valuetext": ariaValueText, ...nativeProps } = props;
  return <SliderPrimitive.Thumb data-slot="slider-thumb" {...nativeProps}
    aria-valuetext={ariaValueText}
    getAriaValueText={getAriaValueText ?? (ariaValueText === undefined ? (formattedValue) => formattedValue : undefined)}
    render={(elementProps, state) => <ThumbSurface elementProps={elementProps} state={state} render={render} readOnly={readOnly} />}
    className={(state) => cn(// 抓手是当前值在轨道上的一个点（应物象形：圆以标点），与已填充段同为实心；
      // 它与轨道在同一平面上，不加阴影（绘事后素）。
      // 焦点按实心控件规则画在填充内侧的反色线。只读不可拖动：抓手改为空心，值与已填充段保留。
      "touch-target block size-(--qy-slider-thumb-size-narrow) rounded-full bg-primary outline-none sm:size-(--qy-slider-thumb-size) has-[input:focus-visible]:ring-[length:var(--qy-focus-ring-width)] has-[input:focus-visible]:ring-inset has-[input:focus-visible]:ring-primary-foreground [&_input]:outline-none", readOnly && "border border-border-strong bg-card", typeof className === "function" ? className(state) : className)}
  />;
}

/** 1.7 的 Thumb 把通用 ARIA 留在可见 div；通过公开 render 将事实接到 range input。 */
function ThumbSurface({ elementProps, state, render, readOnly }: {
  elementProps: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> | undefined };
  state: SliderPrimitive.Thumb.State;
  render: SliderThumbProps["render"];
  readOnly: boolean;
}) {
  function inputFacts(content: React.ReactNode): React.ReactNode {
    return React.Children.map(content, child => {
      if (!React.isValidElement<{ children?: React.ReactNode }>(child)) return child;
      if (child.type === React.Fragment) return React.cloneElement(child, { children: inputFacts(child.props.children) });
      if (!React.isValidElement<React.ComponentProps<"input">>(child) || child.type !== "input" || child.props.type !== "range") return child;
      return React.cloneElement(child, {
        "aria-readonly": readOnly || elementProps["aria-readonly"] || undefined,
        "aria-invalid": elementProps["aria-invalid"] ?? (state.valid === false ? true : undefined),
      });
    });
  }
  return useRender({ defaultTagName: "div", render, state: state as SliderPrimitive.Thumb.State & Record<string, unknown>, props: { ...elementProps, children: inputFacts(elementProps.children) } });
}

export function SliderLabel({ className, ...props }: SliderLabelProps) {
  return <SliderPrimitive.Label data-slot="slider-label" {...props} className={(state) => cn("min-w-0 text-label text-foreground wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

export function SliderValue({ className, ...props }: SliderValueProps) {
  return <SliderPrimitive.Value data-slot="slider-value" {...props} className={(state) => cn("text-foreground tabular-nums", typeof className === "function" ? className(state) : className)} />;
}

export { SliderPrimitive };
