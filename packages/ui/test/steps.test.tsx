import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Step, StepDescription, Steps, StepTitle } from "../src/components/steps";

describe("Steps", () => {
  it("uses the supplied state rather than completing preceding positions", () => {
    render(<Steps><Step state="upcoming"><StepTitle>一</StepTitle></Step><Step state="current"><StepTitle>二</StepTitle><StepDescription>正在编辑</StepDescription></Step></Steps>);
    const [first, second] = screen.getAllByRole("listitem");
    expect(first).toHaveAttribute("data-state", "upcoming"); expect(first).not.toHaveAttribute("aria-current");
    expect(second).toHaveAttribute("aria-current", "step"); expect(screen.queryByText("已完成")).toBeNull();
  });
  it("retains an error and an explicit recovery link", () => {
    render(<Steps><Step state="error"><StepTitle><a href="#edit">重新编辑</a></StepTitle></Step><Step state="complete"><StepTitle>另一步</StepTitle></Step></Steps>);
    expect(screen.getByText("出错")).toBeInTheDocument(); expect(screen.getByRole("link")).toHaveAttribute("href", "#edit"); expect(screen.getByText("已完成")).toBeInTheDocument();
  });
  it("renders only its marker, content and state as grid items", () => {
    render(<Steps><Step state="complete"><StepTitle>一</StepTitle></Step></Steps>);
    const item = screen.getByRole("listitem");
    // 网格只有三格：点、内容、读屏状态；源码注释误写进 JSX 时会多出一个文本节点挤进一材宽的列。
    expect([...item.childNodes].filter(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())).toHaveLength(0);
    expect(item.textContent).toBe("一已完成");
  });
});
