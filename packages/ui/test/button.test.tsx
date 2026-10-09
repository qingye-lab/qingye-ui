import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import * as React from "react";
import { createRef } from "react";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import ts from "typescript";
import { expect, expectTypeOf, test, vi } from "vitest";
import { cva } from "class-variance-authority";
import * as icons from "@tabler/icons-react";
import { Button, ButtonPrimitive, ButtonProtection, type ButtonProps, type ButtonState } from "../src/components/button";
import { UILocaleProvider, useUILocale } from "../src/locale";
import { enUS } from "../src/locales/en-US";
import { cn } from "../src/utils";

const frame = () => act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

// Exercise the same popup composition contract without the archived library Menu.
const Menu = MenuPrimitive.Root;
const MenuTrigger = MenuPrimitive.Trigger;
const MenuItem = MenuPrimitive.Item;
function MenuPopup({ children }: { children: ReactNode }) {
  return <MenuPrimitive.Portal><MenuPrimitive.Positioner><MenuPrimitive.Popup>{children}</MenuPrimitive.Popup></MenuPrimitive.Positioner></MenuPrimitive.Portal>;
}

test("the public action contract separates emphasis, consequence, geometry, and caller facts", () => {
  expectTypeOf<ButtonProps["variant"]>().toEqualTypeOf<"solid" | "bordered" | "quiet" | undefined>();
  expectTypeOf<ButtonProps["tone"]>().toEqualTypeOf<"neutral" | "danger" | undefined>();
  expectTypeOf<ButtonProps["size"]>().toEqualTypeOf<"xs" | "sm" | "md" | "lg" | "xl" | undefined>();
  expectTypeOf<ButtonProps["shape"]>().toEqualTypeOf<"label" | "icon" | undefined>();
  expectTypeOf<ButtonState>().toEqualTypeOf<"idle" | "waiting" | "in-progress" | "unknown" | "failed">();
  // @ts-expect-error 当前 API 采用 state；这是接口选择，不是理念禁止布尔值。
  expectTypeOf<ButtonProps["loading"]>();
});

test.each(["waiting", "in-progress", "unknown"] as const)("a %s button stays reachable without duplicate activation", async (state) => {
  const onClick = vi.fn();
  const { rerender } = render(<Button onClick={onClick}>保存</Button>);
  await userEvent.click(screen.getByRole("button", { name: "保存" }));
  expect(onClick).toHaveBeenCalledOnce();

  rerender(<Button state={state} onClick={onClick}>保存</Button>);
  const button = screen.getByRole("button", { name: "保存" });
  if (state === "unknown") expect(button).not.toHaveAttribute("aria-busy");
  else expect(button).toHaveAttribute("aria-busy", "true");
  // Waiting is not forbidden: the control keeps its place in the tab order so a
  // keyboard user can still find it. `disabled` would remove it from focus and
  // lose their position when the wait ends.
  expect(button).toBeEnabled();
  expect(button).toHaveAttribute("aria-disabled", "true");
  // Entering the waiting state preserves the focus established by the click.
  expect(button).toHaveFocus();
  // Being reachable must not mean being activatable.
  await userEvent.click(button);
  await userEvent.keyboard("{Enter}");
  await userEvent.keyboard(" ");
  expect(onClick).toHaveBeenCalledOnce();
});

test("a waiting Menu trigger blocks the mousedown that opens its composed popup and recovers", async () => {
  const user = userEvent.setup();
  const menu = (waiting: boolean) => (
    <Menu>
      <MenuTrigger render={<Button state={waiting ? "waiting" : "idle"}>菜单</Button>} />
      <MenuPopup><MenuItem>编辑</MenuItem></MenuPopup>
    </Menu>
  );
  const { rerender } = render(menu(true));
  const trigger = screen.getByRole("button", { name: "菜单" });
  await user.tab();
  expect(trigger).toHaveFocus();
  // Also dispatch mousedown directly: a prevented pointerdown can suppress
  // compatibility mouse events, which would leave that earlier entry untested.
  fireEvent.mouseDown(trigger, { button: 0 });
  await frame();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  await user.click(trigger);
  // Menu schedules its mousedown opening in a frame. Await that frame before
  // asserting a closed popup, so a delayed activation cannot make a false pass.
  await frame();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();

  rerender(menu(false));
  expect(trigger).toHaveFocus();
  expect(trigger).not.toHaveAttribute("aria-busy");
  await user.click(trigger);
  await frame();
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("menu")).toBeInTheDocument();
});

test.each(["{ArrowDown}", "{ArrowUp}", "{Enter}", " "])(
  "a waiting Menu trigger blocks %s opening and restores it after waiting",
  async (key) => {
    const user = userEvent.setup();
    const menu = (waiting: boolean) => (
      <Menu>
        <MenuTrigger render={<Button state={waiting ? "waiting" : "idle"}>菜单</Button>} />
        <MenuPopup><MenuItem>编辑</MenuItem></MenuPopup>
      </Menu>
    );
    const { rerender } = render(menu(true));
    const trigger = screen.getByRole("button", { name: "菜单" });
    await user.tab();
    await user.keyboard(key);
    await frame();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();

    rerender(menu(false));
    await user.keyboard(key);
    await frame();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  },
);

test("waiting also protects popup activation when Button renders the MenuTrigger", async () => {
  const user = userEvent.setup();
  const menu = (waiting: boolean) => (
    <Menu>
      <Button state={waiting ? "waiting" : "idle"} render={<MenuTrigger />}>菜单</Button>
      <MenuPopup><MenuItem>编辑</MenuItem></MenuPopup>
    </Menu>
  );
  const { rerender } = render(menu(true));
  const trigger = screen.getByRole("button", { name: "菜单" });
  await user.tab();
  await user.click(trigger);
  await user.keyboard("{ArrowDown}");
  await frame();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();

  rerender(menu(false));
  await user.keyboard("{ArrowDown}");
  await frame();
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("menu")).toBeInTheDocument();
});

test("waiting blocks primary press handlers and forwards them again after waiting", async () => {
  const user = userEvent.setup();
  const handlers = {
    onPointerDownCapture: vi.fn(),
    onPointerDown: vi.fn(),
    onMouseDownCapture: vi.fn(),
    onMouseDown: vi.fn(),
    onClickCapture: vi.fn(),
    onClick: vi.fn(),
  };
  const { rerender } = render(<Button state="waiting" {...handlers}>保存</Button>);
  const button = screen.getByRole("button", { name: "保存" });
  await user.click(button);
  fireEvent.mouseDown(button, { button: 0 });
  for (const handler of Object.values(handlers)) expect(handler).not.toHaveBeenCalled();

  rerender(<Button {...handlers}>保存</Button>);
  await user.click(button);
  for (const handler of Object.values(handlers)) expect(handler).toHaveBeenCalledOnce();
});

test("waiting forwards non-activation keys and secondary presses while keeping Tab navigation", async () => {
  const user = userEvent.setup();
  const handlers = {
    onKeyDownCapture: vi.fn(),
    onKeyDown: vi.fn(),
    onKeyUpCapture: vi.fn(),
    onKeyUp: vi.fn(),
    onPointerDownCapture: vi.fn(),
    onPointerDown: vi.fn(),
    onMouseDownCapture: vi.fn(),
    onMouseDown: vi.fn(),
  };
  render(<><Button state="waiting" {...handlers}>保存</Button><Button>下一项</Button></>);
  const button = screen.getByRole("button", { name: "保存" });
  await user.tab();
  expect(button).toHaveFocus();
  for (const handler of Object.values(handlers)) handler.mockClear();
  await user.keyboard("{Escape}{ArrowDown}{ArrowUp}");
  for (const event of ["onKeyDownCapture", "onKeyDown", "onKeyUpCapture", "onKeyUp"] as const) {
    expect(handlers[event].mock.calls.map(([keyEvent]) => keyEvent.key)).toEqual(["Escape", "ArrowDown", "ArrowUp"]);
  }
  await user.pointer({ keys: "[MouseRight]", target: button });
  for (const event of ["onPointerDownCapture", "onPointerDown", "onMouseDownCapture", "onMouseDown"] as const) {
    expect(handlers[event]).toHaveBeenCalledOnce();
  }
  await user.tab();
  expect(screen.getByRole("button", { name: "下一项" })).toHaveFocus();
  expect(handlers.onKeyDown).toHaveBeenLastCalledWith(expect.objectContaining({ key: "Tab", defaultPrevented: false }));
});

test.each([false, true])("a disabled button leaves the tab order with waiting=%s", async (waiting) => {
  const onClick = vi.fn();
  render(<><Button disabled state={waiting ? "waiting" : "idle"} onClick={onClick}>删除</Button><Button>下一项</Button></>);
  const button = screen.getByRole("button", { name: "删除" });
  expect(button).toBeDisabled();
  button.focus();
  expect(button).not.toHaveFocus();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "下一项" })).toHaveFocus();
  await userEvent.click(button);
  expect(onClick).not.toHaveBeenCalled();
});

test.each(["waiting", "in-progress", "unknown"] as const)("a %s non-native anchor preserves focus and blocks activation until recovery", async (state) => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  const link = (waiting: boolean) => (
    <Button state={waiting ? state : "idle"} nativeButton={false} render={<a href="#docs" onClick={onClick} />}>
      文档
    </Button>
  );
  const { rerender } = render(link(true));
  const button = screen.getByRole("button", { name: "文档" });
  await user.tab();
  expect(button).toHaveFocus();
  await user.click(button);
  await user.keyboard("{Enter} ");
  expect(onClick).not.toHaveBeenCalled();
  expect(button).toHaveFocus();

  rerender(link(false));
  await user.keyboard("{Enter}");
  expect(onClick).toHaveBeenCalledOnce();
});

test("the caller owns every result transition and confirmed failure permits its recovery action", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  const view = (state: ButtonState) => <Button onClick={onClick} state={state}>保存</Button>;
  const { rerender } = render(view("idle"));
  await user.click(screen.getByRole("button", { name: "保存" }));
  expect(onClick).toHaveBeenCalledOnce();
  // 发起事件本身不推进状态，更不宣称保存成功。
  expect(screen.queryByRole("status")).not.toBeInTheDocument();

  for (const [state, label] of [["waiting", "等待中"], ["in-progress", "进行中"], ["unknown", "结果未知"], ["failed", "操作失败"]] as const) {
    rerender(view(state));
    const button = screen.getByRole("button", { name: "保存" });
    expect(button).toHaveFocus();
    expect(button).toHaveAccessibleDescription(label);
    expect(button.querySelector('[data-slot="button-state"]')).toBeVisible();
    expect(screen.getByRole("status")).toHaveTextContent(label);
    await user.keyboard("{Enter}");
  }
  expect(onClick).toHaveBeenCalledTimes(2);
  expect(screen.getByRole("button", { name: "保存" })).not.toHaveAttribute("aria-busy");
});

test.each(["waiting", "in-progress", "unknown", "failed"] as const)("an icon action presents %s without losing its name or icon shape", (state) => {
  render(<Button aria-label="保存" shape="icon" state={state}><svg aria-hidden="true" /></Button>);
  const button = screen.getByRole("button", { name: "保存" });
  expect(button).toHaveAttribute("data-shape", "icon");
  expect(button.querySelector('[data-slot="button-state-indicator"]')).toBeVisible();
  expect(button.querySelector('[data-slot="button-content"]')).toHaveClass("opacity-0");
  expect(button).toHaveAccessibleDescription(screen.getByRole("status").textContent ?? "");
});

test("status descriptions use the active locale and preserve caller descriptions", () => {
  render(<UILocaleProvider locale={enUS}><p id="scope">Description</p><Button aria-describedby="scope" state="unknown">Save</Button></UILocaleProvider>);
  const button = screen.getByRole("button", { name: "Save" });
  expect(button).toHaveAccessibleDescription("Description Result unknown");
  expect(screen.getByRole("status")).toHaveTextContent("Result unknown");
});

test("unknown also protects composed popup triggers and has an explicit caller-controlled recovery", async () => {
  const user = userEvent.setup();
  const view = (state: ButtonState) => <Menu><MenuTrigger render={<Button state={state}>菜单</Button>} /><MenuPopup><MenuItem>编辑</MenuItem></MenuPopup></Menu>;
  const { rerender } = render(view("unknown"));
  const trigger = screen.getByRole("button", { name: "菜单" });
  await user.tab();
  fireEvent.mouseDown(trigger, { button: 0 });
  await user.keyboard("{ArrowDown}{ArrowUp}{Enter} ");
  await frame();
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  rerender(view("idle"));
  await user.keyboard("{ArrowDown}");
  await frame();
  expect(screen.getByRole("menu")).toBeInTheDocument();
});

test("unknown blocks auxiliary anchor activation while secondary pointer inspection remains possible", () => {
  const onAuxClick = vi.fn();
  render(<Button nativeButton={false} render={<a href="#example" onAuxClick={onAuxClick} />} state="unknown">保存</Button>);
  const button = screen.getByRole("button", { name: "保存" });
  const event = new MouseEvent("auxclick", { bubbles: true, cancelable: true, button: 1 });
  fireEvent(button, event);
  expect(event.defaultPrevented).toBe(true);
  expect(onAuxClick).not.toHaveBeenCalled();
});

test.each([false, true])("unknown guards render-target capture handlers before they can activate (callback=%s)", async (callback) => {
  const user = userEvent.setup();
  const onClickCapture = vi.fn();
  const onKeyDownCapture = vi.fn();
  const onPointerDownCapture = vi.fn();
  const target = <a href="#example" onClickCapture={onClickCapture} onKeyDownCapture={onKeyDownCapture} onPointerDownCapture={onPointerDownCapture} />;
  const view = (state: ButtonState) => <Button nativeButton={false} render={callback ? (props) => <a {...props} href="#example" onClickCapture={onClickCapture} onKeyDownCapture={onKeyDownCapture} onPointerDownCapture={onPointerDownCapture} /> : target} state={state}>保存</Button>;
  const { rerender } = render(view("unknown"));
  const button = screen.getByRole("button", { name: "保存" });
  await user.tab();
  onKeyDownCapture.mockClear();
  await user.click(button);
  await user.keyboard("{Enter} ");
  expect(onClickCapture).not.toHaveBeenCalled();
  expect(onKeyDownCapture).not.toHaveBeenCalled();
  expect(onPointerDownCapture).not.toHaveBeenCalled();
  rerender(view("idle"));
  await user.click(button);
  expect(onClickCapture).toHaveBeenCalledOnce();
  expect(onPointerDownCapture).toHaveBeenCalledOnce();
});

test("a danger action fails explicitly when the visible consequence is absent or blank", () => {
  expect(() => render(<Button tone="danger">删除</Button>)).toThrow(/ButtonProtection/);
  expect(() => render(<ButtonProtection consequence="  "><Button tone="danger">删除</Button></ButtonProtection>)).toThrow(/non-empty consequence/);
});

test("danger tone and action emphasis are independent within the same visible protection", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<ButtonProtection consequence="删除后无法恢复。"><Button onClick={onClick} tone="danger">删除</Button><Button tone="danger" variant="quiet">移除</Button><Button variant="quiet">保留</Button></ButtonProtection>);
  const solid = screen.getByRole("button", { name: "删除" });
  const quiet = screen.getByRole("button", { name: "移除" });
  const neutral = screen.getByRole("button", { name: "保留" });
  expect(solid).toHaveAttribute("data-variant", "solid");
  expect(quiet).toHaveAttribute("data-variant", "quiet");
  for (const button of [solid, quiet]) {
    expect(button).toHaveAttribute("data-tone", "danger");
    expect(button).toHaveAccessibleDescription("删除后无法恢复。");
  }
  expect(neutral).toHaveAttribute("data-tone", "neutral");
  expect(neutral).not.toHaveAttribute("aria-describedby");
  // 保护结构没有自行推断权限或确认条件；事实来自调用方。
  await user.click(solid);
  expect(onClick).toHaveBeenCalledOnce();
});

test("native attributes, refs, caller aria facts, and derived slots reach the actual control", async () => {
  const user = userEvent.setup();
  const ref = createRef<HTMLButtonElement>();
  const onClick = vi.fn();
  render(<Button aria-busy="true" aria-disabled="true" className="px-0" data-slot="derived-action" id="save" name="action" onClick={onClick} ref={ref} type="submit" value="save">保存</Button>);
  const button = screen.getByRole("button", { name: "保存" });
  expect(ref.current).toBe(button);
  expect(button).toHaveAttribute("type", "submit");
  expect(button).toHaveAttribute("name", "action");
  expect(button).toHaveAttribute("value", "save");
  expect(button).toHaveAttribute("id", "save");
  expect(button).toHaveAttribute("data-slot", "derived-action");
  expect(button).toHaveAttribute("data-size", "md");
  expect(button).toHaveAttribute("aria-busy", "true");
  expect(button).toHaveAttribute("aria-disabled", "true");
  expect(button).toHaveClass("px-0");
  await user.tab();
  expect(button).toHaveFocus();
  await user.click(button);
  expect(onClick).not.toHaveBeenCalled();
});

test("renders a link with button semantics when nativeButton is false", () => {
  render(
    <Button nativeButton={false} render={<a href="/docs" />}>
      文档
    </Button>,
  );
  expect(screen.getByRole("button", { name: "文档" }).tagName).toBe("A");
});

test.each(["solid", "bordered", "quiet"] as const)("%s exposes its current variant", (variant) => {
  render(<Button variant={variant}>保存名称</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("data-variant", variant);
});

test.each(["xs", "sm", "md", "lg", "xl"] as const)("bordered %s consumes a real border and its matching padding", (size) => {
  render(<Button size={size} variant="bordered">保留名称</Button>);
  // md 与填值控件同行，几何读填值角色层（默认密度下等于 md 档的取值）；其余四档读自己的档位。
  const padding = size === "md" ? "px-(--qy-fill-padding)" : `px-(--qy-control-${size}-padding-bordered)`;
  expect(screen.getByRole("button")).toHaveClass("border", "border-(--qy-button-bordered-border)", "focus-visible:border-(--qy-button-bordered-border-focus)", padding);
});

test("md follows the fill-control role so it stays the height of the inputs beside it; other sizes keep their own profile", () => {
  const { rerender } = render(<Button>保存</Button>);
  expect(screen.getByRole("button")).toHaveClass("min-h-(--qy-fill-height-narrow)", "sm:min-h-(--qy-fill-height)", "rounded-(--qy-fill-radius)");
  rerender(<Button size="lg">保存</Button>);
  expect(screen.getByRole("button")).toHaveClass("sm:min-h-(--qy-control-lg)");
  expect(screen.getByRole("button")).not.toHaveClass("sm:min-h-(--qy-fill-height)");
});

test("a danger action accepts a nonempty DOM description mounted after the button", () => {
  render(<><Button tone="danger" aria-describedby="missing consequence">删除</Button><p id="consequence">删除后无法恢复。</p></>);
  expect(screen.getByRole("button")).toHaveAccessibleDescription("删除后无法恢复。");
});

test("a danger action accepts the description on its actual render target", () => {
  render(<><Button tone="danger" render={<button aria-describedby="consequence" />}>删除</Button><p id="consequence">删除后无法恢复。</p></>);
  expect(screen.getByRole("button")).toHaveAccessibleDescription("删除后无法恢复。");
});

test.each(["missing", "blank"])("a danger action rejects a %s DOM description in development", (description) => {
  expect(() => render(<><Button tone="danger" aria-describedby={description}>删除</Button><p id="blank">{ " \n " }</p></>)).toThrow(/non-empty.*aria-describedby/);
});

test("a status description alone does not explain a danger action's consequence", () => {
  expect(() => render(<Button tone="danger" state="waiting">删除</Button>)).toThrow(/ButtonProtection/);
});

test("danger validation runs after mounting, not during server rendering", () => {
  expect(() => renderToString(<Button tone="danger">删除</Button>)).not.toThrow();
});

test("an unprotected danger action does not throw in production", () => {
  vi.stubEnv("NODE_ENV", "production");
  try {
    render(<Button tone="danger">删除</Button>);
    expect(screen.getByRole("button")).toBeEnabled();
  } finally {
    vi.unstubAllEnvs();
  }
});

test.each(["neutral", "danger"] as const)("a %s button mounts when the runtime process global is absent", (tone) => {
  // Shadow the module's global environment, not the Node React/test runner.
  // Execute actual source with real dependencies: the effect keeps this scope
  // when React invokes it after mounting. No NODE_ENV substitution is applied.
  const source = readFileSync(resolve("src/components/button.tsx"), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React },
  }).outputText;
  const dependencies: Record<string, unknown> = {
    "@base-ui/react/button": { Button: ButtonPrimitive },
    "class-variance-authority": { cva },
    "@tabler/icons-react": icons,
    react: React,
    "../locale": { useUILocale },
    "../utils": { cn },
  };
  const context = {
    exports: {} as { Button: typeof Button },
    require: (name: string) => {
      if (!(name in dependencies)) throw new Error(`Unexpected Button dependency: ${name}`);
      return dependencies[name];
    },
  };
  expect(runInNewContext("typeof process", context)).toBe("undefined");
  runInNewContext(compiled, context, { filename: "button-without-process.cjs" });
  const BrowserButton = context.exports.Button;
  expect(() => render(<BrowserButton tone={tone}>保存</BrowserButton>)).not.toThrow();
  expect(screen.getByRole("button", { name: "保存" })).toBeEnabled();
});

test("mount-time validation preserves a caller's ref and its React cleanup", () => {
  const cleanup = vi.fn();
  const ref = vi.fn(() => cleanup);
  const { unmount } = render(<Button ref={ref}>保存</Button>);
  expect(ref).toHaveBeenCalledWith(screen.getByRole("button"));
  unmount();
  expect(cleanup).toHaveBeenCalledOnce();
});

test("the registry editor template compiles against current source props and rejects the removed loading prop", () => {
  const script = ts.createSourceFile("gen-catalog.mjs", readFileSync(resolve("scripts/gen-catalog.mjs"), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  let editor: string | undefined;
  const visit = (node: ts.Node) => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === "editor" && node.initializer && ts.isNoSubstitutionTemplateLiteral(node.initializer)) editor = node.initializer.text;
    ts.forEachChild(node, visit);
  };
  visit(script);
  expect(editor).toBeDefined();
  const fileName = resolve("test/__registry-editor-check.tsx");
  const options: ts.CompilerOptions = {
    strict: true, noEmit: true, skipLibCheck: true, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, moduleResolution: ts.ModuleResolutionKind.Bundler,
    baseUrl: process.cwd(), paths: { "@qingye_lab/ui/components/*": ["src/components/*"] },
  };
  const check = (source: string) => {
    const host = ts.createCompilerHost(options);
    const originalGetSourceFile = host.getSourceFile.bind(host);
    host.getSourceFile = (path, ...args) => path === fileName ? ts.createSourceFile(path, source, options.target!, true, ts.ScriptKind.TSX) : originalGetSourceFile(path, ...args);
    return ts.getPreEmitDiagnostics(ts.createProgram([fileName], options, host));
  };
  expect(check(editor!).map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))).toEqual([]);
  const invalid = editor!.replace('state={saving ? "in-progress" : "idle"}', "loading={saving}");
  expect(invalid).not.toBe(editor);
  expect(check(invalid).some((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n").includes("Property 'loading' does not exist"))).toBe(true);
  // Two cold ts.createProgram runs; the default 5s budget is exceeded on a loaded CI worker.
}, 60_000);
