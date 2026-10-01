import {
  Avatar,
  AvatarFallback,
  Badge,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineHeader,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@yanqing/ui";
import { PaperclipIcon, TagIcon } from "lucide-react";

export const meta = { title: "动态与评论", description: "用子组件组合：头像标记、语句式标题与评论内容。" };

export default function Demo() {
  return (
    <Timeline className="w-full max-w-lg" label="工单动态">
      <TimelineItem>
        <TimelineMarker variant="plain">
          <Avatar size="sm">
            <AvatarFallback>林</AvatarFallback>
          </Avatar>
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle className="font-normal text-muted-foreground">
              <strong>林晓雯</strong> 发表了评论
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-01T11:08">11:08</TimelineTime>
          </TimelineHeader>
          <div className="mt-2 rounded-lg border bg-card px-3 py-2.5 text-sm">
            已和支付宝确认，回调地址在 9 月 28 日的配置变更中被覆盖，今晚 22:00 前恢复。
          </div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker>
          <TagIcon />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle className="font-normal text-muted-foreground">
              <strong>周子航</strong> 将优先级改为 <Badge variant="error">P0 紧急</Badge>
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-01T10:41">10:41</TimelineTime>
          </TimelineHeader>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker>
          <PaperclipIcon />
        </TimelineMarker>
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle className="font-normal text-muted-foreground">
              <strong>陈一诺</strong> 上传了附件
            </TimelineTitle>
            <TimelineTime dateTime="2026-10-01T09:57">09:57</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>callback-error-0930.log · 284 KB</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineMarker status="primary" />
        <TimelineContent>
          <TimelineHeader>
            <TimelineTitle>工单已创建</TimelineTitle>
            <TimelineTime dateTime="2026-10-01T09:30">09:30</TimelineTime>
          </TimelineHeader>
          <TimelineDescription>来自客服系统 · 支付回调失败率异常</TimelineDescription>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
