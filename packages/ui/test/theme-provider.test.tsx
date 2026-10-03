import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { ThemeProvider, themeScript, useTheme } from "../src/components/theme-provider";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { MotionProvider } from "../src/components/motion-provider";

type Listener = (event: MediaQueryListEvent) => void;

/** A controllable prefers-color-scheme media query. */
function mockSystemTheme(initialDark: boolean) {
  const listeners = new Set<Listener>();
  const query = {
    matches: initialDark,
    media: "(prefers-color-scheme: dark)",
    onchange: null,
    addEventListener: (_: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_: string, listener: Listener) => listeners.delete(listener),
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  };
  vi.spyOn(window, "matchMedia").mockImplementation(() => query as unknown as MediaQueryList);
  return {
    set(dark: boolean) {
      query.matches = dark;
      for (const listener of listeners) listener({ matches: dark } as MediaQueryListEvent);
    },
  };
}

function Probe() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div>
      <output data-testid="theme">{theme}</output>
      <output data-testid="resolved">{resolvedTheme}</output>
      <button onClick={() => setTheme("dark")} type="button">深色</button>
      <button onClick={() => setTheme("light")} type="button">浅色</button>
      <button onClick={() => setTheme("system")} type="button">跟随系统</button>
    </div>
  );
}

const root = document.documentElement;

beforeEach(() => {
  localStorage.clear();
  root.className = "";
  root.removeAttribute("data-theme");
  root.style.colorScheme = "";
});
afterEach(() => vi.restoreAllMocks());

test("follows the system preference and its changes when set to system", () => {
  const system = mockSystemTheme(true);
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
  expect(screen.getByTestId("theme")).toHaveTextContent("system");
  expect(screen.getByTestId("resolved")).toHaveTextContent("dark");
  expect(root).toHaveClass("dark");
  expect(root.style.colorScheme).toBe("dark");

  act(() => system.set(false));
  expect(screen.getByTestId("resolved")).toHaveTextContent("light");
  expect(root).toHaveClass("light");
  expect(root).not.toHaveClass("dark");
});

test("persists the choice and restores it on the next mount", async () => {
  mockSystemTheme(false);
  const { unmount } = render(
    <ThemeProvider storageKey="test-theme">
      <Probe />
    </ThemeProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "深色" }));
  expect(localStorage.getItem("test-theme")).toBe("dark");
  expect(root).toHaveClass("dark");
  unmount();

  render(
    <ThemeProvider storageKey="test-theme">
      <Probe />
    </ThemeProvider>,
  );
  expect(screen.getByTestId("theme")).toHaveTextContent("dark");
});

test("ignores invalid stored values and skips storage when storageKey is null", async () => {
  mockSystemTheme(false);
  localStorage.setItem("yq-theme", "sepia");
  const { unmount } = render(
    <ThemeProvider defaultTheme="light">
      <Probe />
    </ThemeProvider>,
  );
  expect(screen.getByTestId("theme")).toHaveTextContent("light");
  unmount();

  localStorage.clear();
  render(
    <ThemeProvider storageKey={null}>
      <Probe />
    </ThemeProvider>,
  );
  await userEvent.click(screen.getByRole("button", { name: "深色" }));
  expect(localStorage.length).toBe(0);
  expect(root).toHaveClass("dark");
});

test("writes data-theme instead of a class in attribute mode", async () => {
  mockSystemTheme(false);
  render(
    <ThemeProvider attribute="data-theme">
      <Probe />
    </ThemeProvider>,
  );
  expect(root).toHaveAttribute("data-theme", "light");
  await userEvent.click(screen.getByRole("button", { name: "深色" }));
  expect(root).toHaveAttribute("data-theme", "dark");
  expect(root).not.toHaveClass("dark");
});

test("follows a change made in another tab", () => {
  mockSystemTheme(false);
  render(
    <ThemeProvider>
      <Probe />
    </ThemeProvider>,
  );
  act(() => {
    window.dispatchEvent(new StorageEvent("storage", { key: "yq-theme", newValue: "dark" }));
  });
  expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  expect(root).toHaveClass("dark");
});

test("useTheme throws outside the provider", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Probe />)).toThrow(/ThemeProvider/);
});

test("themeScript applies the stored theme before React mounts", () => {
  mockSystemTheme(true);
  // Runs the generated source the way an inline <script> would.
  const run = (source: string) => new Function(source)();

  run(themeScript());
  expect(root).toHaveClass("dark");

  localStorage.setItem("yq-theme", "light");
  run(themeScript());
  expect(root).toHaveClass("light");
  expect(root).not.toHaveClass("dark");

  localStorage.setItem("app-theme", "dark");
  run(themeScript({ attribute: "data-theme", storageKey: "app-theme" }));
  expect(root).toHaveAttribute("data-theme", "dark");
  expect(root.style.colorScheme).toBe("dark");
});

test("B8 SSR hydration preserves the server render before resolving actual stored and system choices", async () => {
  mockSystemTheme(true);
  localStorage.setItem("yq-theme", "dark");
  const fixture = <ThemeProvider><MotionProvider><Probe /></MotionProvider></ThemeProvider>;
  let html = "";
  vi.stubGlobal("window", undefined);
  try { html = renderToString(fixture); } finally { vi.unstubAllGlobals(); }
  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.append(container);
  const recover = vi.fn();
  let hydrated: ReturnType<typeof hydrateRoot> | undefined;
  try {
    await act(async () => { hydrated = hydrateRoot(container, fixture, { onRecoverableError: recover }); });
    expect(recover).not.toHaveBeenCalled();
    expect(container.querySelector('[data-testid="theme"]')).toHaveTextContent("dark");
    expect(container.querySelector('[data-testid="resolved"]')).toHaveTextContent("dark");
    expect(root).toHaveClass("dark");
  } finally { act(() => hydrated?.unmount()); container.remove(); }
});

test("B8 unavailable storage keeps the real choice and unmount removes pending transition suppression", async () => {
  mockSystemTheme(false);
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new DOMException("Unavailable", "SecurityError"); });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new DOMException("Unavailable", "SecurityError"); });
  vi.spyOn(window, "requestAnimationFrame").mockImplementation(() => 91);
  const cancel = vi.spyOn(window, "cancelAnimationFrame");
  const { unmount } = render(<ThemeProvider defaultTheme="light"><Probe /></ThemeProvider>);
  await userEvent.click(screen.getByRole("button", { name: "深色" }));
  expect(root).toHaveClass("dark");
  expect(screen.getByTestId("theme")).toHaveTextContent("dark");
  const suppression = [...document.head.querySelectorAll("style")].find(style => style.textContent?.includes("transition:none!important"));
  expect(suppression).toBeInTheDocument();
  unmount();
  expect(suppression).not.toBeInTheDocument();
  expect(cancel).toHaveBeenCalledWith(91);
  new Function(themeScript({ defaultTheme: "dark" }))();
  expect(root).toHaveClass("dark");
});

test("B8 clearing preferences follows the fallback and the first-paint script tolerates absent matchMedia", () => {
  mockSystemTheme(false);
  localStorage.setItem("yq-theme", "dark");
  render(<ThemeProvider defaultTheme="light"><Probe /></ThemeProvider>);
  act(() => window.dispatchEvent(new StorageEvent("storage", { key: null, newValue: null })));
  expect(screen.getByTestId("theme")).toHaveTextContent("light");
  expect(root).toHaveClass("light");
  localStorage.clear();
  vi.stubGlobal("matchMedia", undefined);
  try { new Function(themeScript())(); expect(root).toHaveClass("light"); } finally { vi.unstubAllGlobals(); }
});
