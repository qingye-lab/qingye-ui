const n=`import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { EllipsisIcon, PencilIcon, UserPlusIcon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "从菜单打开",
  description: "菜单项只负责切换状态，对话框放在菜单之外，菜单关闭后对话框仍然存在。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Menu>
        <MenuTrigger render={<Button aria-label="项目操作" size="icon" variant="outline" />}>
          <EllipsisIcon />
        </MenuTrigger>
        <MenuPopup align="start">
          <MenuItem onClick={() => setOpen(true)}>
            <UserPlusIcon />
            邀请成员…
          </MenuItem>
          <MenuSeparator />
          <MenuItem>
            <PencilIcon />
            重命名
          </MenuItem>
        </MenuPopup>
      </Menu>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogPopup className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>邀请成员</DialogTitle>
            <DialogDescription>对方接受邀请后即可查看“华东仓储”项目。</DialogDescription>
          </DialogHeader>
          <DialogPanel>
            <Field>
              <FieldLabel>邮箱地址</FieldLabel>
              <Input placeholder="name@company.com" type="email" />
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
            <DialogClose render={<Button />}>发送邀请</DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
    </>
  );
}
`;export{n as default};
