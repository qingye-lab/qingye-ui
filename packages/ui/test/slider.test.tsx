import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue } from "../src/components/slider";
import { Field, FieldDescription, FieldError } from "../src/components/field";

const single = <><SliderLabel>数值</SliderLabel><SliderValue /><SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl></>;
const range = <><SliderLabel>区间</SliderLabel><SliderControl><SliderTrack><SliderIndicator /><SliderThumb index={0} aria-label="下限" /><SliderThumb index={1} aria-label="上限" /></SliderTrack></SliderControl></>;

// jsdom has no layout: edge alignment needs a real measured control extent.
beforeEach(() => {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function () {
    const width = this.getAttribute("data-slot") === "slider-thumb" ? 20 : 200;
    return { x: 0, y: 0, left: 0, top: 0, right: width, bottom: 36, width, height: 36, toJSON() {} };
  });
});
afterEach(() => vi.restoreAllMocks());

test("keyboard applies min-origin step, largeStep and endpoints and exposes the actual value", async () => {
  const change = vi.fn(); const committed = vi.fn();
  render(<Slider defaultValue={12} min={10} max={30} step={2} largeStep={6} onValueChange={change} onValueCommitted={committed}>{single}</Slider>);
  const input = await screen.findByRole("slider", { name: "数值" }); expect(input).toHaveValue("12");
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}"); expect(input).toHaveValue("14"); expect(screen.getByRole("status")).toHaveTextContent("14");
  expect(change).toHaveBeenLastCalledWith(14, expect.objectContaining({ reason: "keyboard" }));
  await userEvent.keyboard("{PageUp}"); expect(input).toHaveValue("20");
  await userEvent.keyboard("{End}"); expect(input).toHaveValue("30");
  await userEvent.keyboard("{Home}"); expect(input).toHaveValue("10"); expect(committed).toHaveBeenCalled();
});

test("controlled values only follow application updates; cancellation holds the current value", async () => {
  const change = vi.fn(); const { rerender } = render(<Slider value={20} onValueChange={change}>{single}</Slider>);
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}"); expect(change).toHaveBeenCalledWith(21, expect.any(Object)); expect(screen.getByRole("slider")).toHaveValue("20");
  rerender(<Slider value={30} onValueChange={change}>{single}</Slider>); expect(screen.getByRole("slider")).toHaveValue("30");
  rerender(<Slider key="cancel" defaultValue={20} onValueChange={(_, details) => details.cancel()}>{single}</Slider>);
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}"); expect(screen.getByRole("slider")).toHaveValue("20");
});

test("range keeps distinct names, ordered values, minSteps and repeated form fields", async () => {
  const { container } = render(<form><Slider defaultValue={[20, 40]} step={5} minStepsBetweenValues={2} name="range" thumbCollisionBehavior="none">{range}</Slider></form>);
  const lower = await screen.findByRole("slider", { name: /下限/ }); const upper = screen.getByRole("slider", { name: /上限/ });
  expect(lower).toHaveAttribute("aria-valuetext", "20"); expect(upper).toHaveAttribute("aria-valuetext", "40");
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");
  expect(lower).toHaveValue("30"); expect(upper).toHaveValue("40");
  expect(new FormData(container.querySelector("form")!).getAll("range")).toEqual(["30", "40"]);
});

test("readonly stays focusable, exposes readonly and blocks native input/keyboard changes without losing form value", async () => {
  const change = vi.fn(); const committed = vi.fn();
  const { container } = render(<form><Slider readOnly defaultValue={25} name="value" onValueChange={change} onValueCommitted={committed}>{single}</Slider></form>);
  const input = await screen.findByRole("slider"); await userEvent.tab(); expect(input).toHaveFocus(); expect(input).toHaveAttribute("aria-readonly", "true");
  await userEvent.keyboard("{ArrowRight}"); fireEvent.change(input, { target: { value: "60" } });
  expect(input).toHaveValue("25"); expect(change).not.toHaveBeenCalled(); expect(committed).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("value")).toBe("25");
});

test("disabled is noninteractive and absent from form submission; Field preserves error association", async () => {
  const change = vi.fn(); const { container } = render(<form><Field invalid><Slider disabled defaultValue={25} name="value" onValueChange={change}>{single}</Slider><FieldDescription>区间内数值</FieldDescription><FieldError>数值无效</FieldError></Field><button>继续</button></form>);
  const input = await screen.findByRole("slider"); expect(input).toBeDisabled(); expect(input).toHaveAccessibleDescription("区间内数值 数值无效"); expect(input).toHaveAttribute("aria-invalid", "true");
  await userEvent.tab(); expect(screen.getByRole("button")).toHaveFocus(); expect(new FormData(container.querySelector("form")!).has("value")).toBe(false); expect(change).not.toHaveBeenCalled();
});

test("track press and drag change the real value and release commits it", async () => {
  const change = vi.fn(); const committed = vi.fn();
  const { container } = render(<Slider defaultValue={0} thumbAlignment="center" onValueChange={change} onValueCommitted={committed}>{single}</Slider>);
  const control = container.querySelector<HTMLElement>('[data-slot="slider-control"]')!;
  control.setPointerCapture = vi.fn(); control.releasePointerCapture = vi.fn(); control.hasPointerCapture = vi.fn(() => true);
  const rect = { x: 0, y: 0, left: 0, top: 0, right: 200, bottom: 36, width: 200, height: 36, toJSON() {} };
  vi.spyOn(control, "getBoundingClientRect").mockReturnValue(rect);
  const user = userEvent.setup();
  await user.pointer([{ keys: "[MouseLeft>]", target: control, coords: { clientX: 50, clientY: 18 } }, { target: control, coords: { clientX: 150, clientY: 18 } }, { keys: "[/MouseLeft]", target: control, coords: { clientX: 150, clientY: 18 } }]);
  expect(screen.getByRole("slider")).toHaveValue("75"); expect(change).toHaveBeenCalledWith(25, expect.objectContaining({ reason: "track-press" })); expect(change).toHaveBeenCalledWith(75, expect.objectContaining({ reason: "drag" })); expect(committed).toHaveBeenCalled();
});

test("invalid supplied configuration is rejected explicitly while decimal steps and min default remain valid", async () => {
  for (const props of [{ min: 10, max: 10 }, { step: 0 }, { min: 0, max: 10, step: 3 }, { defaultValue: 101 }, { defaultValue: Number.NaN }, { defaultValue: [] }, { defaultValue: [50, 20] }, { step: 2, defaultValue: 3 }, { minStepsBetweenValues: 2, defaultValue: [1, 2] }]) {
    expect(() => render(<Slider {...props}>{single}</Slider>)).toThrow(RangeError);
  }
  const { rerender } = render(<Slider min={0.1} max={1.1} step={0.1} defaultValue={0.3}>{single}</Slider>); expect(await screen.findByRole("slider")).toHaveValue("0.3");
  rerender(<Slider key="min" min={10} max={30}>{single}</Slider>); expect(await screen.findByRole("slider")).toHaveValue("10");
});

test("root and thumb render/ref/ARIA/events/styles preserve composition", async () => {
  const ref = createRef<HTMLDivElement>(); const thumbRef = createRef<HTMLDivElement>(); const inputRef = createRef<HTMLInputElement>(); const key = vi.fn();
  render(<Slider ref={ref} render={<div data-rendered="yes" />} className={state => state.disabled ? "caller-disabled" : "caller-enabled"} style={{ color: "var(--qy-foreground)" }}><SliderControl><SliderTrack><SliderIndicator /><SliderThumb ref={thumbRef} inputRef={inputRef} render={<div data-thumb-rendered="yes" />} aria-label="数值" aria-describedby="details" aria-valuetext="当前数值" onKeyDown={key} /></SliderTrack></SliderControl></Slider>);
  const input = await screen.findByRole("slider"); expect(ref.current).toHaveAttribute("data-rendered", "yes"); expect(ref.current).toHaveClass("caller-enabled", "text-control-md-mobile", "sm:text-control-md");
  expect(thumbRef.current).toHaveAttribute("data-slot", "slider-thumb"); expect(thumbRef.current).toHaveAttribute("data-thumb-rendered", "yes"); expect(inputRef.current).toBe(input); expect(input).toHaveAttribute("aria-describedby", "details"); expect(input).toHaveAttribute("aria-valuetext", "当前数值");
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}"); expect(key).toHaveBeenCalled();
});
