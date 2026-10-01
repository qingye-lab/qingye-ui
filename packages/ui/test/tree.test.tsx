import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Tree, type TreeNode } from "../src/components/tree";

const nodes: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "components", label: "components", children: [{ id: "button", label: "button.tsx" }] },
      { id: "locked", label: "secrets.ts", disabled: true },
      { id: "index", label: "index.ts" },
    ],
  },
  { id: "docs", label: "docs", children: [{ id: "readme", label: "README.md" }] },
  { id: "package", label: "package.json" },
];

const item = (name: string) => screen.getByRole("treeitem", { name: new RegExp(`^${name.replace(".", "\\.")}`) });

test("exposes tree semantics with a single tab stop", () => {
  render(<Tree defaultExpanded={["src"]} label="项目文件" nodes={nodes} />);
  expect(screen.getByRole("tree", { name: "项目文件" })).toBeInTheDocument();
  expect(item("src")).toHaveAttribute("aria-expanded", "true");
  expect(item("src")).toHaveAttribute("aria-level", "1");
  expect(item("index.ts")).toHaveAttribute("aria-level", "2");
  expect(item("index.ts")).toHaveAttribute("aria-posinset", "3");
  expect(item("index.ts")).toHaveAttribute("aria-setsize", "3");
  expect(item("index.ts").closest("[role=group]")).not.toBeNull();
  expect(item("secrets.ts")).toHaveAttribute("aria-disabled", "true");
  expect(item("package.json")).not.toHaveAttribute("aria-expanded");
  expect(screen.getAllByRole("treeitem").filter((element) => element.tabIndex === 0)).toEqual([item("src")]);
});

test("follows the APG keyboard model", async () => {
  const user = userEvent.setup();
  const onExpandedChange = vi.fn();
  render(<Tree label="项目文件" nodes={nodes} onExpandedChange={onExpandedChange} />);
  await user.tab();
  expect(item("src")).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  expect(onExpandedChange).toHaveBeenLastCalledWith(["src"]);
  expect(item("src")).toHaveAttribute("aria-expanded", "true");
  await user.keyboard("{ArrowRight}");
  expect(item("components")).toHaveFocus();

  // Disabled nodes are skipped.
  await user.keyboard("{ArrowDown}");
  expect(item("index.ts")).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(item("src")).toHaveFocus();
  await user.keyboard("{ArrowLeft}");
  expect(item("src")).toHaveAttribute("aria-expanded", "false");

  await user.keyboard("{End}");
  expect(item("package.json")).toHaveFocus();
  await user.keyboard("{Home}");
  expect(item("src")).toHaveFocus();

  await user.keyboard("*");
  expect(item("docs")).toHaveAttribute("aria-expanded", "true");
  expect(item("src")).toHaveAttribute("aria-expanded", "true");
});

test("selects with Enter, Space and click, and supports type-ahead", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Tree defaultExpanded={["src", "docs"]} label="项目文件" nodes={nodes} onValueChange={onValueChange} />);
  await user.click(screen.getByText("index.ts"));
  expect(item("index.ts")).toHaveAttribute("aria-selected", "true");
  expect(item("index.ts")).toHaveFocus();

  await user.keyboard("r");
  expect(item("README.md")).toHaveFocus();
  await user.keyboard(" ");
  expect(onValueChange).toHaveBeenLastCalledWith("readme", expect.objectContaining({ id: "readme" }));
  expect(item("README.md")).toHaveAttribute("aria-selected", "true");
  expect(item("index.ts")).toHaveAttribute("aria-selected", "false");

  item("docs").focus();
  await user.keyboard("{Enter}");
  expect(item("docs")).toHaveAttribute("aria-selected", "true");
  expect(item("docs")).toHaveAttribute("aria-expanded", "false");

  await user.click(screen.getByText("secrets.ts"));
  expect(onValueChange).not.toHaveBeenCalledWith("locked", expect.anything());
});

test("respects controlled value and expansion", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  render(<Tree expanded={["src"]} label="项目文件" nodes={nodes} onValueChange={onValueChange} value="index" />);
  await user.click(screen.getByText("package.json"));
  expect(onValueChange).toHaveBeenCalledWith("package", expect.anything());
  expect(item("index.ts")).toHaveAttribute("aria-selected", "true");
  await user.click(screen.getByText("src"));
  expect(item("src")).toHaveAttribute("aria-expanded", "true");
});
