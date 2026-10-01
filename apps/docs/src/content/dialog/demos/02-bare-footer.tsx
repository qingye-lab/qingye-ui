import { Button } from "@qingye/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPopup, DialogTitle, DialogTrigger } from "@qingye/ui/components/dialog";

export const meta = {
  title: "无底色底部",
  description: "内容很短时用 variant=\"bare\"，去掉分隔线和底色，让窗口更轻。",
};

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>导出账单</DialogTrigger>
      <DialogPopup className="sm:max-w-sm" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>导出 9 月账单</DialogTitle>
          <DialogDescription>
            共 1,286 笔交易，生成完成后会发送到 finance@qingye.example。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter variant="bare">
          <DialogClose render={<Button variant="ghost" />}>取消</DialogClose>
          <DialogClose render={<Button />}>开始导出</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
