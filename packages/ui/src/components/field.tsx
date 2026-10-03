"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { cn } from "../utils";
import { Separator, type SeparatorProps } from "./separator";

export type FieldOrientation = "vertical" | "horizontal";
export type FieldProps = Omit<React.ComponentProps<typeof FieldPrimitive.Root>, "validate" | "validationMode" | "validationDebounceTime" | "actionsRef"> & {
  orientation?: FieldOrientation;
};
export type FieldErrorProps = React.ComponentProps<typeof FieldPrimitive.Error> & {
  errors?: ReadonlyArray<{ message?: string | undefined } | undefined>;
};

const InField = React.createContext(false);

function hasSuppliedContent(children: React.ReactNode) {
  return React.Children.toArray(children).some(child => typeof child !== "string" || child.trim() !== "");
}

export function Field({ orientation = "vertical", invalid = false, className, onInvalidCapture, ...props }: FieldProps) {
  return (
    <InField.Provider value={true}>
      <FieldPrimitive.Root
        data-slot="field"
        data-orientation={orientation}
        {...props}
        {...mergeProps<"div">({
          // 保留浏览器约束与调用方事件；阻止原语把 native invalid 推成组件状态。
          onInvalidCapture(event) { event.preventBaseUIHandler(); },
        }, { onInvalidCapture })}
        invalid={invalid}
        validationMode="onSubmit"
        className={(state) => cn(
          "flex min-w-0 gap-(--qy-field-gap)",
          orientation === "vertical" ? "flex-col" : "flex-row items-start",
          typeof className === "function" ? className(state) : className,
        )}
      />
    </InField.Provider>
  );
}

export function FieldGroup({ className, render, ref, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "field-group",
  }, props, { className: cn("flex min-w-0 flex-col gap-(--qy-field-group-gap)", className) }) });
}

export function FieldContent({ className, render, ref, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "field-content",
  }, props, { className: cn("flex min-w-0 flex-1 flex-col gap-(--qy-field-gap)", className) }) });
}

/** 普通事实标题不注册成 label；复合控件由调用方显式引用它的 id。 */
export function FieldTitle({ className, render, ref, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "field-title",
  }, props, { className: cn("min-w-0 text-label text-foreground wrap-break-word", className) }) });
}

export function FieldLabel({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Label>) {
  return <FieldPrimitive.Label data-slot="field-label" {...props} className={(state) => cn(
    "min-w-0 text-label text-foreground wrap-break-word data-invalid:text-destructive-foreground",
    typeof className === "function" ? className(state) : className,
  )} />;
}

export function FieldDescription({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return <FieldPrimitive.Description data-slot="field-description" {...props} className={(state) => cn(
    "min-w-0 text-support-mobile text-muted-foreground wrap-break-word sm:text-support",
    typeof className === "function" ? className(state) : className,
  )} />;
}

/** Item 为同一字段中的具体控件提供局部标签关联。 */
export function FieldItem({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Item>) {
  return <FieldPrimitive.Item data-slot="field-item" {...props} className={(state) => cn(
    "flex min-w-0 items-start gap-(--qy-field-gap)",
    typeof className === "function" ? className(state) : className,
  )} />;
}

export function FieldSeparator({ children, className, render, ref, ...props }: useRender.ComponentProps<"div"> & Pick<SeparatorProps, "decorative">) {
  const { decorative = false, ...nativeProps } = props;
  const hasText = hasSuppliedContent(children);
  return useRender({
    defaultTagName: "div", render, ref,
    props: mergeProps({ "data-slot": "field-separator" }, nativeProps, {
      className: cn("flex min-w-0 items-center gap-(--qy-field-gap) text-support-mobile text-muted-foreground sm:text-support", className),
      children: hasText ? <>
        <Separator decorative className="min-w-0 flex-1" />
        <span className="min-w-0 wrap-break-word">{children}</span>
        <Separator decorative className="min-w-0 flex-1" />
      </> : <Separator decorative={decorative} />,
    }),
  });
}

const standaloneErrorState: FieldPrimitive.Error.State = {
  disabled: false, touched: false, dirty: false, valid: null,
  filled: false, focused: false, transitionStatus: undefined,
};

export function FieldError({ children, errors, match = true, className, render, ref, ...props }: FieldErrorProps) {
  const inField = React.useContext(InField);
  const messages = [...new Set((errors ?? []).flatMap((error) => error?.message?.trim() ? [error.message] : []))];
  const suppliedContent = hasSuppliedContent(children);
  const content = suppliedContent ? children : messages.length > 1
    ? <ul className="list-disc ps-(--qy-space-4)">{messages.map((message) => <li key={message}>{message}</li>)}</ul>
    : messages[0];
  const getClassName = (state: FieldPrimitive.Error.State) => cn(
    "min-w-0 text-support-mobile text-destructive-foreground wrap-break-word sm:text-support",
    typeof className === "function" ? className(state) : className,
  );
  // 字段外只有给定内容，无原语上下文；仍保留 render、ref 和原生属性。
  const standalone = useRender({
    defaultTagName: "div", render, ref, enabled: !inField && content !== undefined && match !== false,
    state: standaloneErrorState as FieldPrimitive.Error.State & Record<string, unknown>,
    props: mergeProps({ "data-slot": "field-error" }, props, { className: getClassName(standaloneErrorState), children: content }),
  });
  if (content === undefined) return null;
  if (!inField) return standalone;
  return <FieldPrimitive.Error
    data-slot="field-error" {...props} ref={ref} render={render}
    match={match} className={getClassName}
  >{content}</FieldPrimitive.Error>;
}

export const FieldControl: typeof FieldPrimitive.Control = FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity = FieldPrimitive.Validity;
export { FieldPrimitive };
