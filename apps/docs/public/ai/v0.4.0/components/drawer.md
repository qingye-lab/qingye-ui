# 抽屉 Drawer

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/drawer
Source: packages/ui/src/components/drawer.tsx
Source SHA-256: 881ad8ac62a6777c96411215a2ceb6e87a82346560b2e8da3f75a5bbdeb88012

可拖拽关闭的边缘面板，移动端的首选浮层：支持拖动手柄、吸附高度、嵌套层叠和动作菜单。桌面端的详情面板用 Sheet 即可。

## Use and ownership
- 移动端需要拖动和吸附高度的边缘任务面板，或面向当前对象的动作列表。
- Avoid: 拖动手柄不能成为唯一退出；手势关闭不等于业务取消，嵌套不能让父对象失去返回依据。
- Library: 管理吸附、滑动、嵌套层次、名称与焦点；动作菜单的危险状态在悬停和焦点时持续可见。
- Application: 决定退出条件、草稿保留、请求结果与何时禁止关闭；操作完成依据真实事件。

## Composition
- Title 命名对象，Panel 区分可滚动可选取内容，Footer / Close 提供可点出口；动作选项复用 DrawerMenu。

## Responsive behavior
- 保证安全区、长内容滚动与可点击关闭；真实滑动手势要在触屏上验证，模拟键盘不替代。

## Customization
- position 联动滑动方向，variant 控制边界；抽屉缓动来自公共 drawer 角色。

## Current exports
- Drawer: function; owner drawer; PASS; props: DrawerPrimitive.Root.Props & {
  position?: DrawerPosition;
}
- DrawerBackdrop: function; owner drawer; PASS; props: DrawerPrimitive.Backdrop.Props
- DrawerBar: function; owner drawer; PASS; props: useRender.ComponentProps<"div"> & {
  position?: DrawerPosition;
}
- DrawerClose: function; owner drawer; PASS; props: DrawerPrimitive.Close.Props
- DrawerContent: const; owner drawer; PASS
- DrawerCreateHandle: const; owner drawer; PASS
- DrawerDescription: function; owner drawer; PASS; props: DrawerPrimitive.Description.Props
- DrawerFooter: function; owner drawer; PASS; props: useRender.ComponentProps<"div"> & {
  variant?: "default" | "bare";
  allowSelection?: boolean;
}
- DrawerHeader: function; owner drawer; PASS; props: useRender.ComponentProps<"div"> & {
  allowSelection?: boolean;
}
- DrawerMenu: function; owner drawer; PASS; props: useRender.ComponentProps<"nav">
- DrawerMenuCheckboxItem: function; owner drawer; PASS; props: CheckboxPrimitive.Root.Props & {
  variant?: "default" | "switch";
  render?: React.ReactElement;
}
- DrawerMenuGroup: function; owner drawer; PASS; props: useRender.ComponentProps<"div">
- DrawerMenuGroupLabel: function; owner drawer; PASS; props: useRender.ComponentProps<"div">
- DrawerMenuItem: function; owner drawer; PASS; props: useRender.ComponentProps<"button"> & {
  variant?: "default" | "destructive";
}
- DrawerMenuRadioGroup: function; owner drawer; PASS; props: RadioGroupPrimitive.Props
- DrawerMenuRadioItem: function; owner drawer; PASS; props: RadioPrimitive.Root.Props & {
  value: string;
  render?: React.ReactElement;
}
- DrawerMenuSeparator: function; owner drawer; PASS; props: useRender.ComponentProps<"div">
- DrawerMenuTrigger: function; owner drawer; PASS; props: DrawerPrimitive.Trigger.Props
- DrawerPanel: function; owner drawer; PASS; props: useRender.ComponentProps<"div"> & {
  scrollFade?: boolean;
  scrollable?: boolean;
  allowSelection?: boolean;
}
- DrawerPopup: function; owner drawer; PASS; props: DrawerPrimitive.Popup.Props & {
  showCloseButton?: boolean;
  position?: DrawerPosition;
  variant?: "default" | "straight" | "inset";
  showBar?: boolean;
  portalProps?: DrawerPrimitive.Portal.Props;
  closeProps?: DrawerPrimitive.Close.Props;
}
- DrawerPortal: const; owner drawer; PASS
- DrawerPrimitive: reexport; owner drawer; UNVERIFIED
- DrawerSwipeArea: function; owner drawer; PASS; props: DrawerPrimitive.SwipeArea.Props & {
  position?: DrawerPosition;
}
- DrawerTitle: function; owner drawer; PASS; props: DrawerPrimitive.Title.Props
- DrawerTrigger: function; owner drawer; PASS; props: DrawerPrimitive.Trigger.Props
- DrawerViewport: function; owner drawer; PASS; props: DrawerPrimitive.Viewport.Props & {
  position?: DrawerPosition;
  variant?: "default" | "straight" | "inset";
}

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Drawer
根组件，管理打开状态、方向和吸附点。
- position: "bottom" | "top" | "left" | "right"; default "bottom". 滑入的边；同时决定滑动关闭的方向。
- open / defaultOpen: boolean; default false. 受控 / 非受控的打开状态。
- onOpenChange: (open, details) => void. 打开状态变化时调用。
- snapPoints: (number | string)[]. 吸附高度：0–1 为视口比例，大于 1 为像素，也可写 "300px"、"20rem"。
- snapPoint / onSnapPointChange: SnapPoint | null. 受控的当前吸附点。
- snapToSequentialPoints: boolean; default false. 快速甩动时只移动到相邻的吸附点。
- swipeDirection: "down" | "up" | "left" | "right". 覆盖由 position 推断的关闭方向。
- modal: boolean | "trap-focus"; default true. 是否锁定页面并限制焦点。

### DrawerTrigger
打开抽屉的按钮。

### DrawerPopup
抽屉本体，自带遮罩。嵌套打开时父级自动缩小后退。
- variant: "default" | "inset" | "straight"; default "default". inset 在宽屏下留出边距并四角圆角；straight 无圆角，适合侧边导航。
- showBar: boolean; default false. 显示拖动手柄。
- showCloseButton: boolean; default false. 显示右上角关闭按钮。
- position: 同 Drawer. 单独覆盖弹出方向。
- closeProps / portalProps: object. 透传给内置关闭按钮 / Portal。

### DrawerHeader / DrawerTitle / DrawerDescription
标题区；标题作为抽屉的可访问名称。

### DrawerPanel
正文区。
- scrollable: boolean; default true. 内容超出时在此滚动；短表单可关闭。
- scrollFade: boolean; default true. 滚动边缘渐隐。
- allowSelection: boolean; default true. 允许选中文字；关闭后整块可用于拖动。

### DrawerFooter
操作区，自动避让 iOS 底部安全区。
- variant: "default" | "bare"; default "default". default 带分隔线与底色；bare 无背景。

### DrawerClose
关闭抽屉的按钮。

### DrawerMenu
抽屉内的动作菜单：DrawerMenuItem、DrawerMenuCheckboxItem（含 switch 变体）、DrawerMenuRadioGroup / DrawerMenuRadioItem、DrawerMenuGroup / DrawerMenuGroupLabel、DrawerMenuSeparator、DrawerMenuTrigger（打开下一级抽屉）。

### DrawerSwipeArea
放在屏幕边缘的感应区，从边缘滑动即可拉出抽屉。

## Keyboard
- Esc: 关闭最上层抽屉，焦点回到触发器。
- Tab / Shift + Tab: 在抽屉内循环移动焦点。
- Enter / Space: 执行菜单项或切换选项。

## Source examples
### 基础用法
Source: apps/docs/src/content/drawer/demos/01-default.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";

export const meta = { title: "基础用法", description: "默认从底部滑出，showBar 显示拖动手柄，向下拖动即可关闭。" };

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>扫码结果</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader className="text-center">
          <DrawerTitle>已识别设备 YQ-SC-20391</DrawerTitle>
          <DrawerDescription>仓库 3 号扫码枪 · 华东仓储 · 在线</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter variant="bare" className="sm:justify-center">
          <DrawerClose render={<Button variant="outline" />}>继续扫码</DrawerClose>
          <DrawerClose render={<Button />}>查看设备</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### 四个方向
Source: apps/docs/src/content/drawer/demos/02-positions.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerDescription, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";

export const meta = { title: "四个方向", description: "position 决定滑入的边和滑动关闭的方向。" };

const positions = [
  { position: "bottom", label: "底部" },
  { position: "top", label: "顶部" },
  { position: "left", label: "左侧" },
  { position: "right", label: "右侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {positions.map(({ position, label }) => (
        <Drawer key={position} position={position}>
          <DrawerTrigger render={<Button variant="outline" />}>{label}</DrawerTrigger>
          <DrawerPopup showBar showCloseButton>
            <DrawerHeader>
              <DrawerTitle>快捷设置</DrawerTitle>
              <DrawerDescription>从{label}滑出，向外滑动即可关闭。</DrawerDescription>
            </DrawerHeader>
            <DrawerPanel className="text-muted-foreground text-sm">
              夜间模式、告警声音和自动同步可以在这里快速切换。
            </DrawerPanel>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
```

### 样式变体
Source: apps/docs/src/content/drawer/demos/03-variants.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerDescription, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";

export const meta = {
  title: "样式变体",
  description: "inset 在宽屏下与屏幕边缘留出间距；straight 去掉圆角，适合贴边的导航。",
};

const items = [
  { variant: "inset", position: "right", label: "内嵌 · 右侧" },
  { variant: "inset", position: "bottom", label: "内嵌 · 底部" },
  { variant: "straight", position: "left", label: "直角 · 左侧" },
  { variant: "straight", position: "bottom", label: "直角 · 底部" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map(({ variant, position, label }) => (
        <Drawer key={label} position={position}>
          <DrawerTrigger render={<Button variant="outline" />}>{label}</DrawerTrigger>
          <DrawerPopup showBar variant={variant}>
            <DrawerHeader>
              <DrawerTitle>同步状态</DrawerTitle>
              <DrawerDescription>最近一次同步：今天 10:18，共 2,306 条记录。</DrawerDescription>
            </DrawerHeader>
            <DrawerPanel className="text-muted-foreground text-sm">
              离线期间产生的扫码记录会在网络恢复后自动上传。
            </DrawerPanel>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
```

### 吸附高度
Source: apps/docs/src/content/drawer/demos/04-snap-points.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerDescription, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";

export const meta = {
  title: "吸附高度",
  description: "snapPoints 让抽屉先停在半屏预览，向上拖动展开到全高。",
};

const devices = Array.from({ length: 24 }, (_, index) => ({
  id: `YQ-SC-${20391 + index}`,
  online: index % 5 !== 3,
}));

export default function Demo() {
  return (
    <Drawer snapPoints={["320px", 1]} snapToSequentialPoints>
      <DrawerTrigger render={<Button variant="outline" />}>附近设备</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>附近设备</DrawerTitle>
          <DrawerDescription>向上拖动查看全部 24 台设备。</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <ul className="grid gap-2">
            {devices.map((device) => (
              <li className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm" key={device.id}>
                <span className="numeric font-medium">{device.id}</span>
                <Badge variant={device.online ? "success" : "outline"}>{device.online ? "在线" : "离线"}</Badge>
              </li>
            ))}
          </ul>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}
```

### 嵌套抽屉
Source: apps/docs/src/content/drawer/demos/05-nested.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "嵌套抽屉",
  description: "下一级抽屉打开时，上一级缩小并露出边缘，形成层叠；关闭后自然回位。",
};

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>付款方式</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>付款方式</DrawerTitle>
          <DrawerDescription>订单 YQ20260930-0418 · 应付 ¥ 14,280.00</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter variant="bare">
          <DrawerClose render={<Button variant="ghost" />}>取消</DrawerClose>
          <Drawer>
            <DrawerTrigger render={<Button />}>添加对公账户</DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>添加对公账户</DrawerTitle>
                <DrawerDescription>账户需与开票信息中的公司名称一致。</DrawerDescription>
              </DrawerHeader>
              <DrawerPanel className="grid gap-4" scrollable={false}>
                <Field>
                  <FieldLabel>开户银行</FieldLabel>
                  <Input defaultValue="招商银行杭州分行" />
                </Field>
                <Field>
                  <FieldLabel>银行账号</FieldLabel>
                  <Input inputMode="numeric" placeholder="请输入对公账号" />
                </Field>
              </DrawerPanel>
              <DrawerFooter>
                <DrawerClose render={<Button variant="ghost" />}>返回</DrawerClose>
                <DrawerClose render={<Button />}>保存</DrawerClose>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
```

### 动作菜单
Source: apps/docs/src/content/drawer/demos/06-action-menu.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerClose, DrawerMenu, DrawerMenuCheckboxItem, DrawerMenuGroup, DrawerMenuGroupLabel, DrawerMenuItem, DrawerMenuRadioGroup, DrawerMenuRadioItem, DrawerMenuSeparator, DrawerPanel, DrawerPopup, DrawerTrigger } from "@qingye/ui/components/drawer";
import { CopyIcon, EllipsisIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "动作菜单",
  description: "移动端用 DrawerMenu 代替下拉菜单：普通项、勾选、单选、开关和危险操作。",
};

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button aria-label="更多操作" size="icon" variant="outline" />}>
        <EllipsisIcon />
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerPanel>
          <DrawerMenu>
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>工单 #2318</DrawerMenuGroupLabel>
              <DrawerClose render={<DrawerMenuItem />}>
                <PencilIcon />
                编辑
              </DrawerClose>
              <DrawerClose render={<DrawerMenuItem />}>
                <CopyIcon />
                复制链接
              </DrawerClose>
              <DrawerClose render={<DrawerMenuItem />}>
                <Share2Icon />
                转交他人
              </DrawerClose>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuCheckboxItem defaultChecked>关注此工单</DrawerMenuCheckboxItem>
            <DrawerMenuCheckboxItem variant="switch">处理完成后通知我</DrawerMenuCheckboxItem>
            <DrawerMenuSeparator />
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>优先级</DrawerMenuGroupLabel>
              <DrawerMenuRadioGroup defaultValue="high">
                <DrawerMenuRadioItem value="urgent">紧急</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="high">高</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="normal">普通</DrawerMenuRadioItem>
              </DrawerMenuRadioGroup>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerClose render={<DrawerMenuItem variant="destructive" />}>
              <Trash2Icon />
              删除工单
            </DrawerClose>
          </DrawerMenu>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}
```

### 响应式：桌面对话框，移动端抽屉
Source: apps/docs/src/content/drawer/demos/07-responsive.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Drawer, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useMediaQuery } from "@qingye/ui/hooks/use-media-query";

export const meta = {
  title: "响应式：桌面对话框，移动端抽屉",
  description: "同一份表单，宽屏用 Dialog，窄屏用可拖拽的 Drawer。",
};

const title = "修改收货地址";
const description = "仅影响尚未发货的订单。";

function Fields() {
  return (
    <>
      <Field>
        <FieldLabel>收货人</FieldLabel>
        <Input defaultValue="许清和" />
      </Field>
      <Field>
        <FieldLabel>详细地址</FieldLabel>
        <Input defaultValue="杭州市西湖区文三路 478 号 6 楼" />
      </Field>
    </>
  );
}

export default function Demo() {
  const isMobile = useMediaQuery("max-md");
  const trigger = <Button variant="outline" />;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger render={trigger}>{title}</DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerPanel className="grid gap-4" scrollable={false}>
            <Fields />
          </DrawerPanel>
          <DrawerFooter>
            <DrawerClose render={<Button variant="ghost" />}>取消</DrawerClose>
            <DrawerClose render={<Button />}>保存</DrawerClose>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger render={trigger}>{title}</DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-4">
          <Fields />
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <DialogClose render={<Button />}>保存</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
```

