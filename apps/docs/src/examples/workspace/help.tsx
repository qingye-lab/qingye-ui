import * as React from "react";
import { Link as RouterLink } from "@/components/locale-link";
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { Prose } from "@qingye_lab/ui/components/prose";
import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye_lab/ui/components/toc";
import { BASE, useWorkspaceScroller } from "./shell";

/*
 * 帮助文章：与官网文档同一种排法。长文是库的 Prose（纸、栏宽、行长与节奏都由它给），
 * 目录在文章右侧、随滚动标出当前一节；命令示例采用 CodeBlock（自带复制），常见排查用 Accordion 折叠。
 */

const RETRY_CLI = `qingye sync --retry-failed --reason=network --collection=audit`;

export default function Help() {
  const article = React.useRef<HTMLElement | null>(null);
  const headings = useTocHeadings(article);
  const current = useTocScrollSpy(headings, { container: useWorkspaceScroller() });

  return <div className="flex items-start justify-center gap-(--qy-cai) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <Prose framed ref={article}>
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
      <p>最近一次同步的结果如下；命令行用户可以运行下方指令，仅重试网络中断导致的失败记录：</p>
      <div className="not-prose my-(--qy-field-group-gap)">
        <CodeBlock language="bash" code={RETRY_CLI} />
      </div>
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

      <h2 id="faq">常见排查问题</h2>
      <div className="not-prose my-(--qy-field-group-gap)">
        <Accordion multiple defaultValue={["partial"]}>
          <AccordionItem value="partial">
            <AccordionHeader render={<h3 />}><AccordionTrigger>部分失败会阻断后续定时同步吗？</AccordionTrigger></AccordionHeader>
            <AccordionPanel>不会。定时任务仍会按计划拉取增量数据；失败条目会单独留在重试队列中，直到人工确认或达到保留上限。</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="idempotency">
            <AccordionHeader render={<h3 />}><AccordionTrigger>手动重新同步会产生重复记录吗？</AccordionTrigger></AccordionHeader>
            <AccordionPanel>不会。每条记录按主键与同步批次号做幂等写入；只有结果状态为「未知」且上游未提供幂等键时才需要人工核实。</AccordionPanel>
          </AccordionItem>
          <AccordionItem value="retention">
            <AccordionHeader render={<h3 />}><AccordionTrigger>调短保留天数会立即删除旧记录吗？</AccordionTrigger></AccordionHeader>
            <AccordionPanel>修改保留策略后会在下一个低峰窗口（次日 02:00）清理超出周期的历史记录，保存后的 24 小时内仍可回调恢复。</AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <h2 id="contact">仍然没有解决</h2>
      <p>把集合标识与失败时间发给工作区管理员；管理员可以在审计日志里看到完整的请求与回应。</p>
    </Prose>
    <Toc items={headings} current={current} className="sticky top-[calc(var(--qy-section-gap)+var(--qy-cai))] mt-(--qy-cai) hidden w-[calc(8*var(--qy-cai))] shrink-0 lg:block" />
  </div>;
}
