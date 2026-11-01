"use client";

import { Field as TextareaPrimitive } from "@base-ui/react/field";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { fillStateNative } from "../fill-state";

export type TextareaProps = Omit<React.ComponentPropsWithRef<"textarea">, "className" | "style"> &
  Pick<TextareaPrimitive.Control.Props, "className" | "style" | "render" | "onValueChange"> & {
    /** 外层容器的样式入口；className / style / render 始终属于真实的 textarea。 */
    controlClassName?: string;
    /** 由 InputGroup 提供共同边界时使用：不自己画边框、底色与状态，几何与原生语义不变。 */
    unstyled?: boolean;
  };

/**
 * 基础层 §2/§8、用户裁决 2026-10-05：填值控件只有一套几何，跟随密度轴。
 * 多行编辑的高度由 rows 与内容决定，给它分档位没有意义；值的文字始终是正文尺寸。
 */
const textProfile = "text-control-md-mobile sm:text-control-md";

/** 多行编辑；rows 是起始容量，invalid 由 aria-invalid 或所在 Field 声明。 */
export function Textarea({ rows = 3, className, controlClassName, unstyled = false, style, render, ref, ...props }: TextareaProps) {
  const { messages } = useUILocale();
  const nodeRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [focused, setFocused] = React.useState(false);
  const [readOnly, setReadOnly] = React.useState(Boolean(props.readOnly));
  const setRef = React.useCallback((node: HTMLElement | null) => {
    nodeRef.current = node as HTMLTextAreaElement | null;
    if (node) setReadOnly(Boolean((node as HTMLTextAreaElement).readOnly));
    const cleanup = typeof ref === "function" ? ref(node as HTMLTextAreaElement | null) : undefined;
    if (ref && typeof ref !== "function") ref.current = node as HTMLTextAreaElement | null;
    return () => {
      nodeRef.current = null;
      if (typeof cleanup === "function") cleanup();
      else if (typeof ref === "function") ref(null);
      else if (ref) ref.current = null;
    };
  }, [ref]);
  React.useEffect(() => { setReadOnly(Boolean(nodeRef.current?.readOnly)); });
  const realState = (state: TextareaPrimitive.Control.State) => ({ ...state, focused });
  const variables = {
    // 只读填值控件角色层：几何跟随密度，文字不跟随。
    "--qy-textarea-height": "var(--qy-fill-height)",
    "--qy-textarea-height-narrow": "var(--qy-fill-height-narrow)",
    "--qy-textarea-leading": "var(--qy-fill-text-leading)",
    "--qy-textarea-leading-narrow": "var(--qy-fill-text-leading-narrow)",
    "--qy-textarea-padding": "var(--qy-fill-padding)",
    "--qy-textarea-rows": rows,
    "--qy-textarea-radius": "var(--qy-fill-radius)",
    // 没有自己的边框时，上下两道线（各一道 --qy-line-width）由外框承担，textarea 的最小高度 = 外高 − 这两道线，
    // 与 Input 的 unstyled 同一关系；有自己的边框时不扣。
    "--qy-textarea-inset": unstyled ? "calc(2 * var(--qy-line-width))" : "0px",
  } as React.CSSProperties;
  // Field.Control 的公开类型以 input 为默认标签。仅此适配点转接原生 textarea
  // 属性；公开事件/ref 仍是 HTMLTextAreaElement，原语承担注册、名称和说明关联。
  const { onFocus, onBlur, ...nativeProps } = props;
  const controlProps = nativeProps as unknown as TextareaPrimitive.Control.Props;
  return <div data-slot="textarea-control" className={cn("min-w-0 w-full", controlClassName)}>
    <TextareaPrimitive.Control
      data-slot="textarea"
      {...controlProps}
      ref={setRef}
      {...{ rows }}
      onFocus={(event) => { setFocused(true); onFocus?.(event as unknown as React.FocusEvent<HTMLTextAreaElement>); }}
      onBlur={(event) => { setFocused(false); onBlur?.(event as unknown as React.FocusEvent<HTMLTextAreaElement>); }}
      render={typeof render === "function" ? (elementProps, state) => render(elementProps, realState(state)) : render ?? <textarea />}
      className={(state) => cn(
        "peer touch-target block w-full min-w-0 resize-y disabled:resize-none [field-sizing:content] text-foreground outline-none placeholder:text-muted-foreground",
        unstyled ? "bg-transparent" : "rounded-(--qy-textarea-radius) border border-input bg-surface-field",
        "px-(--qy-textarea-padding) py-[calc((var(--qy-textarea-height-narrow)-var(--qy-textarea-leading-narrow)-2*var(--qy-line-width))/2)] sm:py-[calc((var(--qy-textarea-height)-var(--qy-textarea-leading)-2*var(--qy-line-width))/2)]",
        "min-h-[calc(var(--qy-textarea-rows)*var(--qy-textarea-leading-narrow)+var(--qy-textarea-height-narrow)-var(--qy-textarea-leading-narrow)-var(--qy-textarea-inset))] sm:min-h-[calc(var(--qy-textarea-rows)*var(--qy-textarea-leading)+var(--qy-textarea-height)-var(--qy-textarea-leading)-var(--qy-textarea-inset))] pointer-coarse:min-h-[max(calc(var(--qy-touch-target)-var(--qy-textarea-inset)),calc(var(--qy-textarea-rows)*var(--qy-textarea-leading-narrow)+var(--qy-textarea-height-narrow)-var(--qy-textarea-leading-narrow)-var(--qy-textarea-inset)))] sm:pointer-coarse:min-h-[max(calc(var(--qy-touch-target)-var(--qy-textarea-inset)),calc(var(--qy-textarea-rows)*var(--qy-textarea-leading)+var(--qy-textarea-height)-var(--qy-textarea-leading)-var(--qy-textarea-inset)))]",
        // 基础层 §5、§9（2026-10-05 打磨）：只读保留可读的底与边界，禁用才用不活跃承载面。
        !unstyled && "transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring not-disabled:not-read-only:not-focus-visible:not-aria-invalid:hover:border-border-strong aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground",
        !unstyled && fillStateNative,
        // 外框承担状态时，禁用仍禁止缩放与指针（外框的 fillStateByMember 管底与字色）。
        unstyled && "disabled:cursor-not-allowed",
        textProfile,
        typeof className === "function" ? className(realState(state)) : className,
      )}
      style={(state) => ({ ...variables, ...(typeof style === "function" ? style(realState(state)) : style) })}
    />
    {readOnly && !unstyled ? <span data-slot="textarea-readonly" aria-hidden="true" className="mt-(--qy-field-gap) block text-caption text-muted-foreground">{messages.readOnly}</span> : null}
  </div>;
}

export { TextareaPrimitive };
