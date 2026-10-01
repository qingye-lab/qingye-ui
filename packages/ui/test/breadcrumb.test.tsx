import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../src/components/breadcrumb";

test("is a labelled navigation landmark with a plain-text current page", () => {
  render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/projects">项目</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>青烟官网改版</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>,
  );
  expect(screen.getByRole("navigation", { name: "面包屑导航" })).toBeInTheDocument();
  const current = screen.getByText("青烟官网改版");
  expect(current).toHaveAttribute("aria-current", "page");
  expect(current.tagName).toBe("SPAN");
  // Separators are decorative: they carry no accessible name.
  expect(screen.getByRole("list").children[1]).toHaveAttribute("aria-hidden", "true");
});

test("hyperlinks stay focusable and the ellipsis is decorative", () => {
  render(
    <BreadcrumbLink className="custom" href="/docs">
      文档
    </BreadcrumbLink>,
  );
  const link = screen.getByRole("link", { name: "文档" });
  expect(link).toHaveClass("custom", "hover:text-foreground", "focus-visible:ring-[length:var(--qy-focus-button-width)]");
  expect(link).toHaveAttribute("data-slot", "breadcrumb-link");

  render(<BreadcrumbEllipsis />);
  expect(document.querySelector("[data-slot=breadcrumb-ellipsis]")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});
