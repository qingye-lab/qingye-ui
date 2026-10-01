import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";
import { TogglePrimitive } from "@qingye/ui/components/toggle";
import { ToggleGroupPrimitive } from "@qingye/ui/components/toggle-group";
import { CalendarIcon, KanbanIcon, ListIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "切换视图",
  description: "基于 ToggleGroup：方向键只移动焦点，按 Space 才切换，适合视图与筛选。",
};

const item = segmentedControlItemVariants({ state: "pressed" });
const iconItem = segmentedControlItemVariants({ className: "px-0 aspect-square", state: "pressed" });

export default function Demo() {
  const [view, setView] = useState(["board"]);
  return (
    <div className="flex flex-col items-center gap-4">
      <ToggleGroupPrimitive
        aria-label="任务视图"
        className={segmentedControlRootClassName}
        onValueChange={(next) => next.length && setView(next)}
        value={view}
      >
        <TogglePrimitive className={item} value="list">
          <ListIcon />
          列表
        </TogglePrimitive>
        <TogglePrimitive className={item} value="board">
          <KanbanIcon />
          看板
        </TogglePrimitive>
        <TogglePrimitive className={item} value="calendar">
          <CalendarIcon />
          日历
        </TogglePrimitive>
      </ToggleGroupPrimitive>
      <ToggleGroupPrimitive
        aria-label="任务视图"
        className={segmentedControlRootClassName}
        onValueChange={(next) => next.length && setView(next)}
        value={view}
      >
        <TogglePrimitive aria-label="列表" className={iconItem} value="list">
          <ListIcon />
        </TogglePrimitive>
        <TogglePrimitive aria-label="看板" className={iconItem} value="board">
          <KanbanIcon />
        </TogglePrimitive>
        <TogglePrimitive aria-label="日历" className={iconItem} value="calendar">
          <CalendarIcon />
        </TogglePrimitive>
      </ToggleGroupPrimitive>
    </div>
  );
}
