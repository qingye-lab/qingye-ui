import { MenuItem, MenuPopup } from "@qingye/ui/components/menu";
import { MenuSeparator } from "@qingye/ui/components/menu";
import { Button } from "@qingye/ui/components/button";
import { Menu, MenuTrigger } from "@qingye/ui/components/menu";
import { ButtonGroup, ButtonGroupSeparator } from "@qingye/ui";
import { ChevronDownIcon, CopyIcon, FileDownIcon, SendIcon } from "lucide-react";

export const meta = { title: "拆分按钮", description: "主操作旁附一个展开更多选项的菜单。" };

export default function Demo() {
  return (
    <>
      <ButtonGroup aria-label="发布">
        <Button>
          <SendIcon />
          发布
        </Button>
        <ButtonGroupSeparator />
        <Menu>
          <MenuTrigger render={<Button aria-label="更多发布选项" size="icon" />}>
            <ChevronDownIcon />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem>定时发布…</MenuItem>
            <MenuItem>发布到测试环境</MenuItem>
            <MenuSeparator />
            <MenuItem>保存为草稿</MenuItem>
          </MenuPopup>
        </Menu>
      </ButtonGroup>
      <ButtonGroup aria-label="导出">
        <Button variant="outline">
          <FileDownIcon />
          导出 Excel
        </Button>
        <Menu>
          <MenuTrigger render={<Button aria-label="更多导出格式" size="icon" variant="outline" />}>
            <ChevronDownIcon />
          </MenuTrigger>
          <MenuPopup align="end">
            <MenuItem>导出 CSV</MenuItem>
            <MenuItem>导出 PDF</MenuItem>
            <MenuSeparator />
            <MenuItem>
              <CopyIcon />
              复制为表格
            </MenuItem>
          </MenuPopup>
        </Menu>
      </ButtonGroup>
    </>
  );
}
