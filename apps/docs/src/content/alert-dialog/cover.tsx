import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, AlertDialogTrigger } from "@qingye_lab/ui/components/alert-dialog";
import { Button } from "@qingye_lab/ui/components/button";

export default function Cover() {
  return <AlertDialog>
    <AlertDialogTrigger render={<Button variant="bordered" tone="danger" />}>清空输入</AlertDialogTrigger>
    <AlertDialogPopup>
      <AlertDialogHeader><AlertDialogTitle>清空输入？</AlertDialogTitle><AlertDialogDescription>当前备注将被清空，无法恢复。</AlertDialogDescription></AlertDialogHeader>
      <AlertDialogFooter><AlertDialogClose render={<Button variant="bordered" />}>返回</AlertDialogClose><AlertDialogClose render={<Button tone="danger" />}>清空输入</AlertDialogClose></AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialog>;
}
