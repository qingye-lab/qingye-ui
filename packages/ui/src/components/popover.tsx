"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type React from "react";
import { popupOffset, useFloatingLayer } from "../floating-layer";
import { cn } from "../utils";

export const PopoverCreateHandle: typeof PopoverPrimitive.createHandle =
  PopoverPrimitive.createHandle;

export type PopoverProps<Payload = unknown> = Omit<
  PopoverPrimitive.Root.Props<Payload>,
  "modal"
>;

export function Popover<Payload = unknown>(
  props: PopoverProps<Payload>,
): React.ReactElement {
  // 浮层族决定 1、4：Popover 的身份就是非阻断；需要阻断的任务改用 Dialog。
  // 基础层 §9、§15：开关、焦点与返回由原语管理，应用仍可受控，不重复造状态机。
  return <PopoverPrimitive.Root {...props} modal={false} />;
}

// 基础层 §15：焦点不新增外围一圈，所以信号落在控件自身的盒内。
// 裸触发者没有填充也没有边框，内描边不可见；它必须建立自己的边界再承载信号。
// 已有边界的控件（`render={<Button />}`，带 data-variant）由它自己负责焦点与边框，
// 这里只留命中区：2026-10-12 实测，无条件附加时 bordered 的静止边框被 border-transparent 盖掉，
// 获得焦点时边框加深之外又多一圈 2px 内描边（两套焦点表达，NG11），solid/quiet 则多出 1px 透明边而变宽 2px。
const controlFocus =
  "touch-target not-data-[variant]:outline-none not-data-[variant]:focus-visible:ring-inset not-data-[variant]:focus-visible:ring-[length:var(--qy-focus-ring-width)] not-data-[variant]:focus-visible:ring-(--qy-focus-ring-color) not-data-[variant]:rounded-control not-data-[variant]:border not-data-[variant]:border-transparent";

export function PopoverTrigger({
  className,
  ...props
}: PopoverPrimitive.Trigger.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Trigger
      {...props}
      className={(state) =>
        cn(controlFocus, typeof className === "function" ? className(state) : className)
      }
      data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "popover-trigger"}
    />
  );
}

export interface PopoverPopupProps extends PopoverPrimitive.Popup.Props {
  portalProps?: PopoverPrimitive.Portal.Props;
  positionerProps?: PopoverPrimitive.Positioner.Props;
  viewportProps?: PopoverPrimitive.Viewport.Props;
  side?: PopoverPrimitive.Positioner.Props["side"];
  align?: PopoverPrimitive.Positioner.Props["align"];
  sideOffset?: PopoverPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: PopoverPrimitive.Positioner.Props["alignOffset"];
  anchor?: PopoverPrimitive.Positioner.Props["anchor"];
}

export function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = popupOffset,
  alignOffset,
  anchor,
  portalProps,
  positionerProps,
  viewportProps,
  ...props
}: PopoverPopupProps): React.ReactElement {
  const layer = useFloatingLayer("popup");
  // 浮层族的边界与阴影（M21，NG3；这里是全族的集中说明，其余文件只引用）：
  // 一道 border-border 线 + 一档阴影，两者表达两件事，不是 NG11 的重复划界——
  //   线划出范围（面纸色相同的浮层压在纸上，只靠色差读不出边；深色主题里阴影几乎不可见，只有线给出边缘）；
  //   阴影只表达真实的浮起（绘事后素「阴影只表达真实的浮起」）。去掉线范围不清，去掉阴影「在上面」不见，故各留一样。
  // 阴影档按浮起的高度分，档值本身是预设（semantic.css）：
  //   shadow-raised —— 贴着触发物、非阻断的临时浮层：Popover、Tooltip、HoverCard、Menu / ContextMenu、Select、Combobox、Autocomplete；
  //   shadow-overlay —— 阻断（或占据整边）的工作面，离页面更远：Dialog、AlertDialog、Drawer。
  // 基础层 §4、§6：临时浮起有自己的圆角与表面身份，不因子内容是日历而改变。
  // 基础层 §12：这里只提供定位、origin 与 slot；入退参数完全归 motion.css。
  // 基础层 §15、§18：外层不裁切焦点；滚动层内缘用面板角色留出焦点空间。
  // 内容层可用高度扣除上下各 1px 的面板边框，属于边界换算，不是新尺寸档。
  // 基础层 §18：Positioner 消费原语测得的外部尺寸，保持定位边界。
  // 否则 top/left 承载把 Popup 改为绝对定位后，父层会塌陷并反复触发碰撞翻转。
  // Portal 默认继承文档上下文；局部容器需通过 portalProps.container 保留继承关系。
  return (
    <PopoverPrimitive.Portal {...portalProps}>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        anchor={anchor}
        {...positionerProps}
        style={state => ({ ...layer, ...(typeof positionerProps?.style === "function" ? positionerProps.style(state) : positionerProps?.style) })}
        className={(state) =>
          cn(
            "h-(--positioner-height) w-(--positioner-width) max-h-(--available-height) max-w-(--available-width)",
            typeof positionerProps?.className === "function"
              ? positionerProps.className(state)
              : positionerProps?.className,
          )
        }
        data-slot={(positionerProps as { "data-slot"?: string } | undefined)?.["data-slot"] ?? "popover-positioner"}
      >
        <PopoverPrimitive.Popup
          {...props}
          className={(state) =>
            cn(
              "qy-popover-popup relative min-w-0 h-(--popup-height,auto) w-(--popup-width,auto) max-w-(--available-width) origin-(--transform-origin) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none focus-visible:border-ring",
              typeof className === "function" ? className(state) : className,
            )
          }
          data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "popover-popup"}
        >
          <PopoverPrimitive.Viewport
            {...viewportProps}
            className={(state) =>
              cn(
                "qy-popover-viewport relative min-w-0 max-h-[max(0px,calc(var(--available-height)-2*var(--qy-line-width)))] overflow-y-auto p-(--qy-panel-padding-sm)",
                typeof viewportProps?.className === "function"
                  ? viewportProps.className(state)
                  : viewportProps?.className,
              )
            }
            data-slot={(viewportProps as { "data-slot"?: string } | undefined)?.["data-slot"] ?? "popover-viewport"}
          >
            {children}
          </PopoverPrimitive.Viewport>
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export function PopoverClose({
  className,
  ...props
}: PopoverPrimitive.Close.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Close
      {...props}
      className={(state) =>
        cn(controlFocus, typeof className === "function" ? className(state) : className)
      }
      data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "popover-close"}
    />
  );
}

export function PopoverTitle({
  className,
  ...props
}: PopoverPrimitive.Title.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Title
      {...props}
      className={(state) =>
        cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)
      }
      data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "popover-title"}
    />
  );
}

export function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props): React.ReactElement {
  return (
    <PopoverPrimitive.Description
      {...props}
      className={(state) =>
        cn("min-w-0 text-body text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)
      }
      data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "popover-description"}
    />
  );
}

export { PopoverPrimitive, PopoverPopup as PopoverContent };
