"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { IconCheck } from "@tabler/icons-react";
import * as React from "react";
import { hexToHsv, hsvToHex, isHexColor, normalizeHex, readableOn, type Hsv } from "../color";
import { InField, OptionScope } from "../labelable-scope";
import { useUILocale, useUIDirection } from "../locale";
import { isList, isName, received } from "../require-name";
import { cn } from "../utils";
import { Button } from "./button";
import { Field, FieldError } from "./field";
import { Input } from "./input";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";
import { RadioGroup, RadioPrimitive, type RadioGroupProps } from "./radio-group";
import { Slider, SliderControl, SliderThumb, SliderTrack } from "./slider";

/*
 * 颜色选择只产出「用户数据里的颜色」（标签颜色、主题配置里的取值），不是库主题：
 * 库的语义 token 由主题决定，组件不读用户选的颜色；这里的色块显示的就是那份数据，
 * 所以它是本库唯一允许出现非 token 颜色的地方。数据值只经 CSS 变量（--qy-swatch 等）
 * 进入样式，类名里只写 bg-(color:--qy-swatch) 这样的读取，源码中没有颜色字面量写进 class。
 * 值格式只有 "#rrggbb"（小写规范形）；透明度不在范围内。
 */

type Variables = React.CSSProperties & Record<`--${string}`, string | number | undefined>;

/** 数据颜色与压在它上面的标记色。标记色取黑或白中对比更高的一个（color.ts），所以恒 ≥ 3:1，与主题无关。 */
function swatchVariables(hex: string): Variables {
  return { "--qy-swatch": hex, "--qy-swatch-on": readableOn(hex) };
}

/*
 * 取色面的底图是色彩空间本身的图示（色相环、饱和度/明度面），它的颜色是数据的坐标，不属于主题，
 * 与 --qy-swatch 同一通道：放进 CSS 变量，由类名读取。色相环停点取六个原色，每 60° 一个，
 * 即 HSV 模型在 360° 上的六段，不是审美选择。
 */
const HUE_STOPS = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ff0000"];
const hueTrack = (direction: "ltr" | "rtl") => `linear-gradient(to ${direction === "rtl" ? "left" : "right"}, ${HUE_STOPS.join(", ")})`;
// 横向：左白（饱和度 0）到当前色相（100）；纵向：下黑（明度 0）到透明（100）。叠加顺序决定黑在白之上。
const AREA_IMAGE = "linear-gradient(to top, #000000, transparent), linear-gradient(to right, #ffffff, var(--qy-hue))";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function requireName(owner: string, props: { "aria-label"?: string | undefined; "aria-labelledby"?: string | undefined }, inField: boolean) {
  // 在 Field 里，名称来自 FieldLabel（Field 内没有 FieldLabel 时无从在渲染期得知，不在此判断）。
  if (inField || isName(props["aria-label"]) || isName(props["aria-labelledby"])) return;
  throw new Error(`${owner} requires an accessible name: pass aria-label, aria-labelledby, or place it in a Field with a FieldLabel.`);
}

export type ColorSwatch = {
  /** "#rrggbb"（大小写不限，输出一律小写）。 */
  value: string;
  /** 名称，如「靛蓝」。色块是单选项，必须有名称；颜色本身不是名称。 */
  label: string;
};

export type ColorSwatchPickerProps = Omit<RadioGroupProps<string | null>, "children" | "value" | "defaultValue" | "onValueChange"> & {
  swatches: readonly ColorSwatch[];
  /** 当前颜色。不在 swatches 里（例如自由取色得到的值）时，没有色块被选中。传了这个属性即受控。 */
  value?: string | undefined;
  defaultValue?: string | undefined;
  onValueChange?: (value: string, details: Parameters<NonNullable<RadioGroupProps<string | null>["onValueChange"]>>[1]) => void;
};

function checkSwatches(swatches: readonly ColorSwatch[]) {
  if (!isList(swatches)) throw new Error(`ColorSwatchPicker swatches must be an array; received ${received(swatches)}.`);
  const seen = new Map<string, number>();
  swatches.forEach((swatch, index) => {
    const at = `ColorSwatchPicker swatches[${index}]`;
    if (typeof swatch !== "object" || swatch === null) throw new Error(`${at} must be an object with value and label; received ${received(swatch)}.`);
    if (!isName(swatch.label)) throw new Error(`${at} requires a nonempty label; received ${received(swatch.label)}.`);
    if (!isHexColor(swatch.value)) throw new Error(`${at} (label "${swatch.label}") requires a "#rrggbb" value; received ${received(swatch.value)}.`);
    const key = swatch.value.toLowerCase();
    const first = seen.get(key);
    if (first !== undefined) throw new Error(`${at} repeats the value ${key} of swatches[${first}]; every value must be unique.`);
    seen.set(key, index);
  });
}

/**
 * 从预设里选一个颜色（标签颜色最常见的做法）。语义是单选组：方向键移动并选中，Tab 进出整组只停一次，
 * 键盘与焦点行为直接由 RadioGroup 原语承担。
 */
export function ColorSwatchPicker({ swatches, value, defaultValue, onValueChange, className, ...props }: ColorSwatchPickerProps) {
  const inField = React.useContext(InField);
  requireName("ColorSwatchPicker", props, inField);
  checkSwatches(swatches);
  const matches = (candidate: string | undefined) => candidate !== undefined && isHexColor(candidate) && swatches.some((swatch) => swatch.value.toLowerCase() === candidate.toLowerCase()) ? candidate.toLowerCase() : null;
  return <RadioGroup<string | null>
    data-slot="color-swatch-picker" {...props}
    {...(value !== undefined ? { value: matches(value) } : defaultValue !== undefined ? { defaultValue: matches(defaultValue) } : {})}
    onValueChange={(next, details) => { if (next !== null) onValueChange?.(next, details); }}
    // 色块按行排列并换行；间距沿用单选组的字段间距，且大于焦点环宽度加偏移，环不会压到邻居。
    className={(state) => cn("flex-row flex-wrap", typeof className === "function" ? className(state) : className)}
  >
    {swatches.map((swatch) => {
      const hex = swatch.value.toLowerCase();
      return <OptionScope key={hex}><RadioPrimitive.Root
        data-slot="color-swatch" value={hex} aria-label={swatch.label}
        render={<button type="button" />} nativeButton
        style={swatchVariables(hex)}
        // 边长取填值控件外高（角色 --qy-fill-height）：色块行与同排的输入、按钮同高，不另立一档。
        // 外缘一道 border-input 线（输入框边界的同一角色）：色块自己的颜色可以与底色相同（白、近黑），
        // 边界不能依赖它，线对承载面的对比由这条线保证（≥3:1，浅深主题各自成立）。bg-clip-padding 让填色停在线内。
        // 选中记号是勾（形状），不靠颜色；勾色为压在该色块上对比更高的黑或白。
        // 焦点是色块外的一圈（偏移等于环宽）：色块内侧的反色线无法对任意颜色成立，所以这里不同于「焦点在盒内」的一般规则。
        className={cn(
          "touch-target relative inline-flex shrink-0 items-center justify-center rounded-full border border-input bg-(color:--qy-swatch) bg-clip-padding text-(--qy-swatch-on) outline-none transition-[border-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
          "size-(--qy-fill-height-narrow) sm:size-(--qy-fill-height)",
          "focus-visible:outline-(length:--qy-focus-ring-width) focus-visible:outline-offset-(--qy-focus-ring-width) focus-visible:outline-(--qy-focus-ring-color)",
          "not-data-disabled:not-data-readonly:not-focus-visible:hover:border-border-strong data-disabled:cursor-not-allowed data-disabled:opacity-disabled",
        )}
      ><RadioPrimitive.Indicator data-slot="color-swatch-indicator" className="pointer-events-none flex items-center justify-center">
        <IconCheck aria-hidden="true" className="size-(--qy-fill-icon-narrow) sm:size-(--qy-fill-icon)" />
      </RadioPrimitive.Indicator></RadioPrimitive.Root></OptionScope>;
    })}
  </RadioGroup>;
}

export type ColorPickerProps = Omit<React.ComponentProps<"button">, "value" | "defaultValue" | "onChange" | "children" | "type" | "name" | "form"> & {
  /** "#rrggbb"。传了这个属性即受控；输出一律小写。 */
  value?: string | undefined;
  /** 非受控初值，原生表单 reset 回到它。省略时为 "#000000"。 */
  defaultValue?: string | undefined;
  /** 每次变化都调用（拖动中也调用）。 */
  onValueChange?: ((value: string) => void) | undefined;
  /** 一次操作结束才调用：拖动松手、键盘离键、色值输入确认、选预设。供保存之类不宜逐帧触发的事使用。 */
  onValueCommit?: ((value: string) => void) | undefined;
  /** 预设色行，复用 ColorSwatchPicker。 */
  swatches?: readonly ColorSwatch[] | undefined;
  name?: string | undefined;
  form?: string | undefined;
};

/** 键盘步长：1 是饱和度、明度的最细粒度（整数百分点），Shift 与 PageUp/PageDown 取十倍（十分位），与 Slider 的 largeStep 默认同值。预设。 */
const STEP = 1;
const LARGE_STEP = 10;

/**
 * 自由取色：触发器显示当前颜色与它的 hex，点开是饱和度/明度面、色相条、hex 输入和可选的预设行。
 * 触发器的名称来自 Field 的标签，或 aria-label / aria-labelledby，缺了抛错。
 */
export function ColorPicker({ value: valueProp, defaultValue, onValueChange, onValueCommit, swatches, name, form, disabled = false, className, style, ...props }: ColorPickerProps) {
  const inField = React.useContext(InField);
  requireName("ColorPicker", props, inField);
  const { messages } = useUILocale();
  const direction = useUIDirection();
  const controlled = valueProp !== undefined;
  const initial = valueProp ?? defaultValue ?? "#000000";
  if (!isHexColor(initial)) throw new RangeError(`ColorPicker value must be a "#rrggbb" string; received ${received(initial)}.`);
  const [hsv, setHsv] = React.useState<Hsv>(() => hexToHsv(initial.toLowerCase()));
  const shown = controlled ? valueProp.toLowerCase() : hsvToHex(hsv);
  // 受控值被应用改写时，面与滑条跟着走。灰色（饱和度或明度为 0）没有确定的色相，沿用当前色相，拖到灰再拖回来色相不跳。
  if (controlled && hsvToHex(hsv) !== shown) {
    const next = hexToHsv(shown);
    setHsv(next.s === 0 || next.v === 0 ? { ...next, h: hsv.h } : next);
  }

  const [draft, setDraft] = React.useState<string | null>(null);
  const [rejected, setRejected] = React.useState(false);
  const latest = React.useRef({ hsv, hex: shown, dirty: false, onValueChange, onValueCommit });
  latest.current.hsv = hsv; latest.current.hex = shown; latest.current.onValueChange = onValueChange; latest.current.onValueCommit = onValueCommit;

  const update = (next: Hsv) => {
    const hex = hsvToHex(next);
    latest.current.hsv = next;
    setHsv(next);
    setDraft(null);
    setRejected(false);
    if (hex === latest.current.hex) return;
    latest.current.hex = hex;
    latest.current.dirty = true;
    latest.current.onValueChange?.(hex);
  };
  const commit = () => {
    if (!latest.current.dirty) return;
    latest.current.dirty = false;
    latest.current.onValueCommit?.(latest.current.hex);
  };
  const choose = (hex: string) => {
    const next = hexToHsv(hex);
    update(next.s === 0 || next.v === 0 ? { ...next, h: latest.current.hsv.h } : next);
    commit();
  };

  // 非受控值随原生表单 reset 回到初值。
  const hidden = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    const owner = hidden.current?.form;
    if (!owner || controlled) return;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      setHsv(hexToHsv((defaultValue ?? "#000000").toLowerCase()));
      setDraft(null); setRejected(false);
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [controlled, defaultValue, form]);

  const textId = React.useId();
  const settleDraft = () => {
    if (draft === null) return;
    const hex = normalizeHex(draft);
    // 非法值不丢：文字留在输入里，标为无效并说明格式。
    if (hex === null) return setRejected(true);
    choose(hex);
  };

  return <>
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        render={<FieldPrimitive.Control render={<Button
          variant="bordered" data-slot="color-picker" aria-describedby={textId}
          {...props} className={cn("justify-start", className)} style={{ ...swatchVariables(shown), ...style }}
        />} />}
      >
        {/* 色块边长取按钮内图标的角色尺寸（--qy-fill-icon），与图标同位同大；线同色块，边界不依赖它的颜色。 */}
        <span aria-hidden="true" data-slot="color-picker-swatch" className="size-(--qy-fill-icon-narrow) shrink-0 rounded-full border border-input bg-(color:--qy-swatch) bg-clip-padding sm:size-(--qy-fill-icon)" />
        <span id={textId} data-slot="color-picker-value" className="min-w-0 numeric">{shown}</span>
      </PopoverTrigger>
      <PopoverPopup align="start" aria-label={messages.colorChoose}>
        {/* 弹层内的控件自成一个 Field：否则滑条、单选组会注册成外层 Field 的控件，把外层标签的 for 抢走。 */}
        <Field
          // 面板宽取 8 个填值控件高（约 288px，预设）：放得下一行六七个色块，取色面大到手指能点准。
          className="w-[calc(var(--qy-color-unit)*8)] max-w-full gap-(--qy-space-3) [--qy-color-unit:var(--qy-fill-height-narrow)] sm:[--qy-color-unit:var(--qy-fill-height)]"
          style={{ "--qy-hue": hsvToHex({ h: hsv.h, s: 100, v: 100 }), ...swatchVariables(shown) } as Variables}
        >
          <ColorArea hsv={hsv} hex={shown} disabled={disabled} update={update} commit={commit} />
          <HueSlider hue={hsv.h} hex={shown} direction={direction} disabled={disabled} update={update} hsv={hsv} commit={commit} />
          <Field invalid={rejected}>
            <Input
              data-slot="color-picker-hex" aria-label={messages.colorHex} spellCheck={false} autoComplete="off" disabled={disabled}
              value={draft ?? shown}
              onValueChange={(next) => { setDraft(next); setRejected(false); }}
              onBlur={settleDraft}
              onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); settleDraft(); } }}
            />
            <FieldError match>{messages.colorInvalid}</FieldError>
          </Field>
          {swatches && swatches.length > 0 && <ColorSwatchPicker aria-label={messages.colorPresets} swatches={swatches} value={shown} disabled={disabled} onValueChange={(next) => choose(next)} />}
        </Field>
      </PopoverPopup>
    </Popover>
    {name && <input ref={hidden} data-slot="color-picker-input" type="hidden" name={name} form={form} value={shown} disabled={disabled} />}
  </>;
}

/*
 * 饱和度/明度二维面（APG：两个隐藏的 range 承担无障碍，面本身只是指针区域）。
 * 横轴饱和度、纵轴明度；Left/Right 调饱和度，Up/Down 调明度，Shift 步长 ×10，
 * PageUp/PageDown 明度 ±10，Home/End 饱和度到端点。两个 input 各有名称与 aria-valuetext，
 * 读屏逐个宣读；Tab 在两者间移动。
 */
function ColorArea({ hsv, hex, disabled, update, commit }: { hsv: Hsv; hex: string; disabled: boolean; update: (next: Hsv) => void; commit: () => void }) {
  const { messages } = useUILocale();
  const area = React.useRef<HTMLDivElement>(null);
  const saturation = React.useRef<HTMLInputElement>(null);
  const dragging = React.useRef(false);
  const current = React.useRef(hsv);
  current.current = hsv;
  const s = Math.round(hsv.s), v = Math.round(hsv.v);

  function fromPointer(event: React.PointerEvent) {
    const rect = area.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    update({
      h: current.current.h,
      s: clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100),
      v: clamp(100 - ((event.clientY - rect.top) / rect.height) * 100, 0, 100),
    });
  }
  function end(event: React.PointerEvent) {
    if (!dragging.current) return;
    dragging.current = false;
    if (area.current?.hasPointerCapture?.(event.pointerId)) area.current.releasePointerCapture(event.pointerId);
    commit();
  }
  function keyDown(event: React.KeyboardEvent) {
    if (disabled || event.ctrlKey || event.metaKey || event.altKey) return;
    const step = event.shiftKey ? LARGE_STEP : STEP;
    const base = current.current;
    let next: Hsv | undefined;
    switch (event.key) {
      case "ArrowRight": next = { ...base, s: clamp(Math.round(base.s) + step, 0, 100) }; break;
      case "ArrowLeft": next = { ...base, s: clamp(Math.round(base.s) - step, 0, 100) }; break;
      case "ArrowUp": next = { ...base, v: clamp(Math.round(base.v) + step, 0, 100) }; break;
      case "ArrowDown": next = { ...base, v: clamp(Math.round(base.v) - step, 0, 100) }; break;
      case "PageUp": next = { ...base, v: clamp(Math.round(base.v) + LARGE_STEP, 0, 100) }; break;
      case "PageDown": next = { ...base, v: clamp(Math.round(base.v) - LARGE_STEP, 0, 100) }; break;
      case "Home": next = { ...base, s: 0 }; break;
      case "End": next = { ...base, s: 100 }; break;
      default: return;
    }
    event.preventDefault();
    update(next);
  }
  const text = (channel: string, percent: number) => messages.colorChannelValue(channel, `${percent}%`, hex);
  return <div
    ref={area} role="group" aria-label={messages.colorArea} data-slot="color-area" data-disabled={disabled ? "" : undefined}
    // 面高取 5 个填值控件高（预设），宽随面板；圆角取面板角色的内圈，线同其它色块。
    className="relative h-[calc(var(--qy-color-unit)*5)] w-full touch-none select-none rounded-control border border-input bg-(image:--qy-color-area) bg-clip-padding not-data-disabled:cursor-crosshair data-disabled:opacity-disabled"
    style={{ "--qy-color-area": AREA_IMAGE } as Variables}
    onKeyDown={keyDown}
    onKeyUp={(event) => { if (!disabled && (event.key.startsWith("Arrow") || ["PageUp", "PageDown", "Home", "End"].includes(event.key))) commit(); }}
    onPointerDown={(event) => {
      if (disabled || event.button !== 0) return;
      event.preventDefault();
      saturation.current?.focus({ preventScroll: true });
      dragging.current = true;
      area.current?.setPointerCapture?.(event.pointerId);
      fromPointer(event);
    }}
    onPointerMove={(event) => { if (dragging.current) fromPointer(event); }}
    onPointerUp={end} onPointerCancel={end}
  >
    {/* 手柄：填当前色，环取压在该色上的黑或白（恒 ≥3:1），环宽取焦点环宽（同是压在任意底色上必须看得见的线）；键盘焦点时外加一圈同色环，偏移等于环宽。 */}
    <div
      data-slot="color-area-thumb"
      className="pointer-events-none absolute size-(--qy-marker-size-narrow) -translate-x-1/2 translate-y-1/2 rounded-full border-(length:--qy-focus-ring-width) border-(color:--qy-swatch-on) bg-(color:--qy-swatch) sm:size-(--qy-marker-size) has-[input:focus-visible]:outline-(length:--qy-focus-ring-width) has-[input:focus-visible]:outline-offset-(--qy-focus-ring-width) has-[input:focus-visible]:outline-(color:--qy-swatch-on)"
      style={{ left: `${hsv.s}%`, bottom: `${hsv.v}%` }}
    >
      <input
        ref={saturation} type="range" min={0} max={100} step={STEP} value={s} disabled={disabled}
        aria-label={messages.colorSaturation} aria-valuetext={text(messages.colorSaturation, s)}
        className="sr-only outline-none" data-slot="color-area-saturation"
        onChange={(event) => update({ ...current.current, s: clamp(Number(event.currentTarget.value), 0, 100) })}
        onBlur={commit}
      />
      <input
        type="range" min={0} max={100} step={STEP} value={v} disabled={disabled}
        aria-label={messages.colorBrightness} aria-valuetext={text(messages.colorBrightness, v)}
        className="sr-only outline-none" data-slot="color-area-brightness"
        onChange={(event) => update({ ...current.current, v: clamp(Number(event.currentTarget.value), 0, 100) })}
        onBlur={commit}
      />
    </div>
  </div>;
}

/** 色相条：复用 Slider（键盘、指针、方向都由它承担），只换轨道画法与手柄。Shift/PageUp 的大步长 10°。 */
function HueSlider({ hue, hex, hsv, direction, disabled, update, commit }: { hue: number; hex: string; hsv: Hsv; direction: "ltr" | "rtl"; disabled: boolean; update: (next: Hsv) => void; commit: () => void }) {
  const { messages } = useUILocale();
  return <Slider
    min={0} max={360} step={STEP} largeStep={LARGE_STEP} disabled={disabled}
    value={Math.round(hue)}
    onValueChange={(next) => update({ ...hsv, h: next })}
    onValueCommitted={commit}
    // 手柄填的是该色相的纯色（不是当前选中的颜色），环取压在其上的黑或白。
    style={{ "--qy-hue-track": hueTrack(direction), ...swatchVariables(hsvToHex({ h: hue, s: 100, v: 100 })) } as Variables}
  >
    <SliderControl>
      {/* 条高 3 分（预设），手柄取标记尺寸、比条略大，手柄压在彩虹上靠自己的环保证对比。 */}
      <SliderTrack className="h-(--qy-space-3) rounded-full bg-(image:--qy-hue-track)">
        <SliderThumb
          aria-label={messages.colorHue}
          getAriaValueText={(_formatted, value) => messages.colorChannelValue(messages.colorHue, `${value}°`, hex)}
          className="size-(--qy-marker-size-narrow) border-(length:--qy-focus-ring-width) border-(color:--qy-swatch-on) bg-(color:--qy-swatch) sm:size-(--qy-marker-size) has-[input:focus-visible]:ring-0 has-[input:focus-visible]:outline-(length:--qy-focus-ring-width) has-[input:focus-visible]:outline-offset-(--qy-focus-ring-width) has-[input:focus-visible]:outline-(color:--qy-swatch-on)"
        />
      </SliderTrack>
    </SliderControl>
  </Slider>;
}
