import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../src/components/table";

test("density and sticky header are exposed on the container", () => {
  render(
    <Table aria-label="设备" density="compact" render={<div className="max-h-72" />} stickyHeader variant="card">
      <TableHeader>
        <TableRow>
          <TableHead>名称</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>收银机</TableCell>
        </TableRow>
      </TableBody>
    </Table>,
  );
  const container = screen.getByRole("table", { name: "设备" }).parentElement!;
  expect(container).toHaveAttribute("data-slot", "table-container");
  expect(container).toHaveAttribute("data-density", "compact");
  expect(container).toHaveAttribute("data-variant", "card");
  expect(container).toHaveAttribute("data-sticky-header");
  expect(container).toHaveClass("max-h-72", "overflow-x-auto");
});
