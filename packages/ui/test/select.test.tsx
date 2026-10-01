import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "../src/components/select";

const regions = { hz: "华东 1（杭州）", bj: "华北 2（北京）" };

function Region(props: { "aria-label"?: string }) {
  return (
    <Select items={regions} defaultValue="hz">
      <SelectTrigger {...props}>
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        <SelectGroup>
          <SelectGroupLabel className="uppercase">地域</SelectGroupLabel>
          <SelectItem value="hz">{regions.hz}</SelectItem>
          <SelectItem value="bj" disabled>{regions.bj}</SelectItem>
        </SelectGroup>
      </SelectPopup>
    </Select>
  );
}

test("an explicit aria-label on the trigger wins over automatic labelling", () => {
  render(<Region aria-label="部署地域" />);
  expect(screen.getByRole("combobox", { name: "部署地域" })).toHaveTextContent("华东 1（杭州）");
});

test("keyboard selection skips disabled items and keeps group label classes", async () => {
  const user = userEvent.setup();
  render(<Region aria-label="部署地域" />);
  const trigger = screen.getByRole("combobox", { name: "部署地域" });
  trigger.focus();
  await user.keyboard("{ArrowDown}");
  const listbox = await screen.findByRole("listbox");
  expect(screen.getByText("地域")).toHaveClass("uppercase", "text-xs");
  expect(screen.getByRole("option", { name: "华北 2（北京）" })).toHaveAttribute("aria-disabled", "true");
  expect(listbox).toBeInTheDocument();
  await user.keyboard("{Escape}");
  expect(trigger).toHaveTextContent("华东 1（杭州）");
});
