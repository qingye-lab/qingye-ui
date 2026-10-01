import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../src/components/sidebar";

// jsdom lacks the Web Animations API that ScrollArea polls.
Element.prototype.getAnimations ??= () => [];

function State() {
  return <output data-testid="state">{useSidebar().state}</output>;
}

test("toggles without the Cookie Store API and with the keyboard shortcut", async () => {
  expect(typeof (globalThis as { cookieStore?: unknown }).cookieStore).toBe("undefined");
  render(
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>收件箱</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger />
      <State />
    </SidebarProvider>,
  );
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");
  await userEvent.click(screen.getByRole("button", { name: "切换侧栏" }));
  expect(screen.getByTestId("state")).toHaveTextContent("collapsed");
  await userEvent.keyboard("{Control>}b{/Control}");
  expect(screen.getByTestId("state")).toHaveTextContent("expanded");
  expect(screen.getByRole("button", { name: "收件箱" })).toHaveAttribute("data-active", "true");
});
