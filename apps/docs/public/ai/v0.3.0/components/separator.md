# 分隔线 Separator

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/separator
Source: packages/ui/src/components/separator.tsx
Source SHA-256: 09c9465dab150b015ce7263847f9648bd92f0a1677a88dd7b3891c9b46ef6972

在内容组之间画一条 1px 的细线，横向分开段落区块，纵向分开行内的链接或操作。

## Use and ownership
- 需要视觉或语义分隔已经不同的内容范围。
- Avoid: 每两行都画线；把 Separator 当可拖动分隔条；只靠线说明新任务开始。
- Library: 分隔原语、方向与边界颜色。
- Application: 内容分组、边界是否需要辅助技术感知。

## Composition
- 标题和间距先说明关系；separator 只是边界，需要调面板大小时用 ResizableHandle。

## Responsive behavior
- 横竖方向随实际布局选择，不用固定高度把相邻控件挤压。

## Customization
- orientation 决定几何；颜色来自边界角色，装饰与语义选择遵守当前原语 API。

## Current exports
- Separator: function; owner separator; PASS; props: SeparatorPrimitive.Props
- SeparatorPrimitive: reexport; owner separator; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Separator
带 role="separator" 的细线，颜色为半透明边框色，在任何底色上都协调。
- orientation: "horizontal" | "vertical"; default "horizontal". 横线占满宽度；竖线在 flex 行内自动拉伸到行高，也可用 h-* 指定高度。

## Keyboard

## Source examples
### 横向
Source: apps/docs/src/content/separator/demos/01-horizontal.tsx
```tsx
import { Separator } from "@qingye/ui/components/separator";

export const meta = { title: "横向" };

export default function Demo() {
  return (
    <div className="w-full max-w-xs text-sm">
      <div className="flex flex-col gap-1">
        <p className="font-medium">青烟设计系统</p>
        <p className="text-muted-foreground">克制、耐看的界面组件与设计令牌。</p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-1">
        <p className="font-medium">版本 0.1.0</p>
        <p className="text-muted-foreground">2026 年 10 月 1 日发布</p>
      </div>
    </div>
  );
}
```

### 纵向
Source: apps/docs/src/content/separator/demos/02-vertical.tsx
```tsx
import { Separator } from "@qingye/ui/components/separator";

export const meta = { title: "纵向", description: "在 flex 行内自动拉伸到行高。" };

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 text-sm">
      <nav aria-label="页脚" className="flex items-center gap-3 text-muted-foreground">
        <a className="hover:text-foreground" href="#">文档</a>
        <Separator orientation="vertical" />
        <a className="hover:text-foreground" href="#">更新日志</a>
        <Separator orientation="vertical" />
        <a className="hover:text-foreground" href="#">问题反馈</a>
      </nav>
      <div className="flex h-12 items-center gap-4 rounded-xl border px-4">
        <div>
          <div className="text-muted-foreground text-xs">今日访问</div>
          <div className="numeric font-medium">3,206</div>
        </div>
        <Separator orientation="vertical" />
        <div>
          <div className="text-muted-foreground text-xs">转化率</div>
          <div className="numeric font-medium">4.8%</div>
        </div>
      </div>
    </div>
  );
}
```

