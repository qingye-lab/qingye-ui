import { Badge, Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@yanqing/ui";
import { ChevronRightIcon, FileTextIcon, StoreIcon } from "lucide-react";

export const meta = {
  title: "可点击与尺寸",
  description: "render 渲染为链接后获得悬停底色与键盘焦点环；sm 用于紧凑列表。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-3">
      <Item render={<a href="#store" />} variant="outline">
        <ItemMedia variant="icon">
          <StoreIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>
            徐汇漕溪北路店
            <Badge variant="success">营业中</Badge>
          </ItemTitle>
          <ItemDescription>今日订单 286 单 · 3 台设备在线</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRightIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>
      <Item render={<a href="#report" />} size="sm" variant="outline">
        <ItemMedia>
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>9 月经营月报.pdf</ItemTitle>
        </ItemContent>
        <ItemActions className="text-muted-foreground text-xs numeric">2.4 MB</ItemActions>
      </Item>
      <Item render={<a href="#invoice" />} size="sm">
        <ItemMedia>
          <FileTextIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>2026 年第三季度发票汇总.xlsx</ItemTitle>
        </ItemContent>
        <ItemActions className="text-muted-foreground text-xs numeric">186 KB</ItemActions>
      </Item>
    </div>
  );
}
