const n=`import { Button } from "@qingye/ui/components/button";
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@qingye/ui/components/menu";
import { ChevronDownIcon } from "lucide-react";

export const meta = { title: "悬停打开", description: "openOnHover 适合顶部导航；触屏上仍然点击打开。" };

const products = ["设备管理", "工单中心", "数据看板", "开放平台"];

export default function Demo() {
  return (
    <Menu>
      <MenuTrigger openOnHover render={<Button variant="ghost" />}>
        产品
        <ChevronDownIcon />
      </MenuTrigger>
      <MenuPopup align="start" className="w-40">
        {products.map((product) => (
          <MenuItem key={product}>{product}</MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  );
}
`;export{n as default};
