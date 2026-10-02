# 时间线 Timeline

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/timeline
Source: packages/ui/src/components/timeline.tsx
Source SHA-256: 37b83c995b955e384c5b4ecbc514e7c9eab8a698afa0c6087c64994151f7ca50

按时间顺序列出事件：物流轨迹、部署记录、审批与评论动态。

## Use and ownership
- 按顺序追踪对象事件、发生时间及后续可查证内容。
- Avoid: 装饰标记颜色是唯一状态；将预计事件写成已发生；状态变化抹掉早期事件；合法零值被省略。
- Library: 事件解剖、时间元素、轨道和零值保留。
- Application: 事件顺序、实际时间、状态、权限与详情导航。

## Composition
- 有序列表组织事件，time/dateTime 分别显示与机器表达；title 说事实，content 承接详情和附件。

## Responsive behavior
- 标题与时间可分行，长说明可阅读；紧凑密度保留事件之间可理解的距离。

## Customization
- density/connector 修改关系，marker 是装饰，不能隐藏事件事实或交互。

## Current exports
- Timeline: function; owner timeline; PASS; props: TimelineProps
- TimelineConnector: type; owner timeline; PASS
- TimelineContent: function; owner timeline; PASS; props: ComponentProps<"div">
- TimelineDensity: type; owner timeline; PASS
- TimelineDescription: function; owner timeline; PASS; props: ComponentProps<"div">
- TimelineEntry: type; owner timeline; PASS
- TimelineHeader: function; owner timeline; PASS; props: ComponentProps<"div">
- TimelineItem: function; owner timeline; PASS; props: ComponentProps<"li">
- TimelineMarker: function; owner timeline; PASS; props: TimelineMarkerProps
- TimelineMarkerProps: type; owner timeline; PASS
- TimelineProps: type; owner timeline; PASS
- TimelineStatus: type; owner timeline; PASS
- TimelineTime: function; owner timeline; PASS; props: ComponentProps<"time">
- TimelineTitle: function; owner timeline; PASS; props: ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Timeline
渲染 <ol>。简单场景传 items；需要头像、评论等丰富内容时用子组件组合。
- items: TimelineEntry[]. { id, title, description?, time?, dateTime?, icon?, status?, content? }。
- density: "default" | "compact"; default "default". compact 收紧间距与标记尺寸（24px → 20px），适合日志。
- connector: "solid" | "dashed" | "none"; default "solid". 标记之间的连接线样式。
- label: string; default "时间线". 列表的无障碍名称。

### TimelineItem
单个事件 <li>，连接线画在标记列下方，最后一项自动省略。

### TimelineMarker
标记列，装饰性（aria-hidden）；含义由标题承担。
- status: "default" | "primary" | "success" | "warning" | "error" | "info"; default "default". 标记颜色。
- variant: "dot" | "icon" | "plain". 无子元素时为 dot，有子元素时为带边框的 icon；放头像时用 plain。

### TimelineContent
内容列，首行与标记垂直居中对齐。

### TimelineHeader
标题与时间同行，空间不足时换行。

### TimelineTitle
标题，默认 500 字重；动态语句可用 font-normal 并以 <strong> 标出人名。

### TimelineTime
<time> 元素，等宽数字；传 dateTime 给出机器可读时间。

### TimelineDescription
补充说明。

## Keyboard

## Source examples
### 基础用法
Source: apps/docs/src/content/timeline/demos/01-basic.tsx
```tsx
import { Timeline } from "@qingye/ui/components/timeline";

export const meta = { title: "基础用法", description: "items 快速生成；没有图标时标记为圆点。" };

const items = [
  { id: "sign", title: "已签收", description: "本人签收，感谢使用顺丰速运", time: "10-01 14:32", dateTime: "2026-10-01T14:32", status: "success" as const },
  { id: "deliver", title: "派送中", description: "快递员 王师傅 正在派送，电话 138****2041", time: "10-01 09:05", dateTime: "2026-10-01T09:05" },
  { id: "arrive", title: "到达上海徐汇营业部", time: "09-30 22:47", dateTime: "2026-09-30T22:47" },
  { id: "ship", title: "已发货", description: "杭州转运中心", time: "09-30 08:16", dateTime: "2026-09-30T08:16" },
];

export default function Demo() {
  return <Timeline className="w-full max-w-md" items={items} label="物流轨迹" />;
}
```

### 图标与状态
Source: apps/docs/src/content/timeline/demos/02-icons.tsx
```tsx
import { Timeline } from "@qingye/ui/components/timeline";
import { GitCommitHorizontalIcon, RocketIcon, ShieldAlertIcon, TriangleAlertIcon, UndoIcon } from "lucide-react";

export const meta = { title: "图标与状态", description: "icon 作为标记，status 标出成功、警告、失败与提示。" };

const items = [
  { id: "1", title: "v2.8.1 发布到生产环境", description: "全量发布，耗时 6 分钟", time: "16:20", status: "success" as const, icon: <RocketIcon /> },
  { id: "2", title: "回滚 v2.8.0", description: "订单服务 P99 延迟升高至 1.8s", time: "15:58", status: "error" as const, icon: <UndoIcon /> },
  { id: "3", title: "灰度 10% 流量", description: "错误率 0.4%，高于 0.1% 阈值", time: "15:41", status: "warning" as const, icon: <TriangleAlertIcon /> },
  { id: "4", title: "安全扫描完成", description: "发现 2 个低危依赖，已记录", time: "15:30", status: "info" as const, icon: <ShieldAlertIcon /> },
  { id: "5", title: "合并 #1842 优化结算页", time: "15:12", icon: <GitCommitHorizontalIcon /> },
];

export default function Demo() {
  return <Timeline className="w-full max-w-md" items={items} label="部署记录" />;
}
```

### 动态与评论
Source: apps/docs/src/content/timeline/demos/03-activity.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";
import { Timeline, TimelineContent, TimelineDescription, TimelineHeader, TimelineItem, TimelineMarker, TimelineTime, TimelineTitle } from "@qingye/ui/components/timeline";
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
```

### 紧凑与连接线
Source: apps/docs/src/content/timeline/demos/04-compact.tsx
```tsx
import { Timeline } from "@qingye/ui/components/timeline";

export const meta = { title: "紧凑与连接线", description: "density=\"compact\" 适合审计日志；connector 可选 dashed 或 none。" };

const audit = [
  { id: "1", title: "导出 9 月账单", time: "14:22:05", description: "王嘉树 · 192.168.3.24" },
  { id: "2", title: "修改角色权限：财务 → 管理员", time: "13:47:51", description: "林晓雯 · 10.0.8.12", status: "warning" as const },
  { id: "3", title: "登录失败 3 次", time: "13:40:09", description: "未知用户 · 47.98.12.6", status: "error" as const },
  { id: "4", title: "新增成员 赵思远", time: "11:05:33", description: "林晓雯 · 10.0.8.12" },
];

const plan = [
  { id: "a", title: "需求评审", time: "10-08" },
  { id: "b", title: "设计定稿", time: "10-15" },
  { id: "c", title: "开发联调", time: "10-29" },
  { id: "d", title: "上线", time: "11-05" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-10 sm:grid-cols-2">
      <Timeline connector="dashed" density="compact" items={audit} label="审计日志" />
      <Timeline connector="none" density="compact" items={plan} label="项目里程碑" />
    </div>
  );
}
```

