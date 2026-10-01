import { Badge, DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@yanqing/ui";

export const meta = { title: "水平布局", description: "名称在左侧固定列，适合详情页和抽屉。" };

export default function Demo() {
  return (
    <DescriptionList className="w-full max-w-lg">
      <DescriptionListItem>
        <DescriptionTerm>订单号</DescriptionTerm>
        <DescriptionDetails className="font-mono" copyLabel="复制订单号" copyValue="SO-20260930-004817">
          SO-20260930-004817
        </DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>订单状态</DescriptionTerm>
        <DescriptionDetails>
          <Badge variant="success">已支付</Badge>
        </DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>下单时间</DescriptionTerm>
        <DescriptionDetails className="numeric">2026-09-30 14:26:08</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>实付金额</DescriptionTerm>
        <DescriptionDetails className="numeric">¥ 1,286.00</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>收货地址</DescriptionTerm>
        <DescriptionDetails>上海市徐汇区漕溪北路 398 号汇智大厦 12 层 1203 室（工作日 9:00–18:00 可收货）</DescriptionDetails>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionTerm>备注</DescriptionTerm>
        <DescriptionDetails className="text-muted-foreground">—</DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>
  );
}
