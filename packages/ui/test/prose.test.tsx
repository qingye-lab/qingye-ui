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
