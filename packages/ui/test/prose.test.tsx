import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Prose } from "../src/components/prose";

test("renders as a native article, forwarding data-slot, ref and native attributes", () => {
  const ref = createRef<HTMLElement>();
  render(<Prose ref={ref} id="help-article" lang="zh-CN">内容</Prose>);
  const article = screen.getByRole("article");
  expect(article.tagName).toBe("ARTICLE");
  expect(ref.current).toBe(article);
  expect(article).toHaveAttribute("data-slot", "prose");
  expect(article).toHaveAttribute("id", "help-article");
  expect(article).toHaveAttribute("lang", "zh-CN");
});

test("render swaps the element while keeping the reading treatment and caller class", () => {
  render(<Prose render={<section data-testid="swapped" />} className="extra">内容</Prose>);
  const section = screen.getByTestId("swapped");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveAttribute("data-slot", "prose");
  expect(section.className).toContain("bg-surface");
  expect(section.className).toContain("extra");
});

test("already-rendered markdown output passes through unmodified — Prose does not parse or rewrite it", () => {
  render(
    <Prose>
      <h2>小节标题</h2>
      <p>
        正文里有 <strong>重点</strong>、<em>强调</em> 和 <a href="#retry">重试设置</a>，
        还有行内代码 <code>qingye sync</code>。
      </p>
      <ul>
        <li>第一项</li>
        <li>第二项</li>
      </ul>
      <blockquote>
        <p>这是一段引文。</p>
      </blockquote>
      <pre><code>const a = 1;</code></pre>
      <table>
        <thead><tr><th>列</th></tr></thead>
        <tbody><tr><td>1,284</td></tr></tbody>
      </table>
      <img src="/a.png" alt="示意图" />
      <hr />
      <ul className="contains-task-list">
        <li className="task-list-item"><input type="checkbox" checked disabled readOnly /> 已完成</li>
      </ul>
      <details>
        <summary>更多</summary>
        <p>展开后的内容。</p>
      </details>
    </Prose>,
  );
  expect(screen.getByRole("heading", { level: 2, name: "小节标题" })).toBeInTheDocument();
  expect(screen.getByText("重点").tagName).toBe("STRONG");
  expect(screen.getByText("强调").tagName).toBe("EM");
  expect(screen.getByRole("link", { name: "重试设置" })).toHaveAttribute("href", "#retry");
  expect(screen.getByText("qingye sync").tagName).toBe("CODE");
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  expect(screen.getByText("这是一段引文。").closest("blockquote")).not.toBeNull();
  expect(screen.getByText("const a = 1;").closest("pre")).not.toBeNull();
  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByRole("columnheader", { name: "列" })).toBeInTheDocument();
  expect(screen.getByRole("cell", { name: "1,284" })).toBeInTheDocument();
  expect(screen.getByAltText("示意图")).toHaveAttribute("src", "/a.png");
  expect(screen.getByRole("checkbox")).toBeChecked();
  expect(screen.getByRole("checkbox")).toBeDisabled();
  expect(screen.getByText("更多").tagName).toBe("SUMMARY");
  expect(screen.getByText("展开后的内容。")).toBeInTheDocument();
});

test("the reading pane is a paper distinct from the page background, with a measure derived from the reading column", () => {
  render(<Prose>内容</Prose>);
  const article = screen.getByRole("article");
  // 纸：与 Card、Popover 同一边界机制（清墨容器线 + 承载面），不靠纯底色单独区分。
  expect(article.className).toContain("bg-surface");
  expect(article.className).toContain("border-border");
  expect(article.className).toContain("rounded-panel");
  // 内缘复用面板关系，不新造内缘值。
  expect(article.className).toContain("p-(--qy-panel-padding)");
  // 版心 38em（阅读字号下汉字全角字面 = 1em）+ 两侧内缘，不把内缘算进版心。
  expect(article.className).toContain("max-w-[calc(38em+2*var(--qy-panel-padding))]");
  expect(article.className).toContain("text-reading");
});

test("headings read existing content tiers with spacing that grows toward the preceding block", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  // h1/h2 前留节间（两材），h3/h4 前留组间（一材）；标题靠近它统领的内容（组内）。
  expect(classList).toContain("[&_h1]:text-title");
  expect(classList).toContain("[&_h1]:mt-(--qy-section-gap)");
  expect(classList).toContain("[&_h2]:text-chapter");
  expect(classList).toContain("[&_h2]:mt-(--qy-section-gap)");
  expect(classList).toContain("[&_h3]:text-heading");
  expect(classList).toContain("[&_h3]:mt-(--qy-field-group-gap)");
  // h4 复用 body-strong：与 heading 字号相差无几，交给字重，不新开尺寸。
  expect(classList).toContain("[&_h4]:text-body-strong");
  expect(classList).toContain("[&_:where(h1,h2,h3,h4):first-child]:mt-0");
  for (const level of ["h1", "h2", "h3", "h4"]) expect(classList).toContain(`[&_${level}]:mb-(--qy-field-gap)`);
});

test("paragraphs, lists and blocks share one group-gap token instead of inventing per-element spacing", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  const group = "[&_:where(p,ul,ol,blockquote,pre,table,figure,details)]:mb-(--qy-field-group-gap)";
  expect(classList).toContain(group);
  expect(classList).toContain("[&_:where(p,ul,ol,blockquote,pre,table,figure,details):last-child]:mb-0");
});

test("inline emphasis, links and inline code mirror the library's existing rules instead of a second one", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_strong]:font-medium");
  expect(classList).toContain("[&_em]:italic");
  // 链接：复刻 link.tsx 的 linkClassName（同一组 token）。
  expect(classList).toContain("[&_a]:decoration-(color:--qy-border-input)");
  expect(classList).toContain("[&_a]:underline-offset-[round(0.25em,1px)]");
  expect(classList).toContain("[&_a:hover]:decoration-current");
  // 行内代码：逐字复刻 typography.tsx 的 Code 规则；pre 内复位。
  expect(classList).toContain("[&_code]:bg-neutral-soft");
  expect(classList).toContain("[&_code]:text-[round(0.875em,1px)]");
  expect(classList).toContain("[&_pre_code]:bg-transparent");
});

test("lists use ink-coloured markers at a named indent, not the browser default", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_ul]:list-disc");
  expect(classList).toContain("[&_ol]:list-decimal");
  expect(classList).toContain("[&_ul]:marker:text-muted-foreground");
  expect(classList).toContain("[&_ul]:pl-(--qy-cai)");
  expect(classList).toContain("[&_.contains-task-list]:list-none");
});

test("task-list checkboxes read the same marker geometry as Checkbox and stay fully legible when disabled", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_input]:size-(--qy-marker-size-narrow)");
  expect(classList).toContain("sm:[&_input]:size-(--qy-marker-size)");
  expect(classList).toContain("[&_input:checked]:bg-primary");
  // 只读事实，不是禁用控件：不降不透明度。
  expect(classList).toContain("[&_input:disabled]:opacity-100");
});

test("blockquote carries one boundary mechanism — a single-weight line, not a line plus a fill", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_blockquote]:border-s");
  expect(classList).toContain("[&_blockquote]:border-input");
  expect(classList).toContain("[&_blockquote]:text-muted-foreground");
  expect(classList).not.toContain("[&_blockquote]:bg-");
});

test("code blocks scroll without wrapping and carry no decorative shadow", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_pre]:overflow-x-auto");
  expect(classList).toContain("[&_pre]:whitespace-pre");
  expect(classList).toContain("[&_pre]:bg-muted");
  expect(classList).not.toContain("[&_pre]:shadow");
});

test("tables reuse Table's current paper, header band and numeric cells instead of a second drawing", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_table]:rounded-panel");
  expect(classList).toContain("[&_table]:border-border");
  expect(classList).toContain("[&_thead>tr]:bg-surface-inset");
  expect(classList).toContain("[&_tbody>tr]:h-(--qy-row-default)");
  expect(classList).toContain("[&_th]:numeric");
  expect(classList).toContain("[&_td]:numeric");
});

test("kbd keys mirror the library's Kbd geometry instead of the bare browser element", () => {
  render(<Prose>内容</Prose>);
  const classList = screen.getByRole("article").className;
  expect(classList).toContain("[&_kbd]:h-[calc(4*var(--qy-fen))]");
  expect(classList).toContain("[&_kbd]:rounded-marker");
  expect(classList).toContain("[&_kbd]:border-border");
});
