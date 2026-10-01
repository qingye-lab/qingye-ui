import { Card, CardPanel } from "@yanqing/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@yanqing/ui/components/stat";

export const meta = {
  title: "趋势与反向指标",
  description: "颜色表达好坏：故障率、响应时间这类以下降为好的指标设置 inverse。badge 样式增加淡色底。",
};

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>今日订单</StatLabel>
            <StatValue>3,962</StatValue>
            <StatDescription>
              <StatDelta trend="up">+12.4%</StatDelta>
              较昨日
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>退款金额</StatLabel>
            <StatValue>
              <StatUnit>¥</StatUnit>
              8,240
            </StatValue>
            <StatDescription>
              <StatDelta trend="flat">0.0%</StatDelta>
              较昨日
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>设备故障率</StatLabel>
            <StatValue>
              0.42
              <StatUnit>%</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta inverse trend="down" variant="badge">
                −0.18%
              </StatDelta>
              较上月
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
      <Card size="sm">
        <CardPanel>
          <Stat>
            <StatLabel>平均响应时间</StatLabel>
            <StatValue>
              182
              <StatUnit>ms</StatUnit>
            </StatValue>
            <StatDescription>
              <StatDelta inverse trend="up" variant="badge">
                +24 ms
              </StatDelta>
              较上周
            </StatDescription>
          </Stat>
        </CardPanel>
      </Card>
    </div>
  );
}
