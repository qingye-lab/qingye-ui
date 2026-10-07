# CornerMark

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/corner-mark
Source: packages/ui/src/components/corner-mark.tsx
Source SHA-256: 1b3e7ed26f60a1d3f080aa7dd085840faab55758801b5f776a85cdca66f354b6

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
- CornerMark: Wraps the host content; the mark is pinned to the host's top-right corner.

## Responsive behavior
- The same number may switch between inline text and an anchored mark across container widths — semantics and the value itself must stay identical.

## Customization
- Size and ring width consume existing role tokens; specific ink levels are a verified default.

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
Wraps the host content; the mark is pinned to the host's top-right corner.
- count / max: number / number. The count variant; past max (default 99) it reads "max+" while the real number stays in label; a count of 0 hides the mark and its label together.
- dot: true. A digit-free dot variant, mutually exclusive with count.
- label: string（必填）. The mark itself is aria-hidden; this visually hidden text is the only guaranteed path for the count or status to reach assistive technology. Missing it throws in development.
- tone: "neutral" | "success" | "danger". Defaults to ink; success and danger are existing semantic categories, never hue without meaning.
- className / wrapperClassName: string. className targets the mark itself (for example overriding the paper-colored ring to match the actual surface); wrapperClassName targets the outer positioning wrapper.

## Keyboard

## Source examples
### 未读数与在线点
Source: apps/docs/src/content/corner-mark/demos/01-task.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { CornerMark } from "@qingye/ui/components/corner-mark";
import { Inline } from "@qingye/ui/components/layout";
import { BellIcon } from "lucide-react";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "未读数与在线点", titleEn: "Unread count and an online dot" } satisfies DemoMeta;
export default function Demo() {
  return <Inline gap="panel">
    <CornerMark count={3} label="3 条未读"><span className="inline-flex size-(--qy-fill-height) items-center justify-center rounded-item bg-surface-inset text-foreground"><BellIcon aria-hidden="true" /></span></CornerMark>
    <CornerMark count={142} max={99} label="142 条未读"><span className="inline-flex size-(--qy-fill-height) items-center justify-center rounded-item bg-surface-inset text-foreground"><BellIcon aria-hidden="true" /></span></CornerMark>
    <CornerMark dot tone="success" label="在线"><Avatar label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar></CornerMark>
  </Inline>;
}
```
