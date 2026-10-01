import { Tabs, TabsList, TabsPanel, TabsTab } from "@yanqing/ui";

export const meta = { title: "默认" };

export default function Demo() {
  return (
    <Tabs className="w-full max-w-md" defaultValue="overview">
      <TabsList>
        <TabsTab value="overview">概览</TabsTab>
        <TabsTab value="members">成员</TabsTab>
        <TabsTab value="settings">设置</TabsTab>
      </TabsList>
      <TabsPanel className="rounded-lg border p-4 text-sm" value="overview">
        <p className="font-medium">青烟官网改版</p>
        <p className="mt-1 text-muted-foreground">本周完成 18 项任务，距离上线还有 6 天。</p>
      </TabsPanel>
      <TabsPanel className="rounded-lg border p-4 text-sm" value="members">
        <p className="font-medium">5 位成员</p>
        <p className="mt-1 text-muted-foreground">林晓、周舟、陈默、许诺、王一然。</p>
      </TabsPanel>
      <TabsPanel className="rounded-lg border p-4 text-sm" value="settings">
        <p className="font-medium">项目设置</p>
        <p className="mt-1 text-muted-foreground">可见范围：仅团队成员。</p>
      </TabsPanel>
    </Tabs>
  );
}
