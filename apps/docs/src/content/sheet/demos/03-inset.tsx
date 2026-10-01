import {
  Button,
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@yanqing/ui";

export const meta = {
  title: "内嵌样式",
  description: "variant=\"inset\" 在宽屏下与屏幕边缘留出间距并加圆角，适合轻量的详情面板。",
};

const rows = [
  ["订单号", "YQ20260930-0418"],
  ["客户", "杭州青禾餐饮有限公司"],
  ["商品", "智能温控器 × 12"],
  ["金额", "¥ 14,280.00"],
  ["下单时间", "2026-09-30 14:22"],
  ["状态", "待发货"],
];

export default function Demo() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>订单详情</SheetTrigger>
      <SheetPopup variant="inset">
        <SheetHeader>
          <SheetTitle>订单详情</SheetTitle>
          <SheetDescription>预计 10 月 2 日从杭州仓发出。</SheetDescription>
        </SheetHeader>
        <SheetPanel>
          <dl className="grid gap-3 text-sm">
            {rows.map(([label, value]) => (
              <div className="flex justify-between gap-4" key={label}>
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="numeric text-end font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>关闭</SheetClose>
          <Button>安排发货</Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
