# 按钮 Button

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/button
Source: packages/ui/src/components/button.tsx
Source SHA-256: b866e49c3ceb8a1ae3e24af07b04be899e8eacf127fbf72419cf6146e92f9a0e

触发名称明确的操作或提交表单。按当前任务安排显著程度，完成与保护动作都可以成为重点。

## Use and ownership
- 执行名称明确的动作。当前最重要的动作可以是保存，也可以是停止或返回。
- Avoid: 不要把所有操作都叫确定；视觉样式不能隐式授权或决定风险。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Button: function; owner button; PASS; props: ButtonProps
- ButtonProps: interface; owner button; PASS
- buttonVariants: const; owner button; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Button
渲染原生 <button>（默认 type="button"）；通过 render 可更换命令载体。真正导航使用原生 a / Link 配合 buttonVariants，以保留链接语义。透传所有原生属性。
- variant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | "destructive-outline"; default "default". 视觉样式。
- size: "xs" | "sm" | "default" | "lg" | "xl" | "icon-xs" | "icon-sm" | "icon" | "icon-lg" | "icon-xl"; default "default". 尺寸；icon-* 为仅图标的正方形按钮，与同名文字尺寸等高。
- loading: boolean; default false. 显示居中的 Spinner、设置 aria-busy 并禁用，文字透明以保留宽度。
- disabled: boolean; default false. 禁用；不透明度降至 64% 并屏蔽指针事件。
- render: ReactElement | (props, state) => ReactElement. 替换命令的渲染元素；不会自动把按钮语义改成链接语义。
- nativeButton: boolean; default true. 命令载体不是原生 <button> 时设为 false；仍保留按钮 role，导航应使用原生链接。

### buttonVariants
cva 样式函数，供需要按钮外观但不渲染 Button 的场景使用，如分页链接。

## Keyboard
- Enter / Space: 触发按钮。
- Tab / Shift+Tab: 移入、移出焦点；键盘聚焦时显示焦点环。

## Source examples
### 样式
Source: apps/docs/src/content/button/demos/01-variants.tsx
```tsx
import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "样式",
  description: "一个区域只放一个主按钮；次要操作用 outline、secondary 或 ghost，危险操作用 destructive。",
};

export default function Demo() {
  return (
    <>
      <Button>保存</Button>
      <Button variant="outline">取消</Button>
      <Button variant="secondary">存为草稿</Button>
      <Button variant="ghost">稍后再说</Button>
      <Button variant="link">查看详情</Button>
      <Button variant="destructive">删除设备</Button>
      <Button variant="destructive-outline">解除绑定</Button>
    </>
  );
}
```

### 尺寸
Source: apps/docs/src/content/button/demos/02-sizes.tsx
```tsx
import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "尺寸",
  description: "xs 用于表格行内，sm 用于工具栏，lg / xl 用于登录与落地页。移动端统一加高 4px。",
};

export default function Demo() {
  return (
    <>
      <Button size="xs" variant="outline">行内</Button>
      <Button size="sm" variant="outline">工具栏</Button>
      <Button variant="outline">默认</Button>
      <Button size="lg" variant="outline">登录</Button>
      <Button size="xl" variant="outline">免费试用</Button>
    </>
  );
}
```

### 仅图标
Source: apps/docs/src/content/button/demos/03-icon-sizes.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { PlusIcon } from "lucide-react";

export const meta = {
  title: "仅图标",
  description: "icon-* 尺寸为正方形，与同级文字按钮等高。仅图标的按钮必须提供 aria-label。",
};

export default function Demo() {
  return (
    <>
      <Button aria-label="新建" size="icon-xs" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon-sm" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon-lg" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button aria-label="新建" size="icon-xl" variant="outline">
        <PlusIcon aria-hidden="true" />
      </Button>
    </>
  );
}
```

### 带图标
Source: apps/docs/src/content/button/demos/04-with-icon.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ArrowRightIcon, ChevronDownIcon, DownloadIcon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "带图标",
  description: "图标放在文字前表示动作类型，放在文字后表示去向或展开。图标会自动调整尺寸与透明度。",
};

export default function Demo() {
  return (
    <>
      <Button variant="outline">
        <DownloadIcon aria-hidden="true" />
        导出报表
      </Button>
      <Button>
        下一步
        <ArrowRightIcon aria-hidden="true" />
      </Button>
      <Button variant="ghost">
        全部状态
        <ChevronDownIcon aria-hidden="true" />
      </Button>
      <Button variant="destructive-outline">
        <Trash2Icon aria-hidden="true" />
        移入回收站
      </Button>
    </>
  );
}
```

### 作为链接
Source: apps/docs/src/content/button/demos/05-link.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ChevronLeftIcon, ExternalLinkIcon } from "lucide-react";

export const meta = {
  title: "作为链接",
  description: "导航用 render 渲染为 <a>，并设 nativeButton={false}，保留按钮外观与链接语义。",
};

export default function Demo() {
  return (
    <>
      <Button nativeButton={false} render={<a href="#orders" />} variant="link">
        <ChevronLeftIcon aria-hidden="true" />
        返回订单列表
      </Button>
      <Button
        nativeButton={false}
        render={<a href="https://example.com/help" rel="noreferrer" target="_blank" />}
        variant="outline"
      >
        帮助中心
        <ExternalLinkIcon aria-hidden="true" />
      </Button>
    </>
  );
}
```

### 加载中
Source: apps/docs/src/content/button/demos/06-loading.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { useState } from "react";

export const meta = {
  title: "加载中",
  description: "loading 显示居中的旋转指示并禁用按钮，文字透明但保留宽度，按钮不会跳动。",
};

export default function Demo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };
  return (
    <>
      <Button loading={saving} onClick={save}>
        保存更改
      </Button>
      <Button loading variant="outline">
        同步中
      </Button>
      <Button loading variant="destructive">
        删除中
      </Button>
    </>
  );
}
```

### 自定义加载
Source: apps/docs/src/content/button/demos/07-loading-custom.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Spinner } from "@qingye/ui/components/spinner";

export const meta = {
  title: "自定义加载",
  description: "需要保留文字时，自行组合 Spinner 与 disabled，例如“正在上传 3 个文件”。",
};

export default function Demo() {
  return (
    <>
      <Button disabled>
        <Spinner />
        正在上传 3 个文件
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner />
        生成中
      </Button>
    </>
  );
}
```

### 禁用
Source: apps/docs/src/content/button/demos/08-disabled.tsx
```tsx
import { Button } from "@qingye/ui/components/button";

export const meta = { title: "禁用", description: "不可用时降低不透明度并屏蔽指针事件。" };

export default function Demo() {
  return (
    <>
      <Button disabled>提交审核</Button>
      <Button disabled variant="outline">
        导出
      </Button>
      <Button disabled variant="secondary">
        存为草稿
      </Button>
      <Button disabled variant="destructive">
        删除
      </Button>
    </>
  );
}
```

### 组合：表单操作栏
Source: apps/docs/src/content/button/demos/09-form-actions.tsx
```tsx
import { Button } from "@qingye/ui/components/button";

export const meta = {
  title: "组合：表单操作栏",
  description: "主操作靠末端；危险操作与其他操作分开放置。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col-reverse gap-2 sm:flex-row sm:items-center">
      <Button className="sm:me-auto" variant="destructive-outline">
        停用账号
      </Button>
      <Button variant="ghost">取消</Button>
      <Button>保存设置</Button>
    </div>
  );
}
```

### 组合：卡片式按钮
Source: apps/docs/src/content/button/demos/10-card-button.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ChevronRightIcon } from "lucide-react";

export const meta = {
  title: "组合：卡片式按钮",
  description: "整块可点击的选项，悬停时箭头轻移提示去向。",
};

export default function Demo() {
  return (
    <div className="grid w-full max-w-md gap-2">
      {[
        { name: "华东一区 · 杭州", detail: "12 台设备在线，1 台告警" },
        { name: "华南二区 · 深圳", detail: "8 台设备在线" },
      ].map((region) => (
        <Button className="h-auto! justify-between gap-4 px-4 py-3 text-start" key={region.name} variant="outline">
          <span className="flex flex-col gap-0.5">
            <span>{region.name}</span>
            <span className="whitespace-normal font-normal text-muted-foreground">{region.detail}</span>
          </span>
          <ChevronRightIcon
            aria-hidden="true"
            className="transition-transform duration-(--qy-duration-fast) in-[[data-slot=button]:hover]:translate-x-0.5"
          />
        </Button>
      ))}
    </div>
  );
}
```

