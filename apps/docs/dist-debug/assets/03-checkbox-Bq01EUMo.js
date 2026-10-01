const n=`import { Button } from "@qingye/ui/components/button";
import { Menu, MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { Columns3Icon } from "lucide-react";
import { useState } from "react";

export const meta = {
  title: "勾选项",
  description: "MenuCheckboxItem 切换选项且不关闭菜单；variant=\\"switch\\" 显示为开关。",
};

const columns = ["设备编号", "所属仓库", "负责人", "最近上报", "固件版本"];

export default function Demo() {
  const [visible, setVisible] = useState(["设备编号", "所属仓库", "最近上报"]);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <Columns3Icon />
        显示列
      </MenuTrigger>
      <MenuPopup align="start" className="w-52">
        <MenuGroup>
          <MenuGroupLabel>表格列</MenuGroupLabel>
          {columns.map((column) => (
            <MenuCheckboxItem
              checked={visible.includes(column)}
              disabled={column === "设备编号"}
              key={column}
              onCheckedChange={(checked) =>
                setVisible((current) => (checked ? [...current, column] : current.filter((item) => item !== column)))
              }
            >
              {column}
            </MenuCheckboxItem>
          ))}
        </MenuGroup>
        <MenuSeparator />
        <MenuCheckboxItem defaultChecked variant="switch">
          紧凑行高
        </MenuCheckboxItem>
        <MenuCheckboxItem variant="switch">固定首列</MenuCheckboxItem>
      </MenuPopup>
    </Menu>
  );
}
`;export{n as default};
