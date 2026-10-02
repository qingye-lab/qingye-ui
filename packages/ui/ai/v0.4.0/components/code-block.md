# 代码块 CodeBlock

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/code-block
Source: packages/ui/src/components/code-block.tsx
Source SHA-256: 9417a37c196a25cbcc670dcc6e0e9f42a2c848a29ecf4acd02496c0950e9689e

只读的代码展示：可选文件名与语言标题、复制按钮、行号、行高亮、横向滚动与最大高度。另含行内代码 InlineCode。

## Use and ownership
- 阅读、选择和复制代码、命令或配置，源文本需要保持准确。
- Avoid: 将代码展示当编辑器；把复制请求开始当成功；复制行号、折行空格或装饰文字。
- Library: 滚动区域、行结构、复制反馈与部位。
- Application: 源码、语法高亮生成、敏感信息遮蔽和代码说明。

## Composition
- code 提供干净源文；预高亮 children 配合 code，行号与高亮只影响阅读。InlineCode 用于短的行内语法。

## Responsive behavior
- 比较缩进时保留横向滚动；阅读长参数时可 wrap，换行不能修改原文。

## Customization
- maxHeight 约束工作面，wrap 决定阅读策略；文件名与语言用于识别而非重复解释。

## Current exports
- CodeBlock: function; owner code-block; PASS; props: CodeBlockProps
- CodeBlockProps: interface; owner code-block; PASS
- InlineCode: function; owner code-block; PASS; props: useRender.ComponentProps<"code">

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CodeBlock
不内置语法高亮：传纯文本 code，或传入已高亮的节点作为 children。
- code: string. 源代码文本，按原样渲染并用于复制。
- children: ReactNode. 已高亮的节点（如 Shiki 输出）。每行加 data-line 即可获得行号与高亮；同时传 code 让复制得到干净文本。
- filename: ReactNode. 标题栏中的文件名。
- language: string. 标题栏中的语言，同时写入 data-language。
- lineNumbers: boolean; default false. 显示行号（不可选中，复制时不会带上）。
- highlightLines: number[]. 需要强调的行（从 1 开始），使用 --code-highlight 底色。
- wrap: boolean; default false. 自动换行；默认不换行并横向滚动。
- maxHeight: number | string. 超过该高度后纵向滚动，如 320 或 "20rem"。
- copyable: boolean; default true. 显示复制按钮。无标题栏时按钮在右上角，悬停或聚焦时出现（触屏常显）。
- copyLabel: string; default locale.copyCode. 复制按钮的可访问名称。

### InlineCode
正文中的行内代码，字号随所在文字缩放（0.875em）。支持 render。

## Keyboard
- Tab: 聚焦代码区域（可滚动区域需要键盘可达），再次 Tab 到复制按钮。
- ← / → / ↑ / ↓: 聚焦代码区域后滚动。

## Source examples
### 基础
Source: apps/docs/src/content/code-block/demos/01-basic.tsx
```tsx
import { CodeBlock } from "@qingye/ui/components/code-block";

export const meta = { title: "基础", description: "没有标题栏时，复制按钮在右上角，悬停或聚焦时出现。" };

const code = `pnpm add @qingye/ui
pnpm add -D tailwindcss @tailwindcss/vite`;

export default function Demo() {
  return <CodeBlock className="w-full" code={code} />;
}
```

### 文件名、行号与高亮
Source: apps/docs/src/content/code-block/demos/02-header.tsx
```tsx
import { CodeBlock } from "@qingye/ui/components/code-block";

export const meta = { title: "文件名、行号与高亮", description: "标题栏显示文件名与语言；highlightLines 强调关键行。" };

const code = `import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5180 },
});`;

export default function Demo() {
  return (
    <CodeBlock
      className="w-full"
      code={code}
      filename="vite.config.ts"
      highlightLines={[6]}
      language="TypeScript"
      lineNumbers
    />
  );
}
```

### 横向滚动、最大高度与换行
Source: apps/docs/src/content/code-block/demos/03-scroll.tsx
```tsx
import { CodeBlock } from "@qingye/ui/components/code-block";

export const meta = {
  title: "横向滚动、最大高度与换行",
  description: "长行默认横向滚动；maxHeight 限制高度后纵向滚动；wrap 改为自动换行。",
};

const json = `{
  "orderId": "SO-20260930-004817",
  "store": { "id": "XH-001", "name": "徐汇漕溪北路店", "address": "上海市徐汇区漕溪北路 398 号汇智大厦 12 层" },
  "items": [
    { "sku": "LT-0021", "name": "生椰拿铁（大杯 / 少冰 / 少糖）", "qty": 2, "price": 18.0 },
    { "sku": "BG-1180", "name": "芝士牛肉堡", "qty": 1, "price": 32.0 },
    { "sku": "SN-0402", "name": "薯条（中）", "qty": 1, "price": 12.0 }
  ],
  "payment": { "channel": "wechat", "amount": 80.0, "paidAt": "2026-09-30T14:26:08+08:00" },
  "delivery": { "type": "pickup", "code": "A0417" },
  "remark": ""
}`;

const log = `[14:26:08.412] INFO  order.created id=SO-20260930-004817 store=XH-001 channel=miniapp amount=80.00
[14:26:08.533] INFO  payment.confirmed id=SO-20260930-004817 provider=wechat trade_no=4200002281202609301486532917`;

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <CodeBlock code={json} filename="order.json" language="JSON" lineNumbers maxHeight={240} />
      <CodeBlock code={log} filename="server.log" wrap />
    </div>
  );
}
```

### 传入已高亮的节点
Source: apps/docs/src/content/code-block/demos/04-highlighted.tsx
```tsx
import { CodeBlock } from "@qingye/ui/components/code-block";

export const meta = {
  title: "传入已高亮的节点",
  description: "组件不绑定高亮库：把 Shiki 等工具生成的节点作为 children，每行加 data-line 即可使用行号。",
};

const code = `const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(\`合计 ¥\${total.toFixed(2)}\`);`;

const keyword = "text-[oklch(0.55_0.2_300)] dark:text-[oklch(0.75_0.14_300)]";
const string = "text-[oklch(0.52_0.13_150)] dark:text-[oklch(0.78_0.13_150)]";
const fn = "text-[oklch(0.52_0.17_250)] dark:text-[oklch(0.76_0.12_250)]";
const muted = "text-muted-foreground";

export default function Demo() {
  return (
    <CodeBlock className="w-full" code={code} filename="cart.ts" lineNumbers>
      <span data-line="">
        <span className={keyword}>const</span> total <span className={muted}>=</span> items.<span className={fn}>reduce</span>
        <span className={muted}>(</span>(sum, item) <span className={keyword}>=&gt;</span> sum <span className={muted}>+</span> item.price{" "}
        <span className={muted}>*</span> item.qty, <span className={string}>0</span>
        <span className={muted}>);</span>
      </span>
      <span data-line="">
        console.<span className={fn}>log</span>
        <span className={muted}>(</span>
        <span className={string}>{"`合计 ¥${"}</span>total.<span className={fn}>toFixed</span>(<span className={string}>2</span>)
        <span className={string}>{"}`"}</span>
        <span className={muted}>);</span>
      </span>
    </CodeBlock>
  );
}
```

### 行内代码
Source: apps/docs/src/content/code-block/demos/05-inline.tsx
```tsx
import { InlineCode } from "@qingye/ui/components/code-block";

export const meta = { title: "行内代码", description: "字号随所在文字缩放，长内容可在行间断开。" };

export default function Demo() {
  return (
    <p className="max-w-md text-pretty text-sm leading-relaxed">
      安装后在入口样式中加入 <InlineCode>@import "@qingye/ui/styles.css"</InlineCode>，再用{" "}
      <InlineCode>ThemeProvider</InlineCode> 包裹应用。需要密集表格时设置{" "}
      <InlineCode>density="compact"</InlineCode>。
    </p>
  );
}
```

