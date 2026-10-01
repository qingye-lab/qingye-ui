import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = {
  title: "输入名称确认删除",
  description: "影响面很大的删除，要求输入名称后才能确认，避免误操作。",
};

const project = "华东仓储";

export default function Demo() {
  const [value, setValue] = useState("");

  return (
    <Dialog onOpenChange={(open) => !open && setValue("")}>
      <DialogTrigger render={<Button variant="destructive-outline" />}>删除项目</DialogTrigger>
      <DialogPopup className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>删除“{project}”项目</DialogTitle>
          <DialogDescription>
            项目下的 42 台设备、318 张工单和全部报表将被永久删除，且无法恢复。
          </DialogDescription>
        </DialogHeader>
        <DialogPanel>
          <Field>
            <FieldLabel>输入项目名称以确认</FieldLabel>
            <Input
              autoComplete="off"
              onChange={(event) => setValue(event.target.value)}
              placeholder={project}
              value={value}
            />
          </Field>
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <DialogClose disabled={value !== project} render={<Button variant="destructive" />}>
            永久删除
          </DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
