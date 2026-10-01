const e=`import { Slider } from "@qingye/ui/components/slider";

export const meta = { title: "竖向与禁用", description: "竖向滑块需要父元素有确定高度；禁用时整体降低不透明度。" };

const bands = [
  { label: "60Hz", value: 62 },
  { label: "230Hz", value: 48 },
  { label: "910Hz", value: 55 },
  { label: "3.6kHz", value: 70 },
  { label: "14kHz", value: 40 },
];

export default function Demo() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      <div className="flex h-40 gap-5">
        {bands.map((band) => (
          <div key={band.label} className="flex flex-col items-center gap-2">
            <Slider orientation="vertical" defaultValue={band.value} getAriaLabel={() => \`\${band.label} 增益\`} />
            <span className="text-muted-foreground text-xs numeric">{band.label}</span>
          </div>
        ))}
      </div>
      <div className="w-48">
        <Slider aria-label="扬声器音量" defaultValue={30} disabled />
        <p className="mt-2 text-muted-foreground text-xs">设备离线，无法调节</p>
      </div>
    </div>
  );
}
`;export{e as default};
