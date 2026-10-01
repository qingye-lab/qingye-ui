import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../src/components/tabs";

function Basic(props: React.ComponentProps<typeof Tabs>) {
  return (
    <Tabs defaultValue="overview" {...props}>
      <TabsList>
        <TabsTab value="overview">概览</TabsTab>
        <TabsTab value="members">成员</TabsTab>
        <TabsTab disabled value="archive">
          归档
        </TabsTab>
        <TabsTab value="settings">设置</TabsTab>
      </TabsList>
      <TabsPanel value="overview">概览内容</TabsPanel>
      <TabsPanel value="members">成员内容</TabsPanel>
      <TabsPanel value="settings">设置内容</TabsPanel>
    </Tabs>
  );
}

test("wires tabs to panels with the tab pattern", async () => {
  render(<Basic />);
  const list = screen.getByRole("tablist");
  expect(list).toHaveAttribute("data-slot", "tabs-list");
  const tabs = screen.getAllByRole("tab");
  expect(tabs).toHaveLength(4);
  expect(tabs[0]).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("概览内容");
  expect(screen.getByRole("tabpanel")).toHaveAttribute(
    "aria-labelledby",
    tabs[0]!.id,
  );

  await userEvent.click(screen.getByRole("tab", { name: "成员" }));
  expect(screen.getByRole("tab", { name: "成员" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("成员内容");
});

test("moves with arrow keys and wraps at the ends", async () => {
  render(<Basic />);
  const [overview, members, archive, settings] = screen.getAllByRole("tab");
  await userEvent.click(overview!);
  await userEvent.keyboard("{ArrowRight}");
  expect(members).toHaveFocus();
  // A disabled tab stays focusable (aria-disabled) so it can be reached and
  // announced; activating it does nothing.
  await userEvent.keyboard("{ArrowRight}");
  expect(archive).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(settings).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(overview).toHaveFocus();
  await userEvent.keyboard("{End}");
  expect(settings).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(overview).toHaveFocus();
});

test("a disabled tab cannot be selected", async () => {
  render(<Basic />);
  const archive = screen.getByRole("tab", { name: "归档" });
  expect(archive).toHaveAttribute("aria-disabled", "true");
  await userEvent.click(archive, { pointerEventsCheck: 0 });
  await userEvent.keyboard("{Enter}");
  expect(archive).toHaveAttribute("aria-selected", "false");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("概览内容");
});

test("sizes are exposed and the vertical list stacks", () => {
  render(<Basic orientation="vertical" />);
  expect(screen.getByRole("tablist")).toHaveAttribute("data-orientation", "vertical");
  expect(document.querySelector("[data-slot=tabs]")).toHaveAttribute("data-orientation", "vertical");
  render(<Basic />);
  const lists = document.querySelectorAll("[data-slot=tabs-list]");
  expect(lists[1]).toHaveAttribute("data-size", "default");
  expect(document.querySelector("[data-slot=tab-indicator]")).toBeTruthy();
});
