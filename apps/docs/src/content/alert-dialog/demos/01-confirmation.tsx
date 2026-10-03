import { useId, useState } from "react";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye/ui/components/alert-dialog";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "确认与返回", titleEn: "Confirmation and return" };

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("青野");
  const consequenceId = useId();

  return (
    <div className="grid w-full max-w-sm gap-(--qy-panel-gap)">
      <Field><FieldLabel>备注</FieldLabel><Input value={value} onValueChange={setValue} /></Field>
      <p id={consequenceId} className="text-support text-muted-foreground">清空后，输入内容无法恢复。</p>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger render={<Button variant="bordered" tone="danger" aria-describedby={consequenceId} />} className="justify-self-start">清空输入</AlertDialogTrigger>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>清空输入？</AlertDialogTitle>
            <AlertDialogDescription id={`${consequenceId}-popup`}>当前备注将被清空。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="bordered" />}>返回</AlertDialogClose>
            <Button tone="danger" aria-describedby={`${consequenceId}-popup`} onClick={() => { setValue(""); setOpen(false); }}>清空输入</Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </div>
  );
}
