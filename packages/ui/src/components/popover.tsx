"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type React from "react";
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
// 组合成 Button 等已有边界的控件时（`render={<Button />}`），由那个控件负责焦点，
// 这里只提供命中区，避免两条环叠加。
const controlFocus =
  "touch-target outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color) rounded-control border border-transparent";

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
      data-slot="popover-trigger"
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
  sideOffset,
  alignOffset,
  anchor,
  portalProps,
  positionerProps,
  viewportProps,
  ...props
}: PopoverPopupProps): React.ReactElement {
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
        className={(state) =>
          cn(
            "z-50 h-(--positioner-height) w-(--positioner-width) max-h-(--available-height) max-w-(--available-width)",
            typeof positionerProps?.className === "function"
              ? positionerProps.className(state)
              : positionerProps?.className,
          )
        }
        data-slot="popover-positioner"
      >
        <PopoverPrimitive.Popup
          {...props}
          className={(state) =>
            cn(
              "relative min-w-0 h-(--popup-height,auto) w-(--popup-width,auto) max-w-(--available-width) origin-(--transform-origin) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none focus-visible:border-ring",
              typeof className === "function" ? className(state) : className,
            )
          }
          data-slot="popover-popup"
        >
          <PopoverPrimitive.Viewport
            {...viewportProps}
            className={(state) =>
              cn(
                "relative min-w-0 max-h-[max(0px,calc(var(--available-height)-2px))] overflow-y-auto p-(--qy-panel-padding-sm)",
                typeof viewportProps?.className === "function"
                  ? viewportProps.className(state)
                  : viewportProps?.className,
              )
            }
            data-slot="popover-viewport"
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
      data-slot="popover-close"
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
        cn("text-heading", typeof className === "function" ? className(state) : className)
      }
      data-slot="popover-title"
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
        cn("text-body text-muted-foreground", typeof className === "function" ? className(state) : className)
      }
      data-slot="popover-description"
    />
  );
}

export { PopoverPrimitive, PopoverPopup as PopoverContent };
