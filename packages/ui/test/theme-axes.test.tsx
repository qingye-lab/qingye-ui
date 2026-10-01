import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test } from "vitest";
import { ThemeProvider, themeScript, useTheme } from "../src/components/theme-provider";

const root = document.documentElement;
let brandStyle: HTMLStyleElement;
function ThemeSwitch() {
  const { setTheme } = useTheme();
  return <button onClick={() => setTheme("dark")}>Dark</button>;
}
beforeEach(() => {
  root.className = "";
  root.setAttribute("data-brand", "fixture");
  root.setAttribute("data-density", "compact");
  root.removeAttribute("data-theme");
  brandStyle = document.createElement("style");
  brandStyle.textContent = 'html[data-brand="fixture"] { --qy-primary: rgb(20, 40, 80); }';
  document.head.appendChild(brandStyle);
});
afterEach(() => {
  brandStyle.remove();
  root.className = "";
  root.removeAttribute("data-brand");
  root.removeAttribute("data-density");
  root.removeAttribute("data-theme");
  root.style.colorScheme = "";
});

test.each(["class", "data-theme"] as const)("mounting and changing theme via %s preserve brand tokens and density", async (attribute) => {
  render(<ThemeProvider attribute={attribute} defaultTheme="light" storageKey={null}><ThemeSwitch /></ThemeProvider>);
  expect(getComputedStyle(root).getPropertyValue("--qy-primary")).toBe("rgb(20, 40, 80)");
  await userEvent.click(screen.getByRole("button", { name: "Dark" }));
  expect(root).toHaveAttribute("data-brand", "fixture");
  expect(root).toHaveAttribute("data-density", "compact");
  expect(getComputedStyle(root).getPropertyValue("--qy-primary")).toBe("rgb(20, 40, 80)");
  if (attribute === "class") expect(root).toHaveClass("dark");
  else expect(root).toHaveAttribute("data-theme", "dark");
});

test.each(["class", "data-theme"] as const)("the first-paint script via %s preserves independent axes", (attribute) => {
  new Function(themeScript({ attribute, defaultTheme: "dark", storageKey: null }))();
  expect(root).toHaveAttribute("data-brand", "fixture");
  expect(root).toHaveAttribute("data-density", "compact");
  expect(getComputedStyle(root).getPropertyValue("--qy-primary")).toBe("rgb(20, 40, 80)");
});

test("an absent brand is the existing default, without a provider-written brand", () => {
  root.removeAttribute("data-brand");
  render(<ThemeProvider defaultTheme="light" storageKey={null}>Default</ThemeProvider>);
  expect(root).not.toHaveAttribute("data-brand");
});
