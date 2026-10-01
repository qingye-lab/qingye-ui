const e=`import { Button } from "@qingye/ui/components/button";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { PlusIcon } from "lucide-react";

export const meta = {
  title: "按容器换行",
  description: "放在窄容器（如侧栏布局的内容区）中时，操作按自身宽度换行，与视口无关。",
};

export default function Demo() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-dashed p-4">
      <PageHeader>
        <PageHeaderContent>
          <PageHeaderTitle>优惠券</PageHeaderTitle>
          <PageHeaderDescription>进行中 12 个，本月已核销 3,286 张。</PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderActions>
          <Button size="sm">
            <PlusIcon aria-hidden="true" />
            新建优惠券
          </Button>
        </PageHeaderActions>
      </PageHeader>
    </div>
  );
}
`;export{e as default};
