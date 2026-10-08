# 链接预览 HoverCard

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/hover-card
Source: packages/ui/src/components/hover-card.tsx
Source SHA-256: f8127bb393799cab3bb83d3e54f2fcddf479e38d000adce7e821eff75e01d54c

悬停与键盘焦点展开相同补充内容。

## Decision
默认触发是可到达链接；补充内容不唯一承载后果，Tab 主动离开时不抢回焦点。

## Notes
- 关键后果也必须在持续可见的位置可达。
- 需要执行局部动作时按任务选择 Popover。
- 透明边界、面、文字和入退复用公共角色；没有虚构对象或请求。

## Use and ownership
- 链接需要同源、可键盘到达的补充预览。
- Avoid: 唯一重要信息只在 hover 时出现。
- Library: 悬停/focus 状态、定位与退出。
- Application: 链接目标、真实内容与后果。

## Composition
- 真实链接与补充内容；独立 Positioner 消费共享层级。

## Responsive behavior
- 长内容换行，容量受原语 available width/height 限制。

## Customization
- surface-raised、panel-padding-sm、文字角色与 motion.css。

## Current exports
- HoverCard: function; owner hover-card; PASS; props: HoverCardPrimitive.Root.Props<Payload>
- HoverCardCreateHandle: const; owner hover-card; UNVERIFIED
- HoverCardPopup: function; owner hover-card; PASS; props: HoverCardPopupProps
- HoverCardPopupProps: type; owner hover-card; PASS
- HoverCardPrimitive: reexport; owner hover-card; UNVERIFIED
- HoverCardTrigger: function; owner hover-card; PASS; props: HoverCardPrimitive.Trigger.Props<Payload>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### HoverCard
Base UI PreviewCard 公共 Root，保留 open/defaultOpen/onOpenChange、payload、handle 和 closeDelay。

### HoverCardTrigger
真实可到达入口与键盘同源预览。
- href: string. 原生链接要求非空真实目标；自定义 render 须提供等价键盘可达性。
- delay: number; default 0. 悬停进入时延；即时为当前选择，focus 仍由原语管理。
- render / ref / className / style: HoverCardPrimitive.Trigger.Props. 保留原语组合和状态回调。

### HoverCardPopup
自身定位上下文的补充内容。
- side / align / sideOffset / alignOffset / anchor: HoverCardPrimitive.Positioner.Props. 采用自身公开定位上下文。
- portalProps / positionerProps: 原语部位 Props. 容器、ref、render、事件和样式透传；共享 popup 层级先合并，调用方 style 最后合并。

## Keyboard
- Tab / Shift+Tab: 焦点到链接时展开；主动移开不抢回。
- Esc: 结束预览。
- Enter: 到达链接目标。

## Source examples
### 悬停与焦点
Source: apps/docs/src/content/hover-card/demos/01-states.tsx
```tsx
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "悬停与焦点", titleEn: "Hover and focus" };
export default function HoverCardDemo() {
  return <Inline gap="fields"><HoverCard><HoverCardTrigger href="#hover-card-target">内容入口</HoverCardTrigger><HoverCardPopup>补充内容</HoverCardPopup></HoverCard><Button variant="quiet">下一控件</Button><span id="hover-card-target" className="text-body">内容</span></Inline>;
}
```
