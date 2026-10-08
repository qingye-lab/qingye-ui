import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Dialog, DialogClose, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { AlertDialog, AlertDialogClose, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";

export default function DialogsReview() {
  const [choice, setChoice] = useState("未选择");
  return (
    <section id="dialogs-review" className="border-t border-border py-(--qy-section-gap)">
      <h2 className="text-heading text-foreground">Dialog · AlertDialog</h2>
      <div className="mt-(--qy-field-group-gap) grid grid-cols-2 items-start gap-(--qy-panel-gap)">
        <div className="flex gap-(--qy-action-gap)">
          <Dialog>
            <DialogTrigger render={<Button variant="bordered" />}>打开对话框</DialogTrigger>
            <DialogPopup>
              <DialogHeader><DialogTitle>Dialog</DialogTitle></DialogHeader>
              <DialogPanel><Field><FieldLabel>名称</FieldLabel><Input defaultValue="青野" /></Field></DialogPanel>
              <DialogFooter><DialogClose render={<Button variant="quiet" />}>关闭</DialogClose></DialogFooter>
            </DialogPopup>
          </Dialog>
          <Dialog><DialogTrigger disabled render={<Button variant="bordered" disabled />}>禁用</DialogTrigger></Dialog>
        </div>
        <div className="flex items-center gap-(--qy-action-gap)">
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="bordered" />}>打开确认框</AlertDialogTrigger>
            <AlertDialogPopup>
              <AlertDialogHeader><AlertDialogTitle>确认选择</AlertDialogTitle></AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose render={<Button variant="quiet" />} onClick={() => setChoice("取消")}>取消</AlertDialogClose>
                <AlertDialogClose render={<Button />} onClick={() => setChoice("确认")}>确认</AlertDialogClose>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog>
          <p role="status" className="text-support text-foreground">{choice}</p>
        </div>
      </div>
    </section>
  );
}
