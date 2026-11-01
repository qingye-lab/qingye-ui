# AvatarGroup

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/avatar-group
Source: packages/ui/src/components/avatar-group.tsx
Source SHA-256: 806282f5521b596540a007ca559299a7d312a09eca028fd5e9f8a9591375ea51

A set of related people, overlapped, with the surplus collapsed.

## Decision
The overlap is a quarter of the avatar diameter so the initials always stay clear; collapsed people do not disappear: the accessible name of "+N" lists all of them. The group itself is not clickable; to make it so, put it inside a button or link.

## Notes
- The name of "+N" comes from the locale (avatarGroupMore) and lists every collapsed name.

## Use and ownership
- Show which people a thing involves when there is room for only a narrow row.
- Avoid: Use Avatar for one identity; use a list, not an overlap, when members must be acted on individually.
- Library: Overlap, truncation and naming of the whole group.
- Application: Membership facts, order and each person's real name.

## Composition
- The group is role=group and must be named; each avatar remains its own graphic with its own name, and the trailing "+N" is a separate avatar.

## Responsive behavior
- The overlap scales with the avatar size step, not with container width; max decides how many collapse.

## Customization
- size takes one of the five avatar steps; use className for the rest.

## Current exports
- AvatarGroup: function; owner avatar-group; PASS; props: AvatarGroupProps
- AvatarGroupItem: type; owner avatar-group; PASS
- AvatarGroupProps: type; owner avatar-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### AvatarGroup
- `items`: `readonly AvatarGroupItem[]`.
- `max?`: `number`. 最多露出几个头像，其余收进末尾的「+N」。默认 5。
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 279 inherited (@types/react 279); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### AvatarGroup
A role=group div that requires aria-label or aria-labelledby.
- items: { key?, label, src?, fallback? }[]. Members; label is required, and fallback defaults to the first character of the name.
- max: number; default 5. How many avatars to show before the rest collapse into a trailing "+N".
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". The same steps as Avatar.
- className / native props: React.ComponentProps<div>. Remaining attributes forward to the root.

## Keyboard

## Source examples
### 成员与收起
Source: apps/docs/src/content/avatar-group/demos/01-members.tsx
```tsx
import { AvatarGroup } from "@qingye_lab/ui/components/avatar-group";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "成员与收起", titleEn: "Members and overflow" } satisfies DemoMeta;

const people = [{ label: "陈致远" }, { label: "李一鸣" }, { label: "王一" }, { label: "周宁" }, { label: "赵清" }, { label: "孙墨" }, { label: "吴桐" }];

export default function Demo() {
  return <Stack gap="panel">
    <AvatarGroup aria-label="全部成员" max={7} items={people} />
    <AvatarGroup aria-label="项目成员" max={4} items={people} />
    <Inline gap="panel">
      {(["xs", "sm", "md", "lg", "xl"] as const).map(size => <AvatarGroup key={size} aria-label={`成员（${size}）`} size={size} max={3} items={people} />)}
    </Inline>
  </Stack>;
}
```

### 整组作为入口
Source: apps/docs/src/content/avatar-group/demos/02-clickable.tsx
```tsx
import { AvatarGroup } from "@qingye_lab/ui/components/avatar-group";
import { Link } from "@qingye_lab/ui/components/link";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "整组作为入口", titleEn: "The group as one entry" } satisfies DemoMeta;

// 整组本身不可点击；要进入成员名单，就把它放进链接（链接里可以放 div，按钮里不行）。名称与焦点归外层链接。
export default function Demo() {
  return <Link href="#members" aria-label="查看 5 位成员" className="inline-flex">
    <AvatarGroup aria-label="成员" max={3} items={[{ label: "陈致远" }, { label: "李一鸣" }, { label: "王一" }, { label: "周宁" }, { label: "赵清" }]} />
  </Link>;
}
```
