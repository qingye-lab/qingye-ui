import { ToggleGroup, ToggleGroupItem } from "@yanqing/ui/components/toggle-group";
import { Toolbar, ToolbarButton } from "@yanqing/ui/components/toolbar";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@yanqing/ui/components/tooltip";
import { HandIcon, MousePointer2Icon, SquareIcon, TypeIcon } from "lucide-react";

export const meta = {
  title: "纵向",
  description: "画布工具条：orientation=\"vertical\" 后方向键改为上下，提示从右侧出现。",
};

const tools = [
  { value: "select", label: "选择", icon: MousePointer2Icon },
  { value: "hand", label: "抓手", icon: HandIcon },
  { value: "rect", label: "矩形", icon: SquareIcon },
  { value: "text", label: "文本", icon: TypeIcon },
];

export default function Demo() {
  return (
    <Toolbar aria-label="画布工具" orientation="vertical">
      <ToggleGroup aria-label="当前工具" className="flex-col" defaultValue={["select"]} orientation="vertical">
        {tools.map((tool) => (
          <Tooltip key={tool.value}>
            <TooltipTrigger
              render={
                <ToolbarButton aria-label={tool.label} render={<ToggleGroupItem value={tool.value} />}>
                  <tool.icon />
                </ToolbarButton>
              }
            />
            <TooltipPopup side="right" sideOffset={8}>
              {tool.label}
            </TooltipPopup>
          </Tooltip>
        ))}
      </ToggleGroup>
    </Toolbar>
  );
}
