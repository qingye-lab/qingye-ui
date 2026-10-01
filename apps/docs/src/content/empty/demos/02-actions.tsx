import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { BookOpenIcon, RocketIcon } from "lucide-react";

export const meta = { title: "带操作", description: "EmptyContent 放下一步操作：一个主要按钮，最多再配一个次要按钮。" };

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <RocketIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyTitle>还没有部署</EmptyTitle>
        <EmptyDescription>导入一个 Git 仓库，之后每次推送都会自动构建并部署。</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-2">
          <Button size="sm">导入仓库</Button>
          <Button size="sm" variant="outline">
            <BookOpenIcon aria-hidden="true" />
            查看文档
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
