import { Button, Tooltip, TooltipPopup, TooltipTrigger } from "@yanqing/ui";

export const meta = { title: "方向", description: "默认在上方；side 指定其他方向，空间不足时自动翻转。" };

const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" />}>{label}</TooltipTrigger>
          <TooltipPopup side={side}>显示在{label}</TooltipPopup>
        </Tooltip>
      ))}
    </div>
  );
}
