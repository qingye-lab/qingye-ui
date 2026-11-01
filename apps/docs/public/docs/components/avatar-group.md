# 头像组 AvatarGroup

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/avatar-group
Source: packages/ui/src/components/avatar-group.tsx
Source SHA-256: 806282f5521b596540a007ca559299a7d312a09eca028fd5e9f8a9591375ea51

一组相关的人，叠放并收起多余的成员。

## Decision
叠放量取头像直径的四分之一，字始终露在外面；被收起的人不会消失，「+N」的可访问名称列出他们全部的名称。整组不可点击，要点击就放进按钮或链接。

## Notes
- 「+N」的名称由 locale 提供（avatarGroupMore），列出被收起的全部名称。

## Use and ownership
- 表达一件事涉及哪几个人，且空间只够窄窄一行。
- Avoid: 一个人的身份用 Avatar；需要逐个操作成员时用列表，不用叠放。
- Library: 叠放、截断与整组命名。
- Application: 成员事实、顺序与每个人的真实名称。

## Composition
- 整组 role=group 必须有名称；每个头像仍是自己的图形与名称，末尾的「+N」是一个独立头像。

## Responsive behavior
- 叠放量随头像档位等比，不随容器宽度变化；收起数量由 max 决定。

## Customization
- size 取头像五档之一；其余用 className。

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
role=group 的 div，必须有 aria-label 或 aria-labelledby。
- items: { key?, label, src?, fallback? }[]. 成员；label 必填，fallback 省略时取名称的第一个字。
- max: number; default 5. 最多露出几个头像，其余收进末尾的「+N」。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 与 Avatar 同一组档位。
- className / native props: React.ComponentProps<div>. 其余属性透传到根元素。

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
