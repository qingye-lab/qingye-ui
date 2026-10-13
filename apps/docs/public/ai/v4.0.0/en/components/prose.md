# Prose

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/prose
Source: packages/ui/src/components/prose.tsx
Source SHA-256: cf55a83cf51f2d5d392973cc6e7e9a1f1f33d281bc961ab8756996c95434ffb9

Typesets already-rendered Markdown or rich text: headings, paragraphs, lists, quotes, code and tables read existing text tiers and ink roles. It brings its own reading paper by default; drop it where the page already has one.

## Decision
Prose neither parses Markdown nor bundles a renderer: callers use any tool (react-markdown, MDX, server-rendered HTML) to produce native elements, and Prose typesets only the native text blocks among its direct children (header, h1–h4, p, ul/ol including task lists, blockquote, pre, table, figure, details, hr, img) and the native elements inside them (strong/em, a, inline code, kbd, figcaption, summary and so on), without rewriting their structure or attributes. An element carrying data-slot, and everything inside it, is left alone, so components and live examples can sit directly in an article. The three heading ranks read the page's existing text tiers (h1 display, h2 title, h3 chapter), the same scale as the documentation site (ruling of 2026-10-12).

## Notes
- Ships no built-in copy strings; does not go through useUILocale.
- Ink roles and the paper swap automatically between light and dark; callers do not handle this.
- The typesetting rules sit in the stylesheet's components layer: any utility class on an element in the article overrides them, with no !important.
- Chinese paragraphs are justified and break lines under the strict rule; this follows the element's lang, so the page must declare its language correctly.
- Known limit: a second Prose nested through a component inside a native text block of an outer Prose (a Prose in a Card in a figure, for example) does not get its inline elements typeset; place it in a div or section instead.

## Use and ownership
- Present an already-rendered long-form or Markdown result: a help article, a changelog entry, an AI reply, or documentation body copy.
- Avoid: Prose does not parse Markdown strings; hand raw text to an actual renderer first and place its output inside Prose.
- Avoid: Use Text for short field descriptions or summaries; Prose typesets a whole long-form passage, not a general rich-text container.
- Library: Typesetting and ink roles for headings, paragraphs, lists, quotes, code, tables, rules, images, keys and disclosure widgets.
- Application: Markdown parsing, the content itself, task-list completion facts, footnotes and link destinations.

## Composition
- Children are the renderer's native element tree, or reviewed dangerouslySetInnerHTML; Prose only adds one className.
- Place library components directly in an article: an element carrying data-slot, and everything inside it, is not typeset. Put data-slot on a block you draw yourself to declare that it is not running text.
- Container children such as div and section are not entered. To typeset the headings and paragraphs inside one, make that container itself a Prose with framed={false} through render.
- Where the page already has a surface (a Card, the documentation paper) use framed={false}: it only typesets and draws no second paper; the column and inset come from --qy-prose-column and --qy-prose-inset, so the surface can read the same values.
- Put the h1 and the lead paragraph that follows it in a header: they sit one field gap apart and the lead reads in muted ink.
- Tables read the same visual rules as the Table component (washed header/footer bands, row height, tabular numeric cells); inline code reads Typography's Code rule; links read Link's linkClassName — none of these get a second drawing.

## Responsive behavior
- The column is 38 材 (760px) and does not widen with the viewport; paragraphs, lists and quotes stop at a measure of 40 reading characters (640px), while code blocks and tables may use the whole column. The paper's inset is 2 材 and tightens to the panel padding on narrow screens. All three are presets, set through --qy-prose-column, --qy-prose-measure and --qy-prose-inset.
- A very wide table does not yet scroll independently inside Prose (the paper's rounded corners need overflow-hidden rather than overflow-x-auto), so cells simply wrap — a known gap, not a missing default treatment.

## Customization
- 使用公开 render/ref/className/style 与原生属性；不混用主题三轴。

## Current exports
- Prose: function; owner prose; PASS; props: ProseProps
- ProseProps: type; owner prose; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Prose
- `framed?`: `boolean`. 是否自带一张纸（线、圆角、底、内缘）。文章已经放在一张纸上时（页面的主栏、Card、面板）设为 false， 只留排版，不再铺第二张；与 TableContainer 的 framed 同义。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Prose
The long-form container; renders as article by default.
- framed: boolean; default true. Whether it brings its own reading paper (surface, hairline, radius, inset and column limit). When false it only typesets and the surrounding surface is the paper.
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
      <li className="task-list-item"><input type="checkbox" checked disabled readOnly aria-labelledby="prose-task-1" /> <span id="prose-task-1">在操作记录里确认失败条目数量</span></li>
      <li className="task-list-item"><input type="checkbox" disabled readOnly aria-labelledby="prose-task-2" /> <span id="prose-task-2">核对 Webhook 回调是否已经收到</span></li>
      <li className="task-list-item"><input type="checkbox" disabled readOnly aria-labelledby="prose-task-3" /> <span id="prose-task-3">决定重新触发还是放弃这一条</span></li>
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

### 已有承载面与文中的组件
Source: apps/docs/src/content/prose/demos/03-unframed.tsx
```tsx
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Card } from "@qingye_lab/ui/components/card";
import { Prose } from "@qingye_lab/ui/components/prose";
import type { DemoMeta } from "@/lib/types";
export const meta = {
  title: "已有承载面与文中的组件",
  titleEn: "An existing surface, and a component in the text",
} satisfies DemoMeta;
export default function Demo() {
  return <Card className="w-full p-(--qy-panel-padding)">
    <Prose framed={false}>
      <header>
        <h1>重新同步</h1>
        <p>把上一次没有写入的记录再发送一遍，已经写入的不会重复。</p>
      </header>
      <p>重新同步只处理失败与未知两种结果。开始之前，先在操作记录里确认失败原因已经排除，否则同一批记录会再失败一次。</p>
      <Alert tone="warning">
        <AlertTitle>结果未知的记录需要先核实</AlertTitle>
        <AlertDescription>请求已经发出但没有收到确认，直接重试可能写入两次。</AlertDescription>
      </Alert>
      <p>核实完成后，在集合的「同步记录」页选择这一批，再点「重新同步」。</p>
    </Prose>
  </Card>;
}
```
