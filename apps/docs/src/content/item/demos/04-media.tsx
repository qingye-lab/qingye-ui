import { Button, Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemHeader, ItemMedia, ItemTitle } from "@yanqing/ui";
import { MapPinIcon } from "lucide-react";

export const meta = {
  title: "缩略图、页眉与页脚",
  description: "image 媒体裁切缩略图；ItemHeader / ItemFooter 占满整行。",
};

const thumb = (hue: number) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="oklch(0.86 0.06 ${hue})"/><stop offset="1" stop-color="oklch(0.66 0.1 ${hue + 30})"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/></svg>`,
  )}`;

export default function Demo() {
  return (
    <div className="grid w-full items-start gap-4 sm:grid-cols-2">
      <Item variant="outline">
        <ItemMedia variant="image">
          <img alt="" src={thumb(40)} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>生椰拿铁</ItemTitle>
          <ItemDescription>本月销量 4,218 杯</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemHeader>
          <img alt="" className="aspect-[16/7] w-full rounded-lg object-cover" src={thumb(200)} />
        </ItemHeader>
        <ItemContent>
          <ItemTitle>静安南京西路店</ItemTitle>
          <ItemDescription>计划 10 月 18 日开业，设备已到店 6 / 8 台。</ItemDescription>
        </ItemContent>
        <ItemFooter>
          <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
            <MapPinIcon aria-hidden="true" className="size-3.5" />
            南京西路 1266 号
          </span>
          <ItemActions>
            <Button size="xs" variant="outline">
              查看进度
            </Button>
          </ItemActions>
        </ItemFooter>
      </Item>
    </div>
  );
}
