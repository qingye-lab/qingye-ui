import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Drawer, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useMediaQuery } from "@qingye/ui/hooks/use-media-query";

export const meta = {
  title: "响应式：桌面对话框，移动端抽屉",
  description: "同一份表单，宽屏用 Dialog，窄屏用可拖拽的 Drawer。",
};

const title = "修改收货地址";
const description = "仅影响尚未发货的订单。";

function Fields() {
  return (
    <>
      <Field>
        <FieldLabel>收货人</FieldLabel>
        <Input defaultValue="许清和" />
      </Field>
      <Field>
        <FieldLabel>详细地址</FieldLabel>
        <Input defaultValue="杭州市西湖区文三路 478 号 6 楼" />
      </Field>
    </>
  );
}

export default function Demo() {
  const isMobile = useMediaQuery("max-md");
  const trigger = <Button variant="outline" />;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger render={trigger}>{title}</DrawerTrigger>
        <DrawerPopup showBar>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <DrawerPanel className="grid gap-4" scrollable={false}>
            <Fields />
          </DrawerPanel>
          <DrawerFooter>
            <DrawerClose render={<Button variant="ghost" />}>取消</DrawerClose>
            <DrawerClose render={<Button />}>保存</DrawerClose>
          </DrawerFooter>
        </DrawerPopup>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger render={trigger}>{title}</DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-4">
          <Fields />
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <DialogClose render={<Button />}>保存</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
