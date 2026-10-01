const e=`import { Button } from "@qingye/ui/components/button";
import { Popover, PopoverDescription, PopoverPopup, PopoverTrigger } from "@qingye/ui/components/popover";

export const meta = { title: "方向", description: "side 指定弹出方向；空间不足时自动翻转到对侧。" };

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
        <Popover key={side}>
          <PopoverTrigger render={<Button variant="outline" />}>{label}</PopoverTrigger>
          <PopoverPopup className="w-56" side={side}>
            <PopoverDescription>从{label}弹出，与触发器保持 4px 间距。</PopoverDescription>
          </PopoverPopup>
        </Popover>
      ))}
    </div>
  );
}
`;export{e as default};
