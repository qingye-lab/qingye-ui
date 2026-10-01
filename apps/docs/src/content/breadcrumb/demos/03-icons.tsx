import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@yanqing/ui/components/breadcrumb";
import { FileTextIcon, FolderIcon, HomeIcon } from "lucide-react";

export const meta = { title: "带图标", description: "图标放在文字前，尺寸 4，仅首页可只用图标。" };

export default function Demo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink aria-label="首页" href="#">
            <HomeIcon className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink className="inline-flex items-center gap-1.5" href="#">
            <FolderIcon className="size-4" />
            产品文档
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="inline-flex items-center gap-1.5">
            <FileTextIcon className="size-4" />
            接口鉴权说明
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
