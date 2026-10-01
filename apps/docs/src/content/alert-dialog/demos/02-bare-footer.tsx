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

export const meta = { title: "无底色底部", description: "非危险的确认，例如退出登录，用更轻的 bare 底部。" };

export default function Demo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" />}>退出登录</AlertDialogTrigger>
      <AlertDialogPopup className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>退出当前账号？</AlertDialogTitle>
          <AlertDialogDescription>未同步的离线草稿会保留在本机，下次登录后继续同步。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter variant="bare">
          <AlertDialogClose render={<Button variant="ghost" />}>取消</AlertDialogClose>
          <AlertDialogClose render={<Button />}>退出</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  );
}
