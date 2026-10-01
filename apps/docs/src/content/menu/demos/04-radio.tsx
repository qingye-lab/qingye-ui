import { Button } from "@qingye/ui/components/button";
import { Menu, MenuGroup, MenuGroupLabel, MenuPopup, MenuRadioGroup, MenuRadioItem, MenuTrigger } from "@qingye/ui/components/menu";
import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";

export const meta = { title: "单选项", description: "MenuRadioGroup 中只能选中一项，适合排序、视图切换。" };

const options = [
  { value: "updated", label: "最近更新" },
  { value: "created", label: "创建时间" },
  { value: "priority", label: "优先级" },
  { value: "assignee", label: "负责人" },
];

export default function Demo() {
  const [sort, setSort] = useState("updated");
  const current = options.find((option) => option.value === sort)?.label;

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        <ArrowDownUpIcon />
        {current}
      </MenuTrigger>
      <MenuPopup align="start" className="w-44">
        <MenuGroup>
          <MenuGroupLabel>排序方式</MenuGroupLabel>
          <MenuRadioGroup onValueChange={setSort} value={sort}>
            {options.map((option) => (
              <MenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </MenuRadioItem>
            ))}
          </MenuRadioGroup>
        </MenuGroup>
      </MenuPopup>
    </Menu>
  );
}
