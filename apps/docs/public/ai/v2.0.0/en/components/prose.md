# Prose

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/prose
Source: packages/ui/src/components/prose.tsx
Source SHA-256: 1bedf9965e31b679df997fb01a3a9a41cb4464f76634276731cc374c402f080c

Typesets already-rendered Markdown or rich text as an independent reading paper; headings, lists, quotes, code and tables read existing text tiers and ink roles.

## Decision
Prose neither parses Markdown nor bundles a renderer: callers use any tool (react-markdown, MDX, server-rendered HTML) to produce native elements, and Prose only typesets h1–h4, p, strong/em, a, ul/ol (including task lists), blockquote, inline code, pre > code, table, hr, img/figure/figcaption, kbd and details/summary through descendant selectors, without rewriting their structure or attributes.

## Notes
- Ships no built-in copy strings; does not go through useUILocale.
- Ink roles and the paper swap automatically between light and dark; callers do not handle this.

## Use and ownership
- Present an already-rendered long-form or Markdown result: a help article, a changelog entry, an AI reply, or documentation body copy.
- Avoid: Prose does not parse Markdown strings; hand raw text to an actual renderer first and place its output inside Prose.
- Avoid: Use Text for short field descriptions or summaries; Prose typesets a whole long-form passage, not a general rich-text container.
- Library: Typesetting and ink roles for headings, paragraphs, lists, quotes, code, tables, rules, images, keys and disclosure widgets.
- Application: Markdown parsing, the content itself, task-list completion facts, footnotes and link destinations.

## Composition
- Children are the renderer's native element tree, or reviewed dangerouslySetInnerHTML; Prose only adds one className.
- Tables read the same visual rules as the Table component (washed header/footer bands, row height, tabular numeric cells); inline code reads Typography's Code rule; links read Link's linkClassName — none of these get a second drawing.

## Responsive behavior
- The measure is a fixed 38em and does not widen with the viewport; the inset tightens to the existing panel padding's narrow value.
- A very wide table does not yet scroll independently inside Prose (the paper's rounded corners need overflow-hidden rather than overflow-x-auto), so cells simply wrap — a known gap, not a missing default treatment.

## Customization
- 使用公开 render/ref/className/style 与原生属性；不混用主题三轴。

## Current exports
- Prose: function; owner prose; PASS; props: ProseProps
- ProseProps: type; owner prose; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Prose
The reading-pane container; renders as article by default.
- render / ref / className / style / native props: useRender.ComponentProps<"article">. Forward attributes, events and refs to the actual element; children are content the caller has already rendered.

## Keyboard

## Source examples
### 标题、段落、列表与引用
Source: apps/docs/src/content/prose/demos/01-article.tsx
```tsx
import { Prose } from "@qingye_lab/ui/components/prose";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "标题、段落、列表与引用", titleEn: "Headings, paragraphs, lists and quotes" } satisfies DemoMeta;
export default function Demo() {
  return <Prose>
    <h2>同步失败时，数据会怎样</h2>
    <p>每次同步开始时，青野会先记录本次要处理的范围，再逐条写入。如果在写入 <strong>1,284</strong> 条记录的过程中网络中断，已经写入的部分会保留，未写入的部分留到下一次同步——不会因为一次失败就清空整个集合。</p>
    <h3>重试与核实</h3>
    <p>失败记录会在「操作记录」里单独列出，并附上失败原因。你可以在 <a href="#retry">重试设置</a> 里调整自动重试的次数，默认规则是：</p>
    <ul>
      <li>默认重试 3 次，间隔依次为 1、5、15 分钟</li>
      <li>超过次数仍失败，转入人工核实队列
        <ul><li>核实后可以手动重新触发</li><li>也可以放弃这一条，不再重试</li></ul>
      </li>
      <li>命令行用户可以运行 <code>qingye sync --retry-failed</code> 只重试失败项</li>
    </ul>
    <blockquote><p>如果结果显示为「未知」，说明请求已经发出、但没有收到确认。这时直接重试可能写入两次；先在 Webhook 回调或审计日志里核实，再决定下一步。</p></blockquote>
    <p>想确认某一天是否同步完整，可以用<em>操作记录的筛选条件</em>按日期核对，不需要逐条翻看。</p>
  </Prose>;
}
```

### 代码块、表格与任务清单
Source: apps/docs/src/content/prose/demos/02-code-table-tasks.tsx
```tsx
import { Prose } from "@qingye_lab/ui/components/prose";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "代码块、表格与任务清单", titleEn: "Code blocks, tables and task lists" } satisfies DemoMeta;
export default function Demo() {
  return <Prose>
    <h3>排查步骤</h3>
    <ul className="contains-task-list">
      <li className="task-list-item"><input type="checkbox" checked disabled readOnly /> 在操作记录里确认失败条目数量</li>
      <li className="task-list-item"><input type="checkbox" disabled readOnly /> 核对 Webhook 回调是否已经收到</li>
      <li className="task-list-item"><input type="checkbox" disabled readOnly /> 决定重新触发还是放弃这一条</li>
    </ul>
    <p>按失败原因统计，最近一次同步的结果如下：</p>
    <table>
      <thead><tr><th>原因</th><th>记录数</th></tr></thead>
      <tbody>
        <tr><td>网络中断</td><td>812</td></tr>
        <tr><td>字段校验失败</td><td>96</td></tr>
        <tr><td>结果未知</td><td>14</td></tr>
      </tbody>
    </table>
    <p>命令行重试前，先按 <kbd>Ctrl</kbd> + <kbd>C</kbd> 中断正在进行的同步，再运行：</p>
    <pre><code>qingye sync --retry-failed --reason=network</code></pre>
    <details>
      <summary>这条命令会做什么</summary>
      <p>只重新发送上面统计里「网络中断」这一类失败记录，不触碰已经成功写入的数据，也不会改变「字段校验失败」队列。</p>
    </details>
  </Prose>;
}
```
