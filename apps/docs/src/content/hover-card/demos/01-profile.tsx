import { Avatar, AvatarFallback, Badge, HoverCard, HoverCardContent, HoverCardTrigger } from "@yanqing/ui";
import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

export const meta = { title: "成员资料", description: "悬停或用 Tab 聚焦 @林悦 查看资料卡。" };

export default function Demo() {
  return (
    <p className="max-w-md text-pretty text-muted-foreground text-sm leading-relaxed">
      结算页的新版交互由
      <HoverCard>
        <HoverCardTrigger
          className="mx-1 rounded-sm font-medium text-foreground underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background decoration-foreground/24 underline-offset-4 transition-colors hover:decoration-foreground/64"
          href="#"
        >
          @林悦
        </HoverCardTrigger>
        <HoverCardContent className="w-72">
          <div className="flex w-full flex-col gap-3">
            <div className="flex items-start gap-3">
              <Avatar size="lg">
                <AvatarFallback>林</AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold text-foreground text-sm">林悦</span>
                  <Badge size="sm" variant="success">
                    在线
                  </Badge>
                </div>
                <span className="text-muted-foreground text-xs">高级交互设计师 · 支付体验组</span>
              </div>
            </div>
            <p className="text-pretty text-sm">负责结算与支付流程的体验设计，关注表单效率与错误恢复。</p>
            <div className="flex flex-col gap-1.5 text-muted-foreground text-xs">
              <span className="flex items-center gap-1.5">
                <MapPinIcon aria-hidden="true" className="size-3.5" />
                杭州 · 西溪园区
              </span>
              <span className="flex items-center gap-1.5 numeric">
                <CalendarDaysIcon aria-hidden="true" className="size-3.5" />
                2021 年 3 月加入
              </span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      负责，评审意见请直接在原型中批注。
    </p>
  );
}
