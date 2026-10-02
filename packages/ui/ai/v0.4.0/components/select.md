# 选择器 Select

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/select
Source: packages/ui/src/components/select.tsx
Source SHA-256: 9de817ef7478b6e2c99bf470a7694a77ac2660bc65b50e5542e9089bd4de769e

从一组固定选项中选择一个或多个。选项超过十几个或需要搜索时改用 Combobox。

## Use and ownership
- 选择一个或多个离散值，不需要输入筛选。
- Avoid: 命令操作不要放进值选择器；关键选项差异不能只放 Tooltip。
- Library: 选择、键盘导航、浮层定位和字段语义。
- Application: 选项可用性、当前业务值及提交结果。

## Composition
- Trigger 展示当前值，Popup 中 Item、分组与勾选反馈构成完整选择关系。

## Responsive behavior
- 触发器允许内容收缩；选项保留完整文字，窄屏不得遮住当前选择。

## Customization
- size 调整触发器；render 组合仍遵守值选择语义。

## Current exports
- Select: const; owner select; PASS
- SelectButton: function; owner select; PASS; props: SelectButtonProps
- SelectButtonProps: interface; owner select; PASS
- SelectContent: function; owner select; alias of SelectPopup; PASS; props: SelectPrimitive.Popup.Props & {
  portalProps?: SelectPrimitive.Portal.Props;
  side?: SelectPrimitive.Positioner.Props["side"];
  sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
  align?: SelectPrimitive.Positioner.Props["align"];
  alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
  alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
  anchor?: SelectPrimitive.Positioner.Props["anchor"];
}
- SelectGroup: function; owner select; PASS; props: SelectPrimitive.Group.Props
- SelectGroupLabel: function; owner select; PASS; props: SelectPrimitive.GroupLabel.Props
- SelectItem: function; owner select; PASS; props: SelectPrimitive.Item.Props
- SelectLabel: function; owner select; PASS; props: SelectPrimitive.Label.Props
- SelectPopup: function; owner select; PASS; props: SelectPrimitive.Popup.Props & {
  portalProps?: SelectPrimitive.Portal.Props;
  side?: SelectPrimitive.Positioner.Props["side"];
  sideOffset?: SelectPrimitive.Positioner.Props["sideOffset"];
  align?: SelectPrimitive.Positioner.Props["align"];
  alignOffset?: SelectPrimitive.Positioner.Props["alignOffset"];
  alignItemWithTrigger?: SelectPrimitive.Positioner.Props["alignItemWithTrigger"];
  anchor?: SelectPrimitive.Positioner.Props["anchor"];
}
- SelectPrimitive: reexport; owner select; UNVERIFIED
- SelectSeparator: function; owner select; PASS; props: SelectPrimitive.Separator.Props
- SelectTrigger: function; owner select; PASS; props: SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants>
- selectTriggerIconClassName: const; owner select; UNVERIFIED
- selectTriggerVariants: const; owner select; UNVERIFIED
- SelectValue: function; owner select; PASS; props: SelectPrimitive.Value.Props

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Select
根组件（Base UI Select.Root）。
- value / defaultValue / onValueChange: T | T[]. 受控 / 非受控的值；multiple 时为数组。
- items: { label, value }[] | Record<value, label>. 值到显示文字的映射，让 SelectValue 在弹层未打开时也能显示标签。
- multiple: boolean; default false. 多选；弹层在选择后保持打开。
- name / required / disabled: string / boolean. 表单字段名、必填与禁用。
- open / defaultOpen / onOpenChange: boolean / (open) => void. 受控 / 非受控的弹出状态。

### SelectTrigger
触发按钮，外观同 Input。显式 aria-label 优先于 Base UI 自动生成的标签关联。
- size: "sm" | "default" | "lg"; default "default". 与 Input、DatePicker 等高。
- aria-invalid: boolean. 错误边框；在 Field 中由校验状态自动设置。

### SelectValue
显示当前值；placeholder 为空值时的占位文字，children 可为 (value) => ReactNode 自定义显示。

### SelectPopup
弹出列表（别名 SelectContent）。默认与触发器同宽、贴在其正下方。
- alignItemWithTrigger: boolean; default false. 设为 true 时改为 macOS 式：选中项与触发器重叠对齐。
- side / align / sideOffset: string / number; default "bottom" / "start" / 4. 定位。

### SelectItem
选项；disabled 时不可选。触屏设备上行高 44px。

### SelectGroup / SelectGroupLabel / SelectSeparator
分组、分组标题与分隔线。

### SelectButton
外观相同的普通按钮，用作 Combobox 等其他弹层的触发器。

## Keyboard
- Enter / Space / ↓ / ↑: 打开列表。
- ↓ / ↑: 在选项间移动，跳过禁用项。
- Home / End: 跳到第一项 / 最后一项。
- 字母或汉字: 跳到以该文字开头的选项。
- Enter / Space: 选中高亮项；单选时关闭列表。
- Esc / Tab: 关闭列表。

## Source examples
### 基础用法
Source: apps/docs/src/content/select/demos/01-basic.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = { title: "基础用法", description: "列表默认与触发器同宽，展开在正下方。" };

const regions = [
  { label: "华东 1（杭州）", value: "cn-hangzhou" },
  { label: "华东 2（上海）", value: "cn-shanghai" },
  { label: "华北 2（北京）", value: "cn-beijing" },
  { label: "华南 1（深圳）", value: "cn-shenzhen" },
  { label: "西南 1（成都）", value: "cn-chengdu" },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label htmlFor="region">部署地域</Label>
      <Select items={regions} defaultValue="cn-hangzhou">
        <SelectTrigger id="region">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {regions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}
```

### 尺寸与占位
Source: apps/docs/src/content/select/demos/02-sizes.tsx
```tsx
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = { title: "尺寸与占位", description: "sm / default / lg；未选择时显示 placeholder。" };

const sizes = ["sm", "default", "lg"] as const;
const items = { "1": "每 1 分钟", "5": "每 5 分钟", "15": "每 15 分钟", "60": "每小时" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      {sizes.map((size) => (
        <Select key={size} items={items} aria-label="采集频率">
          <SelectTrigger size={size}>
            <SelectValue placeholder="选择采集频率" />
          </SelectTrigger>
          <SelectPopup>
            {Object.entries(items).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      ))}
    </div>
  );
}
```

### 分组与禁用项
Source: apps/docs/src/content/select/demos/03-groups.tsx
```tsx
import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectSeparator, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { Fragment } from "react";

export const meta = { title: "分组与禁用项", description: "售罄的规格保留在列表中但不可选。" };

const groups = [
  {
    label: "通用型",
    items: [
      { label: "g7.large · 2 核 8 GB", value: "g7.large" },
      { label: "g7.xlarge · 4 核 16 GB", value: "g7.xlarge" },
      { label: "g7.2xlarge · 8 核 32 GB", value: "g7.2xlarge", disabled: true },
    ],
  },
  {
    label: "计算型",
    items: [
      { label: "c7.large · 2 核 4 GB", value: "c7.large" },
      { label: "c7.xlarge · 4 核 8 GB", value: "c7.xlarge" },
    ],
  },
  {
    label: "内存型",
    items: [
      { label: "r7.large · 2 核 16 GB", value: "r7.large", disabled: true },
      { label: "r7.xlarge · 4 核 32 GB", value: "r7.xlarge" },
    ],
  },
];
const items = groups.flatMap((group) => group.items);

export default function Demo() {
  return (
    <Select items={items} defaultValue="g7.xlarge" aria-label="实例规格">
      <SelectTrigger className="w-full max-w-72">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {groups.map((group, index) => (
          <Fragment key={group.label}>
            {index > 0 ? <SelectSeparator /> : null}
            <SelectGroup>
              <SelectGroupLabel>{group.label}</SelectGroupLabel>
              {group.items.map((item) => (
                <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </Fragment>
        ))}
      </SelectPopup>
    </Select>
  );
}
```

### 状态
Source: apps/docs/src/content/select/demos/04-states.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = { title: "状态", description: "禁用与校验失败。Field 内的 invalid 会传给触发器。" };

const owners = { zhang: "张伟 · 运维", li: "李娜 · 网络", wang: "王磊 · 安全" };

function OwnerSelect(props: { disabled?: boolean; defaultValue?: string }) {
  return (
    <Select items={owners} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="选择负责人" />
      </SelectTrigger>
      <SelectPopup>
        {Object.entries(owners).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
      <Field disabled>
        <FieldLabel>负责人</FieldLabel>
        <OwnerSelect disabled defaultValue="zhang" />
        <FieldDescription>工单已关闭，不能改派。</FieldDescription>
      </Field>
      <Field invalid>
        <FieldLabel>负责人</FieldLabel>
        <OwnerSelect />
        <FieldError>请指定一位负责人</FieldError>
      </Field>
    </div>
  );
}
```

### 多选
Source: apps/docs/src/content/select/demos/05-multiple.tsx
```tsx
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = { title: "多选", description: "列表在选择后保持打开；触发器上汇总显示。" };

const channels = { sms: "短信", email: "邮件", wecom: "企业微信", dingtalk: "钉钉", phone: "电话" };
type Channel = keyof typeof channels;

const summary = (value: Channel[]) =>
  value.length === 0
    ? "选择通知渠道"
    : value.length <= 2
      ? value.map((item) => channels[item]).join("、")
      : `${channels[value[0]!]}、${channels[value[1]!]} 等 ${value.length} 项`;

export default function Demo() {
  return (
    <Select multiple items={channels} defaultValue={["sms", "wecom"] as Channel[]} aria-label="告警通知渠道">
      <SelectTrigger className="w-full max-w-64">
        <SelectValue>{summary}</SelectValue>
      </SelectTrigger>
      <SelectPopup>
        {(Object.keys(channels) as Channel[]).map((value) => (
          <SelectItem key={value} value={value}>
            {channels[value]}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}
```

### 组合：列表筛选栏
Source: apps/docs/src/content/select/demos/06-toolbar.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { DownloadIcon } from "lucide-react";

export const meta = { title: "组合：列表筛选栏", description: "小尺寸选择器与按钮排成一行，窄屏自动换行。" };

const status = { all: "全部状态", online: "在线", offline: "离线", alarm: "告警中" };
const range = { "24h": "最近 24 小时", "7d": "最近 7 天", "30d": "最近 30 天" };

export default function Demo() {
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <Select items={status} defaultValue="all" aria-label="设备状态">
        <SelectTrigger size="sm" className="w-auto min-w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {Object.entries(status).map(([value, label]) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <Select items={range} defaultValue="7d" aria-label="时间范围">
        <SelectTrigger size="sm" className="w-auto min-w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {Object.entries(range).map(([value, label]) => (
            <SelectItem key={value} value={value}>{label}</SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <Button size="sm" variant="outline" className="ms-auto">
        <DownloadIcon />
        导出 CSV
      </Button>
    </div>
  );
}
```

