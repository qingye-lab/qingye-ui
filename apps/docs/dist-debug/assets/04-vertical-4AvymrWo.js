const n=`import { Button } from "@qingye/ui/components/button";
import { ButtonGroup, ButtonGroupSeparator } from "@qingye/ui";
import { LayersIcon, LocateFixedIcon, MinusIcon, PlusIcon } from "lucide-react";

export const meta = { title: "纵向与嵌套", description: "orientation=\\"vertical\\" 纵向排列；嵌套的按钮组之间自动留出间距。" };

export default function Demo() {
  return (
    <>
      <ButtonGroup aria-label="地图缩放" orientation="vertical">
        <Button aria-label="放大" size="icon" variant="outline">
          <PlusIcon />
        </Button>
        <Button aria-label="缩小" size="icon" variant="outline">
          <MinusIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="地图工具" orientation="vertical">
        <Button aria-label="回到当前位置" size="icon">
          <LocateFixedIcon />
        </Button>
        <ButtonGroupSeparator orientation="horizontal" />
        <Button aria-label="切换图层" size="icon">
          <LayersIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="编辑工具栏">
        <ButtonGroup>
          <Button size="sm" variant="outline">
            撤销
          </Button>
          <Button size="sm" variant="outline">
            重做
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="sm" variant="outline">
            预览
          </Button>
          <Button size="sm" variant="outline">
            分享
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </>
  );
}
`;export{n as default};
