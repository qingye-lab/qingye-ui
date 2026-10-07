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
