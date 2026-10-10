# 角标 CornerMark

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/corner-mark
Source: packages/ui/src/components/corner-mark.tsx
Source SHA-256: 9bb91f1a33b8c8ef1903005e66689aebb65074d7de1b4a6f5b3946b0a4fa7308

钉在宿主一角的未读数或在线点，不是宿主内容本身。

## Decision
角标本身是装饰性的：数字必须经宿主的可访问名称，或 label（视觉隐藏文字）才能被读屏听到；零计数直接隐藏，不留空壳。与 Badge（正文里的一段字）、StatusDot（彩色圆点 + 墨色名称）各管各的边界。

## Notes
- 纸色圈默认读 --qy-surface；宿主底色不是纸面时（例如侧栏行的 --qy-sidebar），用 className 覆盖——库不猜父背景。

## Use and ownership
- 窄处（图标、rail、头像）需要附加一个未读数或存在状态，而没有空间放一整行文字。
- Avoid: 正文里的一段标注文字用 Badge；要被直接读到的状态名称用 StatusDot。
- Library: 几何、墨色类别与装饰性标记本身。
- Application: 真实计数、在线等状态事实与可访问 label 的文字内容。

## Composition
- CornerMark：包裹宿主内容，角标钉在宿主的右上角。

## Responsive behavior
- 同一个数字可以在不同容器宽度下切换成行内文字或角标——语义与数值必须一致（随境取度）。

## Customization
- 尺寸与圈宽消费现有角色 token；具体墨阶为已验证默认。

## Current exports
- CornerMark: function; owner corner-mark; PASS; props: CornerMarkProps
- CornerMarkProps: type; owner corner-mark; PASS
- CornerMarkTone: type; owner corner-mark; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CornerMark
包裹宿主内容，角标钉在宿主的右上角。
- count / max: number / number. 计数档；超过 max（默认 99）显示「max+」，真实数字仍在 label 里；count 为 0 时角标与 label 一起消失。
- dot: true. 不显示数字的圆点档，与 count 互斥。
- label: string（必填）. 角标本身 aria-hidden；这段视觉隐藏文字是数字或状态唯一确定能被读屏听到的途径，开发环境缺失时会抛错。
- tone: "neutral" | "success" | "danger". 默认焦墨；success、danger 是已有语义类别，没有脱离类别的彩色。
- className / wrapperClassName: string. className 作用于角标本身（例如覆盖纸色圈，使其匹配实际承载面）；wrapperClassName 作用于外层定位容器。

## Keyboard

## Source examples
### 未读数与在线点
Source: apps/docs/src/content/corner-mark/demos/01-task.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Inline } from "@qingye_lab/ui/components/layout";
import { IconBell } from "@tabler/icons-react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "未读数与在线点", titleEn: "Unread count and an online dot" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="panel">
    <CornerMark count={3} label="3 条未读"><span className="inline-flex size-(--qy-fill-height) items-center justify-center rounded-item bg-surface-inset text-foreground"><IconBell aria-hidden="true" /></span></CornerMark>
    <CornerMark count={142} max={99} label="142 条未读"><span className="inline-flex size-(--qy-fill-height) items-center justify-center rounded-item bg-surface-inset text-foreground"><IconBell aria-hidden="true" /></span></CornerMark>
    <CornerMark dot tone="success" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}
```
