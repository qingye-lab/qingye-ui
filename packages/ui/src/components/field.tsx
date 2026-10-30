"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "../utils";
import { useUILocale } from "../locale";
import { InField, InFieldItem } from "../labelable-scope";
import { Separator, type SeparatorProps } from "./separator";

export type FieldOrientation = "vertical" | "horizontal";
export type FieldProps = Omit<React.ComponentProps<typeof FieldPrimitive.Root>, "validate" | "validationMode" | "validationDebounceTime" | "actionsRef"> & {
  orientation?: FieldOrientation;
  /** 应用持有的异步校验正在进行。为 true 时：根部 `data-validating` 与 `aria-busy`，错误位置显示「正在校验」，
   *  本字段内的 FieldError 不显示、控件不标无效——校验进行中，上一次的结果已不可信。结束与结论仍由应用传入（invalid、错误内容）。 */
  validating?: boolean;
};
export type FieldErrorProps = React.ComponentProps<typeof FieldPrimitive.Error> & {
  errors?: ReadonlyArray<{ message?: string | undefined } | undefined>;
};

/** 本字段是否正在校验；FieldError 读它来让位。字段外为 false。 */
const FieldValidating = React.createContext(false);

function hasSuppliedContent(children: React.ReactNode) {
  return React.Children.toArray(children).some(child => typeof child !== "string" || child.trim() !== "");
}

export function Field({ orientation = "vertical", invalid = false, validating = false, className, children, onInvalidCapture, ...props }: FieldProps) {
  const { messages } = useUILocale();
  return (
    <InField.Provider value={true}><InFieldItem.Provider value={false}><FieldValidating.Provider value={validating}>
      <FieldPrimitive.Root
        data-slot="field"
        data-orientation={orientation}
        data-validating={validating ? "" : undefined}
        aria-busy={validating ? "true" : undefined}
        {...props}
        {...mergeProps<"div">({
          // 保留浏览器约束与调用方事件；阻止原语把 native invalid 推成组件状态。
          onInvalidCapture(event) { event.preventBaseUIHandler(); },
        }, { onInvalidCapture })}
        // 校验进行中，上一次的「无效」与错误文字一样不可信：一并让位，避免读屏报无效却找不到原因。
        invalid={invalid && !validating}
        validationMode="onSubmit"
        className={(state) => cn(
          "flex min-w-0 gap-(--qy-field-gap)",
          orientation === "vertical" ? "flex-col" : "flex-row items-start",
          typeof className === "function" ? className(state) : className,
        )}
      >
        {children}
        {/* 占用错误出现的位置：同一处只说一件事，等待记号与 Button/Toast 同用 IconLoader2 + qy-spin（转速即 --qy-duration-wait）。 */}
        {validating && <div data-slot="field-validating" role="status" className="flex min-w-0 items-center gap-(--qy-field-gap) text-support-mobile text-muted-foreground sm:text-support">
          <IconLoader2 aria-hidden="true" className="qy-spin size-[1em] shrink-0" />
          <span className="min-w-0 wrap-break-word">{messages.fieldValidating}</span>
        </div>}
      </FieldPrimitive.Root>
    </FieldValidating.Provider></InFieldItem.Provider></InField.Provider>
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
  }, props, { className: cn("min-w-0 text-label-mobile text-foreground wrap-break-word sm:text-label", className) }) });
}

export type FieldLabelProps = React.ComponentProps<typeof FieldPrimitive.Label> & {
  /** 必填 / 选填标记。`"required"` 只画 `*`（aria-hidden）；必填语义由控件自己的 `required` 向读屏表达，
   *  所以调用方必须同时给控件 `required`，否则标记只是视觉。`"optional"` 的「选填」是可见文字，计入可访问名称。 */
  requirement?: "required" | "optional";
};

export function FieldLabel({ className, requirement, children, ...props }: FieldLabelProps) {
  const { code, messages } = useUILocale();
  // 预设：用 `*` 标必填、用 muted 文字色，依据是管理后台表单的通行约定，不是从关系推出。
  // 选填的括号按语言自然：中文用全角括号，其余语言用半角（只按语言前缀区分，不新增文案键）。
  const optional = code.toLowerCase().startsWith("zh") ? `（${messages.fieldOptional}）` : `(${messages.fieldOptional})`;
  return <FieldPrimitive.Label data-slot="field-label" {...props} className={(state) => cn(
    "min-w-0 text-label-mobile text-foreground wrap-break-word data-invalid:text-destructive-foreground sm:text-label",
    typeof className === "function" ? className(state) : className,
  )}>
    {children}
    {/* 字号随标签（继承），与标签隔一个字间距 space-1（预设）。 */}
    {requirement === "required" && <span data-slot="field-requirement" aria-hidden="true" className="ms-(--qy-space-1) text-muted-foreground">*</span>}
    {requirement === "optional" && <span data-slot="field-requirement" className="ms-(--qy-space-1) text-muted-foreground">{optional}</span>}
  </FieldPrimitive.Label>;
}

export function FieldDescription({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Description>) {
  return <FieldPrimitive.Description data-slot="field-description" {...props} className={(state) => cn(
    "min-w-0 text-support-mobile text-muted-foreground wrap-break-word sm:text-support",
    typeof className === "function" ? className(state) : className,
  )} />;
}

/** Item 为同一字段中的具体控件提供局部标签关联。 */
export function FieldItem({ className, ...props }: React.ComponentProps<typeof FieldPrimitive.Item>) {
  // 写入 InFieldItem：单选项、分段项见到它就不再自建作用域（labelable-scope.tsx），项旁的 FieldLabel 才读得到。
  return <InFieldItem.Provider value={true}><FieldPrimitive.Item data-slot="field-item" {...props} className={(state) => cn(
    "flex min-w-0 items-start gap-(--qy-field-gap)",
    typeof className === "function" ? className(state) : className,
  )} /></InFieldItem.Provider>;
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
  const validating = React.useContext(FieldValidating);
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
  if (content === undefined || validating) return null;
  if (!inField) return standalone;
  return <FieldPrimitive.Error
    data-slot="field-error" {...props} ref={ref} render={render}
    match={match} className={getClassName}
  >{content}</FieldPrimitive.Error>;
}

export const FieldControl: typeof FieldPrimitive.Control = FieldPrimitive.Control;
export const FieldValidity: typeof FieldPrimitive.Validity = FieldPrimitive.Validity;
export { FieldPrimitive };
