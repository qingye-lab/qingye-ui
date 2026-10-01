const e=`import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = {
  title: "阈值颜色",
  description: "根据数值计算指示条颜色：60% 以下正常，85% 以下偏高，其余告警；状态同时写成文字。",
};

const resources = [
  { label: "CPU", value: 42 },
  { label: "内存", value: 78 },
  { label: "磁盘", value: 93 },
];

function level(value: number) {
  if (value < 60) return { status: "正常", indicator: "bg-success", text: "text-muted-foreground" };
  if (value < 85) return { status: "偏高", indicator: "bg-warning", text: "text-warning-foreground" };
  return { status: "接近上限", indicator: "bg-destructive", text: "text-destructive-foreground" };
}

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {resources.map((resource) => {
        const { status, indicator, text } = level(resource.value);
        return (
          <Meter key={resource.label} value={resource.value}>
            <div className="flex items-center justify-between gap-2">
              <MeterLabel>{resource.label}</MeterLabel>
              <span className="flex items-center gap-2 text-sm">
                <span className={text}>{status}</span>
                <MeterValue />
              </span>
            </div>
            <MeterTrack>
              <MeterIndicator className={indicator} />
            </MeterTrack>
          </Meter>
        );
      })}
    </div>
  );
}
`;export{e as default};
