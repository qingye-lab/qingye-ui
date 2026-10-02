# 警告提示 Alert

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/alert
Source: packages/ui/src/components/alert.tsx
Source SHA-256: 35533179af2e175217728abf236329081e09c058ea567f1ccbb33c228e39bea5

嵌在页面内容中的状态说明，持续显示直到问题解决，例如配额将满、同步失败、需要补充资料。临时反馈用 Toast，需要用户立即确认用 AlertDialog。

## Use and ownership
- 页面内持续可见的状态、后果或修复入口，与相关对象邻接。
- Avoid: 所有初始信息都 assertive 播报；同一个问题既重复 Alert 又 Toast；长说明挤掉修复动作。
- Library: 提示部位、语义变体、动作换行和原生属性透传。
- Application: 紧迫性、role 选择、持续问题、权限和恢复动作。

## Composition
- Title 说当前事实，Description 只保留修复所需细节，Action 承接对象。默认 role=alert，普通信息需显式选择 status 或移除 role。

## Responsive behavior
- 窄屏动作占整行，长说明允许换行；关键后果不藏 Tooltip，实测文字与边界对比。

## Customization
- variant 只是视觉语义，role 与紧迫性单独判断，样式不能代替错误事实。

## Current exports
- Alert: function; owner alert; PASS; props: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants>
- AlertAction: function; owner alert; PASS; props: React.ComponentProps<"div">
- AlertDescription: function; owner alert; PASS; props: React.ComponentProps<"div">
- AlertTitle: function; owner alert; PASS; props: React.ComponentProps<"div">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Alert
容器，带 role="alert"。第一个子元素为图标时自动对齐成两栏。
- variant: "default" | "info" | "success" | "warning" | "error" | "destructive"; default "default". 语义颜色；destructive 与 error 相同，便于从 shadcn 迁移。

### AlertTitle
标题，一句话说明发生了什么。

### AlertDescription
补充说明与下一步建议，可包含多段文字或列表。

### AlertAction
操作按钮组；宽屏时在右侧居中，窄屏时换到文字下方。

## Keyboard

## Source examples
### 类型
Source: apps/docs/src/content/alert/demos/01-variants.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { CircleAlertIcon, CircleCheckIcon, InfoIcon, TerminalIcon, TriangleAlertIcon } from "lucide-react";

export const meta = { title: "类型", description: "default、info、success、warning、error 五种语义。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert>
        <TerminalIcon />
        <AlertTitle>API 密钥已轮换</AlertTitle>
        <AlertDescription>旧密钥将在 24 小时后失效，请及时更新服务端配置。</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon />
        <AlertTitle>今晚 23:00 例行维护</AlertTitle>
        <AlertDescription>预计 30 分钟，期间设备数据会缓存在本地，恢复后自动上传。</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheckIcon />
        <AlertTitle>实名认证已通过</AlertTitle>
        <AlertDescription>现在可以开具增值税专用发票。</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>设备配额即将用完</AlertTitle>
        <AlertDescription>已绑定 47 / 50 台设备，升级套餐后可继续添加。</AlertDescription>
      </Alert>
      <Alert variant="error">
        <CircleAlertIcon />
        <AlertTitle>3 台设备同步失败</AlertTitle>
        <AlertDescription>最近一次尝试：今天 09:42。请检查设备网络后重试。</AlertDescription>
      </Alert>
    </div>
  );
}
```

### 带操作
Source: apps/docs/src/content/alert/demos/02-action.tsx
```tsx
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Button } from "@qingye/ui/components/button";
import { TriangleAlertIcon } from "lucide-react";

export const meta = {
  title: "带操作",
  description: "AlertAction 在宽屏时位于右侧，窄屏时自动换到文字下方，与正文左对齐。",
};

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert variant="warning">
        <TriangleAlertIcon />
        <AlertTitle>发票信息不完整</AlertTitle>
        <AlertDescription>补充纳税人识别号后，才能开具 9 月账单的专用发票。</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="ghost">
            稍后
          </Button>
          <Button size="xs">去补充</Button>
        </AlertAction>
      </Alert>
      <Alert>
        <AlertTitle>有新的固件版本 v2.8.0</AlertTitle>
        <AlertDescription>修复了低温环境下扫码枪偶发断连的问题。</AlertDescription>
        <AlertAction>
          <Button size="xs" variant="outline">
            查看更新
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}
```

### 仅标题与多段说明
Source: apps/docs/src/content/alert/demos/03-content.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { CircleAlertIcon } from "lucide-react";

export const meta = {
  title: "仅标题与多段说明",
  description: "标题可以单独使用；说明里可以放列表等多段内容。",
};

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert variant="info">
        <AlertTitle>你正在以只读身份查看“华东仓储”项目。</AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>导入失败，共 3 处错误</AlertTitle>
        <AlertDescription>
          <ul className="list-disc ps-4">
            <li>第 12 行：设备编号 YQ-SC-2039 已存在</li>
            <li>第 27 行：所属仓库不能为空</li>
            <li>第 41 行：负责人手机号格式不正确</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
```

