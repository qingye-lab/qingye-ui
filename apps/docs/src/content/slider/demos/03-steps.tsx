import { Slider } from "@qingye/ui/components/slider";

export const meta = { title: "刻度", description: "step 限定可选值，下方刻度标出每一档。" };

const levels = ["关闭", "低", "中", "高", "最大"];

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Slider aria-label="新风档位" defaultValue={2} max={levels.length - 1} getAriaValueText={(_, value) => levels[value] ?? ""} />
      <div aria-hidden="true" className="mt-3 flex justify-between px-2.5 text-muted-foreground text-xs sm:px-2">
        {levels.map((level) => (
          <span key={level} className="flex w-0 flex-col items-center gap-1.5">
            <span className="h-1 w-px bg-muted-foreground/48" />
            {/* Two-character labels center on a zero-width tick, extending at most 1em per side. */}
            <span className="whitespace-nowrap" data-audit-overflow-inline="1em">{level}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
