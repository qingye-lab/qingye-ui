import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CodeBlock } from "../src/components/code-block";

afterEach(() => vi.unstubAllGlobals());
describe("CodeBlock", () => {
  it("renders literal text and reports copied only after the exact text is written", async () => {
    let resolve!: () => void; const writeText = vi.fn(() => new Promise<void>(done => { resolve = done; }));
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    const code = "  <tag>\n\tvalue  \n"; const { container } = render(<CodeBlock code={code} language="text" />);
    expect(container.querySelector("pre > code")?.textContent).toBe(code); fireEvent.click(screen.getByRole("button", { name: "复制代码" })); expect(writeText).toHaveBeenCalledWith(code); expect(screen.queryByRole("button", { name: "已复制" })).toBeNull(); resolve(); await waitFor(() => expect(screen.getByRole("button", { name: "已复制" })).toBeInTheDocument());
  });
  it("keeps manual-copy text on rejection and calls the error callback", async () => {
    const failure = new Error("denied"); const onCopyError = vi.fn(); vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockRejectedValue(failure) } });
    const { container } = render(<CodeBlock code="unaltered" onCopyError={onCopyError} />); fireEvent.click(screen.getByRole("button")); await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("复制失败，请手动复制")); expect(onCopyError).toHaveBeenCalledWith(failure); expect(container.querySelector("code")?.textContent).toBe("unaltered");
  });
  it("keeps native copy events distinct from the button's confirmed success", async () => {
    const onCopy = vi.fn(); const onCopySuccess = vi.fn(); vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
    render(<CodeBlock code="literal" onCopy={onCopy} onCopySuccess={onCopySuccess} />); fireEvent.copy(screen.getByText("literal")); expect(onCopy).toHaveBeenCalledOnce(); expect(onCopySuccess).not.toHaveBeenCalled(); fireEvent.click(screen.getByRole("button")); await waitFor(() => expect(onCopySuccess).toHaveBeenCalledOnce()); expect(onCopy).toHaveBeenCalledOnce();
  });
  it("does not carry success over to changed text and can omit the copy action", async () => {
    vi.stubGlobal("navigator", { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } }); const { rerender } = render(<CodeBlock code="first" />); fireEvent.click(screen.getByRole("button")); await waitFor(() => expect(screen.getByRole("button", { name: "已复制" })).toBeInTheDocument()); rerender(<CodeBlock code="second" />); expect(screen.getByRole("button", { name: "复制代码" })).toBeInTheDocument(); rerender(<CodeBlock code="second" copyable={false} />); expect(screen.queryByRole("button")).toBeNull();
  });
});
