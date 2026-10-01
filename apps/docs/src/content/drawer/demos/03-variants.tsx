import {
  Button,
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@yanqing/ui";

export const meta = {
  title: "样式变体",
  description: "inset 在宽屏下与屏幕边缘留出间距；straight 去掉圆角，适合贴边的导航。",
};

const items = [
  { variant: "inset", position: "right", label: "内嵌 · 右侧" },
  { variant: "inset", position: "bottom", label: "内嵌 · 底部" },
  { variant: "straight", position: "left", label: "直角 · 左侧" },
  { variant: "straight", position: "bottom", label: "直角 · 底部" },
] as const;

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map(({ variant, position, label }) => (
        <Drawer key={label} position={position}>
          <DrawerTrigger render={<Button variant="outline" />}>{label}</DrawerTrigger>
          <DrawerPopup showBar variant={variant}>
            <DrawerHeader>
              <DrawerTitle>同步状态</DrawerTitle>
              <DrawerDescription>最近一次同步：今天 10:18，共 2,306 条记录。</DrawerDescription>
            </DrawerHeader>
            <DrawerPanel className="text-muted-foreground text-sm">
              离线期间产生的扫码记录会在网络恢复后自动上传。
            </DrawerPanel>
          </DrawerPopup>
        </Drawer>
      ))}
    </div>
  );
}
