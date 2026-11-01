# CornerMark

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/corner-mark
Source: packages/ui/src/components/corner-mark.tsx
Source SHA-256: ac8892bd3e844d1037659b14d1fa362244bb04e8b5091d156c8d33fc39096a5a

A count or presence dot anchored to a host's corner, never part of the host's own content.

## Decision
The mark is decorative on its own: a count only reaches assistive tech through the host's accessible name or the required label (visually hidden text); a zero count hides the mark entirely rather than leaving an empty shell. Kept distinct from Badge (inline text) and StatusDot (a colored dot with an ink label).

## Notes
- The paper-colored ring defaults to --qy-surface; when the host's own surface differs (for example a sidebar row's --qy-sidebar), override it via className — the library never guesses a parent background.

## Use and ownership
- A narrow host (an icon, a rail, an avatar) needs an attached unread count or presence fact with no room for a full text line.
- Avoid: Use Badge for an inline annotation in running text, and StatusDot for a status name meant to be read directly.
- Library: Geometry, ink categories, and the decorative mark itself.
- Application: The real count, presence facts such as online, and the accessible label's text.

## Composition
- CornerMark: Wraps the host content; the mark is pinned to one of the host's corners (end-top by default).

## Responsive behavior
- The same number may switch between inline text and an anchored mark across container widths — semantics and the value itself must stay identical.

## Customization
- Size and ring width consume existing role tokens; specific ink levels are a verified default.

## Current exports
- CornerMark: function; owner corner-mark; PASS; props: CornerMarkProps
- CornerMarkHostShape: type; owner corner-mark; PASS
- CornerMarkPlacement: type; owner corner-mark; PASS
- CornerMarkProps: type; owner corner-mark; PASS
- CornerMarkTone: type; owner corner-mark; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### CornerMark
- `children`: `React.ReactNode`.
- `className?`: `string`.
- `count`: `number`.
- `dot?`: `never`.
- `hostShape?`: `"circle" | "square"`.
- `label`: `string`.
- `max?`: `number`.
- `placement?`: `"top-end" | "bottom-end" | "top-start" | "bottom-start"`.
- `tone?`: `"neutral" | "info" | "warning" | "danger" | "success"`.
- `wrapperClassName?`: `string`.

## Dependencies and providers
- Runtime: clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### CornerMark
Wraps the host content; the mark is pinned to one of the host's corners (end-top by default).
- count / max: number / number. The count variant; past max (default 99) it reads "max+" while the real number stays in label; a count of 0 hides the mark and its label together.
- dot: true. A digit-free dot variant, mutually exclusive with count.
- label: string（必填）. The mark itself is aria-hidden; this visually hidden text is the only guaranteed path for the count or status to reach assistive technology. Missing it throws in development.
- tone: "neutral" | "success" | "danger". Defaults to ink; success and danger are existing semantic categories, never hue without meaning.
- placement / hostShape: "top-end" | "bottom-end" | "top-start" | "bottom-start" / "square" | "circle"; default "top-end" / "square". Corners use logical directions (end is the line end, so it sits on the left under right-to-left), never left/right. For a circular host (an avatar) set hostShape="circle" so the mark sits on the circle at 45 degrees instead of floating outside it.
- className / wrapperClassName: string. className targets the mark itself (for example overriding the paper-colored ring to match the actual surface); wrapperClassName targets the outer positioning wrapper.

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
    <CornerMark dot tone="success" placement="bottom-end" hostShape="circle" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}
```

### 头像右下角的在线点
Source: apps/docs/src/content/corner-mark/demos/02-placement.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Inline } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "头像右下角的在线点", titleEn: "An online dot at an avatar's bottom end" } satisfies DemoMeta;

// 头像是圆，所以 hostShape="circle"：在线点落在圆周 45° 处，而不是悬在方框的角外。
export default function Demo() {
  return <Inline gap="panel">
    <CornerMark dot tone="success" placement="bottom-end" hostShape="circle" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
    <CornerMark dot tone="neutral" placement="bottom-end" hostShape="circle" label="离线"><Avatar label="李一鸣"><AvatarFallback>李</AvatarFallback></Avatar></CornerMark>
    <CornerMark count={3} placement="top-start" label="3 条未读"><Avatar label="王一"><AvatarFallback>王</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}
```
