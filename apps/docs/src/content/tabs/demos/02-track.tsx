import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "轨道外观", titleEn: "Track appearance" } satisfies DemoMeta;
export default function Demo() {
  return <Tabs appearance="track" defaultValue="day"><TabsList aria-label="统计周期"><TabsTab value="day">日</TabsTab><TabsTab value="week">周</TabsTab><TabsTab value="month">月</TabsTab></TabsList><TabsPanel value="day">今日 12 条</TabsPanel><TabsPanel value="week">本周 84 条</TabsPanel><TabsPanel value="month">本月 361 条</TabsPanel></Tabs>;
}
