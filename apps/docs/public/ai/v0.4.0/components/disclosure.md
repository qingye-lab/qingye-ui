# 展开区 Disclosure

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/disclosure
Source: packages/ui/src/components/disclosure.tsx
Source SHA-256: 46a3f6df91cb970680f9f447fd2610dee9dac789ea3fff75267927f69394f75d

带样式的单个折叠区：一个标题行加箭头，点击展开次要内容，例如表单里的“高级设置”、卡片里的“构建日志”。并列的多个分节用 Accordion；需要完全自定义触发器用 Collapsible。

## Use and ownership
- 展开可以跳过的高级设置、日志或次要细节，标题直接说明内容对象。
- Avoid: 不能因展开区便利而隐藏关键警告、必填字段或唯一的恢复入口。
- Library: 管理单块 open 状态、稳定触发名称、箭头与 aria-expanded；keepMounted 默认保留内容。
- Application: 定义内容重要性、有效草稿与敏感字段清除时机；保留 DOM 不等于无限期保存。

## Composition
- plain 放入已有表单关系，inset 表达独立边界，separated 承接已有分节；面板默认保留字段。

## Responsive behavior
- 整行触发器支持长标签；改变 variant 或布局时检查字段值与焦点仍有效。

## Customization
- variant 选择关系边界，不改变提交策略；外部 className 应用于公开触发器与内容部位。

## Current exports
- Disclosure: function; owner disclosure; PASS; props: DisclosureProps
- DisclosureContent: function; owner disclosure; alias of DisclosurePanel; PASS; props: DisclosurePanelProps
- DisclosurePanel: function; owner disclosure; PASS; props: DisclosurePanelProps
- DisclosurePanelProps: type; owner disclosure; PASS
- DisclosureProps: type; owner disclosure; PASS
- DisclosureTrigger: function; owner disclosure; PASS; props: CollapsiblePrimitive.Trigger.Props
- DisclosureVariant: type; owner disclosure; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Disclosure
根组件，基于 Collapsible。
- variant: "plain" | "inset" | "separated"; default "plain". plain：行内文字触发器，放在表单或卡片里；inset：自带边框的独立区块；separated：分隔线下的整行，收尾一个区域。
- open / defaultOpen: boolean; default false. 展开状态（受控 / 非受控）。
- onOpenChange: (open: boolean) => void. 展开状态变化时调用。
- disabled: boolean; default false. 禁用。

### DisclosureTrigger
标题按钮，末尾的箭头随展开旋转；可放图标或徽章，内容按一行排列。

### DisclosurePanel
折叠内容，高度与透明度一同过渡，收起比展开更快，可中途反向。别名 DisclosureContent。
- keepMounted: boolean; default true. 收起时保留在 DOM 中：其中的表单字段保持取值，页内搜索仍能找到文字。
- className: string. 作用于内层内容盒（负责内边距）。

## Keyboard
- Tab: 聚焦标题按钮。
- Enter / Space: 展开或收起。

## Source examples
### 表单中的高级设置
Source: apps/docs/src/content/disclosure/demos/01-plain.tsx
```tsx
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "表单中的高级设置",
  description: "plain：行内触发器，收起时字段仍保留取值。",
};

export default function Demo() {
  return (
    <form className="flex w-full max-w-sm flex-col gap-5">
      <Field>
        <FieldLabel>Webhook 地址</FieldLabel>
        <Input defaultValue="https://hooks.qingyan.tech/deploy" />
      </Field>
      <Disclosure>
        <DisclosureTrigger>高级设置</DisclosureTrigger>
        <DisclosurePanel className="flex flex-col gap-4">
          <Field>
            <FieldLabel>超时时间（秒）</FieldLabel>
            <Input defaultValue="30" inputMode="numeric" />
          </Field>
          <Field>
            <FieldLabel>签名密钥</FieldLabel>
            <Input placeholder="留空则不签名" />
            <FieldDescription>用于校验请求确实来自青烟云。</FieldDescription>
          </Field>
        </DisclosurePanel>
      </Disclosure>
    </form>
  );
}
```

### 独立区块
Source: apps/docs/src/content/disclosure/demos/02-inset.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { TerminalIcon } from "lucide-react";

export const meta = {
  title: "独立区块",
  description: "inset：自带边框，适合卡片中的详情或日志。",
};

const log = [
  "14:32:01  安装依赖  pnpm install --frozen-lockfile",
  "14:32:19  构建  pnpm build",
  "14:32:46  上传 128 个文件到 CDN",
  "14:32:49  部署完成，耗时 48 秒",
];

export default function Demo() {
  return (
    <Disclosure className="w-full max-w-md" defaultOpen variant="inset">
      <DisclosureTrigger>
        <TerminalIcon />
        构建日志
        <Badge variant="success">成功</Badge>
      </DisclosureTrigger>
      <DisclosurePanel>
        <pre className="numeric overflow-x-auto rounded-lg bg-muted p-3 font-mono text-muted-foreground text-xs leading-relaxed">
          {log.join("\n")}
        </pre>
      </DisclosurePanel>
    </Disclosure>
  );
}
```

### 收尾一个区域
Source: apps/docs/src/content/disclosure/demos/03-separated.tsx
```tsx
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { Label } from "@qingye/ui/components/label";
import { Switch } from "@qingye/ui/components/switch";

export const meta = {
  title: "收尾一个区域",
  description: "separated：分隔线下的整行，常放在设置卡片底部。",
};

const options = [
  { id: "preview", label: "为每个分支生成预览地址", on: true },
  { id: "comment", label: "在合并请求中评论部署结果", on: true },
  { id: "skip", label: "仅文档变更时跳过构建", on: false },
];

export default function Demo() {
  return (
    <div className="w-full max-w-md rounded-xl border bg-card px-4 pt-4">
      <p className="font-medium text-sm">自动部署</p>
      <p className="mt-1 mb-4 text-muted-foreground text-sm">推送到 main 分支后自动部署到生产环境。</p>
      <Disclosure variant="separated">
        <DisclosureTrigger>更多选项</DisclosureTrigger>
        <DisclosurePanel className="flex flex-col gap-3">
          {options.map((option) => (
            <div className="flex items-center justify-between gap-4" key={option.id}>
              <Label htmlFor={option.id}>{option.label}</Label>
              <Switch defaultChecked={option.on} id={option.id} />
            </div>
          ))}
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
```

### 受控与禁用
Source: apps/docs/src/content/disclosure/demos/04-controlled.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Disclosure, DisclosurePanel, DisclosureTrigger } from "@qingye/ui/components/disclosure";
import { useState } from "react";

export const meta = {
  title: "受控与禁用",
  description: "open 与 onOpenChange 由外部控制；disabled 时标题置灰且不可展开。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} size="sm" variant="outline">
          展开
        </Button>
        <Button onClick={() => setOpen(false)} size="sm" variant="outline">
          收起
        </Button>
      </div>
      <Disclosure onOpenChange={setOpen} open={open}>
        <DisclosureTrigger>退款规则</DisclosureTrigger>
        <DisclosurePanel className="text-muted-foreground text-sm">
          购买后 7 天内未使用可全额退款，超过 7 天按剩余时长折算。
        </DisclosurePanel>
      </Disclosure>
      <Disclosure disabled>
        <DisclosureTrigger>发票信息（付款后可填写）</DisclosureTrigger>
        <DisclosurePanel>—</DisclosurePanel>
      </Disclosure>
    </div>
  );
}
```

