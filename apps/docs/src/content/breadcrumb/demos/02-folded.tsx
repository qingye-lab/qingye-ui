import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "折叠中间层级", titleEn: "Fold the middle levels" } satisfies DemoMeta;
const ancestors = [["/", "首页"], ["/files", "文件"], ["/files/2026", "2026"], ["/files/2026/q3", "第三季度"], ["/files/2026/q3/reports", "报表"]] as const;
export default function Demo() {
  return <Breadcrumb aria-label="面包屑：折叠的长路径"><BreadcrumbList maxItems={4}>
    {ancestors.map(([href, name]) => <BreadcrumbItem key={href}><BreadcrumbLink href={href}>{name}</BreadcrumbLink><BreadcrumbSeparator /></BreadcrumbItem>)}
    <BreadcrumbItem><BreadcrumbCurrent>销售汇总</BreadcrumbCurrent></BreadcrumbItem>
  </BreadcrumbList></Breadcrumb>;
}
