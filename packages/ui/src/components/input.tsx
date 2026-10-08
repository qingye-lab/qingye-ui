"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconEye, IconEyeOff, IconSearch, IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
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
  /** 默认仅在 type="search" 时启用；清空不提交表单。 */
  clearable?: boolean;
  clearLabel?: string;
  onClear?: () => void;
  /** 默认仅在 type="password" 时启用。 */
  visibilityToggle?: boolean;
  visible?: boolean;
  defaultVisible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  /** 稳定的开关名称；aria-pressed 表达密码当前是否可见。 */
  showLabel?: string;
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

export function Input({
  size,
  className,
  controlClassName,
  unstyled = false,
  nativeInput = false,
  type = "text",
  clearable = type === "search",
  clearLabel,
  onClear,
  visibilityToggle = type === "password",
  visible: visibleProp,
  defaultVisible = false,
  onVisibleChange,
  showLabel,
  ref,
  id,
  onChange,
  onKeyDown,
  ...props
}: InputProps): React.ReactElement {
  const { messages } = useUILocale();
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [observedValue, setObservedValue] = React.useState(String(props.defaultValue ?? ""));
  const [uncontrolledVisible, setUncontrolledVisible] = React.useState(defaultVisible);
  const [blocked, setBlocked] = React.useState({ disabled: Boolean(props.disabled), readOnly: Boolean(props.readOnly) });
  const visible = visibleProp ?? uncontrolledVisible;
  const value = props.value === undefined ? observedValue : String(props.value);
  const password = type === "password";

  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      const cleanup = ref(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (ref) ref.current = node;
  }, [ref]);

  const syncInputState = React.useCallback(() => {
    const input = inputRef.current;
    if (!input) return;
    // 表单族 §九/基础层 §15：附属动作服从真实输入，含 Field 与原生 fieldset 的禁用。
    const next = { disabled: input.disabled || input.matches(":disabled"), readOnly: input.readOnly };
    setBlocked((previous) => previous.disabled === next.disabled && previous.readOnly === next.readOnly ? previous : next);
    setObservedValue(input.value);
  }, []);
  React.useLayoutEffect(syncInputState);
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const observer = new MutationObserver(syncInputState);
    const container = input.closest("fieldset") ?? input.parentElement;
    if (container) observer.observe(container, { attributes: true, subtree: true, attributeFilter: ["disabled", "readonly"] });
    const form = input.form;
    // 原生 reset 的默认动作发生在事件后；随后读真实值，不把非受控输入改成受控输入。
    const reset = () => queueMicrotask(syncInputState);
    form?.addEventListener("reset", reset);
    return () => { observer.disconnect(); form?.removeEventListener("reset", reset); };
  }, [nativeInput, syncInputState]);

  const canClear = clearable && value !== "" && !blocked.disabled && !blocked.readOnly;
  const showVisibility = password && visibilityToggle;
  const clear = () => {
    const input = inputRef.current;
    if (!input || input.disabled || input.matches(":disabled") || input.readOnly) return;
    // 进退相承（表单族决定 3）：使用真实 input 事件走原生、Field 和调用方同一条值变化链。
    const setter = Object.getOwnPropertyDescriptor(input.ownerDocument.defaultView!.HTMLInputElement.prototype, "value")?.set;
    setter?.call(input, "");
    input.dispatchEvent(new input.ownerDocument.defaultView!.Event("input", { bubbles: true }));
    onClear?.();
    input.focus();
  };

  const inputProps: InputPrimitive.Props & React.RefAttributes<HTMLInputElement> & { "data-slot": string } = {
    ...(password ? { autoCapitalize: "none", autoCorrect: "off", spellCheck: false } : {}),
    ...props,
    id: inputId,
    ref: setInputRef,
    type: password && visible ? "text" : type,
    // 原生字符宽度属性原样透传；它不参与呈现，几何来自填值控件角色层。
    size,
    "data-slot": (props as InputPrimitive.Props & { "data-slot"?: string })["data-slot"] ?? "input",
    onChange: (event) => { onChange?.(event); setObservedValue(event.currentTarget.value); },
    onKeyDown: (event) => {
      onKeyDown?.(event);
      // 基础层 §11/§15：首个 Escape 只清本字段；取消、空值和输入法事件留给原有焦点链。
      if (event.defaultPrevented || event.key !== "Escape" || !canClear || event.nativeEvent.isComposing || event.keyCode === 229) return;
      event.preventDefault();
      event.stopPropagation();
      clear();
    },
    className: (state) => cn(
      "col-start-2 row-start-1 w-full min-w-0 self-stretch bg-transparent px-(--qy-fill-padding) py-0 text-foreground outline-none placeholder:text-muted-foreground autofill:[-webkit-text-fill-color:var(--qy-foreground)]",
      textProfile,
      type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
      password && "[&::-ms-reveal]:hidden",
      // 基础层 §1、§8：带前置图标时，图标与文字的关系同按钮内图标与文字，用控件内间隔。
      type === "search" && "ps-(--qy-control-content-gap)",
      // 平台文件选择没有可设置的垂直对齐；行高取边框内高度让两段文字居中。按钮名称是动作，文件名是结果。
      type === "file" && "cursor-pointer text-muted-foreground leading-[calc(var(--qy-fill-height-narrow)-2px)] sm:leading-[calc(var(--qy-fill-height)-2px)] file:me-(--qy-fill-padding) file:cursor-pointer file:border-0 file:border-e file:border-solid file:border-border file:bg-transparent file:pe-(--qy-fill-padding) file:font-medium file:text-foreground file:[font-size:inherit]",
      typeof className === "function" ? className(state) : className,
    ),
  };
  // 基础层 §15：这些动作按钮与输入框共用同一条外边界，外描边会越过它 —
  // 用户的明确要求是「控件外面不出现任何一圈」。信号因此落在按钮自己的盒内。
  const actionClassName = "relative qy-pressable touch-target row-start-1 flex shrink-0 items-center justify-center self-stretch rounded-[max(0px,calc(var(--qy-fill-radius)-1px))] bg-transparent text-muted-foreground outline-none hover:bg-accent hover:text-foreground active:bg-accent focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color) disabled:cursor-not-allowed disabled:opacity-64 [&_svg]:size-(--qy-fill-icon-narrow) sm:[&_svg]:size-(--qy-fill-icon)";

  return (
    <div
      data-slot="input-control"
      data-readonly={blocked.readOnly ? "" : undefined}
      className={cn(
        // 基础层 §5/§15：真实边框标出编辑范围；仅已声明 aria-invalid=true 才进入错误色。
        "relative grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center",
        unstyled
          ? "min-h-[calc(var(--qy-fill-height-narrow)-2px)] sm:min-h-[calc(var(--qy-fill-height)-2px)] pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)]"
          : "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target)",
        !unstyled && "rounded-(--qy-fill-radius) border border-input bg-card text-foreground transition-[border-color,box-shadow,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) has-[input:focus-visible]:border-ring not-has-[input:disabled]:not-has-[input:read-only]:not-has-[input:focus-visible]:not-has-[input[aria-invalid=true]]:hover:border-border-strong has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]:focus-visible]:border-destructive-foreground dark:bg-surface-inset",
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
      {type === "search" ? <span className="col-start-1 row-start-1 ps-(--qy-fill-padding) text-muted-foreground" data-slot="input-search-icon"><IconSearch aria-hidden="true" className="size-(--qy-fill-icon-narrow) sm:size-(--qy-fill-icon)" /></span> : null}
      {nativeInput ? <NativeInput {...inputProps} /> : <InputPrimitive {...inputProps} />}
      {(canClear || showVisibility || (blocked.readOnly && !unstyled)) ? (
        <span data-slot="input-adjuncts" className="col-start-3 row-start-1 flex self-stretch items-center">
          {blocked.readOnly && !unstyled ? <span data-slot="input-readonly" aria-hidden="true" className="pe-(--qy-fill-padding) text-caption text-muted-foreground">{messages.readOnly}</span> : null}
          {canClear ? <button type="button" className={cn(actionClassName, "aspect-square")} data-slot="input-clear" aria-label={clearLabel ?? (type === "search" ? messages.clearSearch : messages.inputClear)} onClick={clear}><IconX aria-hidden="true" /></button> : null}
          {showVisibility ? <button type="button" className={cn(actionClassName, "aspect-square")} data-slot="input-visibility" aria-controls={inputId} aria-label={showLabel ?? messages.showPassword} aria-pressed={visible} disabled={blocked.disabled} onClick={() => { if (inputRef.current?.disabled || inputRef.current?.matches(":disabled")) return; const next = !visible; if (visibleProp === undefined) setUncontrolledVisible(next); onVisibleChange?.(next); }}>
            {visible ? <IconEyeOff aria-hidden="true" /> : <IconEye aria-hidden="true" />}
          </button> : null}
        </span>
      ) : null}
    </div>
  );
}

export { InputPrimitive };
