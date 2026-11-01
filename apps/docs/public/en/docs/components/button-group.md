# ButtonGroup

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/button-group
Source: packages/ui/src/components/button-group.tsx
Source SHA-256: 2f4dd719cf1870157eead31e1aef929258879c948157458f8751c2ad64463222

Give actions in one scope a shared name, spaced apart or attached into one body.

## Decision
The shared name identifies the scope; each button still names its action. ButtonGroup adds no selection, disabled propagation or toolbar keyboard behavior. Attached only changes the outline: adjacent edges merge into one line while each member keeps its name, focus and disabled state. A split button is an attached group with a primary action and an icon button that opens a Menu.

## Use and ownership
- Several actions share a named scope.
- Avoid: Replacing single/multiple selection or a toolbar with an action group.
- Library: Native group semantics and action spacing.
- Application: Scope, name, and each action's state.

## Composition
- Use Group and action-gap; Button members retain their own actual states.
- Use ButtonGroupText for a static text segment and ButtonGroupSeparator between members; the icon button of a split button needs an accessible name.

## Responsive behavior
- Horizontal groups wrap by default; vertical groups are available. Attached groups do not wrap and their adjacent edges merge.

## Customization
- className and render belong to the group; do not rewrite every child Button.

## Current exports
- ButtonGroup: function; owner button-group; PASS; props: ButtonGroupProps
- ButtonGroupOrientation: type; owner button-group; PASS
- ButtonGroupProps: type; owner button-group; PASS
- ButtonGroupSeparator: function; owner button-group; PASS; props: ButtonGroupSeparatorProps
- ButtonGroupSeparatorProps: type; owner button-group; PASS
- ButtonGroupText: function; owner button-group; PASS; props: ButtonGroupTextProps
- ButtonGroupTextProps: type; owner button-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ButtonGroup
- `align?`: `"center" | "start" | "end" | "stretch" | "baseline"`. 交叉轴对齐（Stack 为横向，Inline 为纵向）。
- `attached?`: `boolean`. 连体：相邻按钮的边合并成一条线，只保留整组外侧的圆角；横排纵排都成立。默认保持各自独立、带动作间隔。
- `justify?`: `"center" | "start" | "end" | "between" | "around" | "evenly"`. 主轴分布（Stack 为纵向，Inline 为横向）。纵向分布需要容器高于内容才看得出。
- `orientation?`: `"horizontal" | "vertical"`.
- `wrap?`: `boolean`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ButtonGroupSeparator
- `decorative?`: `boolean`. 已有文字/结构表达分界时，线条仅作装饰。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ButtonGroupText
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`. 与同组按钮同一档。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context OrientationContext: without a provider default-value; provided by ButtonGroup

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ButtonGroup
An open action relationship with role=group by default.
- aria-label / aria-labelledby: string. One is required: the shared scope name, separate from action names. A missing or blank name throws.
- orientation: "horizontal" | "vertical"; default "horizontal". Layout direction.
- attached: boolean; default false. Attach members: adjacent edges merge into one line and only the outer corners of the whole group stay rounded, horizontal or vertical. The hovered or focused member is raised so its edge shows in full. Attached groups do not wrap.
- align / wrap / render / ref / native props: ButtonGroupProps. Uses Group composition props with action spacing.

### ButtonGroupText
A static text segment in the group, as tall as a bordered button of the same size with the same outline; not clickable and outside the tab order.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". The same size as the buttons in the group.
- render / ref / native props: useRender props. A span by default.

### ButtonGroupSeparator
A divider between members, perpendicular to the group axis; also usable in groups that are not attached.
- decorative: boolean; default true. Members already express the boundary, so it is decorative by default; false exposes an oriented separator.

## Keyboard
- Tab / Shift+Tab: Visit each available action; disabled actions leave the tab order.

## Source examples
### 动作范围
Source: apps/docs/src/content/button-group/demos/01-actions.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";

export const meta = { title: "动作范围", titleEn: "Action scope" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑"><Button>应用</Button><Button variant="bordered">重置</Button><Button variant="quiet" disabled>撤销</Button></ButtonGroup>;
}
```

### 纵向
Source: apps/docs/src/content/button-group/demos/02-vertical.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";

export const meta = { title: "纵向", titleEn: "Vertical" };
export default function Demo() {
  return <ButtonGroup aria-label="编辑" orientation="vertical" align="start"><Button>应用</Button><Button variant="bordered">重置</Button></ButtonGroup>;
}
```

### 连体
Source: apps/docs/src/content/button-group/demos/03-attached.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "连体", titleEn: "Attached" } satisfies DemoMeta;
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-section-gap)">
    <ButtonGroup aria-label="视图" attached><Button variant="bordered">列表</Button><Button variant="bordered">网格</Button><Button variant="bordered">时间线</Button></ButtonGroup>
    <ButtonGroup aria-label="排序" attached orientation="vertical" align="start"><Button variant="bordered">按名称</Button><Button variant="bordered">按时间</Button><Button variant="bordered">按大小</Button></ButtonGroup>
  </div>;
}
```

### 拆分按钮
Source: apps/docs/src/content/button-group/demos/04-split.tsx
```tsx
import { IconChevronDown } from "@tabler/icons-react";
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuTrigger } from "@qingye_lab/ui/components/menu";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拆分按钮", titleEn: "Split button" } satisfies DemoMeta;
export default function Demo() {
  return <ButtonGroup aria-label="发布" attached>
    <Button variant="bordered">发布</Button>
    <Menu><MenuTrigger render={<Button variant="bordered" shape="icon" aria-label="更多发布方式" />}><IconChevronDown aria-hidden="true" /></MenuTrigger><MenuPortal><MenuPositioner align="end"><MenuPopup>
      <MenuItem>定时发布</MenuItem><MenuItem>存为草稿</MenuItem>
    </MenuPopup></MenuPositioner></MenuPortal></Menu>
  </ButtonGroup>;
}
```

### 文字段与分隔
Source: apps/docs/src/content/button-group/demos/05-text.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@qingye_lab/ui/components/button-group";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文字段与分隔", titleEn: "Text segment and separator" } satisfies DemoMeta;
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-section-gap)">
    <ButtonGroup aria-label="分页" attached><Button variant="bordered">上一页</Button><ButtonGroupText>3 / 12</ButtonGroupText><Button variant="bordered">下一页</Button></ButtonGroup>
    <ButtonGroup aria-label="文本样式"><Button variant="quiet">加粗</Button><ButtonGroupSeparator /><Button variant="quiet">斜体</Button><ButtonGroupSeparator /><Button variant="quiet">下划线</Button></ButtonGroup>
  </div>;
}
```
