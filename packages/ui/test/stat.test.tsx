import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Stat, StatDelta, StatLabel, StatSparkline, StatUnit, StatValue } from "../src/components/stat";

test("delta speaks its direction and colours by sentiment, honouring inverse", () => {
  render(
    <Stat>
      <StatLabel>故障率</StatLabel>
      <StatValue>
        0.42<StatUnit>%</StatUnit>
      </StatValue>
      <StatDelta data-testid="up" trend="up">+8.2%</StatDelta>
      <StatDelta data-testid="down-good" inverse trend="down">−0.18%</StatDelta>
      <StatDelta data-testid="up-bad" inverse trend="up">+24 ms</StatDelta>
      <StatDelta data-testid="flat">0%</StatDelta>
    </Stat>,
  );
  expect(screen.getByTestId("up")).toHaveTextContent("上升 +8.2%");
  expect(screen.getByTestId("up")).toHaveAttribute("data-sentiment", "positive");
  expect(screen.getByTestId("down-good")).toHaveTextContent("下降 −0.18%");
  expect(screen.getByTestId("down-good")).toHaveAttribute("data-sentiment", "positive");
  expect(screen.getByTestId("up-bad")).toHaveAttribute("data-sentiment", "negative");
  expect(screen.getByTestId("flat")).toHaveTextContent("持平 0%");
  expect(screen.getByTestId("flat")).toHaveAttribute("data-sentiment", "neutral");
});

test("sparkline is decorative unless labelled", () => {
  const { rerender, container } = render(<StatSparkline data={[1, 3, 2, 5]} />);
  const root = container.querySelector("[data-slot=stat-sparkline]");
  expect(root).toHaveAttribute("aria-hidden", "true");
  expect(container.querySelector("path[stroke]")?.getAttribute("d")).toMatch(/^M0\.00 /);

  rerender(<StatSparkline data={[1, 3, 2, 5]} label="近 4 周上升" />);
  expect(screen.getByRole("img", { name: "近 4 周上升" })).toBeInTheDocument();
});
