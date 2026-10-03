import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "../src/components/alert";
test("static local information does not gain an automatic announcement", () => {
  render(<Alert tone="warning"><AlertTitle>注意</AlertTitle><AlertDescription>条件尚未满足</AlertDescription></Alert>);
  expect(screen.queryByRole("alert")).toBeNull(); expect(screen.queryByRole("status")).toBeNull();
  expect(screen.getByText("条件尚未满足")).not.toHaveAttribute("aria-live");
});
test("an application can explicitly announce and compose a named native section", () => {
  const ref = createRef<HTMLDivElement>();
  render(<Alert ref={ref} role="alert" aria-labelledby="notice" render={<section />}><AlertTitle id="notice">已确认失败</AlertTitle><AlertDescription>保留原值</AlertDescription></Alert>);
  expect(ref.current).toBe(screen.getByRole("alert", { name: "已确认失败" })); expect(ref.current?.tagName).toBe("SECTION");
});
