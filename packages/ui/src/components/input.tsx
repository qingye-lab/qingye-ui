"use client";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { EyeIcon, EyeOffIcon, SearchIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type InputSize = "xs" | "sm" | "md" | "lg" | "xl";
export type InputProps = Omit<InputPrimitive.Props, "size"> & React.RefAttributes<HTMLInputElement> & {
  /** 控件位置对应的档案；数字保留原生 input.size 的字符宽度含义。 */
  size?: InputSize | number;
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

const textProfiles: Record<InputSize, string> = {
  xs: "text-control-xs-mobile sm:text-control-xs",
  sm: "text-control-sm-mobile sm:text-control-sm",
  md: "text-control-md-mobile sm:text-control-md",
  // 基础层 §2、§8：每档使用同名的文字档，与 Button 一致。`lg` 曾取 `md` 的文字档，
  // 多出的 4px 高度全部变成纵向空白（每侧 6→8px，文字占比 62.5%→55.6%），
  // 低于 `xl`。纵向内距由 token 按同一 leading 推导，两者必须同时改。
  lg: "text-control-lg-mobile sm:text-control-lg",
  xl: "text-control-xl-mobile sm:text-control-xl",
};

// 基础层 §1/§2/§8：档案只接线既有几何与文字角色，不在组件内新定尺寸。
function profileVariables(size: InputSize): React.CSSProperties {
  return {
    "--qy-input-height": `var(--qy-control-${size})`,
    ...(size === "xs" || size === "sm" ? { "--qy-radius-control": `var(--qy-radius-${size})` } : {}),
    "--qy-input-height-narrow": `var(--qy-control-${size}-narrow)`,
    "--qy-input-padding": `var(--qy-control-${size}-padding-bordered)`,
    "--qy-input-icon": `var(--qy-control-${size}-icon)`,
    "--qy-input-icon-narrow": `var(--qy-control-${size}-icon-narrow)`,
  } as React.CSSProperties;
}

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
  size = "md",
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
  const profile = typeof size === "number" ? "md" : size;
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
    size: typeof size === "number" ? size : undefined,
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
      "col-start-2 row-start-1 w-full min-w-0 self-stretch bg-transparent px-(--qy-input-padding) py-0 text-foreground outline-none placeholder:text-muted-foreground autofill:[-webkit-text-fill-color:var(--qy-foreground)]",
      textProfiles[profile],
      type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none",
      password && "[&::-ms-reveal]:hidden",
      type === "file" && "file:bg-transparent file:text-foreground file:[font:inherit]",
      typeof className === "function" ? className(state) : className,
    ),
  };
  // 基础层 §15：这些动作按钮与输入框共用同一条外边界，外描边会越过它 —
  // 用户的明确要求是「控件外面不出现任何一圈」。信号因此落在按钮自己的盒内。
  const actionClassName = "relative qy-pressable touch-target row-start-1 flex shrink-0 items-center justify-center self-stretch rounded-[max(0px,calc(var(--qy-radius-control)-1px))] bg-transparent text-muted-foreground outline-none hover:bg-accent hover:text-foreground active:bg-accent focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color) disabled:cursor-not-allowed disabled:opacity-64 [&_svg]:size-(--qy-input-icon-narrow) sm:[&_svg]:size-(--qy-input-icon)";

  return (
    <div
      data-slot="input-control"
      data-size={profile}
      data-readonly={blocked.readOnly ? "" : undefined}
      className={cn(
        // 基础层 §5/§15：真实边框标出编辑范围；仅已声明 aria-invalid=true 才进入错误色。
        "relative grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center",
        unstyled
          ? "min-h-[calc(var(--qy-input-height-narrow)-2px)] sm:min-h-[calc(var(--qy-input-height)-2px)] pointer-coarse:min-h-[calc(var(--qy-touch-target)-2px)]"
          : "min-h-(--qy-input-height-narrow) sm:min-h-(--qy-input-height) pointer-coarse:min-h-(--qy-touch-target)",
        !unstyled && "rounded-control border border-input bg-card text-foreground transition-[border-color,box-shadow,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) has-[input:focus-visible]:border-ring has-[input:disabled]:opacity-64 not-has-[input:disabled]:not-has-[input:read-only]:not-has-[input:focus-visible]:not-has-[input[aria-invalid=true]]:hover:border-border-strong has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]:focus-visible]:border-destructive-foreground dark:bg-surface-inset",
        !unstyled && blocked.readOnly && "border-dashed",
        controlClassName,
      )}
      style={profileVariables(profile)}
    >
      {type === "search" ? <span className="col-start-1 row-start-1 ps-(--qy-input-padding) text-muted-foreground" data-slot="input-search-icon"><SearchIcon aria-hidden="true" className="size-(--qy-input-icon-narrow) sm:size-(--qy-input-icon)" /></span> : null}
      {nativeInput ? <NativeInput {...inputProps} /> : <InputPrimitive {...inputProps} />}
      {(canClear || showVisibility || (blocked.readOnly && !unstyled)) ? (
        <span data-slot="input-adjuncts" className="col-start-3 row-start-1 flex self-stretch items-center">
          {blocked.readOnly && !unstyled ? <span data-slot="input-readonly" aria-hidden="true" className="pe-(--qy-input-padding) text-caption text-muted-foreground">{messages.readOnly}</span> : null}
          {canClear ? <button type="button" className={cn(actionClassName, "aspect-square")} data-slot="input-clear" aria-label={clearLabel ?? (type === "search" ? messages.clearSearch : messages.inputClear)} onClick={clear}><XIcon aria-hidden="true" /></button> : null}
          {showVisibility ? <button type="button" className={cn(actionClassName, "aspect-square")} data-slot="input-visibility" aria-controls={inputId} aria-label={showLabel ?? messages.showPassword} aria-pressed={visible} disabled={blocked.disabled} onClick={() => { if (inputRef.current?.disabled || inputRef.current?.matches(":disabled")) return; const next = !visible; if (visibleProp === undefined) setUncontrolledVisible(next); onVisibleChange?.(next); }}>
            {visible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
          </button> : null}
        </span>
      ) : null}
    </div>
  );
}

export { InputPrimitive };
