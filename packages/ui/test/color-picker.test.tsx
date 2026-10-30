import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { hexToHsv, hsvToHex, isHexColor, normalizeHex, readableOn } from "../src/color";
import { ColorPicker, ColorSwatchPicker } from "../src/components/color-picker";
import { Field, FieldLabel } from "../src/components/field";

// jsdom has no layout: Slider's edge alignment needs a measured control extent before it renders the thumb.
beforeEach(() => {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function () {
    const width = this.getAttribute("data-slot") === "slider-thumb" ? 20 : 200;
    return { x: 0, y: 0, left: 0, top: 0, right: width, bottom: 36, width, height: 36, toJSON() {} };
  });
});
afterEach(() => vi.restoreAllMocks());

const swatches = [
  { value: "#ef4444", label: "红" },
  { value: "#22c55e", label: "绿" },
  { value: "#3b82f6", label: "蓝" },
];

async function open(name = "颜色") {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name }));
  await screen.findByRole("dialog");
  return user;
}

test("swatches are named radios; arrows move and select, Tab leaves the group once", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  render(<><ColorSwatchPicker aria-label="标签颜色" swatches={swatches} defaultValue="#EF4444" onValueChange={change} /><button>下一个</button></>);
  expect(screen.getByRole("radiogroup", { name: "标签颜色" })).toBeInTheDocument();
  expect(screen.getByRole("radio", { name: "红" })).toBeChecked();
  expect(screen.getByRole("radio", { name: "绿" })).not.toBeChecked();
  await user.tab();
  expect(screen.getByRole("radio", { name: "红" })).toHaveFocus();
  await user.keyboard("{ArrowRight}");
  expect(screen.getByRole("radio", { name: "绿" })).toHaveFocus();
  expect(screen.getByRole("radio", { name: "绿" })).toBeChecked();
  expect(change).toHaveBeenLastCalledWith("#22c55e", expect.anything());
  await user.tab();
  expect(screen.getByRole("button", { name: "下一个" })).toHaveFocus();
});

test("a controlled value outside the swatches selects nothing; disabled blocks selection", async () => {
  const user = userEvent.setup();
  const change = vi.fn();
  const { rerender } = render(<ColorSwatchPicker aria-label="颜色" swatches={swatches} value="#123456" onValueChange={change} />);
  screen.getAllByRole("radio").forEach(radio => expect(radio).not.toBeChecked());
  await user.click(screen.getByRole("radio", { name: "蓝" }));
  expect(change).toHaveBeenCalledWith("#3b82f6", expect.anything());
  rerender(<ColorSwatchPicker aria-label="颜色" swatches={swatches} value="#3B82F6" disabled onValueChange={change} />);
  expect(screen.getByRole("radio", { name: "蓝" })).toBeChecked();
  change.mockClear();
  await user.click(screen.getByRole("radio", { name: "红" }));
  expect(change).not.toHaveBeenCalled();
});

test("a swatch group without a name, a swatch without a label, or a bad value throws", () => {
  const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<ColorSwatchPicker swatches={swatches} />)).toThrow(/accessible name/);
  expect(() => render(<ColorSwatchPicker aria-label="颜色" swatches={[{ value: "#ef4444", label: " " }]} />)).toThrow(/nonempty label/);
  expect(() => render(<ColorSwatchPicker aria-label="颜色" swatches={[{ value: "red", label: "红" }]} />)).toThrow(/#rrggbb/);
  expect(() => render(<ColorSwatchPicker aria-label="颜色" swatches={[{ value: "#ef4444", label: "红" }, { value: "#EF4444", label: "又一个红" }]} />)).toThrow(/unique/);
  quiet.mockRestore();
});

test("the group may take its name from a Field label", () => {
  render(<Field><FieldLabel>标签颜色</FieldLabel><ColorSwatchPicker swatches={swatches} /></Field>);
  expect(screen.getAllByRole("radio")).toHaveLength(3);
});

test("the picker trigger needs a name; a Field label supplies it", () => {
  const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<ColorPicker />)).toThrow(/accessible name/);
  quiet.mockRestore();
  render(<Field><FieldLabel>主题色</FieldLabel><ColorPicker defaultValue="#336699" /></Field>);
  const trigger = screen.getByRole("button", { name: "主题色" });
  expect(trigger).toHaveAccessibleDescription("#336699");
});

test("an invalid value is rejected instead of being coerced", () => {
  const quiet = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<ColorPicker aria-label="颜色" defaultValue="blue" />)).toThrow(/#rrggbb/);
  quiet.mockRestore();
});

test("hex input normalizes on Enter and blur; an invalid entry keeps its text and shows an error", async () => {
  const change = vi.fn(); const commit = vi.fn();
  render(<ColorPicker aria-label="颜色" defaultValue="#000000" onValueChange={change} onValueCommit={commit} />);
  const user = await open();
  const input = screen.getByRole("textbox", { name: "十六进制色值" });
  await user.clear(input); await user.type(input, "FA0{Enter}");
  expect(input).toHaveValue("#ffaa00");
  expect(change).toHaveBeenLastCalledWith("#ffaa00");
  expect(commit).toHaveBeenLastCalledWith("#ffaa00");
  expect(screen.getByRole("button", { name: "颜色" })).toHaveTextContent("#ffaa00");

  change.mockClear(); commit.mockClear();
  await user.clear(input); await user.type(input, "#12");
  await user.keyboard("{Enter}");
  expect(input).toHaveValue("#12");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(await screen.findByText("颜色格式应为 #rrggbb")).toBeInTheDocument();
  expect(change).not.toHaveBeenCalled();

  await user.clear(input); await user.type(input, "ABCDEF");
  await user.tab();
  expect(input).toHaveValue("#abcdef");
  expect(input).not.toHaveAttribute("aria-invalid", "true");
  expect(change).toHaveBeenLastCalledWith("#abcdef");
});

test("the saturation/brightness area is two named sliders; arrows move, Shift takes the large step", async () => {
  const change = vi.fn(); const commit = vi.fn();
  render(<ColorPicker aria-label="颜色" defaultValue="#ff0000" onValueChange={change} onValueCommit={commit} />);
  const user = await open();
  const s = screen.getByRole("slider", { name: "饱和度" });
  const v = screen.getByRole("slider", { name: "明度" });
  expect(s).toHaveValue("100"); expect(v).toHaveValue("100");
  expect(s).toHaveAttribute("aria-valuetext", "饱和度 100%，#ff0000");
  s.focus();
  await user.keyboard("{ArrowLeft}");
  expect(s).toHaveValue("99");
  await user.keyboard("{Shift>}{ArrowLeft}{/Shift}");
  expect(s).toHaveValue("89");
  await user.keyboard("{ArrowDown}");
  expect(v).toHaveValue("99");
  await user.keyboard("{Shift>}{ArrowDown}{/Shift}");
  expect(v).toHaveValue("89");
  expect(s).toHaveAttribute("aria-valuetext", expect.stringMatching(/^饱和度 89%，#[\da-f]{6}$/));
  expect(change).toHaveBeenCalled();
  expect(commit).toHaveBeenCalled();
  await user.keyboard("{End}");
  expect(s).toHaveValue("100");
  await user.keyboard("{Home}");
  expect(s).toHaveValue("0");
  expect(screen.getByRole("button", { name: "颜色" }).textContent).toBe(hsvToHex({ h: 0, s: 0, v: 89 }));
});

test("the hue slider changes the colour and keeps its hue through gray", async () => {
  const change = vi.fn();
  render(<ColorPicker aria-label="颜色" defaultValue="#ff0000" onValueChange={change} />);
  const user = await open();
  const hue = await screen.findByRole("slider", { name: "色相" });
  expect(hue).toHaveValue("0");
  hue.focus();
  await user.keyboard("{Shift>}{ArrowRight}{/Shift}");
  expect(hue).toHaveValue("10");
  expect(change).toHaveBeenLastCalledWith(hsvToHex({ h: 10, s: 100, v: 100 }));
  await user.keyboard("{PageUp}");
  expect(Number((hue as HTMLInputElement).value)).toBeGreaterThan(10);
});

test("controlled: the application owns the value and external changes reach the sliders", async () => {
  function Host() {
    const [value, setValue] = useState("#336699");
    return <><ColorPicker aria-label="颜色" value={value} onValueChange={setValue} /><button onClick={() => setValue("#00ff00")}>绿</button></>;
  }
  render(<Host />);
  const user = await open();
  expect(await screen.findByRole("slider", { name: "色相" })).toHaveValue("210");
  // 点击弹层外的按钮会关闭弹层；外部改值后重新打开，滑块应读到新值。
  await user.click(screen.getByRole("button", { name: "绿" }));
  expect(screen.getByRole("button", { name: "颜色" })).toHaveTextContent("#00ff00");
  if (!screen.queryByRole("dialog")) await user.click(screen.getByRole("button", { name: "颜色" }));
  expect(await screen.findByRole("slider", { name: "色相" })).toHaveValue("120");
});

test("presets pick a colour and commit immediately", async () => {
  const change = vi.fn(); const commit = vi.fn();
  render(<ColorPicker aria-label="颜色" defaultValue="#000000" swatches={swatches} onValueChange={change} onValueCommit={commit} />);
  const user = await open();
  await user.click(screen.getByRole("radio", { name: "蓝" }));
  expect(change).toHaveBeenCalledWith("#3b82f6");
  expect(commit).toHaveBeenCalledWith("#3b82f6");
  expect(screen.getByRole("radio", { name: "蓝" })).toBeChecked();
});

test("the value is submitted with the form, follows edits, and returns on reset", async () => {
  const { container } = render(<form><ColorPicker aria-label="颜色" name="accent" defaultValue="#112233" swatches={swatches} /></form>);
  const form = container.querySelector("form")!;
  expect(new FormData(form).get("accent")).toBe("#112233");
  const user = await open();
  await user.click(screen.getByRole("radio", { name: "绿" }));
  expect(new FormData(form).get("accent")).toBe("#22c55e");
  fireEvent.reset(form);
  await waitFor(() => expect(new FormData(form).get("accent")).toBe("#112233"));
});

test("disabled keeps the popup closed and the value out of the form", async () => {
  const { container } = render(<form><ColorPicker aria-label="颜色" name="accent" disabled defaultValue="#112233" /></form>);
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "颜色" }));
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(new FormData(container.querySelector("form")!).has("accent")).toBe(false);
});

test("hex and hsv convert both ways without loss", () => {
  for (let n = 0; n < 0x1000000; n += 4099) {
    const hex = "#" + n.toString(16).padStart(6, "0");
    expect(hsvToHex(hexToHsv(hex))).toBe(hex);
  }
  for (const hex of ["#000000", "#ffffff", "#ff0000", "#00ff00", "#0000ff", "#808080", "#010101"]) expect(hsvToHex(hexToHsv(hex))).toBe(hex);
  expect(hexToHsv("#ff0000")).toEqual({ h: 0, s: 100, v: 100 });
  expect(hexToHsv("#00ff00").h).toBe(120);
  expect(hexToHsv("#0000ff").h).toBe(240);
  expect(hsvToHex({ h: 360, s: 100, v: 100 })).toBe("#ff0000");
  expect(hsvToHex({ h: -120, s: 100, v: 100 })).toBe("#0000ff");
});

test("hex parsing accepts human forms and refuses the rest", () => {
  expect(normalizeHex(" #ABC ")).toBe("#aabbcc");
  expect(normalizeHex("336699")).toBe("#336699");
  for (const bad of ["", "#12", "#12345", "#1234567", "#ggg", "red", "#33669980"]) expect(normalizeHex(bad)).toBeNull();
  expect(isHexColor("#336699")).toBe(true);
  expect(isHexColor("336699")).toBe(false);
  expect(isHexColor(undefined)).toBe(false);
});

test("the mark colour on a swatch always keeps at least 3:1", () => {
  const luminance = (hex: string) => {
    const n = Number.parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(c => { const x = c / 255; return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }).reduce((sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i]!, 0);
  };
  for (let n = 0; n < 0x1000000; n += 7919) {
    const hex = "#" + n.toString(16).padStart(6, "0");
    const a = luminance(hex), b = luminance(readableOn(hex));
    expect((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toBeGreaterThanOrEqual(3);
  }
});

test("dragging on the area sets saturation and brightness from the pointer and commits on release", async () => {
  const change = vi.fn(); const commit = vi.fn();
  render(<ColorPicker aria-label="颜色" defaultValue="#ff0000" onValueChange={change} onValueCommit={commit} />);
  await open();
  const area = document.querySelector("[data-slot=color-area]")!;
  // 测得的面是 200×36：x=100 为饱和度 50，y=9 为明度 75。
  fireEvent.pointerDown(area, { button: 0, clientX: 100, clientY: 9, pointerId: 1 });
  expect(screen.getByRole("slider", { name: "饱和度" })).toHaveValue("50");
  expect(screen.getByRole("slider", { name: "明度" })).toHaveValue("75");
  expect(screen.getByRole("slider", { name: "饱和度" })).toHaveFocus();
  fireEvent.pointerMove(area, { clientX: 400, clientY: -50, pointerId: 1 });
  expect(screen.getByRole("slider", { name: "饱和度" })).toHaveValue("100");
  expect(screen.getByRole("slider", { name: "明度" })).toHaveValue("100");
  expect(commit).not.toHaveBeenCalled();
  fireEvent.pointerUp(area, { pointerId: 1 });
  expect(commit).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenCalled();
});
