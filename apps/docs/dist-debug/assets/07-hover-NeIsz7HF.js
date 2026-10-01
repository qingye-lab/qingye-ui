const _07Hover = 'import { Button, Menu, MenuItem, MenuPopup, MenuTrigger } from "@yanqing/ui";\nimport { ChevronDownIcon } from "lucide-react";\n\nexport const meta = { title: "悬停打开", description: "openOnHover 适合顶部导航；触屏上仍然点击打开。" };\n\nconst products = ["设备管理", "工单中心", "数据看板", "开放平台"];\n\nexport default function Demo() {\n  return (\n    <Menu>\n      <MenuTrigger openOnHover render={<Button variant="ghost" />}>\n        产品\n        <ChevronDownIcon />\n      </MenuTrigger>\n      <MenuPopup align="start" className="w-40">\n        {products.map((product) => (\n          <MenuItem key={product}>{product}</MenuItem>\n        ))}\n      </MenuPopup>\n    </Menu>\n  );\n}\n';
export {
  _07Hover as default
};
