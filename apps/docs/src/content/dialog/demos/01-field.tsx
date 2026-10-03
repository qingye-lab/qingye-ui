import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "对话框与字段", titleEn: "Dialog with a field" };

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger>编辑名称</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>编辑名称</DialogTitle>
          <DialogDescription>最多 20 个字。</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" maxLength={20} /></Field>
        </DialogPanel>
        <DialogFooter><DialogClose>关闭</DialogClose></DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
