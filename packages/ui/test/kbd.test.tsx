import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, test } from "vitest";
import { Kbd } from "../src/components/kbd";

describe("Kbd", () => {
  test("actual key text remains native kbd without registering an action", () => {
    render(<Kbd>Enter</Kbd>);
    const kbd = screen.getByText("Enter");
    expect(kbd.tagName).toBe("KBD");
    expect(kbd).toHaveAttribute("data-slot", "kbd");
    expect(kbd).not.toHaveAttribute("tabindex");
    expect(screen.queryByRole("button")).toBeNull();
  });

  test("a glyph key is named by hidden text inside the element, not by aria-label (kbd has no role to carry one)", () => {
    const { container } = render(<Kbd><span aria-hidden="true">⌘</span><span className="sr-only">Command</span></Kbd>);
    expect(container.querySelector("kbd")).not.toHaveAttribute("aria-label");
    expect(screen.getByText("Command")).toBeInTheDocument();
  });

  test("supports nested key combinations while preserving native kbd semantics", () => {
    const { container } = render(<Kbd data-testid="combo"><Kbd>Ctrl</Kbd>+<Kbd>K</Kbd></Kbd>);
    const combo = screen.getByTestId("combo");
    expect(combo.tagName).toBe("KBD");
    expect(container.querySelectorAll('kbd[data-slot="kbd"]')).toHaveLength(3);
    expect(combo).toHaveTextContent("Ctrl+K");
  });

  test("forwards ref, id, data attributes, and forwards native attributes", () => {
    const ref = createRef<HTMLElement>();
    render(<Kbd ref={ref} id="shortcut-save" title="Save shortcut" data-key="s" className="text-muted-foreground custom-kbd">S</Kbd>);
    const kbd = screen.getByText("S");
    expect(ref.current).toBe(kbd);
    expect(kbd).toHaveAttribute("id", "shortcut-save");
    expect(kbd).toHaveAttribute("title", "Save shortcut");
    expect(kbd).toHaveAttribute("data-key", "s");
  });

  test("supports render composition without losing data-slot", () => {
    render(<Kbd render={<span data-custom="true" />}>Esc</Kbd>);
    const el = screen.getByText("Esc");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveAttribute("data-slot", "kbd");
    expect(el).toHaveAttribute("data-custom", "true");
  });
});
