# 自动完成 Autocomplete

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: aeed657669c52e41d6ee8538ec2ba0ee96a5c455a3014802b6476e9ee2d41f27

带建议列表的文本输入：用户可以选建议，也可以输入任意内容。值必须来自选项时用 Combobox。

## Use and ownership
- 带建议列表的文本输入：用户可以选建议，也可以输入任意内容。值必须来自选项时用 Combobox。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- Autocomplete: const; owner autocomplete; PASS
- AutocompleteClear: function; owner autocomplete; PASS; props: AutocompletePrimitive.Clear.Props
- AutocompleteCollection: const; owner autocomplete; PASS
- AutocompleteEmpty: function; owner autocomplete; PASS; props: AutocompletePrimitive.Empty.Props
- AutocompleteGroup: function; owner autocomplete; PASS; props: AutocompletePrimitive.Group.Props
- AutocompleteGroupLabel: function; owner autocomplete; PASS; props: AutocompletePrimitive.GroupLabel.Props
- AutocompleteInput: function; owner autocomplete; PASS; props: Omit<AutocompletePrimitive.Input.Props, "size"> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: React.ReactNode;
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
  triggerProps?: AutocompletePrimitive.Trigger.Props;
  clearProps?: AutocompletePrimitive.Clear.Props;
}
- AutocompleteItem: function; owner autocomplete; PASS; props: AutocompletePrimitive.Item.Props
- AutocompleteList: function; owner autocomplete; PASS; props: AutocompletePrimitive.List.Props
- AutocompletePopup: function; owner autocomplete; PASS; props: AutocompletePrimitive.Popup.Props & {
  align?: AutocompletePrimitive.Positioner.Props["align"];
  sideOffset?: AutocompletePrimitive.Positioner.Props["sideOffset"];
  alignOffset?: AutocompletePrimitive.Positioner.Props["alignOffset"];
  side?: AutocompletePrimitive.Positioner.Props["side"];
  anchor?: AutocompletePrimitive.Positioner.Props["anchor"];
  portalProps?: AutocompletePrimitive.Portal.Props;
}
- AutocompletePrimitive: reexport; owner autocomplete; UNVERIFIED
- AutocompleteRow: function; owner autocomplete; PASS; props: AutocompletePrimitive.Row.Props
- AutocompleteSeparator: function; owner autocomplete; PASS; props: AutocompletePrimitive.Separator.Props
- AutocompleteStatus: function; owner autocomplete; PASS; props: AutocompletePrimitive.Status.Props
- AutocompleteTrigger: function; owner autocomplete; PASS; props: AutocompletePrimitive.Trigger.Props
- AutocompleteValue: const; owner autocomplete; PASS
- useAutocompleteFilter: const; owner autocomplete; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Autocomplete
根组件（Base UI Autocomplete.Root）。值就是输入框里的文字。
- items: T[] | { value, items }[]. 建议数据；分组时传 { value, items } 数组。
- value / defaultValue / onValueChange: string. 受控 / 非受控的输入文字。
- mode: "list" | "both" | "inline" | "none"; default "list". list 只筛选列表；both 同时在输入框内补全高亮项；inline 只补全不筛选。
- limit: number. 最多显示的建议数，配合 AutocompleteStatus 提示剩余数量。
- filter: ((item, query) => boolean) | null. 自定义筛选；远程搜索时传 null。
- autoHighlight: boolean; default false. 自动高亮第一个建议。
- itemToStringValue: (item) => string. 对象建议写回输入框的文字；含 value 字段时可省略。

### AutocompleteInput
输入框，外观同 Input。
- size: "sm" | "default" | "lg"; default "default". 尺寸。
- startAddon: ReactNode. 前置图标。
- showTrigger / showClear: boolean; default false. 末端的展开 / 清除按钮。

### AutocompletePopup
弹出层，宽度至少与输入框相同。

### AutocompleteList / AutocompleteItem
建议列表与单条建议；触屏设备上行高 44px。

### AutocompleteEmpty / AutocompleteStatus
无结果提示；加载、结果数等状态文字（aria-live 播报）。

### AutocompleteGroup / AutocompleteGroupLabel / AutocompleteCollection / AutocompleteSeparator
分组展示。

### useAutocompleteFilter
Base UI 的本地化筛选工具。

## Keyboard
- ↓ / ↑: 打开列表并在建议间移动。
- Enter: 把高亮建议填入输入框。
- Esc: 关闭列表；再次按下清空输入。

## Source examples
### 基础用法
Source: apps/docs/src/content/autocomplete/demos/01-basic.tsx
```tsx
import { Autocomplete, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye/ui/components/autocomplete";
import { SearchIcon } from "lucide-react";

export const meta = { title: "基础用法", description: "输入时给出建议，也可以直接提交任意文字。" };

const questions = [
  "如何重置设备管理员密码",
  "设备离线后如何排查网络",
  "批量升级固件的步骤",
  "如何导出近 30 天的告警记录",
  "如何为子账号分配只读权限",
  "如何更换绑定的手机号",
  "发票申请与下载",
];

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Autocomplete items={questions}>
        <AutocompleteInput aria-label="搜索帮助中心" placeholder="搜索帮助中心" startAddon={<SearchIcon />} />
        <AutocompletePopup>
          <AutocompleteEmpty>没有相关文章，按回车搜索全部内容</AutocompleteEmpty>
          <AutocompleteList>
            {(question: string) => (
              <AutocompleteItem key={question} value={question}>
                {question}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
```

### 行内补全
Source: apps/docs/src/content/autocomplete/demos/02-inline.tsx
```tsx
import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye/ui/components/autocomplete";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "行内补全", description: "mode=\"both\"：高亮的建议直接补全到输入框里，方向键切换。" };

const commands = ["restart nginx", "restart redis", "reload nginx", "status nginx", "status mysql", "stop worker", "start worker"];

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="ops-command">运维指令</Label>
      <Autocomplete items={commands} mode="both">
        <AutocompleteInput id="ops-command" placeholder="例如 restart nginx" className="font-mono" />
        <AutocompletePopup>
          <AutocompleteList>
            {(command: string) => (
              <AutocompleteItem key={command} value={command} className="font-mono">
                {command}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
```

### 分组与清除
Source: apps/docs/src/content/autocomplete/demos/03-groups.tsx
```tsx
import { Autocomplete, AutocompleteCollection, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteSeparator } from "@qingye/ui/components/autocomplete";
import { Fragment } from "react";

export const meta = { title: "分组与清除" };

const groups = [
  { value: "最近搜索", items: ["杭州 A 栋机房", "UPS 电池更换"] },
  { value: "热门", items: ["温度告警阈值", "VPN 无法连接", "打印机脱机", "会议室投屏"] },
];

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Autocomplete items={groups}>
        <AutocompleteInput aria-label="搜索工单" placeholder="搜索工单或知识库" showClear />
        <AutocompletePopup>
          <AutocompleteEmpty>没有匹配的结果</AutocompleteEmpty>
          <AutocompleteList>
            {(group: (typeof groups)[number]) => (
              <Fragment key={group.value}>
                <AutocompleteGroup items={group.items}>
                  <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(item: string) => (
                      <AutocompleteItem key={item} value={item}>
                        {item}
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
                <AutocompleteSeparator />
              </Fragment>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
```

### 限制条数
Source: apps/docs/src/content/autocomplete/demos/04-limit.tsx
```tsx
import { Autocomplete, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteStatus, useAutocompleteFilter } from "@qingye/ui/components/autocomplete";
import { useState } from "react";

export const meta = { title: "限制条数", description: "limit 截断列表，状态行提示还有多少条可以继续输入缩小范围。" };

const stations = Array.from({ length: 40 }, (_, index) => `基站 HZ-${String(index + 101).padStart(4, "0")}`);
const limit = 6;

export default function Demo() {
  const [value, setValue] = useState("");
  const { contains } = useAutocompleteFilter();
  const total = stations.filter((station) => contains(station, value.trim())).length;
  const hidden = Math.max(0, total - limit);
  return (
    <div className="w-full max-w-sm">
      <Autocomplete items={stations} value={value} onValueChange={setValue} limit={limit}>
        <AutocompleteInput aria-label="基站编号" placeholder="输入基站编号" showTrigger />
        <AutocompletePopup>
          <AutocompleteEmpty>没有该编号的基站</AutocompleteEmpty>
          <AutocompleteList>
            {(station: string) => (
              <AutocompleteItem key={station} value={station} className="numeric">
                {station}
              </AutocompleteItem>
            )}
          </AutocompleteList>
          <AutocompleteStatus>{hidden ? `还有 ${hidden} 条结果，继续输入以缩小范围` : null}</AutocompleteStatus>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
```

### 远程建议
Source: apps/docs/src/content/autocomplete/demos/05-async.tsx
```tsx
import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteStatus } from "@qingye/ui/components/autocomplete";
import { Spinner } from "@qingye/ui/components/spinner";
import { useRef, useState } from "react";

export const meta = { title: "远程建议", description: "filter={null}，由接口返回建议；请求进行中显示加载状态。" };

const addresses = [
  "浙江省杭州市西湖区文三路 478 号",
  "浙江省杭州市滨江区网商路 699 号",
  "浙江省杭州市余杭区文一西路 969 号",
  "上海市浦东新区张江路 368 号",
  "北京市朝阳区望京东园四区 9 号",
];

// Stands in for an address-suggestion API.
const suggest = (query: string) =>
  new Promise<string[]>((resolve) => setTimeout(() => resolve(addresses.filter((item) => item.includes(query))), 450));

export default function Demo() {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const latest = useRef(0);
  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        items={items}
        filter={null}
        onValueChange={async (next) => {
          const query = next.trim();
          const ticket = ++latest.current;
          if (!query) return setItems([]);
          setLoading(true);
          const found = await suggest(query);
          if (ticket !== latest.current) return;
          setItems(found);
          setLoading(false);
        }}
      >
        <AutocompleteInput aria-label="安装地址" placeholder="输入街道或小区，例如 杭州" />
        <AutocompletePopup aria-busy={loading || undefined}>
          <AutocompleteStatus>
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner className="size-3.5" />
                正在获取地址建议…
              </span>
            ) : null}
          </AutocompleteStatus>
          <AutocompleteList>
            {(address: string) => (
              <AutocompleteItem key={address} value={address}>
                {address}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
```

### 尺寸与禁用
Source: apps/docs/src/content/autocomplete/demos/06-sizes.tsx
```tsx
import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye/ui/components/autocomplete";

export const meta = { title: "尺寸与禁用" };

const domains = ["example.com", "example.cn", "corp.example.com", "mail.example.com"];

function DomainAutocomplete({ size = "default", disabled = false }: { size?: "sm" | "default" | "lg"; disabled?: boolean }) {
  return (
    <Autocomplete items={domains} disabled={disabled}>
      <AutocompleteInput size={size} aria-label="邮箱域名" placeholder="邮箱域名" />
      <AutocompletePopup>
        <AutocompleteList>
          {(domain: string) => (
            <AutocompleteItem key={domain} value={domain}>
              {domain}
            </AutocompleteItem>
          )}
        </AutocompleteList>
      </AutocompletePopup>
    </Autocomplete>
  );
}

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <DomainAutocomplete size="sm" />
      <DomainAutocomplete />
      <DomainAutocomplete size="lg" />
      <DomainAutocomplete disabled />
    </div>
  );
}
```

