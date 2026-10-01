import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@yanqing/ui";
import { LayoutGridIcon, ListIcon } from "lucide-react";

export const meta = { title: "尺寸", description: "size 统一作用于组内所有项。" };

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <ToggleGroup defaultValue={["grid"]} key={size} size={size} variant="outline">
          <ToggleGroupItem aria-label="网格视图" value="grid">
            <LayoutGridIcon />
          </ToggleGroupItem>
          <ToggleGroupSeparator />
          <ToggleGroupItem aria-label="列表视图" value="list">
            <ListIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
