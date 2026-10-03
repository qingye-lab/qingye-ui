import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { AspectRatio } from "../src/components/aspect-ratio";

test("ratio forwards to the real box while content remains available without cropping", () => {
  const ref = createRef<HTMLDivElement>();
  render(<AspectRatio ratio={3 / 2} ref={ref} render={<div data-testid="box" />}>完整内容</AspectRatio>);
  const box = screen.getByTestId("box");
  expect(ref.current).toBe(box);
  expect(box.style.aspectRatio).toBe("1.5");
  expect(box.style.overflow).toBe("");
  expect(box).toHaveTextContent("完整内容");
  expect(() => render(<AspectRatio ratio={0} />)).toThrow("finite positive");
});
