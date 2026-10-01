import { Badge } from "@yanqing/ui/components/badge";
import { Card, CardAction, CardDescription, CardHeader, CardPanel } from "@yanqing/ui/components/card";
import { TrendingUpIcon } from "lucide-react";

export const meta = {
  title: "统计卡片",
  description: "指标数字加 numeric，并排时位数对齐；涨跌的好坏用颜色区分，方向用图标表示。",
};

const stats = [
  { label: "本月收入", value: "¥128,430", change: "12.5%", previous: "上月 ¥114,150", good: true },
  { label: "新增客户", value: "342", change: "8.1%", previous: "上月 316 位", good: true },
  { label: "退款率", value: "1.8%", change: "0.4%", previous: "上月 1.4%", good: false },
];

export default function Demo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardAction>
              <Badge variant={stat.good ? "success" : "error"} className="numeric">
                <TrendingUpIcon aria-hidden="true" />
                {stat.change}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardPanel className="flex flex-col gap-1">
            <span className="font-semibold text-2xl numeric">{stat.value}</span>
            <span className="text-muted-foreground text-xs">{stat.previous}</span>
          </CardPanel>
        </Card>
      ))}
    </div>
  );
}
