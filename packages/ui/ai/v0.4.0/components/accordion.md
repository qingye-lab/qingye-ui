# 手风琴 Accordion

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/accordion
Source: packages/ui/src/components/accordion.tsx
Source SHA-256: 2800682e9df1c66c1f420b30ac23110f81e3adf0cb68e73b63d3034038c503ba

一组可以逐个展开的分节，用于常见问题、分组设置这类“标题一览、按需展开”的内容。只有一个折叠区时用 Disclosure。

## Use and ownership
- 围绕一组可独立阅读的章节按需展开，如问题列表和次要分组设置。
- Avoid: 关键后果、必填项与错误恢复不能仅藏在关闭章节中；文档标题层级不能由视觉大小代替。
- Library: 关联章节标题、展开按钮与面板，支持单开或多开、禁用及键盘导航。
- Application: 决定章节分类、哪些内容必须先显示，及收起后的草稿保留与清除。

## Composition
- Trigger 通过 headerProps.render 匹配页面 h2 / h3 等层级；需要保留字段时为 Panel 设 keepMounted。

## Responsive behavior
- 长标题与箭头分别占位；窄屏展开文本应可读，粗指针检查整行目标。

## Customization
- 边界来自章节之间的分隔，不要求每节套卡片；展开与退出使用共享时长和缓动。

## Current exports
- Accordion: function; owner accordion; PASS; props: AccordionPrimitive.Root.Props
- AccordionContent: function; owner accordion; alias of AccordionPanel; PASS; props: AccordionPrimitive.Panel.Props
- AccordionItem: function; owner accordion; PASS; props: AccordionPrimitive.Item.Props
- AccordionPanel: function; owner accordion; PASS; props: AccordionPrimitive.Panel.Props
- AccordionPrimitive: reexport; owner accordion; UNVERIFIED
- AccordionTrigger: function; owner accordion; PASS; props: AccordionPrimitive.Trigger.Props & {
  /** Match the surrounding document heading level, e.g. render an h2. */
  headerProps?: AccordionPrimitive.Header.Props;
}

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Accordion
根组件，管理哪些分节处于展开状态。
- multiple: boolean; default false. 是否允许同时展开多个分节。
- value / defaultValue: any[]. 展开分节的 value 列表（受控 / 非受控）。
- onValueChange: (value: any[]) => void. 展开状态变化时调用。
- disabled: boolean; default false. 禁用全部分节。

### AccordionItem
单个分节，分节之间以细线分隔。
- value: any. 分节标识；不传时自动生成。
- disabled: boolean; default false. 禁用该分节。

### AccordionTrigger
分节标题按钮，右侧箭头随展开旋转；默认外层标题为 h3。
- headerProps: Accordion.Header props. 设置标题层级与属性，例如 { render: <h2 /> }，以匹配所在文档结构。

### AccordionPanel
分节内容，高度过渡展开与收起，可被中途打断。别名 AccordionContent。
- keepMounted: boolean; default false. 收起时保留在 DOM 中。
- hiddenUntilFound: boolean; default false. 收起时内容仍可被浏览器页内搜索找到并自动展开。

## Keyboard
- Tab: 在分节标题之间移动。
- Enter / Space: 展开或收起当前分节。
- ↑ / ↓: 移动到上一个 / 下一个分节标题。
- Home / End: 移动到第一个 / 最后一个分节标题。

## Source examples
### 默认
Source: apps/docs/src/content/accordion/demos/01-default.tsx
```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";

export const meta = { title: "默认", description: "一次只展开一个分节。" };

const faqs = [
  { q: "免费版有哪些限制？", a: "免费版最多 3 个项目、5 位成员，构建时长每月 300 分钟。" },
  { q: "可以随时取消订阅吗？", a: "可以。取消后当前计费周期内仍可正常使用，到期后自动降级为免费版。" },
  { q: "支持开具发票吗？", a: "支持增值税普通发票与专用发票，在「账单」页面填写抬头后申请，3 个工作日内开具。" },
];

export default function Demo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={[faqs[0]!.q]}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.q} value={faq.q}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionPanel>{faq.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

### 同时展开多个与禁用
Source: apps/docs/src/content/accordion/demos/02-multiple.tsx
```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";

export const meta = { title: "同时展开多个与禁用", description: "multiple 允许多个分节同时展开；单个分节可以禁用。" };

export default function Demo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["build", "env"]} multiple>
      <AccordionItem value="build">
        <AccordionTrigger>构建命令</AccordionTrigger>
        <AccordionPanel>
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">pnpm build</code>
          ，输出目录为 dist。
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="env">
        <AccordionTrigger>环境变量</AccordionTrigger>
        <AccordionPanel>已配置 6 个变量，其中 2 个仅在生产环境生效。</AccordionPanel>
      </AccordionItem>
      <AccordionItem disabled value="domain">
        <AccordionTrigger>自定义域名（团队版可用）</AccordionTrigger>
        <AccordionPanel>绑定你自己的域名，并自动签发 HTTPS 证书。</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
```

### 放在卡片中
Source: apps/docs/src/content/accordion/demos/03-card.tsx
```tsx
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";
import { BellIcon, LockIcon, PaletteIcon } from "lucide-react";

export const meta = { title: "放在卡片中", description: "加上边框与内边距，作为设置页的分组。" };

const sections = [
  { value: "appearance", icon: PaletteIcon, title: "外观", text: "主题、字号与界面密度。" },
  { value: "notify", icon: BellIcon, title: "通知", text: "提及、指派与评论提醒的接收方式。" },
  { value: "security", icon: LockIcon, title: "安全", text: "两步验证、登录设备与访问令牌。" },
];

export default function Demo() {
  return (
    <Accordion className="w-full max-w-md rounded-xl border bg-card px-4">
      {sections.map((s) => (
        <AccordionItem key={s.value} value={s.value}>
          <AccordionTrigger>
            <span className="flex items-center gap-2.5">
              <s.icon aria-hidden="true" className="size-4 text-muted-foreground" />
              {s.title}
            </span>
          </AccordionTrigger>
          <AccordionPanel className="ps-6.5">{s.text}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

