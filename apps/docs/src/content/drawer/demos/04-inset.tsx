import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "悬浮式", titleEn: "Inset" };
const EDGES = [["right", "右侧"], ["left", "左侧"], ["up", "上方"], ["down", "下方"]] as const;
export default function DrawerDemo() {
  return <Inline gap="fields">{EDGES.map(([direction, name]) => <Drawer key={direction} swipeDirection={direction}>
    <DrawerTrigger>{name}</DrawerTrigger>
    <DrawerPopup inset className={direction === "left" || direction === "right" ? "w-80" : undefined}>
      <DrawerHeader><DrawerTitle>筛选条件</DrawerTitle><DrawerDescription>面板四边离开视口，关闭、滑动与焦点返回与贴边时相同。</DrawerDescription></DrawerHeader>
      <DrawerContent>{Array.from({ length: 6 }, (_, index) => <p key={index} className="m-0 text-body">条件 {index + 1}</p>)}</DrawerContent>
      <DrawerFooter><DrawerClose>完成</DrawerClose></DrawerFooter>
    </DrawerPopup>
  </Drawer>)}</Inline>;
}
