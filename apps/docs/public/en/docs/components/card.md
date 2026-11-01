# Card

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/card
Source: packages/ui/src/components/card.tsx
Source SHA-256: 8250693638eb9e24a77a347acad743aecc580f0ebd5cbd13e6424ef201b5a4ae

Bound an independently identifiable object.

## Decision
Use headings and spacing when content has no independent identity, ordering or actions. A Card rendered as a link cannot contain other links or buttons. Card has no elevation steps, paper surfaces or hover lift: it never leaves the plane, and a shadow would fake a layer; change ground and radius through system tokens in the theme (radius is --qy-radius-panel).

## Notes
- Use Heading or a real h2/h3, and compose content and actions with Stack, Inline and native structure.
- size, CardHeader/Title/Description/Action/Panel/Content/Footer and CardFrame* have been removed.
- Calculate an inner radius only for an equally inset contour of the same surface. Independent controls keep their own radii.
- Density, direction and language belong to the containing context. Card sets no such markers.
- The current default uses a boundary, surface and radius without a shadow. This is a reversible appearance choice; projects can compose shadows where appropriate.

## Use and ownership
- An object needs independent identification, ordering, or actions whose boundary supports the task.
- Avoid: Content whose relationships survive border removal; nested interaction inside a whole-card link; cards for every section.
- Library: Panel boundary, surface, radius, and render forwarding.
- Application: Object identity, heading levels, layout, drafts, and asynchronous facts.

## Composition
- Consume Card's boundary only; Heading, Stack, Inline, native forms, and lists organize content relationships.

## Responsive behavior
- Consumers permit long titles and actions to wrap; comparisons retain necessary dimensions.

## Customization
- Adjust panel roles through the central theme; composition supplies content layout.

## Current exports
- Card: function; owner card; PASS; props: CardProps
- CardProps: type; owner card; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Card
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Card
Panel surface, boundary and radius. It supplies no title, content slots, padding or layout.
- render: ReactElement | (props, state) => ReactElement. Compose an article, section or native link while retaining handlers and refs. Rendered as a[href] or button, the whole card gets hover and press surfaces (the same feedback ladder as Item row entries); a button fills the width with text starting at the line start.
- className / style: string / CSSProperties. Compose layout and content inset for this object. Caller classes are merged last.
- Native props: ComponentPropsWithRef<"div">. Forward id, aria-*, data-*, events and ref.

## Keyboard

## Source examples
### 内容
Source: apps/docs/src/content/card/demos/01-basic.tsx
```tsx
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "内容", titleEn: "Content" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm" render={<article aria-labelledby="card-note-title" />}>
      <Stack gap="panel" className="p-(--qy-panel-padding)">
        <Heading id="card-note-title" level={3}>便签</Heading>
        <Text>青野 · Qingye</Text>
      </Stack>
    </Card>
  );
}
```

### 整卡链接
Source: apps/docs/src/content/card/demos/02-action.tsx
```tsx
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "整卡链接", titleEn: "Linked card" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm" render={<a href="/docs/card" />}>
      <Stack gap="panel" className="p-(--qy-panel-padding)">
        <Heading level={3}>Card</Heading>
        <Text>组件文档</Text>
      </Stack>
    </Card>
  );
}
```

### 分节与动作
Source: apps/docs/src/content/card/demos/03-divided.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "分节与动作", titleEn: "Sections and actions" };

export default function Demo() {
  return (
    <Card className="w-full max-w-sm">
      <header className="border-b p-(--qy-panel-padding)"><Heading level={3}>便签</Heading></header>
      <div className="p-(--qy-panel-padding)"><Text>青野 · Qingye</Text></div>
      <Inline gap="actions" className="border-t p-(--qy-panel-padding)">
        <Button size="sm">编辑</Button><Button size="sm" variant="quiet">关闭</Button>
      </Inline>
    </Card>
  );
}
```

### 密度
Source: apps/docs/src/content/card/demos/04-context.tsx
```tsx
import { Card } from "@qingye_lab/ui/components/card";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "密度", titleEn: "Density" };

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 gap-(--qy-section-gap)">
      {(["default", "compact"] as const).map((density) => (
        <section data-density={density} key={density}>
          <Card>
            <Stack gap="panel" className="p-(--qy-panel-padding)">
              <Heading level={3}>{density === "compact" ? "紧凑" : "默认"}</Heading>
              <Text>青野 · Qingye</Text>
            </Stack>
          </Card>
        </section>
      ))}
    </div>
  );
}
```

### 嵌套
Source: apps/docs/src/content/card/demos/05-nested.tsx
```tsx
import { Card } from "@qingye_lab/ui/components/card";
import { Grid, Stack } from "@qingye_lab/ui/components/layout";
import { Heading, Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "嵌套", titleEn: "Nested" };

/*
 * 同心：外圆角 R = 面板圆角（4 分）。内层卡片离外轮廓的等距内缩 d = 3 分，
 * 所以内层圆角 r = R − d = 4 分 − 3 分 = 1 分。两条轮廓的圆心重合，转角处两线之间的距离处处等于 d。
 * 内缩必须小于外圆角：面板内边距（不低于 5 分）大于 R，若用它做内缩，r 为负，内层只能是直角，
 * 同心关系也就无从谈起。因此内层卡片的内缩取 3 分，标题行与说明行再补足到面板内边距，
 * 文字仍与其它 Card 的文字起点对齐。圆角与内缩都由外圆角显式推导，不覆盖 Card 本身的取值。
 */
export default function Demo() {
  return (
    <Card className="w-full max-w-xl">
      <Stack gap="panel" className="p-[calc(3*var(--qy-fen))]">
        <header className="p-[calc(var(--qy-panel-padding)-3*var(--qy-fen))]"><Heading level={3}>本周</Heading></header>
        <Grid columns={3} gap="panel">
          {["已完成", "进行中", "待安排"].map((name, index) => (
            <Card key={name} className="rounded-[calc(var(--qy-radius-panel)-3*var(--qy-fen))]">
              <Stack gap="pair" className="p-(--qy-panel-padding)">
                <Text>{name}</Text>
                <Heading level={3}>{[12, 5, 3][index]}</Heading>
              </Stack>
            </Card>
          ))}
        </Grid>
        <footer className="p-[calc(var(--qy-panel-padding)-3*var(--qy-fen))]"><Text>数据每小时更新一次。</Text></footer>
      </Stack>
    </Card>
  );
}
```
