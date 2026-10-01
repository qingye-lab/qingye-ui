import { expect, test } from "vitest";
import { ResizablePanel, ResizablePanelGroup } from "../src/components/resizable";
import { render } from "@testing-library/react";

test("probe", () => {
  render(<ResizablePanelGroup><ResizablePanel /></ResizablePanelGroup>);
  expect(true).toBe(true);
});
