import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Kbd } from "../src/components/kbd";
import { SearchInput } from "../src/components/search-input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("clears with the button and returns focus to the field", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const onClear = vi.fn();
  render(<SearchInput aria-label="搜索订单" onClear={onClear} onValueChange={onValueChange} />);
  const input = screen.getByRole("searchbox", { name: "搜索订单" });
  expect(screen.queryByRole("button", { name: "清除搜索" })).not.toBeInTheDocument();

  await user.type(input, "退款");
  expect(onValueChange).toHaveBeenLastCalledWith("退款");
  await user.click(screen.getByRole("button", { name: "清除搜索" }));
  expect(input).toHaveValue("");
  expect(input).toHaveFocus();
  expect(onClear).toHaveBeenCalledOnce();
  expect(screen.queryByRole("button", { name: "清除搜索" })).not.toBeInTheDocument();
});

test("Escape clears a non-empty field without bubbling, and bubbles once empty", async () => {
  const user = userEvent.setup();
  const outer = vi.fn();
  render(
    <div onKeyDown={(event) => event.key === "Escape" && outer()}>
      <SearchInput aria-label="搜索" defaultValue="摄像头" />
    </div>,
  );
  const input = screen.getByRole("searchbox");
  input.focus();
  await user.keyboard("{Escape}");
  expect(input).toHaveValue("");
  expect(outer).not.toHaveBeenCalled();
  await user.keyboard("{Escape}");
  expect(outer).toHaveBeenCalledOnce();
});

test("works controlled", async () => {
  const user = userEvent.setup();
  function Controlled() {
    const [query, setQuery] = useState("HZ");
    return (
      <>
        <SearchInput aria-label="搜索设备" onValueChange={setQuery} value={query} />
        <output>{query}</output>
      </>
    );
  }
  render(<Controlled />);
  await user.type(screen.getByRole("searchbox"), "-031");
  expect(screen.getByRole("status")).toHaveTextContent("HZ-031");
  await user.click(screen.getByRole("button", { name: "清除搜索" }));
  expect(screen.getByRole("status")).toHaveTextContent("");
});

test("shows the shortcut hint only while empty, and nothing extra when disabled", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<SearchInput aria-label="搜索文档" shortcut={<Kbd>⌘K</Kbd>} />);
  expect(screen.getByText("⌘K")).toBeInTheDocument();
  await user.type(screen.getByRole("searchbox"), "a");
  expect(screen.queryByText("⌘K")).not.toBeInTheDocument();

  rerender(<SearchInput aria-label="搜索文档" disabled shortcut={<Kbd>⌘K</Kbd>} value="a" />);
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(screen.queryByText("⌘K")).not.toBeInTheDocument();
});

test("replaces the icon with a spinner while loading and uses locale defaults", () => {
  render(
    <UILocaleProvider locale={enUS}>
      <SearchInput defaultValue="x" loading />
    </UILocaleProvider>,
  );
  expect(screen.getByRole("searchbox")).toHaveAttribute("placeholder", "Search…");
  expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
});
