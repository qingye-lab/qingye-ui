import { useState } from "react";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "确认与返回", titleEn: "Confirmation and return" };

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("青野");

  return (
    <div className="grid w-full max-w-sm gap-(--qy-panel-gap)">
      <Field><FieldLabel>备注</FieldLabel><Input value={value} onValueChange={setValue} /></Field>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="bordered" tone="danger" />} className="justify-self-start">清空输入</AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>清空输入？</AlertDialogTitle>
            <AlertDialogDescription>当前备注将被清空，无法恢复。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="bordered" />}>返回</AlertDialogClose>
            <Button tone="danger" onClick={() => { setValue(""); setOpen(false); }}>清空输入</Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}
