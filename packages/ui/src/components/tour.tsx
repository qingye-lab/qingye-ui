"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { FloatingLayerScope, useFloatingLayer } from "../floating-layer";
import { useUILocale } from "../locale";
import { readSystemUnits } from "../system-units";
import { cn } from "../utils";
import { Button } from "./button";
import { Popover, PopoverDescription, PopoverPopup, PopoverTitle, type PopoverPopupProps } from "./popover";

declare const process: { env: { NODE_ENV?: string } };

/** 步骤的锚点：元素、ref，或在步骤轮到时才求值的函数（锚点晚于 Tour 挂载时用）。 */
export type TourTarget = HTMLElement | React.RefObject<HTMLElement | null> | (() => HTMLElement | null);

export interface TourStep {
  /** 引导所指的元素；找不到时这一步被跳过，开发环境给出警告。 */
  target: TourTarget;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** 浮层相对锚点的方向，默认 bottom；位置不够时由定位器翻转。 */
  side?: PopoverPopupProps["side"];
  align?: PopoverPopupProps["align"];
}

/** 引导结束的原因：完成最后一步、主动跳过、Esc、或没有任何一步的锚点可用。 */
export type TourCloseReason = "finish" | "skip" | "escape" | "unavailable";

export interface TourOpenChangeDetails {
  reason: TourCloseReason;
}

export interface TourProps {
  /** 按顺序的引导步骤。步数与顺序在打开期间视为固定；锚点只在打开与换步时解析。 */
  steps: readonly TourStep[];
  /** 受控 / 非受控打开状态。 */
  open?: boolean;
  defaultOpen?: boolean;
  /** 引导请求关闭时调用；应用决定受控状态。打开由应用负责，Tour 自己不会请求打开。 */
  onOpenChange?: (open: boolean, details: TourOpenChangeDetails) => void;
  /** 当前步骤在 `steps` 中的下标（受控 / 非受控）。 */
  step?: number;
  defaultStep?: number;
  /** 换步时调用，参数是新步骤在 `steps` 中的下标（被跳过的步骤不会出现）。 */
  onStepChange?: (step: number) => void;
  /** 在最后一步点「完成」。随后 onOpenChange(false, { reason: "finish" })。 */
  onFinish?: () => void;
  /** 点「跳过」，参数是跳过时所在步骤的下标。随后 onOpenChange(false, { reason: "skip" })。 */
  onSkip?: (step: number) => void;
  /** 在锚点处挖洞的聚光遮罩；遮罩不拦截指针，引导始终是非阻断的。默认不显示。 */
  spotlight?: boolean;
  className?: string;
}

type Resolved = { index: number; element: HTMLElement; step: TourStep };

function resolveTarget(target: TourTarget): HTMLElement | null {
  if (typeof target === "function") return target() ?? null;
  if ("current" in target) return target.current ?? null;
  return target.isConnected ? target : null;
}

const sameResolved = (a: readonly Resolved[], b: readonly Resolved[]) =>
  a.length === b.length && a.every((item, i) => item.index === b[i]!.index && item.element === b[i]!.element && item.step === b[i]!.step);

function useControlled<T>(controlled: T | undefined, initial: T) {
  const [inner, setInner] = React.useState(initial);
  const isControlled = controlled !== undefined;
  return [isControlled ? controlled : inner, setInner, isControlled] as const;
}

// 方向键只在焦点不在输入控件时翻页：输入控件自己要用左右键移动光标、调整数值。
function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.getAttribute("role") === "textbox";
}

type Box = { top: number; left: number; width: number; height: number; radius: number };

/**
 * 聚光遮罩：整屏半透明，锚点处挖一个洞。洞靠一个 fixed 元素的超大外扩阴影形成（阴影只是挖洞的手段，
 * 不是装饰，不违反 NG12），所以洞的几何可以过渡、不拦截指针（pointer-events-none），
 * 也不需要把页面其余部分设为 inert —— Tour 是非阻断的。
 */
function TourSpotlight({ element }: { element: HTMLElement }) {
  const layer = useFloatingLayer("backdrop");
  const [state, setState] = React.useState<{ box: Box; instant: boolean } | null>(null);
  React.useLayoutEffect(() => {
    let frame = 0;
    // 洞比锚点外扩 1 分：与浮层离锚点的距离（--qy-popup-offset，同为 1 分）相等，
    // 于是「锚点—洞边」与「锚点—浮层」是同一个间隔；贴着锚点边缘挖洞会让锚点自身的边线被遮罩咬住。
    const { fen } = readSystemUnits(element);
    const measure = (instant: boolean) => {
      const rect = element.getBoundingClientRect();
      // 洞的圆角 = 锚点自身圆角 + 外扩量：同心圆角的规则（外半径 = 内半径 + 间距，与浮层族的 --qy-radius-overlay 同源）。
      // 方形锚点（圆角 0）得到的洞圆角恰为 1 分，不会出现尖角咬住锚点。
      const radius = Number.parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0;
      setState({
        instant,
        box: { top: rect.top - fen, left: rect.left - fen, width: rect.width + 2 * fen, height: rect.height + 2 * fen, radius: radius + fen },
      });
    };
    // 换步（或首次）测一次并允许过渡；窗口尺寸与滚动变化时洞必须贴着锚点，不能带过渡地「追」。
    measure(false);
    const follow = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => measure(true));
    };
    window.addEventListener("resize", follow);
    // 捕获阶段：滚动不冒泡，局部滚动容器里的锚点也要跟。
    window.addEventListener("scroll", follow, true);
    const observer = new ResizeObserver(follow);
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", follow);
      window.removeEventListener("scroll", follow, true);
      observer.disconnect();
    };
  }, [element]);
  if (!state || typeof document === "undefined") return null;
  const { box, instant } = state;
  return createPortal(
    <div
      aria-hidden="true"
      data-instant={instant ? "" : undefined}
      data-slot="tour-spotlight"
      // 阴影外扩 100vmax：取视口较长边的整数倍即可盖满屏，不是关系推出的值，是「足够大」的预设。
      style={{ ...layer, top: box.top, left: box.left, width: box.width, height: box.height, borderRadius: box.radius, boxShadow: "0 0 0 100vmax var(--qy-overlay)" }}
      // 减弱动效时 motion.css 对 [data-slot] 只保留颜色类过渡，洞的位移与缩放自然变为直接到位。
      className="pointer-events-none fixed transition-[top,left,width,height,border-radius] duration-(--qy-duration-base) ease-(--qy-ease-out)"
    />,
    document.body,
  );
}

export function Tour({
  steps,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  step: stepProp,
  defaultStep = 0,
  onStepChange,
  onFinish,
  onSkip,
  spotlight = false,
  className,
}: TourProps): React.ReactElement | null {
  const { messages } = useUILocale();
  const [open, setOpenState, openControlled] = useControlled(openProp, defaultOpen);
  const [step, setStepState, stepControlled] = useControlled(stepProp, defaultStep);
  const [resolved, setResolved] = React.useState<readonly Resolved[]>([]);
  const nextRef = React.useRef<HTMLButtonElement | null>(null);
  const previousFocus = React.useRef<HTMLElement | null>(null);
  const warned = React.useRef(new Set<number>());
  const lastView = React.useRef<{ current: Resolved; position: number; total: number; isLast: boolean } | undefined>(undefined);

  // 回调与步骤表放进 ref：内联数组、内联函数每次渲染都是新身份，不能进副作用依赖，否则解析与换步会循环。
  const latest = React.useRef({ steps, onOpenChange, onStepChange });
  React.useLayoutEffect(() => { latest.current = { steps, onOpenChange, onStepChange }; });

  const requestOpen = (next: boolean, reason: TourCloseReason) => {
    if (!openControlled) setOpenState(next);
    latest.current.onOpenChange?.(next, { reason });
  };
  const goTo = (index: number) => {
    if (!stepControlled) setStepState(index);
    latest.current.onStepChange?.(index);
  };

  // 打开的那一刻记下焦点所在，结束时还给它；Base UI 在没有触发器时无从得知「打开之前在哪」。
  const stepCount = steps.length;
  React.useLayoutEffect(() => {
    if (open) {
      const active = document.activeElement;
      previousFocus.current = active instanceof HTMLElement && active !== document.body ? active : null;
    } else {
      warned.current.clear();
      setResolved(current => (current.length ? [] : current));
      // 非受控的步骤在结束后回到起点，下一次打开从头引导；受控的步骤归应用管。
      if (!stepControlled) setStepState(defaultStep);
    }
    // 只在打开状态翻转时执行。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // 引导期间页面会变：锚点可能晚于打开才渲染，也可能被移除或换成新节点。节点增删后在下一帧重新解析，
  // 只看 childList（不看属性），浮层自身定位改样式不会引起重解析。
  const [revision, setRevision] = React.useState(0);
  React.useEffect(() => {
    if (!open || typeof MutationObserver === "undefined") return;
    let frame = 0;
    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setRevision(value => value + 1));
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [open]);

  // 解析所有锚点，缺失的步骤不进入可用表；当前步骤不可用时就近改道，全部不可用则结束。
  React.useLayoutEffect(() => {
    if (!open) return;
    const list: Resolved[] = [];
    latest.current.steps.forEach((item, index) => {
      const element = resolveTarget(item.target);
      if (element) list.push({ index, element, step: item });
      else if (!warned.current.has(index)) {
        warned.current.add(index);
        if (typeof process !== "undefined" && process.env.NODE_ENV !== "production")
          console.warn(`Tour: the target of step ${index + 1} was not found; the step is skipped.`);
      }
    });
    setResolved(current => (sameResolved(current, list) ? current : list));
    if (list.some(item => item.index === step)) return;
    // 先向后找，向后没有再向前：用户是朝前走的。
    const fallback = list.find(item => item.index > step) ?? [...list].reverse().find(item => item.index < step);
    if (fallback) goTo(fallback.index);
    else requestOpen(false, "unavailable");
    // goTo / requestOpen 只读 latest 与受控标记，不是副作用的输入。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step, stepCount, revision]);

  const position = resolved.findIndex(item => item.index === step);
  const current = position >= 0 ? resolved[position] : undefined;
  const total = resolved.length;
  const isLast = position === total - 1;

  // 锚点在视口外先滚进来；减弱动效时直接到位而不是平滑滚动。
  const element = current?.element;
  React.useLayoutEffect(() => {
    if (!open || !element) return;
    const rect = element.getBoundingClientRect();
    if (rect.top >= 0 && rect.left >= 0 && rect.bottom <= window.innerHeight && rect.right <= window.innerWidth) return;
    const reduce = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollIntoView({ block: "center", inline: "center", behavior: reduce ? "auto" : "smooth" });
  }, [open, element]);

  const showing = open && current !== undefined;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    if (isEditable(event.target)) return;
    // 「下一步」随排版方向：RTL 下起点在右，往后就是 ArrowLeft（与 TagInput、Tree 一致，读 computed direction）。
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const forward = (event.key === "ArrowRight") !== rtl;
    const target = resolved[position + (forward ? 1 : -1)];
    if (!target) return;
    event.preventDefault();
    goTo(target.index);
  };

  // 关闭后浮层还要播完退出过渡：内容沿用最后一次可见的那一步，而不是立刻卸载。
  const live = current ? { current, position, total, isLast } : undefined;
  if (live) lastView.current = live;
  const view = live ?? lastView.current;
  if (!view) return null;
  const { step: currentStep } = view.current;

  return (
    <FloatingLayerScope active={showing}>
      {spotlight && showing && <TourSpotlight element={view.current.element} />}
      <Popover
        open={showing}
        onOpenChange={(next, details) => {
          if (next) return;
          // 非阻断引导：点击页面其它处、焦点移走都不结束它，只有 Esc 是「我不看了」。
          if (details.reason === "escape-key") requestOpen(false, "escape");
          else details.cancel();
        }}
      >
        <PopoverPopup
          anchor={view.current.element}
          side={currentStep.side ?? "bottom"}
          align={currentStep.align ?? "center"}
          // 宽度是预设：16 材（w-80），与 Popover 文档里承载表单的面板同宽，足够容纳一句标题和两三行说明；
          // 没有从某条关系推出，调整时改这里，窄屏由 max-w-(--available-width) 兜底。
          className={cn("w-80", className)}
          data-slot="tour-popup"
          initialFocus={nextRef}
          finalFocus={() => previousFocus.current ?? true}
          onKeyDown={handleKeyDown}
        >
          <div className="grid gap-(--qy-panel-gap)" data-slot="tour-body">
            <div className="grid gap-(--qy-field-gap)">
              {/* 换步时读屏播报「第 N / M 步」；M 是实际可走的步数（缺失锚点的步骤不计）。 */}
              <p aria-live="polite" className="text-label text-muted-foreground" data-slot="tour-progress">
                {messages.tourProgress(view.position + 1, view.total)}
              </p>
              <PopoverTitle>{currentStep.title}</PopoverTitle>
              {currentStep.description != null && <PopoverDescription>{currentStep.description}</PopoverDescription>}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-(--qy-action-gap)" data-slot="tour-actions">
              {!view.isLast && (
                <Button variant="quiet" onClick={() => { onSkip?.(view.current.index); requestOpen(false, "skip"); }}>
                  {messages.tourSkip}
                </Button>
              )}
              <div className="ms-auto flex items-center gap-(--qy-action-gap)">
                {/* 第一步的「上一步」不可用但仍在原处：焦点在它上面时不会因换步而丢失。 */}
                <Button variant="bordered" aria-disabled={view.position === 0} onClick={() => { const previous = resolved[position - 1]; if (previous) goTo(previous.index); }}>
                  {messages.tourPrevious}
                </Button>
                {/* 同一个按钮在最后一步变成「完成」：焦点不丢，键盘连按 Enter 即可走完。 */}
                <Button
                  ref={nextRef}
                  onClick={() => {
                    const next = resolved[position + 1];
                    if (next) goTo(next.index);
                    else { onFinish?.(); requestOpen(false, "finish"); }
                  }}
                >
                  {view.isLast ? messages.tourFinish : messages.tourNext}
                </Button>
              </div>
            </div>
          </div>
        </PopoverPopup>
      </Popover>
    </FloatingLayerScope>
  );
}
