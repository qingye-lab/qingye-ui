import { HoverCard, HoverCardContent, HoverCardTrigger } from "@yanqing/ui";
import { CircleDotIcon, GitPullRequestIcon } from "lucide-react";

export const meta = { title: "链接预览", description: "在工单、文档中引用其他条目时，悬停即可看到摘要，不必跳转。" };

export default function Demo() {
  return (
    <p className="max-w-md text-pretty text-muted-foreground text-sm leading-relaxed">
      该问题已在
      <HoverCard>
        <HoverCardTrigger
          className="mx-1 inline-flex items-center gap-1 rounded-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background text-foreground underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground/64"
          delay={300}
          href="#"
        >
          <GitPullRequestIcon aria-hidden="true" className="size-3.5 text-success-foreground" />
          #2481
        </HoverCardTrigger>
        <HoverCardContent align="start" className="w-80">
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <span className="numeric">qingyun/console #2481</span>
              <span aria-hidden="true">·</span>
              <span>2 天前</span>
            </div>
            <span className="font-medium text-foreground text-sm">修复结算页在 Safari 中金额输入框跳动的问题</span>
            <p className="line-clamp-2 text-xs">
              为金额输入框固定字宽并改用等宽数字，避免输入时宽度变化导致布局抖动。
            </p>
            <div className="flex items-center gap-1.5 text-xs">
              <CircleDotIcon aria-hidden="true" className="size-3.5 text-success-foreground" />
              <span className="text-success-foreground">已合并</span>
              <span className="text-muted-foreground">· 4 个文件变更</span>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      中修复，下个版本发布。
    </p>
  );
}
