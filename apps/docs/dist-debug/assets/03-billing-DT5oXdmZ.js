const e=`import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from "@qingye/ui/components/frame";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = { title: "组合：账单概览", description: "套餐、用量与扣款信息分成三层：面板放主要内容，底部放次要信息。" };

const usage = [
  { label: "带宽", value: 318, max: 500, unit: "GB" },
  { label: "构建时长", value: 1240, max: 3000, unit: "分钟" },
  { label: "函数调用", value: 86, max: 100, unit: "万次" },
];

export default function Demo() {
  return (
    <Frame className="w-full max-w-lg">
      <FrameHeader className="flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <FrameTitle>本期账单</FrameTitle>
          <FrameDescription>9月1日 – 9月30日</FrameDescription>
        </div>
        <Button size="sm" variant="outline">更改套餐</Button>
      </FrameHeader>
      <FramePanel className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">专业版</span>
            <Badge variant="secondary">年付</Badge>
          </div>
          <span className="font-semibold text-2xl numeric">
            ¥299<span className="font-normal text-muted-foreground text-sm"> / 月</span>
          </span>
        </div>
        <span className="text-muted-foreground text-xs">5 个席位</span>
      </FramePanel>
      <FramePanel className="flex flex-col gap-4">
        {usage.map((item) => (
          <Meter key={item.label} max={item.max} value={item.value}>
            <div className="flex items-center justify-between gap-2">
              <MeterLabel>{item.label}</MeterLabel>
              <MeterValue className="text-muted-foreground">
                {(_, value) => \`\${value.toLocaleString("zh-CN")} / \${item.max.toLocaleString("zh-CN")} \${item.unit}\`}
              </MeterValue>
            </div>
            <MeterTrack className="h-1.5 rounded-full">
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        ))}
      </FramePanel>
      <FrameFooter className="flex items-center justify-between gap-4 text-sm">
        <span className="text-muted-foreground">
          <span className="numeric">10月1日</span>扣款 · 尾号 <span className="numeric">4821</span>
        </span>
        <Button size="sm" variant="link" className="px-0">查看发票</Button>
      </FrameFooter>
    </Frame>
  );
}
`;export{e as default};
