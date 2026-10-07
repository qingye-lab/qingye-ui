# 链接 Link

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/link
Source: packages/ui/src/components/link.tsx
Source SHA-256: df69ad19901d776578f8dcb288ae1a4907a55645774cf3b5d2976389349c820d

去往一个地址的文字入口；全库文字链接共用这一种画法。

## Decision
链接去往一个地方，按钮执行一个动作。下划线常在，平时是重墨，悬停与焦点时加深为文字本色；不加粗，不外扩焦点。行内链接不扩展命中区。

## Use and ownership
- 正文或说明中去往另一页、另一处的入口。
- Avoid: 执行动作（保存、删除、提交）用 Button，不用链接。
- Avoid: 成列的同等导航入口（导航菜单、侧栏、分页）由位置表明是导航，使用各自组件，不逐项加下划线。
- Library: 下划线、悬停、焦点与可访问名称的画法。
- Application: 地址、路由、当前位置与权限。

## Composition
- 路由链接通过 render 接入；Breadcrumb、Item、Toolbar、HoverCard 读取 linkClassName。

## Responsive behavior
- 长链接文字随正文换行；独立成行的入口由调用方加 touch-target。

## Customization
- 颜色读墨阶；品牌可通过主题改文字色，不改下划线常在的规则。

## Current exports
- Link: function; owner link; PASS; props: LinkProps
- linkClassName: const; owner link; UNVERIFIED
- LinkProps: type; owner link; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Link
原生 a 元素；href、target、rel 等原生属性与 render/ref 透传。
- render / ref / 原生属性: useRender.ComponentProps<"a">. 路由库的链接组件通过 render 接入。

### linkClassName
同一画法的类名，供需要渲染原语自身链接部位的组件使用。

## Keyboard

## Source examples
### 正文中的链接
Source: apps/docs/src/content/link/demos/01-inline.tsx
```tsx
import { Link } from "@qingye/ui/components/link";
export const meta = { title: "正文中的链接", titleEn: "Links in text" };
export default function Demo() {
  return <p className="max-w-prose text-body text-foreground">同步失败的记录保留在 <Link href="#records">接入记录</Link> 中，修正来源后可以 <Link href="#retry">重新同步</Link>。删除集合前，请先阅读 <Link href="#retention">保留策略</Link>。</p>;
}
```
