import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye/ui/components/alert-dialog";
import { Button } from "@qingye/ui/components/button";
import { useState } from "react";

export const meta = {
  title: "异步执行",
  description: "确认后保持打开并显示加载，请求完成再关闭；执行期间禁止取消。",
};

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const revoke = async () => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPending(false);
    setOpen(false);
  };

  return (
    <AlertDialog onOpenChange={(next) => !pending && setOpen(next)} open={open}>
      <AlertDialogTrigger render={<Button variant="outline" />}>撤销访问权限</AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>撤销周以宁的访问权限？</AlertDialogTitle>
          <AlertDialogDescription>
            对方会立即退出“华东仓储”项目，已分配给 TA 的 6 张工单将回到待分配列表。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose disabled={pending} render={<Button variant="ghost" />}>
            取消
          </AlertDialogClose>
          <Button loading={pending} onClick={revoke} variant="destructive">
            撤销权限
          </Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
