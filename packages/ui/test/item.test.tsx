import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Item, ItemContent, ItemGroup, ItemTitle } from "../src/components/item";

test("items in a group are list items; linked items keep link semantics", () => {
  render(
    <ItemGroup>
      <Item>
        <ItemContent>
          <ItemTitle>林嘉怡</ItemTitle>
        </ItemContent>
      </Item>
      <Item render={<a href="#store" />} variant="outline">
        <ItemContent>
          <ItemTitle>徐汇店</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>,
  );
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByRole("listitem")).toHaveTextContent("林嘉怡");
  const link = screen.getByRole("link", { name: "徐汇店" });
  expect(link).toHaveAttribute("data-variant", "outline");
  expect(link).toHaveAttribute("data-slot", "item");
});

test("a standalone item has no list role", () => {
  render(<Item data-testid="item">设置</Item>);
  expect(screen.getByTestId("item")).not.toHaveAttribute("role");
});
