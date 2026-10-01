import { ToggleGroup, ToggleGroupItem } from "@yanqing/ui/components/toggle-group";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export const meta = { title: "单选", description: "默认一次只按下一项，适合对齐方式、视图模式。" };

export default function Demo() {
  return (
    <ToggleGroup defaultValue={["left"]}>
      <ToggleGroupItem aria-label="左对齐" value="left">
        <AlignLeftIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="居中" value="center">
        <AlignCenterIcon />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="右对齐" value="right">
        <AlignRightIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
