import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";
import { AlignEndHorizontalIcon, AlignStartHorizontalIcon, AlignCenterHorizontalIcon } from "lucide-react";

export const meta = { title: "纵向", description: "orientation=\"vertical\" 时用 ↑ ↓ 移动焦点。" };

export default function Demo() {
  return (
    <div className="flex items-start gap-(--qy-space-6)">
      {(["default", "outline"] as const).map((variant) => (
        <ToggleGroup
          aria-label={variant === "default" ? "内容对齐" : "画板对齐"}
          defaultValue={["top"]}
          key={variant}
          orientation="vertical"
          variant={variant}
        >
          <ToggleGroupItem aria-label="顶部对齐" value="top">
            <AlignStartHorizontalIcon />
          </ToggleGroupItem>
          {variant === "outline" && <ToggleGroupSeparator orientation="horizontal" />}
          <ToggleGroupItem aria-label="垂直居中" value="middle">
            <AlignCenterHorizontalIcon />
          </ToggleGroupItem>
          {variant === "outline" && <ToggleGroupSeparator orientation="horizontal" />}
          <ToggleGroupItem aria-label="底部对齐" value="bottom">
            <AlignEndHorizontalIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      ))}
    </div>
  );
}
