import { Badge } from "@qingye/ui/components/badge";
import { Button, buttonVariants } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderMeta, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { ArrowLeftIcon } from "lucide-react";

export const meta = {
  title: "返回列表链接",
  description: "有明确目的地时使用真正链接和 buttonVariants；PageHeaderBack 用于应用管理的返回命令。",
};

export default function Demo() {
  return (
    <PageHeader className="w-full border-b pb-6">
      <a aria-label="返回订单列表" className={buttonVariants({ size: "icon-sm", variant: "outline" })} href="#orders">
        <ArrowLeftIcon aria-hidden="true" />
      </a>
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
