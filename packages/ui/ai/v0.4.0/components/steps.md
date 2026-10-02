# 步骤条 Steps

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/steps
Source: packages/ui/src/components/steps.tsx
Source SHA-256: 5e5326db935e490cfb5e6742d9817d44f85b1a7c9b2ad4f91f91385e1e468733

展示多步流程的进度：已完成、当前、未开始与出错。用于开户、下单、部署等有先后顺序的任务。

## Use and ownership
- 表达确有先后关系的流程对象、当前位置与每步实际状态。
- Avoid: 当前位置不能证明之前步骤已成功；不适合用线性步骤条表达无顺序的任务集合。
- Library: 提供有序结构、状态文字、aria-current、禁用与方向键焦点；错误标记使用成对语义颜色。
- Application: 负责真实完成证据、校验、是否允许跳步、草稿与重试恢复，不依据动画推断进度。

## Composition
- current 提供默认推进关系，实际错误或未完成用 item.status 覆盖；可回到的步骤才提供 onStepClick。

## Responsive behavior
- 长标题或窄屏优先纵向；可点击步骤保留触屏目标，内容按可用宽度换行。

## Customization
- orientation 与 size 调整阅读关系；icon 只替换普通序号，完成与错误仍保留明确标记。

## Current exports
- StepItem: type; owner steps; PASS
- Steps: function; owner steps; PASS; props: StepsProps
- StepsOrientation: type; owner steps; PASS
- StepsProps: type; owner steps; PASS
- StepsSize: type; owner steps; PASS
- StepStatus: type; owner steps; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Steps
渲染 <ol>；其余属性透传到列表元素。
- items: StepItem[]. 步骤：{ id, title, description?, status?, icon?, disabled? }。
- current: number. 当前步骤的索引；之前的为已完成，之后的为未开始。
- orientation: "horizontal" | "vertical"; default "horizontal". 排列方向。步骤多或说明较长时用 vertical。
- size: "sm" | "default"; default "default". 指示器 20px / 28px。
- onStepClick: (index, item) => void. 提供后每个步骤渲染为按钮，可点击跳转。
- label: string; default "步骤". 列表的无障碍名称。

### StepItem
单个步骤的数据。
- status: "complete" | "current" | "upcoming" | "error". 覆盖根据 current 推导的状态，常用于标记出错。
- icon: ReactNode. 替换指示器中的序号；已完成与出错仍显示对勾与叉号。
- disabled: boolean. 可点击模式下禁止选中该步骤。

## Keyboard
- Tab: 可点击模式下依次聚焦每个步骤。
- ← / →（垂直时 ↑ / ↓）: 在可点击的步骤之间移动焦点。
- Home / End: 聚焦第一个 / 最后一个可点击步骤。
- Enter / Space: 跳转到聚焦的步骤。

## Source examples
### 水平步骤
Source: apps/docs/src/content/steps/demos/01-horizontal.tsx
```tsx
import { Steps } from "@qingye/ui/components/steps";

export const meta = { title: "水平步骤", description: "current 之前的步骤自动标记为已完成。" };

const items = [
  { id: "info", title: "填写信息", description: "企业名称与联系人" },
  { id: "verify", title: "实名认证", description: "上传营业执照" },
  { id: "bank", title: "绑定账户", description: "对公银行账户" },
  { id: "done", title: "开通完成" },
];

export default function Demo() {
  return <Steps className="max-w-2xl" current={1} items={items} />;
}
```

### 垂直步骤
Source: apps/docs/src/content/steps/demos/02-vertical.tsx
```tsx
import { Steps } from "@qingye/ui/components/steps";

export const meta = { title: "垂直步骤", description: "说明较长或在窄屏上时使用。" };

const items = [
  { id: "pull", title: "拉取代码", description: "main 分支 · 提交 7f3c2a1" },
  { id: "build", title: "构建镜像", description: "用时 1 分 42 秒，镜像 312 MB" },
  { id: "test", title: "运行测试", description: "正在执行 1,284 项用例" },
  { id: "release", title: "发布上线", description: "灰度 10% 流量后全量发布" },
];

export default function Demo() {
  return <Steps className="max-w-sm" current={2} items={items} label="部署进度" orientation="vertical" />;
}
```

### 出错状态
Source: apps/docs/src/content/steps/demos/03-error.tsx
```tsx
import { Steps } from "@qingye/ui/components/steps";

export const meta = { title: "出错状态", description: "status=\"error\" 覆盖推导出的状态，标出失败的步骤。" };

const items = [
  { id: "upload", title: "上传文件" },
  { id: "parse", title: "解析数据", status: "error" as const, description: "第 128 行缺少手机号" },
  { id: "import", title: "导入客户" },
];

export default function Demo() {
  return <Steps className="max-w-xl" current={1} items={items} label="导入进度" />;
}
```

### 图标与尺寸
Source: apps/docs/src/content/steps/demos/04-icons-sizes.tsx
```tsx
import { Steps } from "@qingye/ui/components/steps";
import { CreditCardIcon, PackageCheckIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";

export const meta = { title: "图标与尺寸", description: "icon 替换序号；size=\"sm\" 适合卡片和侧栏。" };

const items = [
  { id: "order", title: "已下单", icon: <ShoppingCartIcon /> },
  { id: "pay", title: "已付款", icon: <CreditCardIcon /> },
  { id: "ship", title: "运输中", icon: <TruckIcon /> },
  { id: "sign", title: "已签收", icon: <PackageCheckIcon /> },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Steps current={2} items={items} label="订单进度" />
      <Steps current={2} items={items} label="订单进度（小）" size="sm" />
    </div>
  );
}
```

### 可点击的向导
Source: apps/docs/src/content/steps/demos/05-clickable.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Steps } from "@qingye/ui/components/steps";
import { useState } from "react";

export const meta = {
  title: "可点击的向导",
  description: "onStepClick 让步骤成为按钮；之后的步骤设为 disabled，只能回到已完成的步骤。",
};

const steps = [
  { id: "plan", title: "选择套餐", body: "专业版 · 按年付费，每席位 ¥59/月。" },
  { id: "team", title: "邀请成员", body: "已邀请 林晓雯、周子航 等 6 位成员。" },
  { id: "pay", title: "确认支付", body: "合计 ¥4,248，支持对公转账与企业支付宝。" },
];

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Steps
        current={current}
        items={steps.map((step, index) => ({ ...step, disabled: index > current }))}
        label="开通向导"
        onStepClick={setCurrent}
      />
      <p className="rounded-lg bg-muted px-4 py-3 text-sm">{steps[current]?.body}</p>
      <div className="flex justify-end gap-2">
        <Button disabled={current === 0} onClick={() => setCurrent(current - 1)} variant="outline">
          上一步
        </Button>
        <Button disabled={current === steps.length - 1} onClick={() => setCurrent(current + 1)}>
          下一步
        </Button>
      </div>
    </div>
  );
}
```

