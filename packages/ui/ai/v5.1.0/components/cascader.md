# 级联选择 Cascader

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/cascader
Source: packages/ui/src/components/cascader.tsx
Source SHA-256: 9ceda3ccbb6f291761c0eee3440aa2c4be159331c7e39243f22e02022a424915

沿「根到叶」的路径选一个值，每一级的候选各占一列。

## Decision
选择的是一条路径，不是最后一项：同名的叶子（不同省的「市辖区」）靠路径区分，所以值、表单与回调都用路径。分支能不能提交由 selectParent 决定，而不是看有没有子项；加载与失败是应用告知之外、组件自己看得见的事实，不会被当成「没有子项」。

## Notes
- 触发器的文字是完整路径，过长时用省略号截断，完整文字仍在 DOM 里，读屏读到全部。
- 鼠标点父项只展开；selectParent 时父项同时成为值，弹层保持打开以便继续往下选。键盘上这是两个键：Enter 提交并关闭，→ 展开。
- 焦点是真实 DOM 焦点（roving tabindex），每列是一个 listbox，名称是它的父项，第一列取触发器的名称。搜索结果例外：焦点留在输入里，用 aria-activedescendant。
- 选项上的 aria-haspopup 与 aria-expanded 表示「有下一列」与「下一列已展开」。
- 候选的可见字号与高度与 Select 的候选项相同；每列宽度由内容决定，下限由留白、尾部标记与最小文字区推出，列多时候选面横向滚动。

## Use and ownership
- 候选天然成层、要选到某一层的值：地区、类目、组织
- Avoid: 只有一层候选用 Select，候选很多需过滤用 Combobox
- Avoid: 需要多选路径时用 Tree 的勾选形态
- Avoid: 要并置比较的少量候选用 RadioGroup
- Library: 焦点、展开的列、搜索草稿、未受控值、异步结果的缓存与重试
- Application: 受控值、候选数据、loadChildren 的实际请求、invalid 与保存事实

## Composition
- FieldLabel + Cascader + FieldDescription + FieldError

## Responsive behavior
- 列多时候选面横向滚动，不撑破视口；本批只做桌面检查

## Customization
- 触发器 className、Popover 的面板与定位

## Current exports
- Cascader: function; owner cascader; PASS; props: CascaderProps
- CascaderOption: type; owner cascader; PASS
- CascaderProps: type; owner cascader; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Cascader
- `aria-describedby?`: `string | undefined`.
- `aria-invalid?`: `"true" | "false" | boolean`.
- `aria-label?`: `string | undefined`.
- `aria-labelledby?`: `string | undefined`.
- `className?`: `string | undefined`.
- `defaultValue?`: `string[] | null | undefined`.
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `id?`: `string | undefined`.
- `loadChildren?`: `((option: CascaderOption) => Promise<CascaderOption[]>) | undefined`. 展开一个没有 children 的非叶子节点时调用；失败（reject）显示可重试的错误。
- `name?`: `string | undefined`. 隐藏 input 的名称；提交值是路径各段用 "/" 连接，未选择提交空字符串。
- `onValueChange?`: `((path: string[] | null, options: CascaderOption[]) => void) | undefined`. 提交了新的路径时调用；第二个参数是路径上各节点的候选对象（尚未取到的节点缺省）。
- `options`: `readonly CascaderOption[]`. 第一列的候选；子项在 children 里，或由 loadChildren 按需取来。
- `placeholder?`: `React.ReactNode`.
- `readOnly?`: `boolean`.
- `required?`: `boolean`.
- `searchable?`: `boolean`. 弹层顶部出现搜索输入；输入后改为一列扁平的匹配路径（只搜已知的节点，未加载的分支不在其中）。
- `selectParent?`: `boolean`. 默认只有叶子可提交；true 时任意层级都可以提交。
- `value?`: `string[] | null | undefined`. 从根到所选节点的路径；null 是未选择。省略初值不会选第一项。

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Cascader
触发器、列式候选面与表单值。触发器与 Select 同一套几何；候选面用 Popover 的面板。
- options: CascaderOption[]. 第一列的候选。节点 { value, label, disabled?, children?, isLeaf? }：同一父项下 value 不重复；有 children 的是分支，没有则是叶子（配了 loadChildren 时除外）。
- value / defaultValue: string[] | null. 从根到所选节点的路径，null 是未选择；省略初值不会选第一项。路径里尚未加载的节点，触发器退回显示它的 value。
- onValueChange: (path: string[] | null, options: CascaderOption[]) => void. 提交了新的路径时调用；第二个参数是路径上各节点。提交相同路径不调用。
- selectParent: boolean; default false. 默认只有叶子可提交；true 时任意层级都可提交（对应 Ant Design 的 changeOnSelect）。
- loadChildren: (option: CascaderOption) => Promise<CascaderOption[]>. 展开一个没有 children、也没有标 isLeaf 的节点时调用。等待时该列显示「正在加载」，reject 时显示「加载失败」与重试；结果为空数组则该节点成为叶子。结果按路径缓存，组件不重复请求。
- searchable: boolean; default false. 弹层顶部出现搜索输入；有输入时改为一列扁平的匹配路径（用 locale 的路径分隔符连接）。只搜已知节点，未加载的分支不在其中。
- placeholder: ReactNode; default locale.selectPlaceholder. 仅未选择时显示；不能替代 FieldLabel。
- disabled / readOnly / required: boolean; default false. 只读保留当前值且不打开候选面；禁用的字段不提交；required 参与原生校验并标 aria-required。invalid 跟随 Field。
- name / form: string. 隐藏输入的名称与所属表单。提交值是路径各段用 "/" 连接，例如 "zj/hz/xh"，未选择提交空字符串；所以 value 里不应含 "/"。
- aria-label / aria-labelledby / id / className: string. 触发器的名称与样式入口。没有名称会抛错：用 aria-label、aria-labelledby，或放进带 FieldLabel 的 Field。

## Keyboard
- Enter / Space / ↓ / ↑: 在触发器上打开候选面，焦点落在当前路径的末项（无值时是第一项）。
- ↓ / ↑ / Home / End: 在当前列内移动。焦点即位置：深于它的列在离开所在项时收起。
- →（RTL 为 ←）: 有子项时展开并进入下一列首项；子项正在加载时，加载完成后再进入。
- ←（RTL 为 →）: 回到上一列的父项并收起本列。
- Enter / Space: 可提交的项：提交并关闭，焦点回触发器；不可提交的分支：进入下一列。
- 文字键: 在当前列内按首字母跳转；快速连续输入则按前缀匹配。
- Esc: 关闭并回到触发器，保留原值。
- 搜索中 ↓ / ↑ / Enter: 焦点留在输入里，方向键移动匹配路径的高亮，Enter 提交；输入为空时 ↓ 进入列。

## Source examples
### 地区
Source: apps/docs/src/content/cascader/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "地区", titleEn: "Regions" };

const zh: CascaderOption[] = [
  { value: "zj", label: "浙江", children: [
    { value: "hz", label: "杭州", children: [{ value: "xh", label: "西湖区" }, { value: "bj", label: "滨江区", disabled: true }, { value: "yh", label: "余杭区" }] },
    { value: "nb", label: "宁波", children: [{ value: "hs", label: "海曙区" }, { value: "jb", label: "江北区" }] },
  ] },
  { value: "js", label: "江苏", children: [
    { value: "nj", label: "南京", children: [{ value: "gl", label: "鼓楼区" }, { value: "xw", label: "玄武区" }] },
    { value: "sz", label: "苏州", children: [{ value: "gs", label: "姑苏区" }] },
  ] },
  { value: "bj", label: "北京", children: [{ value: "bj-city", label: "北京市", children: [{ value: "dc", label: "东城区" }, { value: "xc", label: "西城区" }] }] },
];
const en: CascaderOption[] = [
  { value: "zj", label: "Zhejiang", children: [
    { value: "hz", label: "Hangzhou", children: [{ value: "xh", label: "Xihu" }, { value: "bj", label: "Binjiang", disabled: true }, { value: "yh", label: "Yuhang" }] },
    { value: "nb", label: "Ningbo", children: [{ value: "hs", label: "Haishu" }, { value: "jb", label: "Jiangbei" }] },
  ] },
  { value: "js", label: "Jiangsu", children: [
    { value: "nj", label: "Nanjing", children: [{ value: "gl", label: "Gulou" }, { value: "xw", label: "Xuanwu" }] },
    { value: "sz", label: "Suzhou", children: [{ value: "gs", label: "Gusu" }] },
  ] },
  { value: "bj", label: "Beijing", children: [{ value: "bj-city", label: "Beijing", children: [{ value: "dc", label: "Dongcheng" }, { value: "xc", label: "Xicheng" }] }] },
];

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const options = english ? en : zh;
  const [leaf, setLeaf] = useState<string[] | null>(["zj", "hz", "xh"]);
  const [any, setAny] = useState<string[] | null>(null);
  return (
    <div className="grid w-full grid-cols-2 items-start gap-(--qy-space-4)">
      <Field>
        <FieldLabel>{english ? "Leaf only" : "只选到叶子"}</FieldLabel>
        <Cascader options={options} value={leaf} onValueChange={setLeaf} />
      </Field>
      <Field>
        <FieldLabel>{english ? "Any level" : "任意一级"}</FieldLabel>
        <Cascader options={options} selectParent value={any} onValueChange={setAny} />
      </Field>
    </div>
  );
}
```

### 按需加载
Source: apps/docs/src/content/cascader/demos/02-async.tsx
```tsx
import { useRef } from "react";
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "按需加载", titleEn: "Load on demand" };

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function Demo() {
  const { code } = useUILocale();
  const english = code.startsWith("en");
  const failed = useRef(false);
  const roots: CascaderOption[] = english
    ? [{ value: "zj", label: "Zhejiang" }, { value: "js", label: "Jiangsu" }, { value: "xz", label: "Tibet", isLeaf: true }]
    : [{ value: "zj", label: "浙江" }, { value: "js", label: "江苏" }, { value: "xz", label: "西藏", isLeaf: true }];
  const cities: Record<string, CascaderOption[]> = english
    ? { zj: [{ value: "hz", label: "Hangzhou", isLeaf: true }, { value: "nb", label: "Ningbo", isLeaf: true }], js: [{ value: "nj", label: "Nanjing", isLeaf: true }, { value: "sz", label: "Suzhou", isLeaf: true }] }
    : { zj: [{ value: "hz", label: "杭州", isLeaf: true }, { value: "nb", label: "宁波", isLeaf: true }], js: [{ value: "nj", label: "南京", isLeaf: true }, { value: "sz", label: "苏州", isLeaf: true }] };
  return (
    <Field>
      <FieldLabel>{english ? "Region" : "地区"}</FieldLabel>
      <Cascader
        options={roots}
        loadChildren={async option => {
          await delay(700);
          // 江苏第一次取不到，重试后成功。
          if (option.value === "js" && !failed.current) { failed.current = true; throw new Error("offline"); }
          return cities[option.value] ?? [];
        }}
      />
    </Field>
  );
}
```

### 搜索路径
Source: apps/docs/src/content/cascader/demos/03-search.tsx
```tsx
import { Cascader, type CascaderOption } from "@qingye_lab/ui/components/cascader";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "搜索路径", titleEn: "Search paths" };

const zh: CascaderOption[] = [
  { value: "home", label: "家居", children: [
    { value: "furniture", label: "家具", children: [{ value: "sofa", label: "沙发" }, { value: "table", label: "餐桌" }, { value: "bed", label: "床" }] },
    { value: "lighting", label: "灯具", children: [{ value: "desk-lamp", label: "台灯" }, { value: "ceiling", label: "吸顶灯" }] },
  ] },
  { value: "digital", label: "数码", children: [
    { value: "phone", label: "手机", children: [{ value: "case", label: "手机壳" }, { value: "charger", label: "充电器" }] },
    { value: "audio", label: "音频", children: [{ value: "headphone", label: "耳机" }, { value: "speaker", label: "音箱" }] },
  ] },
  { value: "books", label: "图书", children: [{ value: "fiction", label: "文学", children: [{ value: "novel", label: "小说" }, { value: "poetry", label: "诗歌" }] }] },
];
const en: CascaderOption[] = [
  { value: "home", label: "Home", children: [
    { value: "furniture", label: "Furniture", children: [{ value: "sofa", label: "Sofas" }, { value: "table", label: "Dining tables" }, { value: "bed", label: "Beds" }] },
    { value: "lighting", label: "Lighting", children: [{ value: "desk-lamp", label: "Desk lamps" }, { value: "ceiling", label: "Ceiling lights" }] },
  ] },
  { value: "digital", label: "Digital", children: [
    { value: "phone", label: "Phones", children: [{ value: "case", label: "Cases" }, { value: "charger", label: "Chargers" }] },
    { value: "audio", label: "Audio", children: [{ value: "headphone", label: "Headphones" }, { value: "speaker", label: "Speakers" }] },
  ] },
  { value: "books", label: "Books", children: [{ value: "fiction", label: "Fiction", children: [{ value: "novel", label: "Novels" }, { value: "poetry", label: "Poetry" }] }] },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  return (
    <Field>
      <FieldLabel>{english ? "Category" : "类目"}</FieldLabel>
      <Cascader options={english ? en : zh} searchable name="category" />
    </Field>
  );
}
```
