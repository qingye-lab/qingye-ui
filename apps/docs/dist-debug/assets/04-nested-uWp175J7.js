const o=`import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "嵌套对话框",
  description: "子对话框打开时，父级自动缩小后退；Esc 只关闭最上层。",
};

const details = [
  ["设备名称", "仓库 3 号扫码枪"],
  ["序列号", "YQ-SC-20391"],
  ["负责人", "周以宁"],
];

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>设备详情</DialogTrigger>
      <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>设备详情</DialogTitle>
          <DialogDescription>最近一次上报：今天 09:42</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-3 text-sm">
          {details.map(([label, value]) => (
            <div className="flex justify-between gap-4" key={label}>
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>关闭</DialogClose>
          <Dialog>
            <DialogTrigger render={<Button variant="outline" />}>重命名</DialogTrigger>
            <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
              <DialogHeader>
                <DialogTitle>重命名设备</DialogTitle>
                <DialogDescription>名称会显示在设备列表和告警通知中。</DialogDescription>
              </DialogHeader>
              <DialogPanel>
                <Field>
                  <FieldLabel>新名称</FieldLabel>
                  <Input defaultValue="仓库 3 号扫码枪" />
                </Field>
              </DialogPanel>
              <DialogFooter>
                <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
                <DialogClose render={<Button />}>保存</DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Dialog>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
`;export{o as default};
