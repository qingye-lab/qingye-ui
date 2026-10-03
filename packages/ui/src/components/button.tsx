"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleHelpIcon, CircleXIcon, HourglassIcon, LoaderCircleIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

// Keep Node's ambient types out of the browser library; process may be absent.
declare const process: { env: { NODE_ENV?: string } };

export type ButtonState = "idle" | "waiting" | "in-progress" | "unknown" | "failed";

// 基础层 §1、§2、§8：位置选择尺寸与文字档，图标只是形态；留白由基础层换算。
// 每档使用同名的文字档，高度与字号同步增长 —— 只涨高度不涨字号会让多出的
// 空间全部变成纵向空白，文字占比反而下降（lg 曾用 md 的文字档，
// 每侧留白由 6 跳到 8，文字占比从 62.5% 掉到 55.6%，比 xl 还低）。
// xl 曾取 lg 的文字档，同一病因（每侧 8px），现在有自己的一档。
const sizes = {
  xs: "rounded-xs min-h-(--qy-control-xs-narrow) text-control-xs-mobile sm:min-h-(--qy-control-xs) sm:text-control-xs [&_svg]:size-(--qy-control-xs-icon-narrow) sm:[&_svg]:size-(--qy-control-xs-icon)",
  sm: "rounded-sm min-h-(--qy-control-sm-narrow) text-control-sm-mobile sm:min-h-(--qy-control-sm) sm:text-control-sm [&_svg]:size-(--qy-control-sm-icon-narrow) sm:[&_svg]:size-(--qy-control-sm-icon)",
  md: "rounded-control min-h-(--qy-control-md-narrow) text-control-md-mobile sm:min-h-(--qy-control-md) sm:text-control-md [&_svg]:size-(--qy-control-md-icon-narrow) sm:[&_svg]:size-(--qy-control-md-icon)",
  lg: "rounded-control min-h-(--qy-control-lg-narrow) text-control-lg-mobile sm:min-h-(--qy-control-lg) sm:text-control-lg [&_svg]:size-(--qy-control-lg-icon-narrow) sm:[&_svg]:size-(--qy-control-lg-icon)",
  xl: "rounded-control min-h-(--qy-control-xl-narrow) text-control-xl-mobile sm:min-h-(--qy-control-xl) sm:text-control-xl [&_svg]:size-(--qy-control-xl-icon-narrow) sm:[&_svg]:size-(--qy-control-xl-icon)",
};

export const buttonVariants = cva(
  "qy-pressable touch-target relative inline-flex max-w-full min-w-0 cursor-pointer items-center justify-center text-center outline-none focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color) disabled:cursor-not-allowed disabled:opacity-64 aria-disabled:cursor-default [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // 三档按「边界由谁承担」区分，焦点都加强该档已有的属性，不在控件外面画一圈：
      //   solid   填充承担边界 → 填充内侧一条反色线
      //   bordered 底色与承载面一致，由线承担边界 → 这条线变黑（与输入框相同，不加厚）
      //   quiet   无填充无边框 → 自身盒内一条细线
      variant: {
        solid: "focus-visible:ring-inset",
        bordered: "border focus-visible:ring-0",
        quiet: "bg-transparent focus-visible:ring-inset [--qy-focus-ring-width:var(--qy-focus-quiet-width)]",
      },
      tone: { neutral: "", danger: "" },
      size: sizes,
      shape: { label: "", icon: "shrink-0" },
    },
    compoundVariants: [
      // 基础层 §5、§7、§10：填充表达强调，危险表达后果；无理由不补边框。
      { variant: "solid", tone: "neutral", class: "[--qy-focus-ring-color:var(--qy-focus-ring-on-solid)] bg-primary text-primary-foreground not-aria-disabled:hover:bg-primary/90 not-aria-disabled:active:bg-primary/90" },
      { variant: "solid", tone: "danger", class: "[--qy-focus-ring-color:var(--qy-danger-on-fill)] bg-destructive-fill text-destructive-on-fill not-aria-disabled:hover:bg-destructive-fill/90 not-aria-disabled:active:bg-destructive-fill/90" },
      // 白底黑字，50% 边框（与输入框同强度）。底色与承载面一致，所以由线承担边界（用户规则）。
      { variant: "bordered", tone: "neutral", class: "border-(--qy-button-bordered-border) bg-card text-foreground focus-visible:border-(--qy-button-bordered-border-focus) not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-accent" },
      { variant: "bordered", tone: "danger", class: "[--qy-button-bordered-border:color-mix(in_srgb,var(--color-destructive-foreground)_50%,transparent)] [--qy-button-bordered-border-focus:var(--color-destructive-foreground)] border-(--qy-button-bordered-border) bg-card text-destructive-foreground focus-visible:border-(--qy-button-bordered-border-focus) not-aria-disabled:hover:bg-danger-soft not-aria-disabled:active:bg-danger-soft" },
      { variant: "quiet", tone: "neutral", class: "text-foreground not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-accent" },
      { variant: "quiet", tone: "danger", class: "text-destructive-foreground not-aria-disabled:hover:bg-danger-soft not-aria-disabled:active:bg-danger-soft" },
      // 有边框的档扣掉 1px 边框，文字起点与无边框档对齐。
      { shape: "label", variant: ["solid", "quiet"], size: "xs", class: "px-(--qy-control-xs-padding)" },
      { shape: "label", variant: ["solid", "quiet"], size: "sm", class: "px-(--qy-control-sm-padding)" },
      { shape: "label", variant: ["solid", "quiet"], size: "md", class: "px-(--qy-control-md-padding)" },
      { shape: "label", variant: ["solid", "quiet"], size: "lg", class: "px-(--qy-control-lg-padding)" },
      { shape: "label", variant: ["solid", "quiet"], size: "xl", class: "px-(--qy-control-xl-padding)" },
      { shape: "label", variant: "bordered", size: "xs", class: "px-(--qy-control-xs-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "sm", class: "px-(--qy-control-sm-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "md", class: "px-(--qy-control-md-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "lg", class: "px-(--qy-control-lg-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "xl", class: "px-(--qy-control-xl-padding-bordered)" },
      { shape: "icon", variant: ["solid", "quiet"], size: "xs", class: "w-(--qy-control-xs-narrow) p-(--qy-control-xs-icon-padding-narrow) sm:w-(--qy-control-xs) sm:p-(--qy-control-xs-icon-padding)" },
      { shape: "icon", variant: ["solid", "quiet"], size: "sm", class: "w-(--qy-control-sm-narrow) p-(--qy-control-sm-icon-padding-narrow) sm:w-(--qy-control-sm) sm:p-(--qy-control-sm-icon-padding)" },
      { shape: "icon", variant: ["solid", "quiet"], size: "md", class: "w-(--qy-control-md-narrow) p-(--qy-control-md-icon-padding-narrow) sm:w-(--qy-control-md) sm:p-(--qy-control-md-icon-padding)" },
      { shape: "icon", variant: ["solid", "quiet"], size: "lg", class: "w-(--qy-control-lg-narrow) p-(--qy-control-lg-icon-padding-narrow) sm:w-(--qy-control-lg) sm:p-(--qy-control-lg-icon-padding)" },
      { shape: "icon", variant: ["solid", "quiet"], size: "xl", class: "w-(--qy-control-xl-narrow) p-(--qy-control-xl-icon-padding-narrow) sm:w-(--qy-control-xl) sm:p-(--qy-control-xl-icon-padding)" },
      { shape: "icon", variant: "bordered", size: "xs", class: "w-(--qy-control-xs-narrow) p-(--qy-control-xs-icon-padding-bordered-narrow) sm:w-(--qy-control-xs) sm:p-(--qy-control-xs-icon-padding-bordered)" },
      { shape: "icon", variant: "bordered", size: "sm", class: "w-(--qy-control-sm-narrow) p-(--qy-control-sm-icon-padding-bordered-narrow) sm:w-(--qy-control-sm) sm:p-(--qy-control-sm-icon-padding-bordered)" },
      { shape: "icon", variant: "bordered", size: "md", class: "w-(--qy-control-md-narrow) p-(--qy-control-md-icon-padding-bordered-narrow) sm:w-(--qy-control-md) sm:p-(--qy-control-md-icon-padding-bordered)" },
      { shape: "icon", variant: "bordered", size: "lg", class: "w-(--qy-control-lg-narrow) p-(--qy-control-lg-icon-padding-bordered-narrow) sm:w-(--qy-control-lg) sm:p-(--qy-control-lg-icon-padding-bordered)" },
      { shape: "icon", variant: "bordered", size: "xl", class: "w-(--qy-control-xl-narrow) p-(--qy-control-xl-icon-padding-bordered-narrow) sm:w-(--qy-control-xl) sm:p-(--qy-control-xl-icon-padding-bordered)" },
    ],
    defaultVariants: { variant: "solid", tone: "neutral", size: "md", shape: "label" },
  },
);

const ProtectionContext = React.createContext<string | undefined>(undefined);

export interface ButtonProtectionProps extends React.ComponentPropsWithRef<"div"> {
  /** 基础层 §18：后果针对当前对象、版本与变更，由调用方给出可见文字。 */
  consequence: string;
}

export function ButtonProtection({ consequence, children, className, ...props }: ButtonProtectionProps) {
  const descriptionId = React.useId();
  // 基础层 §18、动作族决定 3：后果必须在场；这不是授权，也不自行决定二次确认。
  if (typeof consequence !== "string" || !consequence.trim()) throw new Error("ButtonProtection requires a visible, non-empty consequence.");
  return (
    <ProtectionContext.Provider value={descriptionId}>
      <div {...props} className={cn("flex min-w-0 flex-col", className)} data-slot="button-protection">
        <p className="text-support text-muted-foreground" data-slot="button-consequence" id={descriptionId}>
          {consequence}
        </p>
        <div className="flex flex-wrap items-center gap-(--qy-action-gap)" data-slot="button-protected-actions">
          {children}
        </div>
      </div>
    </ProtectionContext.Provider>
  );
}

export interface ButtonProps extends Omit<ButtonPrimitive.Props, "className" | "focusableWhenDisabled"> {
  className?: string;
  "data-slot"?: string;
  variant?: NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
  tone?: NonNullable<VariantProps<typeof buttonVariants>["tone"]>;
  size?: NonNullable<VariantProps<typeof buttonVariants>["size"]>;
  shape?: NonNullable<VariantProps<typeof buttonVariants>["shape"]>;
  /** 基础层 §9：事实由调用方持有；控件不启动请求、重试或推断完成。 */
  state?: ButtonState;
}

export function Button({
  variant = "solid", tone = "neutral", size = "md", shape = "label", state = "idle",
  className, children, disabled = false, tabIndex, render, ref,
  onClickCapture, onAuxClickCapture, onPointerDownCapture, onMouseDownCapture,
  onKeyDownCapture, onKeyUpCapture, "aria-describedby": description,
  "aria-disabled": disabledFact, "aria-busy": busyFact, "data-slot": slot = "button", ...props
}: ButtonProps): React.ReactElement {
  const { messages } = useUILocale();
  const protection = React.useContext(ProtectionContext);
  const statusId = React.useId();
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const mergedRef = React.useCallback((node: HTMLButtonElement | null) => {
    buttonRef.current = node;
    if (typeof ref === "function") {
      const cleanup = ref(node);
      if (typeof cleanup === "function") return () => { buttonRef.current = null; cleanup(); };
    } else if (ref) ref.current = node;
  }, [ref]);
  // 后果可以由现有说明承担；挂载后检查真实 DOM，包含 render 提供的关联。
  // SSR 不做此校验；开发环境在 commit 后报错，生产或缺少环境信息时不中断渲染。
  React.useEffect(() => {
    if (typeof process === "undefined" || process.env.NODE_ENV === "production" || tone !== "danger" || protection) return;
    const button = buttonRef.current;
    const hasConsequence = button?.getAttribute("aria-describedby")?.split(/\s+/).some((id) =>
      // 未完成状态说明不是动作后果，不能用自动生成的 status 蒙混通过。
      id !== statusId && Boolean(button.ownerDocument.getElementById(id)?.textContent?.trim()),
    );
    if (!hasConsequence) {
      throw new Error("A danger Button requires ButtonProtection or a non-empty DOM consequence linked by aria-describedby.");
    }
  });
  const status = {
    waiting: { label: messages.buttonWaiting, icon: HourglassIcon },
    "in-progress": { label: messages.buttonInProgress, icon: LoaderCircleIcon },
    unknown: { label: messages.buttonUnknown, icon: CircleHelpIcon },
    failed: { label: messages.buttonFailed, icon: CircleXIcon },
  };
  const presented = state === "idle" ? undefined : status[state];
  const busy = state === "waiting" || state === "in-progress" || busyFact === true || busyFact === "true";
  // 基础层 §9、§15、§18：未知不等于失败；先保留位置与核实依据，不能默认重复写入。
  const blocked = disabled || disabledFact === true || disabledFact === "true" || busy || state === "unknown";
  const preventActivation = (event: React.SyntheticEvent) => {
    if (!blocked) return false;
    event.preventDefault();
    event.stopPropagation();
    return true;
  };
  const activationKey = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") return true;
    const popup = event.currentTarget.getAttribute("aria-haspopup");
    return (popup === "menu" || popup === "true" || popup === "listbox") &&
      (event.key === "ArrowDown" || event.key === "ArrowUp");
  };
  // 基础层 §15、§18：render 的捕获处理器先于原语合并，须在同一 DOM 入口先保护再转发。
  const protectRenderTarget = (element: React.ReactElement) => {
    const target = element.props as React.HTMLAttributes<HTMLButtonElement>;
    return React.cloneElement(element as React.ReactElement<React.HTMLAttributes<HTMLButtonElement>>, {
      onAuxClickCapture: (event) => { if (!preventActivation(event)) target.onAuxClickCapture?.(event); },
      onClickCapture: (event) => { if (!preventActivation(event)) target.onClickCapture?.(event); },
      onKeyDownCapture: (event) => { if (!activationKey(event) || !preventActivation(event)) target.onKeyDownCapture?.(event); },
      onKeyUpCapture: (event) => { if (!activationKey(event) || !preventActivation(event)) target.onKeyUpCapture?.(event); },
      onMouseDownCapture: (event) => { if (event.button !== 0 || !preventActivation(event)) target.onMouseDownCapture?.(event); },
      onPointerDownCapture: (event) => { if (event.button !== 0 || !preventActivation(event)) target.onPointerDownCapture?.(event); },
    });
  };
  const protectedRender: ButtonPrimitive.Props["render"] = typeof render === "function"
    ? (renderProps, primitiveState) => protectRenderTarget(render(renderProps, primitiveState))
    : render && protectRenderTarget(render);
  const StatusIcon = presented?.icon;
  return (
    <>
      <ButtonPrimitive
        {...props}
        aria-busy={busy || busyFact}
        aria-describedby={[description, tone === "danger" ? protection : undefined, presented ? statusId : undefined].filter(Boolean).join(" ") || undefined}
        aria-disabled={blocked || disabledFact}
        className={cn(buttonVariants({ variant, tone, size, shape }), className)}
        data-shape={shape}
        data-size={size}
        data-slot={slot}
        data-state={state}
        data-tone={tone}
        data-variant={variant}
        disabled={disabled}
        ref={mergedRef}
        render={protectedRender}
        tabIndex={disabled ? (props.nativeButton === false ? -1 : undefined) : tabIndex ?? 0}
        onAuxClickCapture={(event) => { if (!preventActivation(event)) onAuxClickCapture?.(event); }}
        onClickCapture={(event) => { if (!preventActivation(event)) onClickCapture?.(event); }}
        onKeyDownCapture={(event) => { if (!activationKey(event) || !preventActivation(event)) onKeyDownCapture?.(event); }}
        onKeyUpCapture={(event) => { if (!activationKey(event) || !preventActivation(event)) onKeyUpCapture?.(event); }}
        onMouseDownCapture={(event) => { if (event.button !== 0 || !preventActivation(event)) onMouseDownCapture?.(event); }}
        onPointerDownCapture={(event) => { if (event.button !== 0 || !preventActivation(event)) onPointerDownCapture?.(event); }}
      >
        {/* 基础层 §9、§15：状态不覆盖动作名称；图标形态用不同图形，文字形态同时呈现事实。 */}
        <span className={cn("inline-flex min-w-0 items-center justify-center whitespace-normal", shape === "icon" && presented && "opacity-0")} data-slot="button-content">
          {children}
        </span>
        {presented && StatusIcon && (
          <span aria-hidden="true" className={cn("inline-flex items-center", shape === "icon" && "pointer-events-none absolute")} data-slot="button-state">
            <StatusIcon className={state === "in-progress" ? "animate-spin" : undefined} data-slot="button-state-indicator" />
            {shape === "label" && <span>{" · "}{presented.label}</span>}
          </span>
        )}
      </ButtonPrimitive>
      <span aria-atomic="true" aria-live="polite" className="sr-only" data-slot="button-status" id={statusId} role={presented ? "status" : undefined}>
        {presented?.label}
      </span>
    </>
  );
}

export { ButtonPrimitive };
