import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
export const meta = { title: "边缘工作面", titleEn: "Edge workspace" };
export default function DrawerDemo() {
  return <Drawer swipeDirection="right">
    <DrawerTrigger>编辑名称</DrawerTrigger>
    <DrawerPopup className="w-80 content-start">
      <DrawerTitle>编辑名称</DrawerTitle>
      <DrawerContent className="content-start">
        <Field><FieldLabel>名称</FieldLabel><Input /></Field>
        <DrawerClose />
      </DrawerContent>
    </DrawerPopup>
  </Drawer>;
}
