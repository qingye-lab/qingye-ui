# 浮起面板 Popover

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/popover
Source: packages/ui/src/components/popover.tsx
Source SHA-256: 9f9eb4f052d7aa7179e2ef48069533993ff88efba27d291f79d3a9e1bc362879

与触发对象绑定的非阻断浮层，承载局部操作与补充信息。

## Decision
关闭只收起浮层，不代表提交或撤销完成。草稿与结果由应用持有；唯一的关键后果须留在持续工作面。

## Notes
- Popover 始终非阻断；需要阻断决定时用 Dialog 或 AlertDialog。
- 点击外部入口后保留该入口的焦点，键盘关闭则返回触发者。
- 默认 Portal 挂到 body，无法继承触发者局部 DOM 上下文；container 必须在打开前挂载。
- 开关、焦点与定位由 Base UI 管理；入退动效仅由 motion.css 管理。

## Use and ownership
- 在触发对象旁展开局部操作或补充信息，主工作面仍可使用。
- Avoid: 阻断式任务；唯一关键后果；把关闭当成保存或取消成功。
- Library: 本地打开请求、触发关联、定位、焦点与返回。
- Application: 草稿、业务动作、异步结果、受控 open 与触发器消失后的返回目标。

## Composition
- Trigger 关联对象；Title/Description 建立名称；Close、Esc 与外部入口提供返回。

## Responsive behavior
- 在可用高度内滚动，保留焦点内缘；关闭方式与非阻断语义不变。

## Customization
- 集中表面与浮层圆角；原生属性与定位层透传；不按子内容追加视觉特判。

## Current exports
- Popover: function; owner popover; PASS; props: PopoverProps<Payload>
- PopoverClose: function; owner popover; PASS; props: PopoverPrimitive.Close.Props
- PopoverContent: function; owner popover; alias of PopoverPopup; PASS; props: PopoverPopupProps
- PopoverCreateHandle: const; owner popover; PASS
- PopoverDescription: function; owner popover; PASS; props: PopoverPrimitive.Description.Props
- PopoverPopup: function; owner popover; PASS; props: PopoverPopupProps
- PopoverPopupProps: interface; owner popover; PASS
- PopoverPrimitive: reexport; owner popover; UNVERIFIED
- PopoverProps: type; owner popover; PASS
- PopoverTitle: function; owner popover; PASS; props: PopoverPrimitive.Title.Props
- PopoverTrigger: function; owner popover; PASS; props: PopoverPrimitive.Trigger.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- 默认 Portal 挂到 body，无法继承触发者局部 DOM 上下文；container 必须在打开前挂载。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Popover
管理非阻断打开状态，完整继承 Base UI Root 的控制契约。modal 已移除。
- open / defaultOpen: boolean; default false. 受控 / 非受控打开状态。
- onOpenChange: (open, details) => void. 原语报告请求及原因，应用决定受控状态。
- handle / triggerId / defaultTriggerId: Handle / string. 共享触发器或受控初始打开时，建立明确关联。

### PopoverTrigger / PopoverClose
原生触发与关闭入口；支持 render、ref、style、事件及按状态求值的 className。

### PopoverPopup
浮起表面、定位与可滚动内容层；别名 PopoverContent。无日历或 tooltip 样式特判。
- side / align: Positioner.Props; default bottom / center. 相对触发者的方向与对齐；由原语处理碰撞。
- sideOffset / alignOffset / anchor: Positioner.Props; default 0 / 0 / trigger. 明确定位关系。默认间距沿用原语 0，不推断内容类型。
- initialFocus / finalFocus: Popup.Props; default true / true. 默认原语管理焦点与返回；触发者将被移除时，finalFocus 指定有意义上级。
- portalProps: Portal.Props. 局部密度、方向、语言或主题需保留时，将 container 指向已挂载的上下文容器。
- positionerProps / viewportProps: Positioner.Props / Viewport.Props. 透传 className、style、ref、render 和原生属性；Positioner 共享 popup 层级先合并，调用方 style 最后合并。

### PopoverTitle / PopoverDescription
关联浮层的可访问名称与说明。

### PopoverCreateHandle / PopoverPrimitive
类型化共享触发器 handle 与 Base UI 原语命名空间。

## Keyboard
- Enter / Space: 在触发器上打开或关闭。
- Esc: 关闭并返回触发者，或指定的 finalFocus。
- Tab / Shift+Tab: 遍历内容，允许离开浮层回到工作面。

## Source examples
### 多行输入
Source: apps/docs/src/content/popover/demos/01-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { Textarea } from "@qingye/ui/components/textarea";
import { useState } from "react";

export const meta = { title: "多行输入", titleEn: "Multiline input" };

export default function Demo() {
  const [draft, setDraft] = useState("");
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="quiet" />}>编辑备注</PopoverTrigger>
      <PopoverPopup className="w-80">
        <Stack gap="panel">
          <PopoverTitle>编辑备注</PopoverTitle>
          <Field>
            <FieldLabel>备注</FieldLabel>
            <Textarea onChange={(event) => setDraft(event.target.value)} value={draft} />
          </Field>
          <PopoverClose render={<Button variant="quiet" />}>关闭</PopoverClose>
        </Stack>
      </PopoverPopup>
    </Popover>
  );
}
```

### 关闭按钮
Source: apps/docs/src/content/popover/demos/02-close-button.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverDescription, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { InfoIcon, XIcon } from "lucide-react";

export const meta = { title: "关闭按钮", titleEn: "Close button" };

export default function Demo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button aria-label="详细信息" shape="icon" variant="quiet" />}><InfoIcon aria-hidden="true" /></PopoverTrigger>
      <PopoverPopup className="w-72">
        <Stack gap="panel">
          <Inline gap="panel" className="justify-between">
            <PopoverTitle>青野 Qingye UI</PopoverTitle>
            <PopoverClose aria-label="关闭" render={<Button shape="icon" size="sm" variant="quiet" />}><XIcon aria-hidden="true" /></PopoverClose>
          </Inline>
          <PopoverDescription>React 组件库</PopoverDescription>
        </Stack>
      </PopoverPopup>
    </Popover>
  );
}
```

### 位置
Source: apps/docs/src/content/popover/demos/03-sides.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Inline } from "@qingye/ui/components/layout";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";

export const meta = { title: "位置", titleEn: "Placement" };

const places = [
  { side: "top", label: "上方" },
  { side: "inline-end", label: "行尾" },
  { side: "bottom", label: "下方" },
  { side: "inline-start", label: "行首" },
] as const;

export default function Demo() {
  return (
    <Inline className="justify-center">
      {places.map(({ side, label }) => (
        <Popover key={label}>
          <PopoverTrigger render={<Button variant="quiet" />}>{label}</PopoverTrigger>
          <PopoverPopup side={side}>
            <PopoverTitle>{label}</PopoverTitle>
          </PopoverPopup>
        </Popover>
      ))}
    </Inline>
  );
}
```

### 共享面板
Source: apps/docs/src/content/popover/demos/04-shared.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverCreateHandle, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { useMemo } from "react";

export const meta = { title: "共享面板", titleEn: "Shared popup" };

export default function Demo() {
  const handle = useMemo(() => PopoverCreateHandle<string>(), []);
  return (
    <Inline>
      <PopoverTrigger handle={handle} payload="第一项" render={<Button variant="quiet" />}>第一项</PopoverTrigger>
      <PopoverTrigger handle={handle} payload="第二项" render={<Button variant="quiet" />}>第二项</PopoverTrigger>
      <Popover handle={handle}>
        {({ payload }) => (
          <PopoverPopup>
            <Stack gap="panel">
              <PopoverTitle>{payload}</PopoverTitle>
              <PopoverClose render={<Button size="sm" variant="quiet" />}>关闭</PopoverClose>
            </Stack>
          </PopoverPopup>
        )}
      </Popover>
    </Inline>
  );
}
```

### 局部语言与密度
Source: apps/docs/src/content/popover/demos/05-context.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Stack } from "@qingye/ui/components/layout";
import { Popover, PopoverClose, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye/ui/components/popover";
import { useRef } from "react";

import { Text } from "@qingye/ui/components/typography";

export const meta = { title: "局部语言与密度", titleEn: "Local language and density" };

export default function Demo() {
  const context = useRef<HTMLDivElement>(null);
  return (
    <div data-density="compact" dir="rtl" lang="ar" ref={context}>
      <Popover>
        <PopoverTrigger render={<Button variant="quiet" />}>فتح</PopoverTrigger>
        <PopoverPopup portalProps={{ container: context }}>
          <Stack gap="panel">
            <PopoverTitle>ملاحظة</PopoverTitle>
            <Text>نص قصير.</Text>
            <PopoverClose render={<Button size="sm" variant="quiet" />}>إغلاق</PopoverClose>
          </Stack>
        </PopoverPopup>
      </Popover>
    </div>
  );
}
```
