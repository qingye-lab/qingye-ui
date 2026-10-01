const e=`import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@qingye/ui/components/preview-card";

export const meta = { title: "成员名片", description: "在正文中提到成员时，悬停查看对方的角色与近况。" };

export default function Demo() {
  return (
    <p className="max-w-sm text-pretty text-muted-foreground text-sm">
      温控器批量离线的问题已转交给
      <PreviewCard>
        <PreviewCardTrigger
          className="mx-1 font-medium text-foreground underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground"
          href="#zhou-yining"
        >
          @周以宁
        </PreviewCardTrigger>
        <PreviewCardPopup className="w-64">
          <div className="grid w-full gap-3">
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarFallback>周</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <p className="font-medium">周以宁</p>
                <p className="text-muted-foreground text-xs">运维工程师 · 华东仓储</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-3 border-t pt-3 text-xs">
              <div className="grid gap-0.5">
                <dt className="text-muted-foreground">本周工单</dt>
                <dd className="numeric font-medium text-sm">23</dd>
              </div>
              <div className="grid gap-0.5">
                <dt className="text-muted-foreground">平均响应</dt>
                <dd className="numeric font-medium text-sm">12 分钟</dd>
              </div>
            </dl>
          </div>
        </PreviewCardPopup>
      </PreviewCard>
      处理，预计今天 18:00 前恢复。
    </p>
  );
}
`;export{e as default};
