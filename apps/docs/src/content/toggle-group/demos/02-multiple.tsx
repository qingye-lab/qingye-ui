import { ToggleGroup, ToggleGroupItem } from "@yanqing/ui";
import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react";

export const meta = { title: "多选", description: "multiple 允许叠加，例如同时加粗与斜体。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["bold", "italic"]} multiple>
      <ToggleGroupItem aria-label="加粗" value="bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="斜体" value="italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="下划线" value="underline">
        <UnderlineIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="删除线" value="strike">
        <StrikethroughIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
