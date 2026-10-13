import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";

export default function Cover() {
  return <Tabs defaultValue="text" className="w-full">
    <TabsList aria-label="条目视角"><TabsTab value="text">名称</TabsTab><TabsTab value="facts">事实</TabsTab></TabsList>
    <TabsPanel value="text"><p className="m-0 text-body">同步与导出</p></TabsPanel>
    <TabsPanel value="facts"><p className="m-0 text-body">exports</p></TabsPanel>
  </Tabs>;
}
