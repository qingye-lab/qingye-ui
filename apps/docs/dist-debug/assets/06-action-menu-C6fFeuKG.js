const e=`import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerClose, DrawerMenu, DrawerMenuCheckboxItem, DrawerMenuGroup, DrawerMenuGroupLabel, DrawerMenuItem, DrawerMenuRadioGroup, DrawerMenuRadioItem, DrawerMenuSeparator, DrawerPanel, DrawerPopup, DrawerTrigger } from "@qingye/ui/components/drawer";
import { CopyIcon, EllipsisIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react";

export const meta = {
  title: "动作菜单",
  description: "移动端用 DrawerMenu 代替下拉菜单：普通项、勾选、单选、开关和危险操作。",
};

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button aria-label="更多操作" size="icon" variant="outline" />}>
        <EllipsisIcon />
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerPanel>
          <DrawerMenu>
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>工单 #2318</DrawerMenuGroupLabel>
              <DrawerClose render={<DrawerMenuItem />}>
                <PencilIcon />
                编辑
              </DrawerClose>
              <DrawerClose render={<DrawerMenuItem />}>
                <CopyIcon />
                复制链接
              </DrawerClose>
              <DrawerClose render={<DrawerMenuItem />}>
                <Share2Icon />
                转交他人
              </DrawerClose>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerMenuCheckboxItem defaultChecked>关注此工单</DrawerMenuCheckboxItem>
            <DrawerMenuCheckboxItem variant="switch">处理完成后通知我</DrawerMenuCheckboxItem>
            <DrawerMenuSeparator />
            <DrawerMenuGroup>
              <DrawerMenuGroupLabel>优先级</DrawerMenuGroupLabel>
              <DrawerMenuRadioGroup defaultValue="high">
                <DrawerMenuRadioItem value="urgent">紧急</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="high">高</DrawerMenuRadioItem>
                <DrawerMenuRadioItem value="normal">普通</DrawerMenuRadioItem>
              </DrawerMenuRadioGroup>
            </DrawerMenuGroup>
            <DrawerMenuSeparator />
            <DrawerClose render={<DrawerMenuItem variant="destructive" />}>
              <Trash2Icon />
              删除工单
            </DrawerClose>
          </DrawerMenu>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}
`;export{e as default};
