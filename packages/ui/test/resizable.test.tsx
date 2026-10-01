import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef } from "react";
import { expect, test, vi } from "vitest";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  type ResizablePanelHandle,
} from "../src/components/resizable";

function sizes(): number[] {
  return screen
    .getAllByTestId("resizable-panel")
    .map((node) => Number.parseFloat((node as HTMLElement).style.flex.split(" ")[0] ?? "0"));
}

function renderGroup(props: {
  onLayout?: (sizes: number[]) => void;
  panels?: Array<{ defaultSize?: number; minSize?: number; maxSize?: number; collapsible?: boolean; collapsedSize?: number }>;
  handles?: Array<{ withHandle?: boolean; disabled?: boolean; "aria-label"?: string }>;
}) {
  const panels = props.panels ?? [{ defaultSize: 50 }, { defaultSize: 50 }];
  return render(
    <ResizablePanelGroup onLayout={props.onLayout}>
      {panels.map((panel, index) => (
        <span key={index}>
          <ResizablePanel {...panel} data-testid="resizable-panel" />
          {index < panels.length - 1 ? (
            <ResizableHandle
              aria-label="调整面板大小"
              data-testid="resizable-handle"
              {...(props.handles?.[index] ?? {})}
            />
          ) : null}
        </span>
      ))}
    </ResizablePanelGroup>,
  );
}

test("defaults fill the group and report a layout", () => {
  const onLayout = vi.fn();
  renderGroup({ onLayout, panels: [{ defaultSize: 30 }, {}, {}] });
  expect(sizes()).toEqual([30, 35, 35]);
  expect(onLayout).toHaveBeenLastCalledWith([30, 35, 35]);
});

test("exposes the separator as a window splitter", () => {
  renderGroup({ panels: [{ defaultSize: 30 }, { defaultSize: 70 }] });
  const handle = screen.getByRole("separator", { name: "调整面板大小" });
  expect(handle).toHaveAttribute("aria-orientation", "vertical");
  expect(handle).toHaveAttribute("aria-valuenow", "30");
  expect(handle).toHaveAttribute("aria-valuemin", "0");
  expect(handle).toHaveAttribute("aria-valuemax", "100");
  expect(handle).toHaveAttribute("tabindex", "0");
});

test("arrow keys move the separator and Home and End reach the limits", async () => {
  const user = userEvent.setup();
  renderGroup({
    panels: [
      { defaultSize: 40, minSize: 20, maxSize: 60 },
      { defaultSize: 60 },
    ],
  });
  const handle = screen.getByRole("separator");
  handle.focus();

  await user.keyboard("{ArrowRight}");
  expect(sizes()).toEqual([45, 55]);
  await user.keyboard("{ArrowLeft}{ArrowLeft}");
  expect(sizes()).toEqual([35, 65]);
  await user.keyboard("{Home}");
  expect(sizes()).toEqual([20, 80]);
  await user.keyboard("{End}");
  expect(sizes()).toEqual([60, 40]);
});

test("a panel at its minimum pushes the next panel instead", async () => {
  const user = userEvent.setup();
  renderGroup({
    panels: [
      { defaultSize: 20, minSize: 20 },
      { defaultSize: 40 },
      { defaultSize: 40 },
    ],
  });
  screen.getAllByRole("separator")[0]?.focus();
  await user.keyboard("{End}");
  // End expands the panel before the focused handle to its maximum. The space
  // is taken from the panels after it, nearest first, each stopping at its own
  // minimum; the total is conserved.
  expect(sizes()).toEqual([100, 0, 0]);
  expect(sizes().reduce((a, b) => a + b, 0)).toBeCloseTo(100, 5);

  screen.getAllByRole("separator")[0]?.focus();
  await user.keyboard("{ArrowLeft}");
  await user.keyboard("{ArrowLeft}");
  await user.keyboard("{ArrowLeft}");
  await user.keyboard("{ArrowLeft}");
  expect(sizes()).toEqual([80, 20, 0]);
  expect(sizes().reduce((a, b) => a + b, 0)).toBeCloseTo(100, 5);
});

test("collapsing snaps past half the minimum and Enter toggles it", async () => {
  const user = userEvent.setup();
  const onCollapse = vi.fn();
  const onExpand = vi.fn();
  render(
    <ResizablePanelGroup>
      <ResizablePanel collapsedSize={0} collapsible defaultSize={30} data-testid="resizable-panel" minSize={20} onCollapse={onCollapse} onExpand={onExpand} />
      <ResizableHandle aria-label="调整大小" data-testid="resizable-handle" />
      <ResizablePanel data-testid="resizable-panel" />
    </ResizablePanelGroup>,
  );

  const handle = screen.getByRole("separator", { name: "调整大小" });
  handle.focus();
  // End drives the panel to its maximum, not its minimum.
  await user.keyboard("{End}");
  expect(sizes()).toEqual([100, 0]);

  // Enter collapses the panel outright, taking its share back to zero.
  await user.keyboard("{Enter}");
  expect(sizes()).toEqual([0, 100]);
  expect(onCollapse).toHaveBeenCalled();

  // Enter again restores the size it had before collapsing.
  await user.keyboard("{Enter}");
  expect(sizes()).toEqual([100, 0]);
  expect(onExpand).toHaveBeenCalled();
});

test("a non-collapsible panel stays at its minimum", async () => {
  const user = userEvent.setup();
  renderGroup({
    panels: [
      { defaultSize: 30, minSize: 25 },
      { defaultSize: 70 },
    ],
  });
  const handle = screen.getByRole("separator");
  handle.focus();
  await user.keyboard("{Home}");
  expect(sizes()).toEqual([25, 75]);
});

test("a disabled handle is skipped by the keyboard and the tab order", () => {
  renderGroup({
    panels: [{ defaultSize: 50 }, { defaultSize: 50 }],
    handles: [{ disabled: true }],
  });
  const handle = screen.getByRole("separator");
  expect(handle).toHaveAttribute("data-disabled");
  expect(handle).toHaveAttribute("tabindex", "-1");
});

test("a vertical group swaps the arrow keys", async () => {
  const user = userEvent.setup();
  render(
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={40} data-testid="resizable-panel" />
      <ResizableHandle aria-label="调整高度" data-testid="resizable-handle" />
      <ResizablePanel defaultSize={60} data-testid="resizable-panel" />
    </ResizablePanelGroup>,
  );
  const handle = screen.getByRole("separator", { name: "调整高度" });
  expect(handle).toHaveAttribute("aria-orientation", "horizontal");
  handle.focus();
  await user.keyboard("{ArrowDown}");
  expect(sizes()).toEqual([45, 55]);
  await user.keyboard("{ArrowRight}");
  expect(sizes()).toEqual([45, 55]);
});

test("panelRef drives collapse, expand and resize", async () => {
  const user = userEvent.setup();
  function Harness() {
    const side = useRef<ResizablePanelHandle>(null);
    return (
      <div>
        <button onClick={() => side.current?.collapse()} type="button">
          收起
        </button>
        <button onClick={() => side.current?.expand()} type="button">
          展开
        </button>
        <button onClick={() => side.current?.resize(40)} type="button">
          40
        </button>
        <ResizablePanelGroup>
          <ResizablePanel
            collapsedSize={0}
            collapsible
            defaultSize={30}
            data-testid="resizable-panel"
            minSize={20}
            panelRef={side}
          />
          <ResizableHandle aria-label="调整大小" data-testid="resizable-handle" />
          <ResizablePanel data-testid="resizable-panel" />
        </ResizablePanelGroup>
      </div>
    );
  }
  render(<Harness />);

  await user.click(screen.getByRole("button", { name: "收起" }));
  expect(sizes()).toEqual([0, 100]);
  await user.click(screen.getByRole("button", { name: "展开" }));
  expect(sizes()).toEqual([30, 70]);
  await user.click(screen.getByRole("button", { name: "40" }));
  expect(sizes()).toEqual([40, 60]);
});

test("four panels keep the total stable while dragging", async () => {
  const user = userEvent.setup();
  renderGroup({
    panels: [{ defaultSize: 25 }, { defaultSize: 25 }, { defaultSize: 25 }, { defaultSize: 25 }],
    handles: [
      { "aria-label": "第一条" },
      { "aria-label": "第二条" },
      { "aria-label": "第三条" },
    ],
  });
  const handle = screen.getByRole("separator", { name: "第二条" });
  handle.focus();
  await user.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");
  const current = sizes();
  expect(current.reduce((total, size) => total + size, 0)).toBeCloseTo(100, 5);
  expect(current[1]).toBe(40);
});
