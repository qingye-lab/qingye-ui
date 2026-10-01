const t=`import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { FolderOpenIcon } from "lucide-react";

export const meta = { title: "图标", description: "variant=\\"icon\\" 把图标放进带边框的小方块，两侧叠出倾斜的卡片。" };

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>还没有项目</EmptyTitle>
        <EmptyDescription>项目用来组织代码仓库、环境变量和成员权限。</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
`;export{t as default};
