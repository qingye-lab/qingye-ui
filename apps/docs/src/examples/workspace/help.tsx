import * as React from "react";
import { Link as RouterLink } from "@/components/locale-link";
import { Prose } from "@qingye_lab/ui/components/prose";
import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye_lab/ui/components/toc";
import { BASE } from "./shell";

/* 帮助文章：长文铺一张纸，目录在左侧随滚动标出当前一节；滚动容器是外壳的内容区，显式交给目录。 */

export default function Help() {
  const article = React.useRef<HTMLElement | null>(null);
  const scroller = React.useRef<HTMLElement | null>(null);
  React.useLayoutEffect(() => { scroller.current = document.getElementById("main"); }, []);
  const headings = useTocHeadings(article);
  const current = useTocScrollSpy(headings, { container: scroller });

  // 目录与文章是一个整体：一起居中，中间隔一个节间距；不把目录推到最左、文章悬在中间。
  return <div className="mx-auto flex w-fit max-w-full items-start gap-(--qy-section-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <Toc items={headings} current={current} className="sticky top-[calc(1px+var(--qy-panel-padding))] mt-[calc(1px+var(--qy-panel-padding))] hidden w-[calc(8*var(--qy-cai))] shrink-0 lg:block" />
    <Prose ref={article} render={<article />}>
      <h1 id="sync-failure">同步失败时，数据会怎样</h1>
      <p>每次同步开始时，青野会先记录本次要处理的范围，再逐条写入。如果在写入 1,284 条记录的过程中网络中断，已经写入的部分会保留，未写入的部分留到下一次同步——不会因为一次失败就清空整个集合。</p>
      <h2 id="retry">重试与核实</h2>
      <p>失败记录会在<RouterLink to={`${BASE}/collections/audit`}>操作记录</RouterLink>里单独列出，并附上失败原因。自动重试的次数可以在集合的设置里调整：</p>
      <ul>
        <li>默认重试 3 次，间隔依次为 1、5、15 分钟</li>
        <li>超过次数仍失败，转入人工核实队列，可以手动重新触发或放弃这一条</li>
      </ul>
      <blockquote><p>如果结果显示为「未知」，说明请求已经发出、但没有收到确认。这时直接重试可能写入两次；先在回调或审计日志里核实，再决定下一步。</p></blockquote>
      <h2 id="reasons">按失败原因统计</h2>
      <p>最近一次同步的结果如下；命令行用户可以运行 <code>qingye sync --retry-failed --reason=network</code> 只重试网络中断的记录：</p>
      <table>
        <thead><tr><th>原因</th><th align="right">记录数</th><th>建议</th></tr></thead>
        <tbody>
          <tr><td>网络中断</td><td align="right">812</td><td>自动重试即可</td></tr>
          <tr><td>字段校验失败</td><td align="right">96</td><td>检查来源的字段映射</td></tr>
          <tr><td>结果未知</td><td align="right">14</td><td>先核实再重试</td></tr>
        </tbody>
      </table>
      <h3 id="mapping">字段映射</h3>
      <p>字段校验失败多半是来源新增或改名了字段。在集合的「字段」页对照示例值，确认必填字段都有来源，再重新同步。</p>
      <h2 id="contact">仍然没有解决</h2>
      <p>把集合标识与失败时间发给工作区管理员；管理员可以在审计日志里看到完整的请求与回应。</p>
    </Prose>
  </div>;
}
