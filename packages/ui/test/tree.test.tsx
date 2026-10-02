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
  expect(item("src")).toHaveAccessibleName("src");
  expect(item("src")).toHaveAttribute("aria-level", "1");
  expect(item("index.ts")).toHaveAttribute("aria-level", "2");
  expect(item("index.ts")).toHaveAttribute("aria-posinset", "3");
  expect(item("index.ts")).toHaveAttribute("aria-setsize", "3");
  expect(item("index.ts").closest("[role=group]")).not.toBeNull();
  expect(item("secrets.ts")).toHaveAttribute("aria-disabled", "true");
  expect(item("package.json")).not.toHaveAttribute("aria-expanded");
  expect(screen.getAllByRole("treeitem").filter((element) => element.tabIndex === 0)).toEqual([item("src")]);
});

test("disabling a focused node moves focus to a surviving neighbor without selecting it", () => {
  const onValueChange = vi.fn();
  const { rerender } = render(<Tree label="项目文件" nodes={nodes} onValueChange={onValueChange} />);
  item("docs").focus();
  rerender(<Tree label="项目文件" nodes={[nodes[0]!, { ...nodes[1]!, disabled: true }, nodes[2]!]} onValueChange={onValueChange} />);
  expect(item("package.json")).toHaveFocus();
  expect(onValueChange).not.toHaveBeenCalled();
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

test("a lazy parent exposes expansion before its children arrive", async () => {
  const user = userEvent.setup();
  const onExpandedChange = vi.fn();
  const { rerender } = render(
    <Tree expanded={[]} label="资源" nodes={[{ id: "photos", label: "图像", hasChildren: true }]} onExpandedChange={onExpandedChange} />,
  );
  const parent = screen.getByRole("treeitem", { name: "图像" });
  expect(parent).toHaveAttribute("aria-expanded", "false");
  parent.focus();
  await user.keyboard("{ArrowRight}");
  expect(onExpandedChange).toHaveBeenLastCalledWith(["photos"]);
  // Controlled expansion waits for its application owner.
  expect(parent).toHaveAttribute("aria-expanded", "false");
  rerender(
    <Tree expanded={["photos"]} label="资源" nodes={[{ id: "photos", label: "图像", hasChildren: true, children: [{ id: "cover", label: "封面" }] }]} />,
  );
  expect(parent).toHaveAttribute("aria-expanded", "true");
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("treeitem", { name: "封面" })).toHaveFocus();
});

test("deleting a focused child returns focus to its visible parent", () => {
  const { rerender } = render(<Tree defaultExpanded={["src"]} label="项目文件" nodes={nodes} />);
  item("index.ts").focus();
  rerender(<Tree defaultExpanded={["src"]} label="项目文件" nodes={[{ ...nodes[0]!, children: [nodes[0]!.children![0]!] }, nodes[1]!, nodes[2]!]} />);
  expect(item("src")).toHaveFocus();
});

test("deleting a focused root chooses a neighbor without changing selection", () => {
  const onValueChange = vi.fn();
  const { rerender } = render(<Tree label="项目文件" nodes={nodes} onValueChange={onValueChange} value="package" />);
  item("docs").focus();
  rerender(<Tree label="项目文件" nodes={[nodes[0]!, nodes[2]!]} onValueChange={onValueChange} value="package" />);
  expect(item("package.json")).toHaveFocus();
  expect(onValueChange).not.toHaveBeenCalled();
});

test("node removal does not take focus from a control outside the tree", () => {
  const { rerender } = render(<><Tree label="项目文件" nodes={nodes} /><button type="button">返回集合</button></>);
  item("docs").focus();
  screen.getByRole("button", { name: "返回集合" }).focus();
  rerender(<><Tree label="项目文件" nodes={[nodes[0]!, nodes[2]!]} /><button type="button">返回集合</button></>);
  expect(screen.getByRole("button", { name: "返回集合" })).toHaveFocus();
});

test("an external collapse returns a focused descendant to its parent", () => {
  const { rerender } = render(<Tree expanded={["src"]} label="项目文件" nodes={nodes} />);
  item("index.ts").focus();
  rerender(<Tree expanded={[]} label="项目文件" nodes={nodes} />);
  expect(item("src")).toHaveFocus();
});

test("removing the last node leaves a focusable, named empty tree", () => {
  const { rerender } = render(<Tree label="项目文件" nodes={[nodes[2]!]} />);
  item("package.json").focus();
  rerender(<Tree label="项目文件" nodes={[]} />);
  expect(screen.getByRole("tree", { name: "项目文件" })).toHaveFocus();
  expect(screen.getByRole("tree")).toHaveAttribute("tabindex", "0");
});

test("node removal does not restore an old tree focus after the user has left and blurred", () => {
  const { rerender } = render(<><Tree label="项目文件" nodes={nodes} /><button type="button">返回集合</button></>);
  item("docs").focus();
  const outside = screen.getByRole("button", { name: "返回集合" });
  outside.focus();
  outside.blur();
  expect(document.body).toHaveFocus();
  rerender(<><Tree label="项目文件" nodes={[nodes[0]!, nodes[2]!]} /><button type="button">返回集合</button></>);
  expect(document.body).toHaveFocus();
});
