import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";

export default function Cover() {
  return <Drawer swipeDirection="right"><DrawerTrigger>编辑</DrawerTrigger><DrawerPopup><DrawerTitle>编辑</DrawerTitle><DrawerContent><DrawerClose /></DrawerContent></DrawerPopup></Drawer>;
}
