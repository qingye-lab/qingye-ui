import { MotionProvider } from "@yanqing/ui/components/motion-provider";

export const meta = {
  title: "让自定义元素遵循策略",
  description: "加上 qy-pressable 获得按压反馈；加上 data-slot 后，键盘操作时它的过渡也会立即完成。",
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
          <button
            className="qy-pressable flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            data-slot="color-chip"
            key={color.name}
            type="button"
          >
            <span aria-hidden="true" className={`size-3 rounded-full ${color.value}`} />
            {color.name}
          </button>
        ))}
      </div>
    </MotionProvider>
  );
}
