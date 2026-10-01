import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@yanqing/ui";

export const meta = { title: "尺寸与占位", description: "sm / default / lg；未选择时显示 placeholder。" };

const sizes = ["sm", "default", "lg"] as const;
const items = { "1": "每 1 分钟", "5": "每 5 分钟", "15": "每 15 分钟", "60": "每小时" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Select key={size} items={items} aria-label="采集频率">
          <SelectTrigger size={size}>
            <SelectValue placeholder="选择采集频率" />
          </SelectTrigger>
          <SelectPopup>
            {Object.entries(items).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      ))}
    </div>
  );
}
