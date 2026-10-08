import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "父级与当前页", titleEn: "Ancestors and current page" } satisfies DemoMeta;
export default function Demo() {
  return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">首页</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbLink href="/components">组件</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem><BreadcrumbItem><BreadcrumbCurrent>路径</BreadcrumbCurrent></BreadcrumbItem></BreadcrumbList></Breadcrumb>;
}
