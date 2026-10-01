import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { CodeBlock, InlineCode } from "../src/components/code-block";

const code = `import { defineConfig } from "vite";

export default defineConfig({});
`;

test("renders one numbered line per source line and marks highlighted lines", () => {
  const { container } = render(
    <CodeBlock code={code} filename="vite.config.ts" highlightLines={[3]} language="ts" lineNumbers />,
  );
  const lines = container.querySelectorAll("[data-line]");
  expect(lines).toHaveLength(3);
  expect(lines[2]).toHaveAttribute("data-highlighted");
  expect(lines[0]).not.toHaveAttribute("data-highlighted");
  expect(screen.getByText("vite.config.ts")).toBeInTheDocument();
  expect(container.querySelector("pre")).toHaveAttribute("tabindex", "0");
  expect(container.querySelector("pre")).toHaveAttribute("dir", "ltr");
});

test("copy button uses the copyCode label and copies the source text", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(<CodeBlock code={code} />);
  await user.click(screen.getByRole("button", { name: "复制代码" }));
  expect(writeText).toHaveBeenCalledWith(code);
});

test("pre-highlighted children without code copy their rendered text", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
  render(
    <CodeBlock>
      <span data-line="">
        <span className="text-info">const</span> a = 1;
      </span>
    </CodeBlock>,
  );
  await user.click(screen.getByRole("button", { name: "复制代码" }));
  expect(writeText).toHaveBeenCalledWith("const a = 1;");
});

test("copyable={false} removes the button; InlineCode renders <code>", () => {
  render(
    <>
      <CodeBlock code="pnpm dev" copyable={false} />
      <InlineCode>density</InlineCode>
    </>,
  );
  expect(screen.queryByRole("button")).toBeNull();
  expect(screen.getByText("density").tagName).toBe("CODE");
});
