import type * as React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "../src/components/progress";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";
test("zero, actual completion and indeterminate are different named facts", () => {
  const fixture = (value: number | null) => <Progress value={value} min={0} max={8}><ProgressLabel>进度</ProgressLabel><ProgressTrack><ProgressIndicator /></ProgressTrack><ProgressValue /></Progress>;
  const { rerender } = render(fixture(0));
  expect(screen.getByRole("progressbar", { name: "进度" })).toHaveAttribute("aria-valuenow", "0");
  rerender(fixture(8)); expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "8");
  rerender(fixture(null)); expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
  expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "8");
});
test.each([{ value: Infinity }, { value: -1 }, { value: null, max: 0 }, { value: null, min: -Number.MAX_VALUE, max: Number.MAX_VALUE }])("invalid progress inputs are rejected: %j", props => { expect(() => render(<Progress aria-label="进度" {...props} />)).toThrow(RangeError); });
test("indeterminate text and ARIA follow locale while actual numbers and caller overrides remain authoritative", () => {
  const fixture = (english: boolean, value: number | null = null, custom = false) => <UILocaleProvider {...(english ? { locale: enUS } : {})}><Progress value={value} aria-label="进度" {...(custom ? { getAriaValueText: () => "已确认进行" } : {})}><ProgressValue>{custom ? (_, actualValue) => actualValue === null ? "应用状态" : "应用读数" : undefined}</ProgressValue></Progress></UILocaleProvider>;
  const { rerender } = render(fixture(false));
  expect(screen.getByRole("progressbar", { name: "进度" })).toHaveAttribute("aria-valuetext", "进行中");
  expect(screen.getByText("进行中")).toBeInTheDocument();
  rerender(fixture(true));
  expect(screen.getByRole("progressbar", { name: "进度" })).toHaveAttribute("aria-valuetext", enUS.messages.buttonInProgress);
  expect(screen.getByText(enUS.messages.buttonInProgress)).toBeInTheDocument();
  rerender(fixture(true, 50));
  expect(screen.getByRole("progressbar", { name: "进度" })).toHaveAttribute("aria-valuetext", "50%");
  expect(screen.getByText("50%")).toBeInTheDocument();
  rerender(fixture(false, null, true));
  expect(screen.getByRole("progressbar", { name: "进度" })).toHaveAttribute("aria-valuetext", "已确认进行");
  expect(screen.getByText("应用状态")).toBeInTheDocument();
});
const segmented = (props: Partial<React.ComponentProps<typeof Progress>> = {}) => <Progress value={4} min={0} max={7} segments={7} getAriaValueText={(_, v) => `第 ${v} / 7 阶段`} {...props}><ProgressLabel>蚕龄</ProgressLabel><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>;
test("segments mark the root and leave the progressbar semantics and caller stage name untouched", () => {
  render(segmented());
  const bar = screen.getByRole("progressbar", { name: "蚕龄" });
  expect(bar).toHaveAttribute("data-segments", "7");
  expect(bar).toHaveAttribute("aria-valuenow", "4"); expect(bar).toHaveAttribute("aria-valuemax", "7"); expect(bar).toHaveAttribute("aria-valuetext", "第 4 / 7 阶段");
});
test("without segments the root carries no segment marker", () => {
  render(segmented({ segments: undefined, value: 3.5 }));
  expect(screen.getByRole("progressbar")).not.toHaveAttribute("data-segments");
});
test.each([{ segments: 1 }, { segments: 0 }, { segments: 2.5 }, { segments: NaN }])("segments must be an integer of 2 or more: %j", props => { expect(() => render(segmented(props))).toThrow(RangeError); });
test("segmented progress must stand on a cell boundary and cannot be indeterminate", () => {
  expect(() => render(segmented({ value: 3.5 }))).toThrow(RangeError);
  expect(() => render(segmented({ value: null }))).toThrow(RangeError);
  expect(() => render(segmented({ min: 0, max: 100, segments: 4, value: 50 }))).not.toThrow();
  expect(() => render(segmented({ min: 0, max: 1, segments: 10, value: 0.3 }))).not.toThrow();
});
