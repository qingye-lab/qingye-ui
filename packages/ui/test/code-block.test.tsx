import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { CodeBlock } from "../src/components/code-block";

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
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
  it("copies `code`, not the highlighted children, and names the copy button the same with or without a title bar", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined); vi.stubGlobal("navigator", { clipboard: { writeText } });
    for (const title of [undefined, "a.ts"]) {
      const { container, unmount } = render(<CodeBlock code="const a = 1;" {...(title ? { title } : {})}><span>const</span> a = 1;</CodeBlock>);
      expect(container.querySelector("pre > code")).toHaveTextContent("const a = 1;"); fireEvent.click(screen.getByRole("button", { name: "复制代码" })); expect(writeText).toHaveBeenLastCalledWith("const a = 1;");
      await waitFor(() => expect(screen.getByRole("button", { name: "已复制" })).toBeInTheDocument()); unmount();
    }
  });
  it("renders a string title in the header and a node title as given, ahead of the copy button", () => {
    const { rerender, container } = render(<CodeBlock code="x" title="values.js" />);
    expect(container.querySelector("[data-slot=code-block-header]")).toHaveTextContent("values.js");
    rerender(<CodeBlock code="x" title={<button type="button">pnpm</button>} />);
    expect([...container.querySelectorAll("[data-slot=code-block-header] button")].map(node => node.textContent || node.getAttribute("aria-label"))).toEqual(["pnpm", "复制代码"]);
    rerender(<CodeBlock code="x" />); expect(container.querySelector("[data-slot=code-block-header]")).toBeNull();
  });
});
describe("CodeBlock keyboard scrolling", () => {
  it("makes the code surface focusable only while it overflows", () => {
    const metrics = { scrollWidth: 800, clientWidth: 300 }; let notify: (() => void) | undefined;
    vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockImplementation(() => metrics.scrollWidth);
    vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => metrics.clientWidth);
    vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { notify = callback; } observe() {} unobserve() {} disconnect() {} });
    const { container } = render(<CodeBlock code={"x".repeat(200)} />); const pre = container.querySelector("pre")!;
    expect(pre).toHaveAttribute("tabindex", "0");
    act(() => { metrics.scrollWidth = 300; notify?.(); }); expect(pre).not.toHaveAttribute("tabindex");
  });
  it("is not a tab stop when everything fits", () => {
    const { container } = render(<CodeBlock code="short" />); expect(container.querySelector("pre")).not.toHaveAttribute("tabindex");
  });
});
describe("CodeBlock maxLines and the scroll region", () => {
  const overflow = () => {
    vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockImplementation(() => 800);
    vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockImplementation(() => 100);
  };
  it("a scroll region that overflows is focusable and named by the title, then the language, then a default", () => {
    overflow();
    const { container, rerender } = render(<CodeBlock code="x" title="values.js" language="JavaScript" maxLines={3} />);
    expect(screen.getByRole("region", { name: "values.js" })).toBe(container.querySelector("pre")); expect(container.querySelector("pre")).toHaveAttribute("tabindex", "0");
    rerender(<CodeBlock code="x" language="JavaScript" maxLines={3} />); expect(screen.getByRole("region", { name: "JavaScript" })).toBeInTheDocument();
    rerender(<CodeBlock code="x" maxLines={3} />); expect(screen.getByRole("region", { name: "代码" })).toBeInTheDocument();
  });
  it("does not add a region (or a tab stop) while the code fits", () => {
    render(<CodeBlock code="short" maxLines={10} />); expect(screen.queryByRole("region")).toBeNull();
  });
  it("keeps the copy button outside the scrolling pre, with or without a title bar", () => {
    overflow();
    for (const title of [undefined, "a.ts"]) {
      const { container, unmount } = render(<CodeBlock code="x" maxLines={2} {...(title ? { title } : {})} />);
      expect(container.querySelector("pre")!.contains(screen.getByRole("button", { name: "复制代码" }))).toBe(false); unmount();
    }
  });
  it("rejects a maxLines that is not a positive integer", () => {
    expect(() => render(<CodeBlock code="x" maxLines={0} />)).toThrow(/positive integer/);
    expect(() => render(<CodeBlock code="x" maxLines={2.5} />)).toThrow(/positive integer/);
  });
});
