import * as React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "停靠点", titleEn: "Snap points" };
// 停靠点只对 swipeDirection 为 down / up 的抽屉有效（原语限制）。
// 面板须比最高的停靠点更高，所以让它占满视口高度（h-full）；第一个停靠点是初始停靠位置，1 表示全高。
const SNAPS = ["200px", 1] as const;
const names: Record<string, string> = { "200px": "半开", "1": "全开" };
export default function DrawerDemo() {
  const [snap, setSnap] = React.useState<number | string | null>(SNAPS[0]);
  return <Drawer snapPoints={[...SNAPS]} snapPoint={snap} onSnapPointChange={setSnap}>
    <DrawerTrigger>查看明细</DrawerTrigger>
    <DrawerPopup className="h-full">
      <DrawerHeader><DrawerTitle>明细</DrawerTitle></DrawerHeader>
      <DrawerContent>{Array.from({ length: 24 }, (_, index) => <p key={index} className="m-0 text-body">记录 {index + 1}</p>)}</DrawerContent>
      <DrawerFooter><Inline gap="actions"><Button variant="quiet" onClick={() => setSnap(snap === 1 ? SNAPS[0] : 1)}>{snap === 1 ? "收起" : "展开"}（当前{names[String(snap)] ?? "—"}）</Button><DrawerClose>完成</DrawerClose></Inline></DrawerFooter>
    </DrawerPopup>
  </Drawer>;
}
