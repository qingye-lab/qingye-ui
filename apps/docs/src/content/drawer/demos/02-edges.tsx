import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Dialog, DialogClose, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Popover, PopoverPopup, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Inline } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "方向与嵌套返回", titleEn: "Edges and nested return" };
// 方向按钮的文字说的是抽屉出现在哪一边，随语言切换；不是 swipeDirection 的属性值本身。
const EDGES = { left: ["左侧", "Left"], right: ["右侧", "Right"], up: ["上方", "Top"], down: ["下方", "Bottom"] } as const;
export default function DrawerDemo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const t = (zh: string, enText: string) => en ? enText : zh;
  return <Inline gap="fields">{(["left", "right", "up", "down"] as const).map(direction => { const name = EDGES[direction][en ? 1 : 0]; return <Drawer key={direction} swipeDirection={direction}><DrawerTrigger>{name}</DrawerTrigger><DrawerPopup><DrawerTitle>{name}</DrawerTitle><DrawerContent><Label htmlFor={`drawer-${direction}`}>{t("输入", "Input")}</Label><Input id={`drawer-${direction}`} /><Popover><PopoverTrigger>{t("补充", "More")}</PopoverTrigger><PopoverPopup>{t("补充内容", "More details")}</PopoverPopup></Popover><Dialog><DialogTrigger>{t("内层", "Inner")}</DialogTrigger><DialogPopup><DialogTitle>{t("内层", "Inner")}</DialogTitle><DialogClose /></DialogPopup></Dialog><DrawerClose /></DrawerContent></DrawerPopup></Drawer>; })}</Inline>;
}
