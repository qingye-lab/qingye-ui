# 滚动区域 Scroll Area

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/scroll-area
Source: packages/ui/src/components/scroll-area.tsx
Source SHA-256: 9680749038f5e1eb94d6df7f90b7ac89ee5684f1525c7077476bd81b53e87e12

在固定尺寸的区域内滚动内容，滚动条纤细且只在悬停或滚动时出现，可选边缘渐隐提示还有更多内容。

## Use and ownership
- 固定工作面需保留较长内容，并让滚动位置和边界可理解。
- Avoid: 给所有页面再套嵌套滚动；渐隐遮住错误或末尾动作；容器没确定高度却期待纵向滚动。
- Library: 滚动原语、视口、滚动条、边界渐隐与内容最小宽度。
- Application: 高度边界、滚动恢复、名称和内容中的焦点顺序。

## Composition
- 宿主确定尺寸；Viewport 原语承担键盘滚动，滚动条与可选 fade 表达仍有内容，内容自身保留语义。

## Responsive behavior
- 宽内容按真实需求横向滚动；不要把表格列强制压成一行窄字。

## Customization
- fill/clampContentMinWidth/scrollbarGutter 按工作面选择，overscrollContain 只在需要局部滚动时开启。

## Current exports
- ScrollArea: function; owner scroll-area; PASS; props: ScrollAreaPrimitive.Root.Props & {
  scrollFade?: boolean;
  scrollbarGutter?: boolean;
  fill?: boolean;
  clampContentMinWidth?: boolean;
  overscrollContain?: boolean;
}
- ScrollAreaPrimitive: reexport; owner scroll-area; UNVERIFIED
- ScrollBar: function; owner scroll-area; PASS; props: ScrollAreaPrimitive.Scrollbar.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ScrollArea
根组件，内含视口、内容、纵横两条滚动条。尺寸由外部决定（如 h-72 或父级 flex）。
- scrollFade: boolean; default false. 在有更多内容的一侧显示 1.5rem 渐隐遮罩。
- scrollbarGutter: boolean; default false. 出现滚动条时为它预留空间，避免盖住内容。
- fill: boolean; default false. 让内容撑满视口，适合内部再做 flex 布局。
- overscrollContain: boolean; default false. 滚动到边界时不带动外层页面。
- clampContentMinWidth: boolean; default true. 限制内容最小宽度为 0，避免长内容意外撑出横向滚动。横向滚动场景内容自身需给出宽度（如 w-max）。

### ScrollBar
单独的滚动条，ScrollArea 已内置纵横两条，一般无需手动使用。

## Keyboard
- Tab: 视口可获得焦点（显示焦点环），之后用方向键、PageUp / PageDown 滚动。

## Source examples
### 纵向
Source: apps/docs/src/content/scroll-area/demos/01-vertical.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";
import { Separator } from "@qingye/ui/components/separator";
import { Fragment } from "react";

export const meta = { title: "纵向" };

const releases = Array.from({ length: 24 }, (_, i) => `v2.${24 - i}.0`);

export default function Demo() {
  return (
    <ScrollArea className="h-64 w-48 rounded-lg border">
      <div className="p-4">
        <p className="mb-3 font-medium text-sm">版本记录</p>
        {releases.map((tag, i) => (
          <Fragment key={tag}>
            {i > 0 ? <Separator className="my-2" /> : null}
            <p className="numeric text-muted-foreground text-sm">{tag}</p>
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### 横向
Source: apps/docs/src/content/scroll-area/demos/02-horizontal.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";

export const meta = { title: "横向", description: "内容用 w-max 保持自身宽度。" };

const works = [
  { title: "山行", author: "林晓", tone: "from-sky-200 to-indigo-300" },
  { title: "雾港", author: "周舟", tone: "from-emerald-200 to-teal-300" },
  { title: "晚灯", author: "陈默", tone: "from-amber-200 to-orange-300" },
  { title: "长街", author: "许诺", tone: "from-rose-200 to-fuchsia-300" },
  { title: "初雪", author: "王一然", tone: "from-slate-200 to-slate-300" },
];

export default function Demo() {
  return (
    <ScrollArea className="w-full max-w-md rounded-lg border">
      <div className="flex w-max gap-3 p-4">
        {works.map((work) => (
          <figure className="w-36 shrink-0" key={work.title}>
            <div className={`aspect-[3/4] rounded-md bg-gradient-to-br ${work.tone} dark:opacity-80`} />
            <figcaption className="mt-2 text-muted-foreground text-xs">
              <span className="font-medium text-foreground">{work.title}</span> · {work.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### 边缘渐隐
Source: apps/docs/src/content/scroll-area/demos/03-fade.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";

export const meta = {
  title: "边缘渐隐",
  description: "scrollFade 只在还有内容的一侧渐隐，滚到底后自然消失。",
};

const terms = [
  "一、服务内容。青烟云为你提供云端部署、监控与日志服务，具体以控制台展示为准。",
  "二、账号安全。你应妥善保管账号与访问令牌，因保管不当造成的损失由你自行承担。",
  "三、数据处理。我们仅在提供服务所必需的范围内处理你的数据，不会出售给第三方。",
  "四、费用与结算。按量计费项目每日结算，包年包月项目在开通时一次性扣费。",
  "五、服务变更。重大变更将提前 30 日通过站内信与邮件通知。",
  "六、争议解决。协议适用中华人民共和国法律，争议提交服务提供方所在地法院管辖。",
];

export default function Demo() {
  return (
    <ScrollArea className="h-48 w-full max-w-sm rounded-lg border" scrollFade>
      <div className="flex flex-col gap-3 p-4 text-muted-foreground text-sm leading-relaxed">
        {terms.map((term) => (
          <p key={term}>{term}</p>
        ))}
      </div>
    </ScrollArea>
  );
}
```

