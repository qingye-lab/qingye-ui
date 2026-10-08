# 布局 Layout

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/layout
Source: packages/ui/src/components/layout.tsx
Source SHA-256: 362f6ace32d99b9d89d79ed72b89451ec561e35a8d9fd42e67328921bce643bd

用纵向堆叠与横向排列组织内容，间隔按字段、动作、面板或分节关系选择。

## Decision
Stack 纵向排列，Inline 横向排列并默认换行。gap 选择字段、动作或分节关系；语义由 render 与内容提供。

## Notes
- 布局没有边框、表面、内边距或业务状态；独立对象边界用 Card。
- 角色数值是主题预设。确有特殊关系时在项目组合说明 className/style 覆写理由。
- 方向、语言与密度沿真实 DOM 继承；换行不改变内容顺序。

## Use and ownership
- 内容组或动作组需要一致、可独立调整的关系间隔。
- Avoid: 把布局当围合或页面骨架；用数字 gap 代替关系判断。
- Library: 方向排列、对齐、换行与角色接线。
- Application: 对象、顺序、区域语义、数据与持久状态。

## Composition
- Stack render 成 section；Inline 组合现有动作；比较保留原生 table/grid。

## Responsive behavior
- 默认换行保留内容；本批页面按裁决只验桌面。

## Customization
- 优先修改已有角色 token；className/style 是项目特殊关系的例外出口。

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
按内容顺序纵向排列。
- gap: "field" | "fields" | "actions" | "panel" | "section"; default "panel". 分别读取 field-gap、field-group-gap、action-gap、panel-gap、section-gap。
- align: "start" | "center" | "end" | "stretch" | "baseline"; default "stretch". 横轴对齐。
- render / ref / 原生属性: useRender.ComponentProps<"div">. 替换元素，透传事件、语言、方向、密度与原生属性。

### Inline
相邻动作或内容，可换行。
- gap: LayoutGap; default "actions". 与 Stack 相同的关系角色。
- align: StackProps["align"]; default "center". 横排的垂直对齐。
- wrap: boolean; default true. 保留全部内容并允许折行。false 需由消费方验证容量。
- render / ref / 原生属性: useRender.ComponentProps<"div">. 默认 div；没有自动 group/toolbar 语义。

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
