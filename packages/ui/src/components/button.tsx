"use client";

import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { IconLoader2 } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";


// 基础层 §1、§2、§8：位置选择尺寸与文字档，图标只是形态；留白由基础层换算。
// 每档使用同名的文字档，高度与字号同步增长 —— 只涨高度不涨字号会让多出的
// 空间全部变成纵向空白，文字占比反而下降（lg 曾用 md 的文字档，
// 每侧留白由 6 跳到 8，文字占比从 62.5% 掉到 55.6%，比 xl 还低）。
// xl 曾取 lg 的文字档，同一病因（每侧 8px），现在有自己的一档。
const sizes = {
  xs: "rounded-xs min-h-(--qy-control-xs-narrow) text-control-xs-mobile sm:min-h-(--qy-control-xs) sm:text-control-xs [&_svg]:size-(--qy-control-xs-icon-narrow) sm:[&_svg]:size-(--qy-control-xs-icon)",
  sm: "rounded-sm min-h-(--qy-control-sm-narrow) text-control-sm-mobile sm:min-h-(--qy-control-sm) sm:text-control-sm [&_svg]:size-(--qy-control-sm-icon-narrow) sm:[&_svg]:size-(--qy-control-sm-icon)",
  // md 与填值控件同行出现（工具条、筛选条、表单动作），二者的关系是「同高」。因此 md 的
  // 几何读填值控件角色层而不是固定档位：默认密度下取值与原 md 完全相同，紧凑密度下随
  // 输入框一起收紧——否则同一行里输入 28px、按钮 32px，外缘对不齐（评审 2026-10-05）。
  // 文字仍是 md 文字档，与填值控件一样「紧凑只收几何，不缩文字」。其余四档是位置的显式
  // 选择，不随密度改变。
  md: "rounded-(--qy-fill-radius) min-h-(--qy-fill-height-narrow) text-control-md-mobile sm:min-h-(--qy-fill-height) sm:text-control-md [&_svg]:size-(--qy-fill-icon-narrow) sm:[&_svg]:size-(--qy-fill-icon)",
  lg: "rounded-control min-h-(--qy-control-lg-narrow) text-control-lg-mobile sm:min-h-(--qy-control-lg) sm:text-control-lg [&_svg]:size-(--qy-control-lg-icon-narrow) sm:[&_svg]:size-(--qy-control-lg-icon)",
  xl: "rounded-control min-h-(--qy-control-xl-narrow) text-control-xl-mobile sm:min-h-(--qy-control-xl) sm:text-control-xl [&_svg]:size-(--qy-control-xl-icon-narrow) sm:[&_svg]:size-(--qy-control-xl-icon)",
};

export const buttonVariants = cva(
  "qy-pressable touch-target relative inline-flex max-w-full min-w-0 cursor-pointer items-center justify-center gap-(--qy-control-content-gap) text-center font-medium outline-none focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color) disabled:cursor-not-allowed disabled:opacity-64 aria-disabled:cursor-default [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      // 三档按「边界由谁承担」区分，焦点都加强该档已有的属性，不在控件外面画一圈：
      //   solid   填充承担边界 → 填充内侧一条反色线
      //   bordered 底色与承载面一致，由线承担边界 → 这条线变黑（不加厚）
      //   quiet   无填充无边框 → 自身盒内一条细线
      variant: {
        solid: "focus-visible:ring-inset",
        bordered: "border focus-visible:ring-0",
        quiet: "bg-transparent focus-visible:ring-inset [--qy-focus-ring-width:var(--qy-focus-quiet-width)]",
      },
      // 色调只是色调（用户裁决 2026-10-10：功能要纯粹）。danger 说明这个动作有不可逆的后果，
      // 后果本身与确认不由按钮承载——用 AlertDialog / ConfirmAction，按钮只负责触发。
      tone: { neutral: "", danger: "" },
      size: sizes,
      // 图标形 = 边长等于外高的正方形，内容居中；不用留白去凑，放图标或放字都是同一个大小。
      shape: { label: "", icon: "shrink-0 p-0" },
    },
    compoundVariants: [
      // 基础层 §5、§7、§10：填充表达强调，危险表达后果；无理由不补边框。
      { variant: "solid", tone: "neutral", class: "[--qy-focus-ring-color:var(--qy-focus-ring-on-solid)] bg-primary text-primary-foreground not-aria-disabled:hover:bg-primary-hover not-aria-disabled:active:bg-primary-hover" },
      { variant: "solid", tone: "danger", class: "[--qy-focus-ring-color:var(--qy-danger-on-fill)] bg-destructive-fill text-destructive-on-fill not-aria-disabled:hover:bg-destructive-fill-hover not-aria-disabled:active:bg-destructive-fill-hover" },
      // 白底黑字，淡墨边框。底色与承载面一致，所以由线承担边界（用户规则）；线比输入框低一级，
      // 因为按钮是命令不是可编辑的字段（2026-10-09，用户授权主 agent 定夺）。危险档同一浓度。
      { variant: "bordered", tone: "neutral", class: "border-(--qy-button-bordered-border) bg-card text-foreground focus-visible:border-(--qy-button-bordered-border-focus) not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-accent" },
      { variant: "bordered", tone: "danger", class: "[--qy-button-bordered-border:color-mix(in_srgb,var(--color-destructive-foreground)_var(--qy-ink-dan),transparent)] [--qy-button-bordered-border-focus:var(--color-destructive-foreground)] border-(--qy-button-bordered-border) bg-card text-destructive-foreground focus-visible:border-(--qy-button-bordered-border-focus) not-aria-disabled:hover:bg-danger-soft not-aria-disabled:active:bg-danger-soft" },
      { variant: "quiet", tone: "neutral", class: "text-foreground not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-accent" },
      { variant: "quiet", tone: "danger", class: "text-destructive-foreground not-aria-disabled:hover:bg-danger-soft not-aria-disabled:active:bg-danger-soft" },
      // 有边框的档扣掉 1px 边框，文字起点与无边框档对齐。
      { shape: "label", variant: ["solid", "quiet"], size: "xs", class: "px-(--qy-control-xs-padding)" },
      { shape: "label", variant: ["solid", "quiet"], size: "sm", class: "px-(--qy-control-sm-padding)" },
      // --qy-fill-padding 是带框留白；无框档加回 1px，使文字起点与带框档对齐（与其余各档同一规则）。
      { shape: "label", variant: ["solid", "quiet"], size: "md", class: "px-[calc(var(--qy-fill-padding)+1px)]" },
      { shape: "label", variant: ["solid", "quiet"], size: "lg", class: "px-(--qy-control-lg-padding)" },
      { shape: "label", variant: ["solid", "quiet"], size: "xl", class: "px-(--qy-control-xl-padding)" },
      { shape: "label", variant: "bordered", size: "xs", class: "px-(--qy-control-xs-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "sm", class: "px-(--qy-control-sm-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "md", class: "px-(--qy-fill-padding)" },
      { shape: "label", variant: "bordered", size: "lg", class: "px-(--qy-control-lg-padding-bordered)" },
      { shape: "label", variant: "bordered", size: "xl", class: "px-(--qy-control-xl-padding-bordered)" },
      { shape: "icon", size: "xs", class: "w-(--qy-control-xs-narrow) sm:w-(--qy-control-xs)" },
      { shape: "icon", size: "sm", class: "w-(--qy-control-sm-narrow) sm:w-(--qy-control-sm)" },
      { shape: "icon", size: "md", class: "w-(--qy-fill-height-narrow) sm:w-(--qy-fill-height)" },
      { shape: "icon", size: "lg", class: "w-(--qy-control-lg-narrow) sm:w-(--qy-control-lg)" },
      { shape: "icon", size: "xl", class: "w-(--qy-control-xl-narrow) sm:w-(--qy-control-xl)" },
    ],
    defaultVariants: { variant: "solid", tone: "neutral", size: "md", shape: "label" },
  },
);

export interface ButtonProps extends Omit<ButtonPrimitive.Props, "className" | "focusableWhenDisabled"> {
  className?: string;
  "data-slot"?: string;
  variant?: NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
  tone?: NonNullable<VariantProps<typeof buttonVariants>["tone"]>;
  size?: NonNullable<VariantProps<typeof buttonVariants>["size"]>;
  shape?: NonNullable<VariantProps<typeof buttonVariants>["shape"]>;
  /** 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。
   *  成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。 */
  loading?: boolean;
}

export function Button({
  variant = "solid", tone = "neutral", size = "md", shape = "label", loading = false,
  className, children, disabled = false, tabIndex, render, ref,
  onClickCapture, onAuxClickCapture, onPointerDownCapture, onMouseDownCapture,
  onKeyDownCapture, onKeyUpCapture, "aria-describedby": description,
  "aria-disabled": disabledFact, "aria-busy": busyFact, "data-slot": slot = "button", ...props
}: ButtonProps): React.ReactElement {
  const { messages } = useUILocale();
  const statusId = React.useId();
  const busy = loading || busyFact === true || busyFact === "true";
  const blocked = disabled || disabledFact === true || disabledFact === "true" || busy;
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
  return (
    <>
      {/* 按钮只承载动作，忙碌是它唯一的状态（用户裁决 2026-10-10：功能要纯粹）。
       *  忙碌时名称留在原位，后面多一个转动的记号；图标形态没有放第二个图形的地方，记号暂时替下自己的图形。
       *  焦点留在按钮上，重复触发被挡住（aria-disabled，不是原生 disabled）。 */}
      <ButtonPrimitive
        {...props}
        aria-busy={busy || busyFact}
        aria-describedby={[description, loading ? statusId : undefined].filter(Boolean).join(" ") || undefined}
        aria-disabled={blocked || disabledFact}
        className={cn(buttonVariants({ variant, tone, size, shape }), className)}
        data-loading={loading ? "" : undefined}
        data-shape={shape}
        data-size={size}
        data-slot={slot}
        data-tone={tone}
        data-variant={variant}
        disabled={disabled}
        ref={ref}
        render={protectedRender}
        tabIndex={disabled ? (props.nativeButton === false ? -1 : undefined) : tabIndex ?? 0}
        onAuxClickCapture={(event) => { if (!preventActivation(event)) onAuxClickCapture?.(event); }}
        onClickCapture={(event) => { if (!preventActivation(event)) onClickCapture?.(event); }}
        onKeyDownCapture={(event) => { if (!activationKey(event) || !preventActivation(event)) onKeyDownCapture?.(event); }}
        onKeyUpCapture={(event) => { if (!activationKey(event) || !preventActivation(event)) onKeyUpCapture?.(event); }}
        onMouseDownCapture={(event) => { if (event.button !== 0 || !preventActivation(event)) onMouseDownCapture?.(event); }}
        onPointerDownCapture={(event) => { if (event.button !== 0 || !preventActivation(event)) onPointerDownCapture?.(event); }}
      >
        <span className={cn("inline-flex min-w-0 items-center justify-center gap-(--qy-control-content-gap) whitespace-normal", shape === "icon" && loading && "opacity-0")} data-slot="button-content">
          {children}
        </span>
        {loading && (
          <span aria-hidden="true" className={cn("inline-flex shrink-0 items-center", shape === "icon" && "pointer-events-none absolute")} data-slot="button-loading">
            <IconLoader2 className="qy-spin size-[1em]" />
          </span>
        )}
      </ButtonPrimitive>
      {/* 忙碌对读屏的说法：不可见、不占位（绝对定位，不进入调用方的 flex 间距），由 aria-describedby 关联到按钮。 */}
      {loading && <span aria-atomic="true" aria-live="polite" className="sr-only" data-slot="button-loading-status" id={statusId} role="status">{messages.buttonInProgress}</span>}
    </>
  );
}

export { ButtonPrimitive };
