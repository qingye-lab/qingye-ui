import { Tabs, TabsList, TabsPanel, TabsTab } from "@yanqing/ui/components/tabs";

export const meta = {
  title: "下划线",
  description: "页面级分区用 underline，配合一条贯穿的底边。",
};

export default function Demo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="activity">
      <div className="border-b">
        <TabsList variant="underline">
          <TabsTab value="activity">动态</TabsTab>
          <TabsTab value="deployments">部署</TabsTab>
          <TabsTab value="logs">日志</TabsTab>
          <TabsTab value="analytics">分析</TabsTab>
        </TabsList>
      </div>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="activity">
        周舟 10 分钟前合并了「修复移动端导航遮挡」。
      </TabsPanel>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="deployments">
        生产环境最近一次部署于今天 14:32，耗时 48 秒。
      </TabsPanel>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="logs">
        过去 24 小时没有错误日志。
      </TabsPanel>
      <TabsPanel className="py-3 text-muted-foreground text-sm" value="analytics">
        本周访问 12,480 次，较上周增长 8%。
      </TabsPanel>
    </Tabs>
  );
}
