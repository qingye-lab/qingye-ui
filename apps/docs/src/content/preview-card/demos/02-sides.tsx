import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@yanqing/ui/components/preview-card";

export const meta = { title: "方向", description: "默认在下方，side 可改为上、左、右；空间不足时自动翻转。" };

const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm">
      {sides.map(({ side, label }) => (
        <PreviewCard key={side}>
          <PreviewCardTrigger
            className="font-medium underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground"
            href={`#preview-${side}`}
          >
            {label}
          </PreviewCardTrigger>
          <PreviewCardPopup className="grid w-56 gap-1" side={side}>
            <p className="font-medium">工单 #2318</p>
            <p className="text-muted-foreground text-xs">3 号仓库温控器离线 · 处理中</p>
          </PreviewCardPopup>
        </PreviewCard>
      ))}
    </div>
  );
}
