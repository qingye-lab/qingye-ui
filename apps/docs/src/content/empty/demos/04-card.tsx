import { Card, CardDescription, CardHeader, CardPanel, CardTitle } from "@qingye/ui/components/card";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@qingye/ui/components/empty";
import { BellIcon } from "lucide-react";

export const meta = { title: "在卡片中", description: "嵌在卡片里时收紧留白，标题降到 text-base。" };

export default function Demo() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <CardTitle>待办</CardTitle>
        <CardDescription>需要你审批或回复的事项</CardDescription>
      </CardHeader>
      <CardPanel>
        <Empty className="px-0 py-8 md:py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BellIcon aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle size="sm">全部处理完了</EmptyTitle>
            <EmptyDescription>新的审批和评论会出现在这里。</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </CardPanel>
    </Card>
  );
}
