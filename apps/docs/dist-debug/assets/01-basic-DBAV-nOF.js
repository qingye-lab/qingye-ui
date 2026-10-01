const e=`import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { DownloadIcon, PlusIcon } from "lucide-react";

export const meta = { title: "基础", description: "标题、描述与操作；窄屏时操作换到下方。" };

export default function Demo() {
  return (
    <PageHeader className="w-full">
      <PageHeaderContent>
        <PageHeaderTitle>设备管理</PageHeaderTitle>
        <PageHeaderDescription>查看各门店终端的在线状态、固件版本与告警，支持批量重启和升级。</PageHeaderDescription>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button variant="outline">
          <DownloadIcon aria-hidden="true" />
          导出
        </Button>
        <Button>
          <PlusIcon aria-hidden="true" />
          添加设备
        </Button>
      </PageHeaderActions>
    </PageHeader>
  );
}
`;export{e as default};
