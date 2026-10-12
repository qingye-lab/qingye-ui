import type * as React from "react";
import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "../src/components/meter";
test("measurement uses the named meter role, actual range and zero", () => {
  const ref = createRef<HTMLDivElement>();
  render(<Meter value={0} min={-10} max={10} ref={ref} getAriaValueText={(_, value) => `${value} units`}><MeterLabel>测量</MeterLabel><MeterTrack><MeterIndicator /></MeterTrack><MeterValue /></Meter>);
  const meter = screen.getByRole("meter", { name: "测量" });
  expect(ref.current).toBe(meter); expect(meter).toHaveAttribute("aria-valuenow", "0"); expect(meter).toHaveAttribute("aria-valuemin", "-10"); expect(meter).toHaveAttribute("aria-valuemax", "10"); expect(meter).toHaveAttribute("aria-valuetext", "0 units");
  expect(screen.queryByRole("progressbar")).toBeNull();
});
test.each([{ value: NaN }, { value: 101 }, { value: 0, min: 1, max: 1 }, { value: 0, min: -Number.MAX_VALUE, max: Number.MAX_VALUE }])("invalid measurement inputs are rejected: %j", props => {
  expect(() => render(<Meter aria-label="测量" {...props} />)).toThrow(RangeError);
});
const level = (props: Partial<React.ComponentProps<typeof Meter>> = {}) => <Meter value={2} min={0} max={3} segments={3} getAriaValueText={(_, v) => `${v} 级`} {...props}><MeterLabel>风险</MeterLabel><MeterTrack><MeterIndicator /></MeterTrack></Meter>;
test("segments and tone are carried on the root while the meter semantics stay the same", () => {
  render(level({ tone: "warning" }));
  const meter = screen.getByRole("meter", { name: "风险" });
  expect(meter).toHaveAttribute("data-segments", "3"); expect(meter).toHaveAttribute("data-tone", "warning");
  expect(meter).toHaveAttribute("aria-valuenow", "2"); expect(meter).toHaveAttribute("aria-valuetext", "2 级");
});
test("a plain meter carries neither marker", () => {
  render(level({ segments: undefined }));
  const meter = screen.getByRole("meter");
  expect(meter).not.toHaveAttribute("data-segments"); expect(meter).not.toHaveAttribute("data-tone");
});
test.each([{ segments: 1 }, { segments: 3.2 }, { segments: 3, value: 1.5 }, { tone: "primary" as never }])("invalid segments, off-boundary values and unknown tones are rejected: %j", props => { expect(() => render(level(props))).toThrow(RangeError); });
