import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle } from "@yanqing/ui/components/alert-dialog";
import { Button } from "@yanqing/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@yanqing/ui/components/dialog";
import { Field, FieldLabel } from "@yanqing/ui/components/field";
import { Textarea } from "@yanqing/ui/components/textarea";
import { useState } from "react";

export const meta = {
  title: "关闭前确认",
  description: "有未保存内容时拦截关闭（Esc、遮罩、关闭按钮），再用 AlertDialog 确认是否放弃。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [text, setText] = useState("");

  const closeAndReset = () => {
    setConfirmOpen(false);
    setText("");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => (!next && text ? setConfirmOpen(true) : setOpen(next))}
    >
      <DialogTrigger render={<Button variant="outline" />}>发布公告</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>发布团队公告</DialogTitle>
          <DialogDescription>输入内容后尝试关闭窗口。</DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field>
            <FieldLabel>公告内容</FieldLabel>
            <Textarea
              onChange={(event) => setText(event.target.value)}
              placeholder="例如：本周五 18:00 起进行机房例行维护，预计 2 小时。"
              value={text}
            />
          </Field>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <Button disabled={!text} onClick={closeAndReset}>
            发布
          </Button>
        </DialogFooter>
      </DialogPopup>
      <AlertDialog onOpenChange={setConfirmOpen} open={confirmOpen}>
        <AlertDialogPopup>
          <AlertDialogHeader>
            <AlertDialogTitle>放弃这条公告？</AlertDialogTitle>
            <AlertDialogDescription>已输入的内容不会保存。</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="ghost" />}>继续编辑</AlertDialogClose>
            <Button onClick={closeAndReset} variant="destructive">
              放弃
            </Button>
          </AlertDialogFooter>
        </AlertDialogPopup>
      </AlertDialog>
    </Dialog>
  );
}
