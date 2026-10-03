import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "../src/components/table";

describe("Table", () => {
  it("retains native caption, column and row headers and zero cells", () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<TableContainer><Table ref={ref}><TableCaption>比较</TableCaption><TableHeader><TableRow><TableHead>名称</TableHead><TableHead>数量</TableHead></TableRow></TableHeader><TableBody><TableRow><TableHead scope="row">条目</TableHead><TableCell>{0}</TableCell></TableRow></TableBody></Table></TableContainer>);
    expect(ref.current).toBe(screen.getByRole("table", { name: "比较" })); expect(screen.getAllByRole("columnheader")).toHaveLength(2); expect(screen.getByRole("rowheader")).toHaveAttribute("scope", "row"); expect(screen.getByRole("cell")).toHaveTextContent("0");
  });
  it("leaves sorting and an empty-row span to the application", () => {
    const sort = vi.fn();
    render(<Table><TableHeader><TableRow><TableHead aria-sort="descending"><Button variant="quiet" onClick={sort}>排序</Button></TableHead><TableHead>第二列</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={2}>无结果</TableCell></TableRow></TableBody></Table>);
    fireEvent.click(screen.getByRole("button")); expect(sort).toHaveBeenCalledOnce(); expect(screen.getByRole("columnheader", { name: "排序" })).toHaveAttribute("aria-sort", "descending"); expect(screen.getByRole("cell")).toHaveAttribute("colspan", "2"); expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });
});
