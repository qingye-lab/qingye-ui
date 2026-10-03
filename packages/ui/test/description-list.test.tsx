import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "../src/components/description-list";

describe("DescriptionList", () => {
  it("preserves native dt/dd relationships and zero", () => {
    const { container } = render(<DescriptionList><DescriptionListItem><DescriptionListTerm>数量</DescriptionListTerm><DescriptionListDetail>{0}</DescriptionListDetail></DescriptionListItem></DescriptionList>);
    expect(container.querySelector("dl > div > dt")).toHaveTextContent("数量"); expect(container.querySelector("dl > div > dd")).toHaveTextContent("0");
  });
  it("retains caller uncertainty and structured links", () => {
    render(<DescriptionList><DescriptionListItem><DescriptionListTerm>值</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem><DescriptionListItem><DescriptionListTerm>入口</DescriptionListTerm><DescriptionListDetail><a href="/detail">详情</a></DescriptionListDetail></DescriptionListItem></DescriptionList>);
    expect(screen.getByText("未知").tagName).toBe("DD"); expect(screen.getByRole("link")).toHaveAttribute("href", "/detail");
  });
});
