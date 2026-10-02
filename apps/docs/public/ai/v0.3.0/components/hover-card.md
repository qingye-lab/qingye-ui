# 悬停卡片 HoverCard

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/hover-card
Source: packages/ui/src/components/hover-card.tsx
Source SHA-256: 05bdb7a7cd1b3ea92a8bda2da7dccdcc36e7f20b09bf664b90184049e97d9f10

鼠标悬停或键盘聚焦链接时，预览链接背后的内容，例如成员资料或项目摘要。它是 PreviewCard 的 shadcn 命名别名，两者是同一个组件。

## Use and ownership
- 鼠标悬停或键盘聚焦链接时，预览链接背后的内容，例如成员资料或项目摘要。它是 PreviewCard 的 shadcn 命名别名，两者是同一个组件。
- Avoid: 不要把唯一的关键后果藏在临时浮层；直达与返回都需要成立。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- HoverCard: const; owner preview-card; alias of PreviewCard; PASS
- HoverCardContent: function; owner preview-card; alias of PreviewCardPopup; PASS; props: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  alignOffset?: PreviewCardPrimitive.Positioner.Props["alignOffset"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
  anchor?: PreviewCardPrimitive.Positioner.Props["anchor"];
  portalProps?: PreviewCardPrimitive.Portal.Props;
}
- HoverCardPopup: function; owner preview-card; alias of PreviewCardPopup; PASS; props: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  alignOffset?: PreviewCardPrimitive.Positioner.Props["alignOffset"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
  anchor?: PreviewCardPrimitive.Positioner.Props["anchor"];
  portalProps?: PreviewCardPrimitive.Portal.Props;
}
- HoverCardPrimitive: reexport; owner preview-card; alias of PreviewCardPrimitive; UNVERIFIED
- HoverCardTrigger: function; owner preview-card; alias of PreviewCardTrigger; PASS; props: PreviewCardPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### HoverCard
根部件（即 PreviewCard），管理开关状态。
- open / defaultOpen / onOpenChange: boolean / (open) => void. 受控 / 非受控的开关。

### HoverCardTrigger
触发的链接，默认渲染 <a>；应当是一个真实可访问的链接。
- delay: number; default 600. 悬停多少毫秒后打开。
- closeDelay: number; default 300. 移开多少毫秒后关闭。
- render: ReactElement. 接入路由库的 Link。

### HoverCardContent
卡片浮层（别名 HoverCardPopup、PreviewCardPopup），默认宽 16rem。
- align: "start" | "center" | "end"; default "center". 相对触发器的对齐方式。
- sideOffset: number; default 4. 与触发器的距离。

## Keyboard
- Tab: 聚焦触发链接时打开卡片，移开焦点后关闭。
- Enter: 跟随链接。
- Esc: 关闭卡片。

## Source examples
### 成员资料
Source: apps/docs/src/content/hover-card/demos/01-profile.tsx
```tsx
import { Avatar } from "@qingye/ui/components/avatar";
import { AvatarFallback } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@qingye/ui";
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
```

### 链接预览
Source: apps/docs/src/content/hover-card/demos/02-link-preview.tsx
```tsx
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@qingye/ui";
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
```

