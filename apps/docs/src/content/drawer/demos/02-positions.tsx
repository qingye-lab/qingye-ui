import { Button } from "@yanqing/ui/components/button";
import { Drawer, DrawerDescription, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@yanqing/ui/components/drawer";

export const meta = { title: "四个方向", description: "position 决定滑入的边和滑动关闭的方向。" };

const positions = [
  { position: "bottom", label: "底部" },
  { position: "top", label: "顶部" },
  { position: "left", label: "左侧" },
  { position: "right", label: "右侧" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {positions.map(({ position, label }) => (
        <Drawer key={position} position={position}>
          <DrawerTrigger render={<Button variant="outline" />}>{label}</DrawerTrigger>
          <DrawerPopup showBar showCloseButton>
            <DrawerHeader>
              <DrawerTitle>快捷设置</DrawerTitle>
              <DrawerDescription>从{label}滑出，向外滑动即可关闭。</DrawerDescription>
            </DrawerHeader>
            <DrawerPanel className="text-muted-foreground text-sm">
              夜间模式、告警声音和自动同步可以在这里快速切换。
            </DrawerPanel>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
