import { MotionProvider } from "@qingye/ui/components/motion-provider";
import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "组合控件遵循策略",
  description: "Button 已带 qy-pressable 与 data-slot。自定义内容复用控件后，按压与键盘策略继续由共享实现处理。",
};

const colors = [
  { name: "青", value: "bg-teal-500" },
  { name: "靛", value: "bg-indigo-500" },
  { name: "琥珀", value: "bg-amber-500" },
];

export default function Demo() {
  return (
    <MotionProvider>
      <div aria-label="标签颜色" className="flex gap-3" role="group">
        {colors.map((color) => (
          <Button
            key={color.name}
            variant="outline"
          >
            <span aria-hidden="true" className={`size-3 rounded-full ${color.value}`} />
            {color.name}
          </Button>
        ))}
      </div>
    </MotionProvider>
  );
}
