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
