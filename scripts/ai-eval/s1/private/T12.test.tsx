import "./_env";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StorageUsage } from "../StorageUsage";

describe("T12 StorageUsage", () => {
  it("[a11y] 用量以测量值呈现，名称为“存储空间”", () => {
    const { container } = render(<StorageUsage usedGb={42} totalGb={100} />);
    const meter = screen.getByRole("meter", { name: "存储空间" });
    expect(meter.getAttribute("aria-valuenow")).toBe("42");
    expect(meter.getAttribute("aria-valuemax")).toBe("100");
    expect(container.textContent).toContain("42 / 100 GB");
  });

  it("[a11y] 用量不是任务进度", () => {
    const { container } = render(<StorageUsage usedGb={42} totalGb={100} />);
    expect(screen.queryByRole("progressbar")).toBeNull();
    expect(container.querySelector("[data-slot^='progress']")).toBeNull();
  });

  it("[state] 未知用量不画成 0", () => {
    const { container } = render(<StorageUsage usedGb={null} totalGb={100} />);
    expect(screen.getByText("用量未知")).toBeTruthy();
    expect(container.querySelector("[aria-valuenow='0']")).toBeNull();
    expect(screen.queryByText(/^0 \/ 100 GB$/)).toBeNull();
  });

  it("[api] 用量读数来自库（带 data-slot）", () => {
    render(<StorageUsage usedGb={42} totalGb={100} />);
    expect(screen.getByRole("meter", { name: "存储空间" }).getAttribute("data-slot")).toBeTruthy();
  });
});
