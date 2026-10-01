const t=`import { Card } from "@qingye/ui/components/card";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye/ui/components/stat";

export const meta = {
  title: "指标网格",
  description: "一张卡片内用发丝线分隔多个指标：窄屏两列，宽屏四列。",
};

const stats = [
  { label: "在线设备", value: "1,284", unit: "台", delta: "+8.2%", trend: "up", period: "较上周" },
  { label: "今日订单", value: "3,962", unit: "单", delta: "+12.4%", trend: "up", period: "较昨日" },
  { label: "客单价", value: "32.4", unit: "元", delta: "−1.6%", trend: "down", period: "较昨日" },
  { label: "未处理告警", value: "17", unit: "条", delta: "−5", trend: "down", period: "较昨日", inverse: true },
] as const;

export default function Demo() {
  return (
    <Card className="w-full overflow-hidden">
      <dl className="m-0 grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {stats.map((stat) => (
          <Stat className="bg-card p-4 sm:p-5" key={stat.label}>
            <StatLabel render={<dt />}>{stat.label}</StatLabel>
            <StatValue render={<dd className="m-0" />}>
              {stat.value}
              <StatUnit>{stat.unit}</StatUnit>
            </StatValue>
            <StatDescription render={<dd className="m-0" />}>
              <StatDelta inverse={"inverse" in stat} trend={stat.trend}>
                {stat.delta}
              </StatDelta>
              {stat.period}
            </StatDescription>
          </Stat>
        ))}
      </dl>
    </Card>
  );
}
`;export{t as default};
