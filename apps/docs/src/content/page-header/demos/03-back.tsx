import { Badge } from "@yanqing/ui/components/badge";
import { Button } from "@yanqing/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderBack, PageHeaderContent, PageHeaderDescription, PageHeaderMeta, PageHeaderTitle } from "@yanqing/ui/components/page-header";

export const meta = {
  title: "返回按钮",
  description: "PageHeaderBack 放在标题左侧；渲染为链接时设置 nativeButton={false}。",
};

export default function Demo() {
  return (
    <PageHeader className="w-full border-b pb-6">
      <PageHeaderBack nativeButton={false} render={<a href="#orders" />} />
      <PageHeaderContent>
        <PageHeaderTitle>订单 SO-20260930-004817</PageHeaderTitle>
        <PageHeaderDescription>2026-09-30 14:26 下单 · 小程序 · 自提</PageHeaderDescription>
        <PageHeaderMeta>
          <Badge variant="success">已支付</Badge>
          <Badge variant="warning">待出餐</Badge>
        </PageHeaderMeta>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="destructive-outline">退款</Button>
        <Button>标记出餐</Button>
      </PageHeaderActions>
    </PageHeader>
  );
}
