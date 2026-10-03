# 卡片 Card

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/card
Source: packages/ui/src/components/card.tsx
Source SHA-256: fb1b47e9219579390a5ed90258feb36d089dfa6f4393bfb769048626fd04e083

为可独立识别的对象建立内容边界。

## Use and ownership
- 对象需要独立识别、排序或操作，其边界参与任务关系。
- Avoid: 去掉边框关系不变的内容；整卡链接嵌套交互；用卡片代替所有分节。
- Library: 面板边界、表面、圆角与 render 透传。
- Application: 对象身份、标题级别、布局、草稿与异步事实。

## Composition
- 仅消费 Card 边界；Heading、Stack、Inline、原生表单与列表负责内容关系。

## Responsive behavior
- 消费端允许长标题和动作换行；比较任务保留必要维度。

## Customization
- 通过集中主题调整面板角色，内容布局由组合提供。

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
面板表面、边界与圆角。不生成标题、内容槽、内边距或排列方式。
- render: ReactElement | (props, state) => ReactElement. 组合为 article、section 或原生链接，完整保留事件与 ref。
- className / style: string / CSSProperties. 消费端按对象关系组合布局与内缘；外部类最后合并。
- 原生属性: ComponentPropsWithRef<"div">. 透传 id、aria-*、data-*、事件与 ref。

## Keyboard

## Source examples
### 内容
Source: apps/docs/src/content/card/demos/01-basic.tsx
```tsx
import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

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
import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

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
import { Button } from "@qingye/ui/components/button";
import { Card } from "@qingye/ui/components/card";
import { Inline } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

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
import { Card } from "@qingye/ui/components/card";
import { Stack } from "@qingye/ui/components/layout";
import { Heading, Text } from "@qingye/ui/components/typography";

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

