import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Alert, AlertAction, AlertDescription, AlertTitle } from "../src/components/alert";
import { CircleAlertIcon } from "lucide-react";

/**
 * jsdom does not compute grid layout, so these tests hold the class contract
 * that the real browser layout depends on. The bug they pin down: on phone
 * widths AlertAction must span the whole row in both the 2-column (icon) and
 * 3-column (icon + action) grids. A bare `col-span-2` resolves to a two-column
 * span and, in a three-column grid, leaves the action beside the text instead
 * of below it.
 */
const actionOf = () => screen.getByText("去补充").closest("[data-slot=alert-action]") as HTMLElement;

function renderAlert(withIcon: boolean) {
  render(
    <Alert variant="warning">
      {withIcon ? <CircleAlertIcon /> : null}
      <AlertTitle>发票信息不完整</AlertTitle>
      <AlertDescription>补充纳税人识别号后，才能开具 9 月账单的专用发票。</AlertDescription>
      <AlertAction>
        <button type="button">去补充</button>
      </AlertAction>
    </Alert>,
  );
}

test("AlertAction spans the full row on phone widths", () => {
  renderAlert(true);
  const action = actionOf();
  expect(action.className).toContain("max-sm:col-start-1");
  expect(action.className).toContain("max-sm:col-end-[-1]");
  // The two-column span is what broke the three-column (icon + action) grid.
  expect(action.className).not.toContain("max-sm:col-span-2");
});

test("AlertAction stacks below the text on phone widths", () => {
  renderAlert(true);
  expect(actionOf().className).toContain("max-sm:mt-2");
});

test("AlertAction sits on the trailing column from sm up", () => {
  renderAlert(true);
  const action = actionOf();
  expect(action.className).toContain("sm:self-center");
  expect(action.className).toContain("sm:row-start-1");
  expect(action.className).toContain("sm:row-end-3");
});

test("an alert without an icon keeps a trailing column for its action", () => {
  const { container } = render(
    <Alert>
      <AlertTitle>有新的固件版本 v2.8.0</AlertTitle>
      <AlertDescription>修复了低温环境下扫码枪偶发断连的问题。</AlertDescription>
      <AlertAction>
        <button type="button">查看更新</button>
      </AlertAction>
    </Alert>,
  );
  // Without this fallback the action claims column 1 and pushes the title and
  // description side by side, squeezing the title to a few characters.
  expect(container.querySelector("[data-slot=alert]")?.className).toContain(
    "sm:has-data-[slot=alert-action]:grid-cols-[1fr_auto]",
  );
});

test("alert exposes its parts and role for assistive tech", () => {
  renderAlert(false);
  const alert = screen.getByRole("alert");
  expect(alert).toHaveAttribute("data-slot", "alert");
  expect(screen.getByText("发票信息不完整")).toHaveAttribute("data-slot", "alert-title");
  expect(screen.getByText(/补充纳税人识别号/)).toHaveAttribute("data-slot", "alert-description");
});

test("destructive is an alias of the error variant", () => {
  const { container: a } = render(<Alert variant="error">x</Alert>);
  const errorClass = a.querySelector("[data-slot=alert]")?.className;
  const { container: b } = render(<Alert variant="destructive">x</Alert>);
  const destructiveClass = b.querySelector("[data-slot=alert]")?.className;
  expect(destructiveClass).toBe(errorClass);
});
