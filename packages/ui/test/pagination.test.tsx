import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../src/components/pagination";

test("labels the landmark and marks the current page", () => {
  render(
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink href="?page=2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>,
  );
  expect(screen.getByRole("navigation", { name: "分页" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "2" })).toHaveAttribute("aria-current", "page");
});

test("a disabled link drops href, leaves the tab order and ignores clicks", async () => {
  const onClick = vi.fn();
  render(
    <>
      <PaginationPrevious disabled href="?page=0" onClick={onClick} />
      <PaginationNext href="?page=2" />
    </>,
  );
  const previous = screen.getByRole("link", { name: "上一页" });
  expect(previous).not.toHaveAttribute("href");
  expect(previous).toHaveAttribute("aria-disabled", "true");
  expect(previous).toHaveAttribute("tabindex", "-1");
  await userEvent.click(previous, { pointerEventsCheck: 0 });
  expect(onClick).not.toHaveBeenCalled();

  await userEvent.tab();
  expect(screen.getByRole("link", { name: "下一页" })).toHaveFocus();
});
