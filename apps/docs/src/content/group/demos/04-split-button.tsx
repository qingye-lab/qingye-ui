import { Button } from "@yanqing/ui/components/button";
import { Group, GroupSeparator } from "@yanqing/ui/components/group";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@yanqing/ui/components/menu";
import { ChevronDownIcon } from "lucide-react";

export const meta = { title: "拆分按钮", description: "主操作加一个展开更多选项的菜单。" };

export default function Demo() {
  return (
    <Group aria-label="合并方式">
      <Button>合并请求</Button>
      <GroupSeparator className="bg-primary-foreground/24" />
      <Menu>
        <MenuTrigger render={<Button aria-label="选择合并方式" size="icon" />}>
          <ChevronDownIcon />
        </MenuTrigger>
        <MenuPopup align="end">
          <MenuItem>创建合并提交</MenuItem>
          <MenuItem>压缩后合并</MenuItem>
          <MenuItem>变基后合并</MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  );
}
