import { ScrollArea } from "@yanqing/ui/components/scroll-area";
import { Tabs, TabsList, TabsTab } from "@yanqing/ui/components/tabs";

export const meta = {
  title: "窄屏溢出",
  description: "标签多时放进 ScrollArea 横向滚动，边缘渐隐提示还有内容。",
};

const channels = ["全部", "设计", "前端", "后端", "测试", "运维", "产品", "市场", "客服"];

export default function Demo() {
  return (
    <Tabs className="w-full max-w-sm" defaultValue="全部">
      <ScrollArea scrollFade>
        <div className="w-max min-w-full border-b">
          <TabsList variant="underline">
            {channels.map((name) => (
              <TabsTab key={name} value={name}>
                {name}
              </TabsTab>
            ))}
          </TabsList>
        </div>
      </ScrollArea>
    </Tabs>
  );
}
