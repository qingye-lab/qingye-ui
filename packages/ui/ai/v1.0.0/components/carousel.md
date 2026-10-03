# 顺序阅读 Carousel

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/carousel
Source: packages/ui/src/components/carousel.tsx
Source SHA-256: 80dd0c9b1630eae28d8c95c64e3997081939f8d62a5e5ae61247a5205873b2e8

手动访问有限内容，保留真实当前位置与前后边界。

## Decision
位置不代表已经阅读或完成；默认不播放、不环回。只有当前项可达，所有项保持原生输入。

## Notes
- 没有自动播放或环回API。
- 隐藏项保持字段；是否提交或禁用由应用原生字段属性决定。
- 当前项移除或外部切换时只恢复仍属旧项的焦点，外部焦点不被夺回。
- 受控value必须指向现存项，稳定id不能按当前索引替换。

## Use and ownership
- 有限内容需主动按顺序访问。
- Avoid: 自动播放关键内容或把当前位置写成完成。
- Library: 当前呈现、首尾与必要焦点恢复。
- Application: 内容、输入、业务事实与受控值。

## Composition
- Button + 原生ScrollArea；items保存实际内容。

## Responsive behavior
- 长名称换行；容量由原生滚动承接。

## Customization
- 共享panel/action gap、文字与盒内焦点，不新增全局几何token。

## Current exports
- Carousel: function; owner carousel; PASS; props: CarouselProps
- CarouselItem: type; owner carousel; PASS
- CarouselProps: type; owner carousel; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Carousel
有名称的阅读region、原生ScrollArea与Button前后入口。
- label: string. 整个阅读对象的非空可访问名称。
- items: readonly { id: string; label: string; content: ReactNode }[]. 有限真实内容、唯一稳定id与非空项名称。
- value / defaultValue / onValueChange: string / string / (id: string) => void. 当前项id与变更请求；受控值由调用方接受。非受控项移除后回到首个现存项。
- emptyContent: ReactNode. 没有项时的真实内容；不伪造当前位置或前后入口。
- render / ref / style / className / 原生属性: useRender.ComponentProps<section>. 公共组合、id、ARIA、事件与ref。

## Keyboard
- Enter / Space: 操作当前前后Button；首尾aria-disabled保持焦点且不改变位置。
- ArrowLeft / ArrowRight / Home / End: 仅根自身获得焦点时切换；左右跟随实际direction，不截获输入字段键盘。
- Tab / Shift+Tab: 访问当前项及前后控件，关闭项不可达。

## Source examples
### 有限内容与输入
Source: apps/docs/src/content/carousel/demos/01-states.tsx
```tsx
import { Carousel } from "@qingye/ui/components/carousel";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "有限内容与输入", titleEn: "Finite content and inputs" };
export default function CarouselDemo() {
  return <Carousel label="控件状态" className="w-full max-w-sm" items={[
    { id: "editable", label: "输入", content: <Stack gap="field"><Label htmlFor="carousel-editable">输入</Label><Input id="carousel-editable" /></Stack> },
    { id: "readonly", label: "只读", content: <Stack gap="field"><Label htmlFor="carousel-readonly">只读</Label><Input id="carousel-readonly" readOnly defaultValue="只读" /></Stack> },
    { id: "disabled", label: "禁用", content: <Stack gap="field"><Label htmlFor="carousel-disabled">禁用</Label><Input id="carousel-disabled" disabled /></Stack> },
  ]} />;
}
```
