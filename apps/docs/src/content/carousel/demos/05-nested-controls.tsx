import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@qingye/ui/components/carousel";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";

export const meta = { title: "内容内的独立控件" };

export default function Demo() {
  return (
    <Carousel aria-label="文章方案" className="w-full max-w-md">
      <CarouselContent>
        <CarouselItem>
          <Tabs className="flex min-h-44 flex-col gap-3 rounded-xl border p-4" defaultValue="summary">
            <TabsList aria-label="文章视图">
              <TabsTab value="summary">摘要</TabsTab>
              <TabsTab value="detail">正文</TabsTab>
            </TabsList>
            <TabsPanel value="summary">以标题、段落与必要链接组织阅读。</TabsPanel>
            <TabsPanel value="detail">长文的行高、段落间距与阅读宽度一起建立节奏。字号变化保留文档层级。</TabsPanel>
          </Tabs>
        </CarouselItem>
        <CarouselItem><div className="min-h-44 rounded-xl border p-4">第二篇：在数据中保留必要的比较关系。</div></CarouselItem>
      </CarouselContent>
      <div className="flex justify-end gap-2"><CarouselPrevious /><CarouselNext /></div>
    </Carousel>
  );
}
