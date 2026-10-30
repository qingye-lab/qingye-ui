import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "长内容", titleEn: "Long content" };

const fields = Array.from({ length: 14 }, (_, index) => `设备 ${index + 1}`);

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger>重命名设备</DialogTrigger>
      <DialogPopup className="max-h-[min(32rem,100%)] w-96">
        <DialogHeader>
          <DialogTitle>重命名设备</DialogTitle>
          <DialogDescription>名称最多 20 个字。</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          {fields.map(name => <Field key={name}><FieldLabel>{name}</FieldLabel><Input defaultValue={name} maxLength={20} /></Field>)}
        </DialogPanel>
        <DialogFooter><DialogClose>完成</DialogClose></DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
