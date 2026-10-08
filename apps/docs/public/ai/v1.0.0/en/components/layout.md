# Layout

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/layout
Source: packages/ui/src/components/layout.tsx
Source SHA-256: 362f6ace32d99b9d89d79ed72b89451ec561e35a8d9fd42e67328921bce643bd

Arrange content vertically or side by side using field, action, panel and section spacing roles.

## Decision
Stack flows vertically; Inline flows horizontally and wraps by default. Choose field, action or section spacing with gap; render and content supply semantics.

## Notes
- Layout adds no border, surface, padding or business state; use Card for independent object boundaries.
- Role values are theme presets. Explain special className/style overrides in the project composition.
- Direction, language and density follow the DOM; wrapping does not reorder content.

## Use and ownership
- Content or action groups need consistent, independently adjustable relationship spacing.
- Avoid: Treating layout as enclosure or a page skeleton; numeric gaps without judging relationships.
- Library: Direction, alignment, wrapping, and role wiring.
- Application: Objects, order, region semantics, data, and persistent state.

## Composition
- Render Stack as section; compose existing actions with Inline; retain native table/grid for comparison.

## Responsive behavior
- Default wrapping retains content; this batch's page checks were desktop only by decision.

## Customization
- Adjust existing role tokens first; className/style are exceptions for project-specific relationships.

## Current exports
- Inline: function; owner layout; PASS; props: InlineProps
- InlineProps: type; owner layout; PASS
- LayoutGap: type; owner layout; PASS
- Stack: function; owner layout; PASS; props: StackProps
- StackProps: type; owner layout; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Stack
Vertical content flow.
- gap: "field" | "fields" | "actions" | "panel" | "section"; default "panel". Reads the corresponding relationship token.
- align: "start" | "center" | "end" | "stretch" | "baseline"; default "stretch". Cross-axis alignment.
- render / ref / native props: useRender.ComponentProps<"div">. Replace the element and forward native props, events and environment attributes.

### Inline
Adjacent actions or content with wrapping.
- gap: LayoutGap; default "actions". The same relationship roles as Stack.
- align: StackProps["align"]; default "center". Vertical alignment in a row.
- wrap: boolean; default true. Retains all content and permits wrapping. Consumers must verify capacity when false.
- render / ref / native props: useRender.ComponentProps<"div">. Defaults to div with no automatic group or toolbar role.

## Keyboard

## Source examples
### 纵向排列
Source: apps/docs/src/content/layout/demos/01-stack.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "纵向排列", titleEn: "Vertical layout" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm" render={<section aria-label="名称" />}>
      <Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field>
      <Field><FieldLabel>简称</FieldLabel><Input defaultValue="Qingye" /><FieldDescription>可选。</FieldDescription></Field>
    </Stack>
  );
}
```

### 横向排列与对齐
Source: apps/docs/src/content/layout/demos/02-inline.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";

export const meta = { title: "横向排列与对齐", titleEn: "Inline layout and alignment" };

export default function Demo() {
  return (
    <Stack gap="section" className="w-full">
      <Inline gap="actions" align="center"><Button size="sm">保存</Button><Button size="lg" variant="bordered">取消</Button></Inline>
      <Inline gap="panel" align="baseline" wrap={false}><Text step="heading" render={<span />}>青野</Text><Text render={<span />}>Qingye</Text></Inline>
    </Stack>
  );
}
```
