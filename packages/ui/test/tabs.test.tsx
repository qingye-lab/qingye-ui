import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import { describe, expect, it } from "vitest";
import { Tabs, TabsList, TabsPanel, TabsTab } from "../src/components/tabs";
describe("Tabs", () => {
  it("uses manual keyboard activation, keeps disabled tabs inert and retains draft input", async () => {
    const user = userEvent.setup(); render(<Tabs defaultValue="a"><TabsList aria-label="视角"><TabsTab value="a">A</TabsTab><TabsTab value="disabled" disabled>禁用</TabsTab><TabsTab value="b">B</TabsTab></TabsList><TabsPanel value="a"><input aria-label="草稿" defaultValue="保留" /></TabsPanel><TabsPanel value="b">第二视角</TabsPanel></Tabs>);
    await user.tab(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("tab", { name: "禁用" })).toHaveFocus(); await user.keyboard("{Enter}"); expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true"); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("tab", { name: "B" })).toHaveFocus(); expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true"); await user.keyboard("{Enter}"); await waitFor(() => expect(screen.getByRole("tab", { name: "B" })).toHaveAttribute("aria-selected", "true")); expect(screen.getByRole("textbox", { name: "草稿", hidden: true })).toHaveValue("保留"); await user.keyboard("{ArrowLeft}{ArrowLeft}{Enter}"); expect(screen.getByRole("textbox", { name: "草稿" })).toHaveValue("保留");
  });
  it("honors a canceled controlled switch", async () => {
    const user = userEvent.setup(); render(<Tabs value="a" onValueChange={(_, details) => details.cancel()}><TabsList><TabsTab value="a">A</TabsTab><TabsTab value="b">B</TabsTab></TabsList><TabsPanel value="a">原视角</TabsPanel><TabsPanel value="b">新视角</TabsPanel></Tabs>); await user.click(screen.getByRole("tab", { name: "B" })); expect(screen.getByRole("tab", { name: "A" })).toHaveAttribute("aria-selected", "true"); expect(screen.getByRole("tabpanel")).toHaveTextContent("原视角");
  });
  it("mounts a panel on first arrival and keeps it afterwards; keepMounted true or false override that", async () => {
    const mounts: string[] = [];
    function Probe({ name }: { name: string }) { React.useEffect(() => { mounts.push(name); }, [name]); return <input aria-label={name} />; }
    const user = userEvent.setup();
    render(<Tabs defaultValue="a"><TabsList><TabsTab value="a">A</TabsTab><TabsTab value="b">B</TabsTab><TabsTab value="c">C</TabsTab><TabsTab value="d">D</TabsTab></TabsList>
      <TabsPanel value="a"><Probe name="a" /></TabsPanel><TabsPanel value="b"><Probe name="b" /></TabsPanel>
      <TabsPanel value="c" keepMounted><Probe name="c" /></TabsPanel><TabsPanel value="d" keepMounted={false}><Probe name="d" /></TabsPanel></Tabs>);
    // 没到过的面板不挂载，它的副作用也不发生；显式 keepMounted 的面板一开始就在。
    expect(mounts).toEqual(["a", "c"]);
    expect(screen.queryByLabelText("b")).not.toBeInTheDocument();
    await user.click(screen.getByRole("tab", { name: "B" }));
    await user.type(screen.getByLabelText("b"), "草稿");
    await user.click(screen.getByRole("tab", { name: "D" }));
    await user.click(screen.getByRole("tab", { name: "A" }));
    // 到过的面板保留输入；keepMounted={false} 的面板离开即卸载。
    await waitFor(() => expect(screen.queryByLabelText("d")).not.toBeInTheDocument());
    expect(screen.getByLabelText("b")).toHaveValue("草稿");
    expect(screen.getByLabelText("b").closest("[data-slot=tabs-panel]")).toHaveAttribute("hidden");
    expect(mounts).toEqual(["a", "c", "b", "d"]);
  });
});
