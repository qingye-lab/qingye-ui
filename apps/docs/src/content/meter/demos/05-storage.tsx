import { Button } from "@qingye/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";

export const meta = { title: "组合：存储空间", description: "总量在上，分类在下；分类用图表色区分，并配文字标签。" };

const categories = [
  { label: "照片", value: 32.1, color: "bg-chart-1" },
  { label: "视频", value: 21.4, color: "bg-chart-2" },
  { label: "文档", value: 9.8, color: "bg-chart-3" },
  { label: "其他", value: 5.1, color: "bg-chart-4" },
];

const gb = { style: "unit", unit: "gigabyte", maximumFractionDigits: 1 } as const;

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>存储空间</CardTitle>
        <CardDescription>团队云盘 · 专业版 100 GB</CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-6">
        <Meter format={gb} max={100} value={68.4}>
          <div className="flex items-baseline justify-between gap-2">
            <MeterLabel>已使用</MeterLabel>
            <MeterValue className="font-semibold text-lg" />
          </div>
          <MeterTrack className="h-2.5 rounded-full">
            <MeterIndicator className="rounded-full" />
          </MeterTrack>
        </Meter>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          {categories.map((category) => (
            <Meter key={category.label} format={gb} max={100} value={category.value}>
              <div className="flex items-center justify-between gap-2">
                <MeterLabel className="flex items-center gap-2 font-normal text-muted-foreground">
                  <span aria-hidden="true" className={`size-2 rounded-full ${category.color}`} />
                  {category.label}
                </MeterLabel>
                <MeterValue />
              </div>
              <MeterTrack className="h-1 rounded-full">
                <MeterIndicator className={category.color} />
              </MeterTrack>
            </Meter>
          ))}
        </div>
      </CardPanel>
      <CardFooter className="justify-between gap-4">
        <span className="text-muted-foreground text-sm">剩余 31.6 GB</span>
        <Button size="sm" variant="outline">升级到 1 TB</Button>
      </CardFooter>
    </Card>
  );
}
