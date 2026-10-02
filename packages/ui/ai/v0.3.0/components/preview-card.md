# 预览卡片 PreviewCard

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/preview-card
Source: packages/ui/src/components/preview-card.tsx
Source SHA-256: e340220e1ee2a3e069ce54519041dcf407e1c0f716af4de16ceab141147da95d

悬停在链接上时显示目标内容的预览，例如成员资料、工单摘要。只是锦上添花：点击链接本身仍然能到达完整页面。

## Use and ownership
- 悬停在链接上时显示目标内容的预览，例如成员资料、工单摘要。只是锦上添花：点击链接本身仍然能到达完整页面。
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
- HoverCardTrigger: function; owner preview-card; alias of PreviewCardTrigger; PASS; props: PreviewCardPrimitive.Trigger.Props
- PreviewCard: const; owner preview-card; PASS
- PreviewCardPopup: function; owner preview-card; PASS; props: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props["align"];
  alignOffset?: PreviewCardPrimitive.Positioner.Props["alignOffset"];
  side?: PreviewCardPrimitive.Positioner.Props["side"];
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"];
  anchor?: PreviewCardPrimitive.Positioner.Props["anchor"];
  portalProps?: PreviewCardPrimitive.Portal.Props;
}
- PreviewCardPrimitive: reexport; owner preview-card; UNVERIFIED
- PreviewCardTrigger: function; owner preview-card; PASS; props: PreviewCardPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### PreviewCard
根组件。别名 HoverCard。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。

### PreviewCardTrigger
渲染为 <a> 链接，悬停或聚焦时打开预览。别名 HoverCardTrigger。
- href: string. 链接地址；预览只是补充，链接本身必须可用。
- delay / closeDelay: number; default 600 / 300. 打开 / 关闭前的等待时间（毫秒）。

### PreviewCardPopup
预览卡片，默认宽 16rem。别名 HoverCardContent。
- side: "top" | "right" | "bottom" | "left"; default "bottom". 相对链接的方向，空间不足时自动翻转。
- align: "start" | "center" | "end"; default "center". 沿边的对齐方式。
- sideOffset / alignOffset: number; default 4 / 0. 与链接的距离 / 对齐偏移。

## Keyboard
- Tab: 聚焦链接时显示预览。
- Esc: 关闭预览。
- Enter: 打开链接。

## Source examples
### 成员名片
Source: apps/docs/src/content/preview-card/demos/01-member.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
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
```

### 方向
Source: apps/docs/src/content/preview-card/demos/02-sides.tsx
```tsx
import { PreviewCard, PreviewCardPopup, PreviewCardTrigger } from "@qingye/ui/components/preview-card";

export const meta = { title: "方向", description: "默认在下方，side 可改为上、左、右；空间不足时自动翻转。" };

const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-6 text-sm">
      {sides.map(({ side, label }) => (
        <PreviewCard key={side}>
          <PreviewCardTrigger
            className="font-medium underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground"
            href={`#preview-${side}`}
          >
            {label}
          </PreviewCardTrigger>
          <PreviewCardPopup className="grid w-56 gap-1" side={side}>
            <p className="font-medium">工单 #2318</p>
            <p className="text-muted-foreground text-xs">3 号仓库温控器离线 · 处理中</p>
          </PreviewCardPopup>
        </PreviewCard>
      ))}
    </div>
  );
}
```

