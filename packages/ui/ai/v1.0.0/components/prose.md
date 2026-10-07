# 长文 Prose

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/prose
Source: packages/ui/src/components/prose.tsx
Source SHA-256: 9971982165aa4dcfcc915522efc483144d3de9b1ea9b2416f1175214fcce6c00

给已渲染的 Markdown / 富文本排版：一张独立的阅读纸，标题、列表、引用、代码、表格读已有的文字档与墨阶。

## Decision
Prose 不解析 Markdown、不内置渲染器：调用方用任意工具（react-markdown、MDX、服务端 HTML）产出原生元素，Prose 只用后代选择器给 h1–h4、p、strong/em、a、ul/ol（含任务列表）、blockquote、行内代码、pre > code、table、hr、img/figure/figcaption、kbd、details/summary 排版，不改写它们的结构或属性。

## Notes
- 不内置任何文案字符串，不需要经过 useUILocale。
- 深浅主题下墨阶与纸自动互换，不需要调用方处理。

## Use and ownership
- 展示一段已经渲染好的长文或 Markdown 结果：帮助文章、更新日志、AI 回复、文档正文。
- Avoid: Prose 不解析 Markdown 字符串；把原始文本交给具体渲染器，渲染结果再放进 Prose。
- Avoid: 短小的字段说明或摘要用 Text；Prose 是给整段长文排版，不是通用的富文本容器。
- Library: 标题、段落、列表、引用、代码、表格、分隔线、图片、键位、详情框的排版与墨阶。
- Application: Markdown 解析、内容本身、任务列表勾选框的完成事实、脚注与链接目标。

## Composition
- children 是渲染器产出的原生元素树，或经审查的 dangerouslySetInnerHTML；Prose 只加一层 className。
- 表格读与 Table 组件相同的视觉规则（清染表头/表尾、行高、数字列等宽），行内代码读 Typography 的 Code 规则，链接读 Link 的 linkClassName，不另起一套画法。

## Responsive behavior
- 版心固定 38em，不随视口拉宽；内缘在窄屏收紧到既有面板内缘的窄屏取值。
- 很宽的表格目前不会在 Prose 内独立横向滚动（纸的圆角需要 overflow-hidden 而非 overflow-x-auto），只能按单元格自然换行——已知缺口，非默认画法缺失。

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
阅读面容器；默认渲染为 article。
- render / ref / className / style / 原生属性: useRender.ComponentProps<"article">. 属性、事件与 ref 透传实际元素；children 是调用方已渲染好的内容。

## Keyboard

## Source examples
### 标题、段落、列表与引用
Source: apps/docs/src/content/prose/demos/01-article.tsx
```tsx
import { Prose } from "@qingye/ui/components/prose";
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
import { Prose } from "@qingye/ui/components/prose";
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
