# 组合框 Combobox

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/combobox
Source: packages/ui/src/components/combobox.tsx
Source SHA-256: 7684a3f44500f1bce9de02476d6f6a55a44e12bdfd77d689e5c4ed46bdc8d293

可输入筛选的选择器：从较长的列表中选一项或多项。只需要输入建议、不强制选中时用 Autocomplete。

## Use and ownership
- 可输入筛选的选择器：从较长的列表中选一项或多项。只需要输入建议、不强制选中时用 Autocomplete。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- Combobox: function; owner combobox; PASS; props: ComboboxPrimitive.Root.Props<Value, Multiple>
- ComboboxChip: function; owner combobox; PASS; props: ComboboxPrimitive.Chip.Props & {
  removeProps?: ComboboxPrimitive.ChipRemove.Props;
}
- ComboboxChipRemove: function; owner combobox; PASS; props: ComboboxPrimitive.ChipRemove.Props
- ComboboxChips: function; owner combobox; PASS; props: ComboboxPrimitive.Chips.Props & {
  startAddon?: React.ReactNode;
}
- ComboboxChipsInput: function; owner combobox; PASS; props: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
}
- ComboboxClear: function; owner combobox; PASS; props: ComboboxPrimitive.Clear.Props
- ComboboxCollection: const; owner combobox; PASS
- ComboboxContext: const; owner combobox; PASS
- ComboboxEmpty: function; owner combobox; PASS; props: ComboboxPrimitive.Empty.Props
- ComboboxGroup: function; owner combobox; PASS; props: ComboboxPrimitive.Group.Props
- ComboboxGroupLabel: function; owner combobox; PASS; props: ComboboxPrimitive.GroupLabel.Props
- ComboboxInput: function; owner combobox; PASS; props: Omit<ComboboxPrimitive.Input.Props, "size"> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: React.ReactNode;
  size?: "sm" | "default" | "lg" | number;
  ref?: React.Ref<HTMLInputElement>;
  triggerProps?: ComboboxPrimitive.Trigger.Props;
  clearProps?: ComboboxPrimitive.Clear.Props;
}
- ComboboxItem: function; owner combobox; PASS; props: ComboboxPrimitive.Item.Props
- ComboboxList: function; owner combobox; PASS; props: ComboboxPrimitive.List.Props
- ComboboxPopup: function; owner combobox; PASS; props: ComboboxPrimitive.Popup.Props & {
  align?: ComboboxPrimitive.Positioner.Props["align"];
  sideOffset?: ComboboxPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: ComboboxPrimitive.Positioner.Props["alignOffset"];
  side?: ComboboxPrimitive.Positioner.Props["side"];
  anchor?: ComboboxPrimitive.Positioner.Props["anchor"];
  portalProps?: ComboboxPrimitive.Portal.Props;
}
- ComboboxPrimitive: reexport; owner combobox; UNVERIFIED
- ComboboxRow: function; owner combobox; PASS; props: ComboboxPrimitive.Row.Props
- ComboboxSeparator: function; owner combobox; PASS; props: ComboboxPrimitive.Separator.Props
- ComboboxStatus: function; owner combobox; PASS; props: ComboboxPrimitive.Status.Props
- ComboboxTrigger: function; owner combobox; PASS; props: ComboboxPrimitive.Trigger.Props
- ComboboxValue: const; owner combobox; PASS
- useComboboxFilter: const; owner combobox; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Combobox
根组件（Base UI Combobox.Root）。
- items: T[] | { value, items }[]. 选项数据；分组时传 { value, items } 数组。
- value / defaultValue / onValueChange: T | T[] | null. 受控 / 非受控的选中值。
- inputValue / onInputValueChange: string. 受控的输入文字，用于远程搜索。
- multiple: boolean; default false. 多选，配合 ComboboxChips 显示已选项。
- filter: ((item, query) => boolean) | null. 自定义筛选；远程搜索时传 null 关闭本地筛选。
- itemToStringLabel: (item) => string. 对象选项的显示文字；含 label 字段时可省略。
- autoHighlight: boolean; default false. 输入时自动高亮第一个匹配项，回车即可选中。
- name / required / disabled: string / boolean. 表单字段与状态。

### ComboboxInput
输入框，外观同 Input。
- size: "sm" | "default" | "lg"; default "default". 尺寸。
- showTrigger: boolean; default true. 末端的展开按钮。
- showClear: boolean; default false. 有值时显示清除按钮（替换展开按钮）。
- startAddon: ReactNode. 前置图标，例如搜索图标。

### ComboboxPopup
弹出层，宽度至少与输入框相同。

### ComboboxList / ComboboxItem
列表与选项；List 的 children 可以是 (item) => ReactNode。触屏设备上行高 44px。

### ComboboxEmpty / ComboboxStatus
无匹配时的提示；加载中、结果数等状态文字（以 aria-live 播报）。

### ComboboxGroup / ComboboxGroupLabel / ComboboxCollection / ComboboxSeparator
分组展示。

### ComboboxChips / ComboboxChip / ComboboxChipsInput / ComboboxValue
多选输入：已选项以标签显示，可逐个移除。

### useComboboxFilter
Base UI 的本地化筛选工具（contains、startsWith）。

## Keyboard
- ↓ / ↑: 打开列表并在选项间移动。
- Enter: 选中高亮项。
- Esc: 关闭列表；再次按下清空输入。
- Backspace: 多选时输入为空则移除最后一个标签。
- ← →: 多选时在标签之间移动焦点。

## Source examples
### 基础用法
Source: apps/docs/src/content/combobox/demos/01-basic.tsx
```tsx
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@qingye/ui/components/combobox";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "基础用法", description: "输入即筛选，方向键选择，回车确认。" };

const cities = ["北京", "上海", "广州", "深圳", "杭州", "南京", "苏州", "成都", "重庆", "武汉", "西安", "长沙", "青岛", "厦门"];

export default function Demo() {
  // 打开时清空输入，直接输入就能筛选，而不是把新文字接在旧值后面。
  const [query, setQuery] = useState("");
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label htmlFor="warehouse-city">发货城市</Label>
      <Combobox
        items={cities}
        defaultValue="杭州"
        inputValue={query}
        onInputValueChange={setQuery}
        onOpenChange={(open) => {
          if (open) setQuery("");
        }}
      >
        <ComboboxInput id="warehouse-city" placeholder="输入城市名" />
        <ComboboxPopup>
          <ComboboxEmpty>没有匹配的城市</ComboboxEmpty>
          <ComboboxList>
            {(city: string) => (
              <ComboboxItem key={city} value={city}>
                {city}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}
```

### 尺寸与禁用
Source: apps/docs/src/content/combobox/demos/02-sizes.tsx
```tsx
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@qingye/ui/components/combobox";

export const meta = { title: "尺寸与禁用" };

const models = ["iPhone 17 Pro", "iPhone 17", "iPad Air M3", "MacBook Air 13", "MacBook Pro 14", "Apple Watch S11"];

function ModelCombobox({ size = "default", disabled = false }: { size?: "sm" | "default" | "lg"; disabled?: boolean }) {
  return (
    <Combobox items={models} disabled={disabled} defaultValue={disabled ? "MacBook Pro 14" : null}>
      <ComboboxInput size={size} aria-label="设备型号" placeholder="搜索设备型号" />
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的型号</ComboboxEmpty>
        <ComboboxList>
          {(model: string) => (
            <ComboboxItem key={model} value={model}>
              {model}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <ModelCombobox size="sm" />
      <ModelCombobox />
      <ModelCombobox size="lg" />
      <ModelCombobox disabled />
    </div>
  );
}
```

### 前置图标、清除与自动高亮
Source: apps/docs/src/content/combobox/demos/03-clear.tsx
```tsx
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@qingye/ui/components/combobox";
import { SearchIcon } from "lucide-react";

export const meta = { title: "前置图标、清除与自动高亮", description: "autoHighlight 让回车直接选中第一个匹配项。" };

const people = [
  { label: "张伟", value: "zhangwei", team: "运维组" },
  { label: "王芳", value: "wangfang", team: "网络组" },
  { label: "李娜", value: "lina", team: "安全组" },
  { label: "刘洋", value: "liuyang", team: "运维组" },
  { label: "陈静", value: "chenjing", team: "数据库组" },
  { label: "杨帆", value: "yangfan", team: "网络组" },
];

export default function Demo() {
  return (
    <div className="w-full max-w-64">
      <Combobox items={people} autoHighlight defaultValue={people[2]}>
        <ComboboxInput
          aria-label="值班负责人"
          placeholder="搜索成员"
          startAddon={<SearchIcon />}
          showClear
        />
        <ComboboxPopup>
          <ComboboxEmpty>没有找到该成员</ComboboxEmpty>
          <ComboboxList>
            {(person: (typeof people)[number]) => (
              <ComboboxItem key={person.value} value={person}>
                <span className="flex items-center justify-between gap-4">
                  {person.label}
                  <span className="text-muted-foreground text-xs">{person.team}</span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}
```

### 分组
Source: apps/docs/src/content/combobox/demos/04-groups.tsx
```tsx
import { Combobox, ComboboxCollection, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxSeparator } from "@qingye/ui/components/combobox";
import { Fragment } from "react";

export const meta = { title: "分组", description: "筛选后空的分组会自动隐藏。" };

type Zone = { label: string; value: string };
const groups: { value: string; items: Zone[] }[] = [
  { value: "华东", items: [{ label: "杭州 · 可用区 H", value: "hz-h" }, { label: "杭州 · 可用区 I", value: "hz-i" }, { label: "上海 · 可用区 L", value: "sh-l" }] },
  { value: "华北", items: [{ label: "北京 · 可用区 K", value: "bj-k" }, { label: "张家口 · 可用区 A", value: "zjk-a" }] },
  { value: "华南", items: [{ label: "深圳 · 可用区 E", value: "sz-e" }, { label: "广州 · 可用区 B", value: "gz-b" }] },
];

export default function Demo() {
  return (
    <div className="w-full max-w-64">
      <Combobox items={groups}>
        <ComboboxInput aria-label="可用区" placeholder="选择可用区" />
        <ComboboxPopup>
          <ComboboxEmpty>没有匹配的可用区</ComboboxEmpty>
          <ComboboxList>
            {(group: (typeof groups)[number]) => (
              <Fragment key={group.value}>
                <ComboboxGroup items={group.items}>
                  <ComboboxGroupLabel>{group.value}</ComboboxGroupLabel>
                  <ComboboxCollection>
                    {(zone: Zone) => (
                      <ComboboxItem key={zone.value} value={zone}>
                        {zone.label}
                      </ComboboxItem>
                    )}
                  </ComboboxCollection>
                </ComboboxGroup>
                <ComboboxSeparator />
              </Fragment>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}
```

### 多选标签
Source: apps/docs/src/content/combobox/demos/05-multiple.tsx
```tsx
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxEmpty, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxValue } from "@qingye/ui/components/combobox";

export const meta = { title: "多选标签", description: "已选项显示为标签；输入框为空时按 Backspace 移除最后一个。" };

const tags = ["生产环境", "测试环境", "核心业务", "边缘节点", "待下线", "GPU", "高可用", "等保三级", "华东", "华北"];

export default function Demo() {
  return (
    <Combobox items={tags} multiple defaultValue={["生产环境", "核心业务"]}>
      <ComboboxChips className="w-full max-w-sm">
        <ComboboxValue>
          {(value: string[]) => (
            <>
              {value.map((tag) => (
                <ComboboxChip key={tag} aria-label={`移除 ${tag}`}>
                  {tag}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="资源标签" placeholder={value.length ? undefined : "添加标签"} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxEmpty>没有匹配的标签</ComboboxEmpty>
        <ComboboxList>
          {(tag: string) => (
            <ComboboxItem key={tag} value={tag}>
              {tag}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

### 远程搜索
Source: apps/docs/src/content/combobox/demos/06-async.tsx
```tsx
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxStatus } from "@qingye/ui/components/combobox";
import { Spinner } from "@qingye/ui/components/spinner";
import { useRef, useState } from "react";

export const meta = { title: "远程搜索", description: "filter={null} 关闭本地筛选；ComboboxStatus 播报加载状态。" };

type Device = { label: string; value: string; site: string };
const directory: Device[] = [
  { label: "HZ-CORE-SW01", value: "sw01", site: "杭州 A 栋 3F" },
  { label: "HZ-CORE-SW02", value: "sw02", site: "杭州 A 栋 3F" },
  { label: "HZ-EDGE-RT07", value: "rt07", site: "杭州 B 栋 1F" },
  { label: "SH-ACC-SW15", value: "sw15", site: "上海 张江 2F" },
  { label: "SH-UPS-03", value: "ups03", site: "上海 张江 B1" },
  { label: "BJ-FW-02", value: "fw02", site: "北京 望京 5F" },
];

// Stands in for a request to your API.
const search = (query: string) =>
  new Promise<Device[]>((resolve) =>
    setTimeout(() => resolve(directory.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))), 500),
  );

export default function Demo() {
  const [results, setResults] = useState<Device[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const latest = useRef(0);

  const onInputValueChange = async (next: string, details: { reason: string }) => {
    setQuery(next);
    if (details.reason === "item-press" || !next.trim()) return;
    const ticket = ++latest.current;
    setLoading(true);
    const found = await search(next.trim());
    if (ticket !== latest.current) return;
    setResults(found);
    setLoading(false);
  };

  const status = loading ? (
    <span className="flex items-center gap-2">
      <Spinner className="size-3.5" />
      正在搜索设备…
    </span>
  ) : !query.trim() ? "输入设备名，例如 SW" : results.length ? `找到 ${results.length} 台设备` : null;

  return (
    <div className="w-full max-w-72">
      <Combobox items={results} filter={null} onInputValueChange={onInputValueChange}>
        <ComboboxInput aria-label="关联设备" placeholder="搜索设备名" />
        <ComboboxPopup aria-busy={loading || undefined}>
          <ComboboxStatus>{status}</ComboboxStatus>
          <ComboboxEmpty>{!loading && query.trim() ? `没有名称包含「${query.trim()}」的设备` : null}</ComboboxEmpty>
          <ComboboxList>
            {(device: Device) => (
              <ComboboxItem key={device.value} value={device}>
                <span className="flex flex-col">
                  <span className="font-medium">{device.label}</span>
                  <span className="text-muted-foreground text-xs">{device.site}</span>
                </span>
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
    </div>
  );
}
```

### 可新建
Source: apps/docs/src/content/combobox/demos/07-creatable.tsx
```tsx
import { Combobox, ComboboxChip, ComboboxChips, ComboboxChipsInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxValue } from "@qingye/ui/components/combobox";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "可新建", description: "没有完全匹配时，列表末尾出现「新建」选项。" };

type Label = { value: string; label: string; create?: boolean };

export default function Demo() {
  const [labels, setLabels] = useState<Label[]>(
    ["网络故障", "硬件更换", "固件升级", "用户反馈"].map((label) => ({ value: label, label })),
  );
  const [selected, setSelected] = useState<Label[]>([labels[0]!]);
  const [query, setQuery] = useState("");
  const text = query.trim();
  const exists = labels.some((item) => item.label === text);
  const items = text && !exists ? [...labels, { value: `create:${text}`, label: text, create: true }] : labels;

  return (
    <Combobox
      items={items}
      multiple
      value={selected}
      onValueChange={(next: Label[]) => {
        const created = next.find((item) => item.create);
        if (created) {
          const label = { value: created.label, label: created.label };
          setLabels((previous) => [...previous, label]);
          setSelected([...next.filter((item) => !item.create), label]);
        } else {
          setSelected(next);
        }
        setQuery("");
      }}
      inputValue={query}
      onInputValueChange={setQuery}
    >
      <ComboboxChips className="w-full max-w-sm">
        <ComboboxValue>
          {(value: Label[]) => (
            <>
              {value.map((item) => (
                <ComboboxChip key={item.value} aria-label={`移除 ${item.label}`}>
                  {item.label}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput aria-label="工单标签" placeholder={value.length ? undefined : "输入或新建标签"} />
            </>
          )}
        </ComboboxValue>
      </ComboboxChips>
      <ComboboxPopup>
        <ComboboxList>
          {(item: Label) =>
            item.create ? (
              <ComboboxItem key={item.value} value={item}>
                <span className="flex items-center gap-2">
                  <PlusIcon aria-hidden="true" className="-ms-6 opacity-80" />
                  新建「{item.label}」
                </span>
              </ComboboxItem>
            ) : (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )
          }
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}
```

### 表单校验
Source: apps/docs/src/content/combobox/demos/08-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup } from "@qingye/ui/components/combobox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { useState, type FormEvent } from "react";

export const meta = { title: "表单校验", description: "required 未选时由 Field 显示错误；提交值为选项的 value。" };

const banks = [
  { label: "中国工商银行", value: "ICBC" },
  { label: "中国建设银行", value: "CCB" },
  { label: "中国农业银行", value: "ABC" },
  { label: "中国银行", value: "BOC" },
  { label: "招商银行", value: "CMB" },
  { label: "交通银行", value: "BOCOM" },
];

export default function Demo() {
  const [result, setResult] = useState<string | null>(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(String(new FormData(event.currentTarget).get("bank")));
  };
  return (
    <Form className="flex w-full max-w-64 flex-col gap-4" onSubmit={onSubmit}>
      <Field name="bank">
        <FieldLabel>开户银行</FieldLabel>
        <Combobox items={banks} required>
          <ComboboxInput placeholder="搜索银行" />
          <ComboboxPopup>
            <ComboboxEmpty>没有匹配的银行</ComboboxEmpty>
            <ComboboxList>
              {(bank: (typeof banks)[number]) => (
                <ComboboxItem key={bank.value} value={bank}>
                  {bank.label}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxPopup>
        </Combobox>
        <FieldDescription>用于结算打款，需与营业执照一致。</FieldDescription>
        <FieldError match="valueMissing">请选择开户银行</FieldError>
      </Field>
      <Button type="submit">保存结算信息</Button>
      {result !== null ? <p className="text-muted-foreground text-xs">bank = {result}</p> : null}
    </Form>
  );
}
```

