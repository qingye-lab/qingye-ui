import { ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";

export const meta = { title: "双轴滚动条", titleEn: "Styled scrollbars on both axes" };
export default function Demo() {
  return <ScrollAreaRoot className="w-full max-w-sm" style={{ height: "calc(var(--qy-control-md) * 6)" }} data-testid="styled-scroll-area">
    <ScrollAreaViewport aria-label="双轴完整条目" role="region">
      <ScrollAreaContent><div style={{ minWidth: "calc(var(--qy-control-md) * 16)" }}>{Array.from({ length: 30 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1} · 这段内容保留完整宽度与原生文本选择。</div>)}</div></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar keepMounted /><ScrollAreaScrollbar orientation="horizontal" keepMounted /><ScrollAreaCorner />
  </ScrollAreaRoot>;
}
