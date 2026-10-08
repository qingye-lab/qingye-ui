import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "方向与嵌套返回", titleEn: "Edges and nested return" };
export default function DrawerDemo() {
  return <Inline gap="fields">{(["left", "right", "up", "down"] as const).map(direction => <Drawer key={direction} swipeDirection={direction}><DrawerTrigger>{direction}</DrawerTrigger><DrawerPopup><DrawerTitle>{direction}</DrawerTitle><DrawerContent><Label htmlFor={`drawer-${direction}`}>输入</Label><Input id={`drawer-${direction}`} /><Popover><PopoverTrigger>补充</PopoverTrigger><PopoverPopup>补充内容</PopoverPopup></Popover><Dialog><DialogTrigger>内层</DialogTrigger><DialogPopup><DialogTitle>内层</DialogTitle><DialogClose /></DialogPopup></Dialog><DrawerClose /></DrawerContent></DrawerPopup></Drawer>)}</Inline>;
}
