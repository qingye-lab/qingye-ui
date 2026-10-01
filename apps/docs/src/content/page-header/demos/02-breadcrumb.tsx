import { Badge } from "@qingye/ui/components/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@qingye/ui/components/breadcrumb";
import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderMeta, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { StatusDot } from "@qingye/ui/components/status-dot";
import { CalendarIcon, MoreHorizontalIcon, RotateCwIcon } from "lucide-react";

export const meta = { title: "面包屑与元信息", description: "Breadcrumb 直接放入即占满一行；元信息放状态、标签与时间。" };

export default function Demo() {
  return (
    <PageHeader className="w-full">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#stores">门店</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#xh-001">徐汇漕溪北路店</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>前台收银机</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeaderContent>
        <PageHeaderTitle>前台收银机</PageHeaderTitle>
        <PageHeaderDescription>SUNMI T2s · 序列号 T2S-8F3A-21C7-0049</PageHeaderDescription>
        <PageHeaderMeta>
          <StatusDot pulse status="online">
            在线
          </StatusDot>
          <Badge variant="outline">固件 4.2.1</Badge>
          <span className="inline-flex items-center gap-1.5">
            <CalendarIcon aria-hidden="true" />
            2023-04-18 接入
          </span>
        </PageHeaderMeta>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="outline">
          <RotateCwIcon aria-hidden="true" />
          重启
        </Button>
        <Button aria-label="更多操作" size="icon" variant="outline">
          <MoreHorizontalIcon aria-hidden="true" />
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}
