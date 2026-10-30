import * as React from "react";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogPopup, AlertDialogTitle } from "@qingye_lab/ui/components/alert-dialog";
import { Button } from "@qingye_lab/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "危险命令", titleEn: "Danger command" } satisfies DemoMeta;

export default function Demo() {
  const [confirming, setConfirming] = React.useState(false);
  const [removed, setRemoved] = React.useState(false);
  return <>
    <Menu>
      <MenuTrigger>{removed ? "已移除" : "接入设备"}</MenuTrigger>
      <MenuPortal><MenuPositioner><MenuPopup>
        <MenuItem>重命名</MenuItem>
        <MenuItem>移到首位</MenuItem>
        <MenuSeparator />
        <MenuItem tone="danger" disabled={removed} onClick={() => setConfirming(true)}>移除设备</MenuItem>
      </MenuPopup></MenuPositioner></MenuPortal>
    </Menu>
    <AlertDialog open={confirming} onOpenChange={setConfirming}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>移除接入设备？</AlertDialogTitle>
          <AlertDialogDescription>移除后该设备需要重新配对才能再次接入。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>保留</AlertDialogClose>
          <AlertDialogClose render={<Button tone="danger" />} onClick={() => setRemoved(true)}>移除</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  </>;
}
