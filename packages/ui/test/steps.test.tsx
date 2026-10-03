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
});
