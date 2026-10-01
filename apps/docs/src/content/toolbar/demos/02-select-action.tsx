import { Button } from "@yanqing/ui/components/button";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@yanqing/ui/components/select";
import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarSeparator } from "@yanqing/ui/components/toolbar";
import { Redo2Icon, Undo2Icon } from "lucide-react";

export const meta = {
  title: "下拉与主操作",
  description: "SelectTrigger 与 Button 同样通过 render 接入键盘漫游；用 ms-auto 把主操作推到末端。",
};

const fonts = [
  { label: "思源黑体", value: "source-han-sans" },
  { label: "思源宋体", value: "source-han-serif" },
  { label: "霞鹜文楷", value: "lxgw-wenkai" },
];

export default function Demo() {
  return (
    <Toolbar aria-label="文档工具" className="w-full max-w-md">
      <ToolbarGroup>
        <ToolbarButton aria-label="撤销" render={<Button size="icon" variant="ghost" />}>
          <Undo2Icon />
        </ToolbarButton>
        <ToolbarButton aria-label="重做" disabled render={<Button size="icon" variant="ghost" />}>
          <Redo2Icon />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Select defaultValue="source-han-sans" items={fonts}>
        <ToolbarButton
          render={
            <SelectTrigger aria-label="字体" className="w-auto min-w-28">
              <SelectValue />
            </SelectTrigger>
          }
        />
        <SelectPopup>
          {fonts.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <ToolbarButton className="ms-auto" render={<Button />}>
        发布
      </ToolbarButton>
    </Toolbar>
  );
}
