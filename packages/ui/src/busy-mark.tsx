import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "./utils";

/*
 * 忙碌记号：转动的小圆环，Button、InputGroup、Autocomplete 共用的内部部件，不从入口导出。
 * 它只附着在控件上（用户裁决 2026-11-01：不恢复独立的 Spinner，component-layering.md 删除它的理由
 * 是「等待脱离对象」），所以这里不带布局：放在哪里、占多大由使用它的控件决定。
 * 记号尺寸 = 1em，随所在控件的文字档走（Button 与 InputGroup 的正文是同一关系）；
 * 对读屏不可见——忙碌的事实由使用者用 aria-busy 与本地化文字说出，不由图形承担。
 */
export function BusyMark({ className, "data-slot": slot = "busy-mark" }: { className?: string; "data-slot"?: string }) {
  return (
    <span aria-hidden="true" className={cn("pointer-events-none inline-flex shrink-0 items-center", className)} data-slot={slot}>
      <IconLoader2 className="qy-spin size-[1em]" />
    </span>
  );
}
