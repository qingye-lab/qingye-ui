# 长文 Prose

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/prose
Source: packages/ui/src/components/prose.tsx
Source SHA-256: a94bcf0559188c47580dade7e018f602f7340e267230ace89e0c7d16d0df415e

给已渲染的 Markdown / 富文本排版：标题、段落、列表、引用、代码、表格读已有的文字档与墨阶。默认只排版、不带框；文章独自成篇、没有承载面时用 framed 给它一张阅读纸。

## Decision
Prose 不解析 Markdown、不内置渲染器：调用方用任意工具（react-markdown、MDX、服务端 HTML）产出原生元素，Prose 只给直接子块里的原生文本元素（header、h1–h4、p、ul/ol 含任务列表、blockquote、pre、table、figure、details、hr、img）以及这些子块之内的原生元素（strong/em、a、行内代码、kbd、figcaption、summary 等）排版，不改写它们的结构或属性。带 data-slot 的元素与它的内部不进入，所以文章里可以直接放组件与演示。标题三级取页面已有的文字档（h1 展示、h2 标题、h3 章节），与官网文档同一套（2026-10-12 裁决）。

## Notes
- 不内置任何文案字符串，不需要经过 useUILocale。
- 深浅主题下墨阶与纸自动互换，不需要调用方处理。
- 排版规则在样式的 components 层：给文章里的元素加任何工具类都能覆盖它，不需要 !important。
- 中文段落两端对齐并按严格规则断行；判断依据是元素的 lang，页面须正确声明语言。
- 已知边界：另一篇 Prose 若隔着组件嵌在外层 Prose 的原生文本块里（如 figure 里的 Card 里再放 Prose），内层的行内元素不排版；把它放进 div 或 section。

## Use and ownership
- 展示一段已经渲染好的长文或 Markdown 结果：帮助文章、更新日志、AI 回复、文档正文。
- Avoid: Prose 不解析 Markdown 字符串；把原始文本交给具体渲染器，渲染结果再放进 Prose。
- Avoid: 短小的字段说明或摘要用 Text；Prose 是给整段长文排版，不是通用的富文本容器。
- Library: 标题、段落、列表、引用、代码、表格、分隔线、图片、键位、详情框的排版与墨阶。
- Application: Markdown 解析、内容本身、任务列表勾选框的完成事实、脚注与链接目标。

## Composition
- children 是渲染器产出的原生元素树，或经审查的 dangerouslySetInnerHTML；Prose 只加一层 className。
- 文章里直接放库组件：带 data-slot 的元素及其内部不排版。自己画的一段内容加上 data-slot，就声明了它不是正文。
- div、section 这类容器子块不进入。要让容器里的标题与段落也成文，用 render 把这个容器本身做成一篇 Prose。
- 页面已经有承载面（Card、文档站的纸）时保持默认（不带框）：只排版，不再画第二张纸；栏宽与内缘读 --qy-prose-column、--qy-prose-inset，承载面可以取同一组值。文章独自成篇、没有承载面时才设 framed。
- h1 与紧随的一段导语放进 header：两者相隔一个字段间距，导语读淡墨。
- 表格读与 Table 组件相同的视觉规则（清染表头/表尾、行高、数字列等宽），行内代码读 Typography 的 Code 规则，链接读 Link 的 linkClassName，不另起一套画法。

## Responsive behavior
- 栏宽 38 材（760px），不随视口拉宽；段落、列表与引用的行长止于 40 个正文字（640px），代码块与表格可以用满栏。纸的内缘 2 材，窄屏收紧到面板内缘。三个值都是预设，入口是 --qy-prose-column、--qy-prose-measure、--qy-prose-inset。
- 很宽的表格目前不会在 Prose 内独立横向滚动（纸的圆角需要 overflow-hidden 而非 overflow-x-auto），只能按单元格自然换行——已知缺口，非默认画法缺失。

## Customization
- 使用公开 render/ref/className/style 与原生属性；不混用主题三轴。

## Current exports
- Prose: function; owner prose; PASS; props: ProseProps
- ProseProps: type; owner prose; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Prose
- `framed?`: `boolean`. 是否自带一张纸（线、圆角、底、内缘），默认不带。文章多半已经放在一张纸上（页面的主栏、Card、面板）， 再铺一张是多余的框（用户裁决：不要盒装样本、不要多余的框）；文章独自成篇、没有承载面时才设为 true。 与 TableContainer 的 framed 同义，只是默认相反：表格容器独立出现时需要线，长文通常有所依附。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Prose
长文容器；默认渲染为 article。
- framed: boolean; default false. 是否自带阅读纸（面、清墨线、圆角、内缘与栏宽上限）。默认 false，只排版，纸由所在的承载面负责（不要盒装样本、不要多余的框）；独自成篇时设为 true。
- render / ref / className / style / 原生属性: useRender.ComponentProps<"article">. 属性、事件与 ref 透传实际元素；children 是调用方已渲染好的内容。

## Keyboard

## Source examples
### 标题、段落、列表与引用
Source: apps/docs/src/content/prose/demos/01-article.tsx
```tsx
import { Prose } from "@qingye_lab/ui/components/prose";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "标题、段落、列表与引用", titleEn: "Headings, paragraphs, lists and quotes" } satisfies DemoMeta;
export default function Demo() {
  return <Prose framed>
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
  return <Prose framed>
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
