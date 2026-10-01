import { Button } from "@yanqing/ui/components/button";
import { Group, GroupSeparator } from "@yanqing/ui/components/group";

export const meta = { title: "尺寸与禁用", description: "组内控件统一尺寸；单个按钮可禁用。" };

const sizes = ["sm", "default", "lg"] as const;

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <Group aria-label="缩放" key={size}>
          <Button size={size} variant="outline">
            缩小
          </Button>
          <GroupSeparator />
          <Button className="numeric" disabled size={size} variant="outline">
            100%
          </Button>
          <GroupSeparator />
          <Button size={size} variant="outline">
            放大
          </Button>
        </Group>
      ))}
    </div>
  );
}
