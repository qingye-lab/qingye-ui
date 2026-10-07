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
