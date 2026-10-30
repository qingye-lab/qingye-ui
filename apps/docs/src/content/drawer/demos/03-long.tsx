import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "长内容", titleEn: "Long content" };

const fields = Array.from({ length: 16 }, (_, index) => `条件 ${index + 1}`);

export default function Demo() {
  return <Drawer swipeDirection="right">
    <DrawerTrigger>筛选条件</DrawerTrigger>
    <DrawerPopup className="w-80">
      <DrawerHeader>
        <DrawerTitle>筛选条件</DrawerTitle>
        <DrawerDescription>填写后点击完成。</DrawerDescription>
      </DrawerHeader>
      <DrawerContent>
        {fields.map(name => <Field key={name}><FieldLabel>{name}</FieldLabel><Input /></Field>)}
      </DrawerContent>
      <DrawerFooter><DrawerClose>完成</DrawerClose></DrawerFooter>
    </DrawerPopup>
  </Drawer>;
}
