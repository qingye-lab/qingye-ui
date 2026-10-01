import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from "@yanqing/ui";

export const meta = { title: "删除确认", description: "不可逆的操作用 destructive 确认按钮，取消放在前面。" };

export default function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive-outline" />}>删除设备</AlertDialogTrigger>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>删除“仓库 3 号扫码枪”？</AlertDialogTitle>
          <AlertDialogDescription>
            设备的 1,024 条扫码记录会一并删除，且无法恢复。设备需要重新绑定才能再次使用。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose render={<Button variant="ghost" />}>取消</AlertDialogClose>
          <AlertDialogClose render={<Button variant="destructive" />}>删除设备</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
