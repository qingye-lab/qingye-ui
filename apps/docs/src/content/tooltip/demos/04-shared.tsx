import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";
import { Tooltip, TooltipCreateHandle, TooltipPopup, TooltipTrigger } from "@qingye/ui/components/tooltip";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const meta = {
  title: "工具栏共用提示",
  description: "通过 handle 让一组触发器共用一个提示，切换时提示跟随移动，而不是闪烁重建。",
};

const handle = TooltipCreateHandle<string>();

const items = [
  { value: "left", label: "左对齐", icon: AlignLeftIcon },
  { value: "center", label: "居中对齐", icon: AlignCenterIcon },
  { value: "right", label: "右对齐", icon: AlignRightIcon },
];

export default function Demo() {
  return (
    <>
      <ToggleGroup defaultValue={["left"]}>
        {items.map(({ value, label, icon: Icon }) => (
          <TooltipTrigger
            handle={handle}
            key={value}
            payload={label}
            render={<ToggleGroupItem aria-label={label} value={value} />}
          >
            <Icon />
          </TooltipTrigger>
        ))}
      </ToggleGroup>
      <Tooltip handle={handle}>{({ payload }) => <TooltipPopup>{payload}</TooltipPopup>}</Tooltip>
    </>
  );
}
