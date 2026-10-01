import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionListItem,
  DescriptionTerm,
} from "../src/components/description-list";

test("renders term–details pairs as a definition list", () => {
  render(
    <DescriptionList layout="grid" divided>
      <DescriptionListItem>
        <DescriptionTerm>门店编号</DescriptionTerm>
        <DescriptionDetails>XH-001</DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>,
  );
  const term = screen.getByRole("term");
  expect(term.tagName).toBe("DT");
  expect(screen.getByRole("definition")).toHaveTextContent("XH-001");
  expect(term.closest("dl")).toHaveAttribute("data-layout", "grid");
  expect(term.parentElement).toHaveClass("border-t");
});

test("copyValue adds a labelled copy button that writes the exact value", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(
    <DescriptionList>
      <DescriptionListItem>
        <DescriptionTerm>订单号</DescriptionTerm>
        <DescriptionDetails copyLabel="复制订单号" copyValue="SO-20260930-004817">
          SO-20260930-004817
        </DescriptionDetails>
      </DescriptionListItem>
    </DescriptionList>,
  );
  const button = screen.getByRole("button", { name: "复制订单号" });
  await user.click(button);
  expect(writeText).toHaveBeenCalledWith("SO-20260930-004817");
  expect(await screen.findByText("已复制")).toBeInTheDocument();
  expect(button.closest("dd")).toHaveTextContent("SO-20260930-004817");
});
