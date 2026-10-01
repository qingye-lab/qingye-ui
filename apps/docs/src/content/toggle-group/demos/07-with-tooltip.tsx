import { ToggleGroup, ToggleGroupItem } from "@yanqing/ui/components/toggle-group";
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from "@yanqing/ui/components/tooltip";
import { CodeIcon, ListOrderedIcon, QuoteIcon } from "lucide-react";

export const meta = { title: "配合 Tooltip", description: "仅图标时，用 Tooltip 给鼠标用户补充说明。" };

const items = [
  { value: "quote", label: "引用", icon: QuoteIcon },
  { value: "list", label: "有序列表", icon: ListOrderedIcon },
  { value: "code", label: "代码块", icon: CodeIcon },
];

export default function Demo() {
  return (
    <TooltipProvider>
      <ToggleGroup multiple>
        {items.map(({ value, label, icon: Icon }) => (
          <Tooltip key={value}>
            <TooltipTrigger render={<ToggleGroupItem aria-label={label} value={value} />}>
              <Icon />
            </TooltipTrigger>
            <TooltipPopup>{label}</TooltipPopup>
          </Tooltip>
        ))}
      </ToggleGroup>
    </TooltipProvider>
  );
}
