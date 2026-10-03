import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StrictMode } from "react";
import { expect, test, vi } from "vitest";
import { FloatingLayerScope, useFloatingLayer, type FloatingLayerRole } from "../src/floating-layer";
import { Dialog, DialogPopup, DialogTitle, DialogTrigger } from "../src/components/dialog";
import { Popover, PopoverPopup, PopoverTrigger } from "../src/components/popover";
import { AlertDialog, AlertDialogPopup, AlertDialogTitle } from "../src/components/alert-dialog";
import { Drawer, DrawerPopup, DrawerTitle } from "../src/components/drawer";

function order(id: string) {
  return Number(document.getElementById(id)!.style.getPropertyValue("--qy-floating-modal-order"));
}
function Layer({ id, layerRole = "surface" }: { id: string; layerRole?: FloatingLayerRole }) { return <div id={id} style={useFloatingLayer(layerRole)} />; }

test("approved independent openings rise above the older modal's still-open owned popup and reopening advances", async () => {
  const fixture = (nextOpen: boolean) => <><Dialog open><DialogPopup viewportProps={{ id: "old-surface" }}><DialogTitle>旧面</DialogTitle><Popover open><PopoverTrigger>候选</PopoverTrigger><PopoverPopup positionerProps={{ id: "old-popup" }}>候选内容</PopoverPopup></Popover></DialogPopup></Dialog><Dialog open={nextOpen}><DialogPopup viewportProps={{ id: "new-surface" }}><DialogTitle>新面</DialogTitle><button>新动作</button></DialogPopup></Dialog></>;
  const { rerender } = render(fixture(false));
  await waitFor(() => expect(order("old-surface")).toBeGreaterThan(0));
  const original = order("old-surface");
  expect(order("old-popup")).toBe(original);
  rerender(fixture(true)); await screen.findByRole("dialog", { name: "新面" });
  await waitFor(() => expect(order("new-surface")).toBeGreaterThan(order("old-popup")));
  const first = order("new-surface");
  rerender(fixture(false)); await waitFor(() => expect(screen.queryByRole("dialog", { name: "新面" })).toBeNull());
  rerender(fixture(true)); await waitFor(() => expect(order("new-surface")).toBeGreaterThan(first));
  expect(order("old-surface")).toBe(original);
});

test("simultaneously active nested scopes settle above parents without StrictMode replay changing settled order", () => {
  const fixture = <StrictMode><FloatingLayerScope><Layer id="parent" /><FloatingLayerScope><Layer id="child" /></FloatingLayerScope></FloatingLayerScope></StrictMode>;
  const { rerender } = render(fixture);
  expect(order("child")).toBeGreaterThan(order("parent"));
  const parent = order("parent"), child = order("child");
  rerender(fixture);
  expect(order("parent")).toBe(parent); expect(order("child")).toBe(child);
});

test("canceled and controlled-rejected open requests do not claim a modal layer", async () => {
  const user = userEvent.setup(); const reject = vi.fn();
  const fixture = (cancel: boolean, open = false) => <Dialog open={open} onOpenChange={(_, details) => { reject(); if (cancel) details.cancel(); }}><Layer id="candidate" layerRole="popup" /><DialogTrigger>打开</DialogTrigger><DialogPopup><DialogTitle>面板</DialogTitle></DialogPopup></Dialog>;
  const { rerender } = render(fixture(true));
  const closed = order("candidate");
  const closedStyle = document.getElementById("candidate")!.style.zIndex;
  await user.click(screen.getByRole("button", { name: "打开" }));
  expect(reject).toHaveBeenCalledOnce(); expect(order("candidate")).toBe(closed);
  expect(screen.queryByRole("dialog")).toBeNull();
  rerender(fixture(false)); await user.click(screen.getByRole("button", { name: "打开" }));
  expect(order("candidate")).toBe(closed); expect(screen.queryByRole("dialog")).toBeNull();
  rerender(fixture(false, true)); await screen.findByRole("dialog", { name: "面板" });
  expect(document.getElementById("candidate")!.style.zIndex).not.toBe(closedStyle);
});

// A JavaScript object can still contain removed fields. The owning Portal must
// enforce the accessible lifecycle rather than only narrowing TypeScript.
const unsupportedRetainedPortal = { id: "retained-request", keepMounted: true };
test.each([
  { name: "Dialog", role: "dialog", popup: (open: boolean) => <Dialog open={open}><DialogPopup portalProps={unsupportedRetainedPortal}><DialogTitle>新面</DialogTitle><button>新动作</button></DialogPopup></Dialog> },
  { name: "AlertDialog", role: "alertdialog", popup: (open: boolean) => <AlertDialog open={open}><AlertDialogPopup portalProps={unsupportedRetainedPortal}><AlertDialogTitle>新面</AlertDialogTitle><button>新动作</button></AlertDialogPopup></AlertDialog> },
  { name: "Drawer", role: "dialog", popup: (open: boolean) => <Drawer open={open}><DrawerPopup portalProps={unsupportedRetainedPortal}><DrawerTitle>新面</DrawerTitle><button>新动作</button></DrawerPopup></Drawer> },
])("$name does not retain closed Portal DOM from an unsupported runtime prop and stays accessible above an older modal", async ({ role, popup }) => {
  const fixture = (open: boolean) => <><Dialog open><DialogPopup><DialogTitle>旧面</DialogTitle><button>旧动作</button></DialogPopup></Dialog>{popup(open)}</>;
  const { rerender } = render(fixture(false));
  expect(document.getElementById("retained-request")).toBeNull();
  rerender(fixture(true));
  expect(await screen.findByRole(role, { name: "新面" })).toBeVisible();
});
