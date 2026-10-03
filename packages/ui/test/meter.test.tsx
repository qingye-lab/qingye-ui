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
