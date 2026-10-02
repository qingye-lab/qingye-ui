# 加载指示 Spinner

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/spinner
Source: packages/ui/src/components/spinner.tsx
Source SHA-256: 6e263420ee8a0ac0b2eac8ae333574205d5a849a67c49899cbf919cd04e8031e

表示正在加载或处理中的旋转指示器。用于等待时间不确定、且不值得显示进度的场景。

## Use and ownership
- 表示正在加载或处理中的旋转指示器。用于等待时间不确定、且不值得显示进度的场景。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- Spinner: function; owner spinner; PASS; props: React.ComponentProps<typeof Loader2Icon>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Spinner
一个 role="status" 的旋转图标，无障碍名来自 UI 语言（默认「正在加载」）。
- className: string. 用 size-* 控制大小；默认继承父级字号（图标 1em）。

## Keyboard

## Source examples
### 默认
Source: apps/docs/src/content/spinner/demos/01-default.tsx
```tsx
import { Spinner } from "@qingye/ui";

export const meta = { title: "默认" };

export default function Demo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-5" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  );
}
```

### 行内
Source: apps/docs/src/content/spinner/demos/02-inline.tsx
```tsx
import { Spinner } from "@qingye/ui";

export const meta = { title: "行内", description: "与文字同高，用于「正在同步」「正在上传」这类短提示。" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3 text-body">
      <p className="inline-flex items-center gap-2 text-muted-foreground">
        <Spinner aria-hidden="true" />
        正在同步设备状态…
      </p>
      <p className="inline-flex items-center gap-2 text-muted-foreground">
        <Spinner aria-hidden="true" className="size-3.5" />
        正在上传 3 个文件
      </p>
    </div>
  );
}
```

### 常见位置
Source: apps/docs/src/content/spinner/demos/03-contexts.tsx
```tsx
import { Button, Card, CardContent, CardHeader, CardTitle, Spinner } from "@qingye/ui";

export const meta = { title: "常见位置", description: "按钮内加载用 Button 的 loading；卡片与表格内的占位用 Spinner 加说明文字。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Button loading className="self-start">
        保存中
      </Button>
      <Card size="sm">
        <CardHeader>
          <CardTitle>区域概览</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-2 py-6 text-muted-foreground text-body">
          <Spinner aria-hidden="true" />
          正在加载数据
        </CardContent>
      </Card>
    </div>
  );
}
```

