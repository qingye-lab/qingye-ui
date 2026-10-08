# Card

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/card
Source: packages/ui/src/components/card.tsx
Source SHA-256: 1c69a0bdf7495e7260d6db6632a18094b887056ce0cc38c7cf8cb3eac8ff36b1

Bound an independently identifiable object.

## Decision
Use headings and spacing when content has no independent identity, ordering or actions. A Card rendered as a link cannot contain other links or buttons.

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Card
Panel surface, boundary and radius. It supplies no title, content slots, padding or layout.
- render: ReactElement | (props, state) => ReactElement. Compose an article, section or native link while retaining handlers and refs.
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
