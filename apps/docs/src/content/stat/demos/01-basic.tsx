import { Card, CardPanel } from "@yanqing/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@yanqing/ui/components/stat";

export const meta = { title: "基础", description: "放进 Card，数值使用等宽数字，变化量注明对比周期。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-xs" size="sm">
      <CardPanel>
        <Stat>
          <StatLabel>在线设备</StatLabel>
          <StatValue>
            1,284
            <StatUnit>台</StatUnit>
          </StatValue>
          <StatDescription>
            <StatDelta trend="up">+8.2%</StatDelta>
            较上周
          </StatDescription>
        </Stat>
      </CardPanel>
    </Card>
  );
}
