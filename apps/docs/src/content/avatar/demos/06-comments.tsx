import { Avatar, AvatarFallback, AvatarImage } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";

export const meta = { title: "组合：评论", description: "头像与姓名、时间组成评论头部，正文与姓名左对齐。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage
            alt=""
            src="https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces"
          />
          <AvatarFallback>沈</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">沈若溪</span>
            <time className="text-muted-foreground text-xs numeric">今天 10:24</time>
          </div>
          <p className="text-pretty text-sm">
            首页骨架屏和真实内容的高度不一致，加载完成时列表会往下跳一下，能统一成 72px 吗？
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Avatar>
          <AvatarFallback>陈</AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">陈思远</span>
            <Badge size="sm" variant="secondary">作者</Badge>
            <time className="text-muted-foreground text-xs numeric">今天 10:41</time>
          </div>
          <p className="text-pretty text-sm">已改，骨架行高现在和列表项一致，预发环境可以看效果。</p>
        </div>
      </div>
    </div>
  );
}
