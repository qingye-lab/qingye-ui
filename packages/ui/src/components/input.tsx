"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useInputFacts, useInputRef } from "../input-facts";
import { useUILocale } from "../locale";
import { nativeSegmentedTypes, useEmptyEntryHint } from "../native-entry-hint";
import { cn } from "../utils";

export type InputProps = Omit<InputPrimitive.Props, "size"> & React.RefAttributes<HTMLInputElement> & {
  /** 原生 input.size 的字符宽度含义；与呈现无关，由原生属性承担。 */
  size?: number | undefined;
  /** 编辑边界的样式入口；className / style / render 始终属于真实输入。 */
  controlClassName?: string;
  /** 由 InputGroup 提供共同边界时使用，不移除输入几何和原生语义。 */
  unstyled?: boolean;
  /** 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。 */
  nativeInput?: boolean;
};

/**
 * 基础层 §2/§8、用户裁决 2026-10-05：填值控件只有一套几何，跟随密度轴；
 * 值文字始终是正文字号。角色层在 tokens/components.css 定义，组件只读角色。
 * 用 `text-control-md[-mobile]` 是**取正文尺寸的既有文字档**，不是「选了 md 档」：
 * 值与选项是内容，字号不随容器高度变化。紧凑密度只改几何 token，不改这里。
 */
const textProfile = "text-control-md-mobile sm:text-control-md";

/** 原生出口仍保留 render、样式状态函数和事件组合；不注册第二个 FieldControl。 */
function NativeInput({ ref, className, style, render, onValueChange, ...props }: InputPrimitive.Props & React.RefAttributes<HTMLInputElement>): React.ReactElement {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [focused, setFocused] = React.useState(false);
  const [touched, setTouched] = React.useState(false);
  const [observed, setObserved] = React.useState(String(props.value ?? props.defaultValue ?? ""));
  const initialValue = React.useRef(String(props.value ?? props.defaultValue ?? ""));
  React.useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!input || !form) return;
    // reset 不产生 change/input 事件；默认动作完成后同步原生出口自己的状态。
    // 被取消的 reset 保留草稿与 touched，不伪造 onValueChange 事件。
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented || inputRef.current !== input) return;
      setObserved(input.value);
      setTouched(false);
    });
    form.addEventListener("reset", reset);
    return () => form.removeEventListener("reset", reset);
  }, [props.form]);
  const state: InputPrimitive.State = {
    disabled: Boolean(props.disabled),
    focused,
    touched,
    dirty: String(props.value ?? observed) !== initialValue.current,
    filled: String(props.value ?? observed) !== "",
    // 表单族决定 3：只呈现已声明的无效事实，不用内容猜测校验结果。
    valid: props["aria-invalid"] === true || props["aria-invalid"] === "true" ? false : null,
  };
  return useRender({
    defaultTagName: "input",
    ref: ref ? [inputRef, ref] : inputRef,
    render,
    state: state as InputPrimitive.State & Record<string, unknown>,
    props: mergeProps({
      onFocus: () => setFocused(true),
      onBlur: () => { setFocused(false); setTouched(true); },
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setObserved(event.currentTarget.value);
        if (onValueChange) {
          let canceled = false;
          let propagationAllowed = false;
          onValueChange(event.currentTarget.value, {
            reason: "none", event: event.nativeEvent, trigger: undefined,
            cancel: () => { canceled = true; event.preventDefault(); },
            allowPropagation: () => { propagationAllowed = true; },
            get isCanceled() { return canceled; },
            get isPropagationAllowed() { return propagationAllowed; },
          });
        }
      },
    }, props, {
      className: typeof className === "function" ? className(state) : className,
      style: typeof style === "function" ? style(state) : style,
    }),
  });
}

/**
 * 输入框只做一件事：承载一个值的输入（用户裁决 2026-10-10：功能要纯粹）。
 * 清空、搜索图标、显示密码是附加在编辑边界上的另一件事，由 SearchInput、PasswordInput
 * 或 InputGroup + InputGroupButton 组合出来，这里不内置。
 */
export function Input({
  size,
  className,
  controlClassName,
  unstyled = false,
  nativeInput = false,
  type = "text",
  placeholder,
  ref,
  ...props
}: InputProps): React.ReactElement {
  const { messages } = useUILocale();
  const [inputRef, setInputRef] = useInputRef(ref);
  // 只读标记服从真实输入，含 Field 与原生 fieldset 带来的状态。
  const blocked = useInputFacts(inputRef, { disabled: Boolean(props.disabled), readOnly: Boolean(props.readOnly) }, { value: false, key: nativeInput });

  // 平台日期 / 时间输入没有 placeholder：空态是浏览器自己的分段，样式无从设置。
  // 这类输入的 `placeholder` 改由库画成一条提示（空、没有部分键入、未聚焦时），分段在此期间隐藏；其余类型照常交给原生 placeholder。
  const segmented = nativeSegmentedTypes.has(type);
  const hint = segmented && typeof placeholder === "string" && placeholder !== "" ? placeholder : undefined;
  const hintShown = useEmptyEntryHint(inputRef, hint !== undefined, String(props.value ?? props.defaultValue ?? "") === "" && !props.autoFocus);

  const inputProps: InputPrimitive.Props & React.RefAttributes<HTMLInputElement> & { "data-slot": string } = {
    ...props,
    ...(segmented ? {} : { placeholder }),
    ...(hintShown ? { "data-hinted": "" } : {}),
    ref: setInputRef,
    type,
    // 原生字符宽度属性原样透传；它不参与呈现，几何来自填值控件角色层。
    size,
    "data-slot": (props as InputPrimitive.Props & { "data-slot"?: string })["data-slot"] ?? "input",
    className: (state) => cn(
      "qy-input col-start-1 row-start-1 w-full min-w-0 self-stretch bg-transparent px-(--qy-fill-padding) py-0 text-foreground outline-none placeholder:text-muted-foreground",
      /* 输入一旦有底色（自动填充），直角会盖住外框圆角处的边线：取外框的同心内圆角
       * （外圆角 − 一道线宽）。自动填充的平台底色只铺在 input 上，停在附属按钮前，
       * 改用外框同一个填值面，整个编辑边界只有一种底色；文字色同理回到前景色。 */
      "rounded-[max(0px,calc(var(--qy-fill-radius)-var(--qy-line-width)))] autofill:shadow-[inset_0_0_0_100vmax_var(--qy-surface-field)] autofill:[-webkit-text-fill-color:var(--qy-foreground)]",
      textProfile,
      // 分段日期 / 时间的数字按等宽排：每段位数固定，数字不随值抖动，上下行的同一段对齐（基础层 §7「需要纵向对齐的数」）。
      segmented && "numeric",
      // 提示出现时分段不可见（opacity 而非透明文字：Firefox 的分段与对比度检查都不受影响），输入本身照常可点、可聚焦。
      "data-hinted:opacity-0",
      // 平台文件选择没有可设置的垂直对齐；行高取边框内高度让两段文字居中。按钮名称是动作，文件名是结果。
      type === "file" && "cursor-pointer text-muted-foreground leading-[calc(var(--qy-fill-height-narrow)-2*var(--qy-line-width))] sm:leading-[calc(var(--qy-fill-height)-2*var(--qy-line-width))] file:me-(--qy-fill-padding) file:cursor-pointer file:border-0 file:border-e file:border-solid file:border-border file:bg-transparent file:pe-(--qy-fill-padding) file:font-medium file:text-foreground file:[font-size:inherit]",
      typeof className === "function" ? className(state) : className,
    ),
  };

  return (
    <div
      data-slot="input-control"
      data-readonly={blocked.readOnly ? "" : undefined}
      className={cn(
        // 基础层 §5/§15：真实边框标出编辑范围；仅已声明 aria-invalid=true 才进入错误色。
        "relative grid w-full min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center",
        unstyled
          ? "min-h-[calc(var(--qy-fill-height-narrow)-2*var(--qy-line-width))] sm:min-h-[calc(var(--qy-fill-height)-2*var(--qy-line-width))] pointer-coarse:min-h-[calc(var(--qy-touch-target)-2*var(--qy-line-width))]"
          : "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target)",
        !unstyled && "rounded-(--qy-fill-radius) border border-input bg-surface-field text-foreground transition-[border-color,box-shadow,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) has-[input:focus-visible]:border-ring not-has-[input:disabled]:not-has-[input:read-only]:not-has-[input:focus-visible]:not-has-[input[aria-invalid=true]]:hover:border-border-strong has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]:focus-visible]:border-destructive-foreground",
        /* 基础层 §5、§9（2026-10-05 打磨）：**只读与禁用互换视觉职责**。
         *  只读 = 不能在这里编辑，但内容照常阅读、选取、复制 → 保留正常底与边界，
         *    只把编辑的暗示去掉（值仍是前景色），旁边给「只读」说明。
         *  禁用 = 当前不可操作 → 改用不活跃的承载面，文字降为辅助色。
         * 打磨前两者反了：只读用灰底（读起来像「坏了」），禁用反而近白底。 */
        !unstyled && "has-[input:disabled]:bg-surface-inset has-[input:disabled]:text-muted-foreground has-[input:disabled]:border-border",
        !unstyled && blocked.readOnly && "border-border",
        controlClassName,
      )}
    >
      {nativeInput ? <NativeInput {...inputProps} /> : <InputPrimitive {...inputProps} />}
      {hintShown ? <span aria-hidden="true" data-slot="input-hint" className={cn("pointer-events-none col-start-1 row-start-1 w-0 min-w-full truncate px-(--qy-fill-padding) text-muted-foreground", textProfile)}>{hint}</span> : null}
      {blocked.readOnly && !unstyled ? <span data-slot="input-readonly" aria-hidden="true" className="col-start-2 row-start-1 pe-(--qy-fill-padding) text-caption text-muted-foreground">{messages.readOnly}</span> : null}
    </div>
  );
}

export { InputPrimitive };
