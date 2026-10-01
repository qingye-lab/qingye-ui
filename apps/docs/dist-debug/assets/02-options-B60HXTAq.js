const e=`import { Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarTrigger } from "@qingye/ui/components/menubar";
import { useState } from "react";

export const meta = { title: "勾选与单选", description: "视图选项用 CheckboxItem，互斥选项用 RadioGroup。" };

export default function Demo() {
  const [rulers, setRulers] = useState(true);
  const [grid, setGrid] = useState(false);
  const [zoom, setZoom] = useState("fit");

  return (
    <div className="flex flex-col items-center gap-3">
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>视图</MenubarTrigger>
          <MenubarContent>
            <MenubarGroup>
              <MenubarLabel>辅助线</MenubarLabel>
              <MenubarCheckboxItem checked={rulers} onCheckedChange={setRulers}>
                显示标尺
              </MenubarCheckboxItem>
              <MenubarCheckboxItem checked={grid} onCheckedChange={setGrid}>
                显示网格
              </MenubarCheckboxItem>
            </MenubarGroup>
            <MenubarSeparator />
            <MenubarGroup>
              <MenubarLabel>缩放</MenubarLabel>
              <MenubarRadioGroup onValueChange={(value) => setZoom(String(value))} value={zoom}>
                <MenubarRadioItem value="fit">适应窗口</MenubarRadioItem>
                <MenubarRadioItem value="100">100%</MenubarRadioItem>
                <MenubarRadioItem value="200">200%</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>排列</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem defaultChecked>吸附到像素</MenubarCheckboxItem>
            <MenubarCheckboxItem>吸附到对象</MenubarCheckboxItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu disabled>
          <MenubarTrigger>插件</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
      <p className="text-muted-foreground text-xs numeric">
        标尺{rulers ? "开" : "关"} · 网格{grid ? "开" : "关"} · 缩放 {zoom === "fit" ? "适应窗口" : \`\${zoom}%\`}
      </p>
    </div>
  );
}
`;export{e as default};
