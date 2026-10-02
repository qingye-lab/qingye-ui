import { fireEvent, isInaccessible, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

test("a disabled custom link cannot reintroduce its destination or click action", () => {
  const onClick = vi.fn();
  render(
    <PaginationLink disabled render={<a href="?page=0" onClick={onClick} tabIndex={0} />}>上一页</PaginationLink>,
  );
  const previous = screen.getByRole("link", { name: "上一页" });
  expect(previous).not.toHaveAttribute("href");
  expect(previous).toHaveAttribute("tabindex", "-1");
  fireEvent.click(previous);
  expect(onClick).not.toHaveBeenCalled();
});

test("an enabled custom link retains its destination and action", () => {
  const onClick = vi.fn((event: React.MouseEvent) => event.preventDefault());
  render(<PaginationLink render={<a href="?page=2" onClick={onClick} />}>2</PaginationLink>);
  const next = screen.getByRole("link", { name: "2" });
  expect(next).toHaveAttribute("href", "?page=2");
  fireEvent.click(next);
  expect(onClick).toHaveBeenCalledOnce();
});

test("a disabled router link keeps its own label and presentation without creating a destination", () => {
  const onClick = vi.fn();
  const routerRender = vi.fn();
  function RouterLink({ to, ...props }: Omit<React.ComponentProps<"a">, "href"> & { to: string }) {
    routerRender();
    return <a {...props} href={to} />;
  }
  const element = <RouterLink aria-label="更早的记录" className="rounded-sm" onClick={onClick} style={{ fontWeight: 600 }} to="?page=0">上一页</RouterLink>;
  const { rerender } = render(<PaginationLink disabled render={element} style={{ fontStyle: "italic" }} />);
  const disabled = screen.getByRole("link", { name: "更早的记录" });
  expect(disabled).not.toHaveAttribute("href");
  expect(disabled).toHaveTextContent("上一页");
  expect(disabled).toHaveAttribute("tabindex", "-1");
  expect(disabled).toHaveClass("rounded-sm", "numeric");
  expect(disabled).toHaveStyle({ fontWeight: 600, fontStyle: "italic" });
  expect(routerRender).not.toHaveBeenCalled();
  fireEvent.click(disabled);
  expect(onClick).not.toHaveBeenCalled();

  rerender(<PaginationLink render={element} />);
  expect(screen.getByRole("link", { name: "更早的记录" })).toHaveAttribute("href", "?page=0");
  expect(routerRender).toHaveBeenCalled();
});

test("disabled function render retains returned content but cannot introduce a route", () => {
  function RouterLink({ to, ...props }: Omit<React.ComponentProps<"a">, "href"> & { to: string }) {
    return <a {...props} href={to} />;
  }
  render(<PaginationLink disabled render={(props) => <RouterLink {...props} to="?page=0">上一页</RouterLink>} />);
  const previous = screen.getByRole("link", { name: "上一页" });
  expect(previous).not.toHaveAttribute("href");
  expect(previous).toHaveAttribute("aria-disabled", "true");
});

test("the skipped-pages hint remains available to assistive technology", () => {
  render(<PaginationEllipsis />);
  expect(isInaccessible(screen.getByText("更多页"))).toBe(false);
  expect(document.querySelector("[data-slot=pagination-ellipsis] svg")).toHaveAttribute("aria-hidden", "true");
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
