import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "../src/components/button";
import { Section, SectionActions, SectionHeader, SectionTitle } from "../src/components/section";

describe("Section", () => {
  it("is named by its title: the region takes the title's id as aria-labelledby", () => {
    render(<Section><SectionHeader><SectionTitle>成员</SectionTitle><SectionActions><Button variant="quiet" size="sm">邀请</Button></SectionActions></SectionHeader><p>内容</p></Section>);
    const region = screen.getByRole("region", { name: "成员" });
    const title = screen.getByRole("heading", { name: "成员", level: 2 });
    expect(region).toHaveAttribute("aria-labelledby", title.id);
    expect(title.id).not.toBe("");
  });
  it("uses the id the caller gave the title", () => {
    render(<Section><SectionHeader><SectionTitle id="team" level={3}>团队</SectionTitle></SectionHeader></Section>);
    expect(screen.getByRole("region", { name: "团队" })).toHaveAttribute("aria-labelledby", "team");
    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("id", "team");
  });
  it("leaves no dangling reference without a title, and gives way to an explicit name", () => {
    const { container, rerender } = render(<Section><p>内容</p></Section>);
    expect(container.querySelector("section")).not.toHaveAttribute("aria-labelledby");
    rerender(<Section aria-label="最近活动"><SectionHeader><SectionTitle>活动</SectionTitle></SectionHeader></Section>);
    expect(screen.getByRole("region", { name: "最近活动" })).not.toHaveAttribute("aria-labelledby");
  });
  it("drops the reference when the title goes away", () => {
    const { container, rerender } = render(<Section><SectionTitle>成员</SectionTitle></Section>);
    expect(container.querySelector("section")).toHaveAttribute("aria-labelledby");
    rerender(<Section><p>内容</p></Section>);
    expect(container.querySelector("section")).not.toHaveAttribute("aria-labelledby");
  });
  it("keeps the remaining title's name when one of two titles unmounts", () => {
    const { rerender } = render(<Section><SectionTitle id="a">甲</SectionTitle><SectionTitle id="b">乙</SectionTitle></Section>);
    expect(screen.getByRole("region")).toHaveAttribute("aria-labelledby", "a");
    rerender(<Section><SectionTitle id="b">乙</SectionTitle></Section>);
    expect(screen.getByRole("region", { name: "乙" })).toHaveAttribute("aria-labelledby", "b");
  });
  it("keeps a count as part of the heading's name", () => {
    render(<Section><SectionTitle>成员 <span className="numeric text-muted-foreground">12</span></SectionTitle></Section>);
    expect(screen.getByRole("region", { name: "成员 12" })).toBeInTheDocument();
  });
});
