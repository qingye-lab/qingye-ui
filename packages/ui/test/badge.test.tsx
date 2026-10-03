import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Badge } from "../src/components/badge";
test("a marker stays passive, and an explicit native render preserves ref and events", async () => {
  const ref = createRef<HTMLSpanElement>(); const clicked = vi.fn();
  const { rerender } = render(<Badge>标记</Badge>);
  expect(screen.queryByRole("status")).toBeNull(); expect(screen.queryByRole("button")).toBeNull();
  rerender(<Badge ref={ref} onClick={clicked} render={<a href="#marker" />}>标记</Badge>);
  expect(ref.current).toBe(screen.getByRole("link", { name: "标记" }));
  await userEvent.click(screen.getByRole("link")); expect(clicked).toHaveBeenCalledOnce();
});
