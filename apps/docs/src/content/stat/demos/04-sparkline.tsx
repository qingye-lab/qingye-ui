import { Card, CardPanel } from "@qingye/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatSparkline, StatUnit, StatValue } from "@qingye/ui/components/stat";
import { ActivityIcon, ServerIcon } from "lucide-react";

export const meta = {
  title: "迷你趋势线",
  description: "StatSparkline 不依赖图表库；颜色取 currentColor，线宽在任意尺寸下保持 1.5px。",
};

const online = [1102, 1136, 1121, 1158, 1190, 1176, 1204, 1231, 1218, 1250, 1266, 1284];
const latency = [212, 205, 198, 204, 191, 188, 196, 179, 184, 176, 171, 182];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <Card size="sm">
        <CardPanel className="flex flex-col gap-4">
          <Stat>
            <StatLabel>
              <ServerIcon aria-hidden="true" />
              在线设备
            </StatLabel>
            <StatValue>
              1,284
              <StatUnit>台</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta trend="up">+8.2%</StatDelta>
              近 12 周
            </StatDescription>
          </Stat>
          <StatSparkline data={online} label="近 12 周在线设备从 1,102 台升至 1,284 台" />
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel className="flex flex-col gap-4">
          <Stat>
            <StatLabel>
              <ActivityIcon aria-hidden="true" />
              接口平均耗时
            </StatLabel>
            <StatValue>
              182
              <StatUnit>ms</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta inverse trend="down">−14.2%</StatDelta>
              近 12 周
            </StatDescription>
          </Stat>
          <StatSparkline className="text-chart-2" data={latency} fill={false} label="近 12 周接口平均耗时从 212ms 降至 182ms" />
        </CardPanel>
      </Card>
    </div>
  );
}
