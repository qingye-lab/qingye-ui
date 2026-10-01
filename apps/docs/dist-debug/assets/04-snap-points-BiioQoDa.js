const e=`import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerDescription, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";

export const meta = {
  title: "吸附高度",
  description: "snapPoints 让抽屉先停在半屏预览，向上拖动展开到全高。",
};

const devices = Array.from({ length: 24 }, (_, index) => ({
  id: \`YQ-SC-\${20391 + index}\`,
  online: index % 5 !== 3,
}));

export default function Demo() {
  return (
    <Drawer snapPoints={["320px", 1]} snapToSequentialPoints>
      <DrawerTrigger render={<Button variant="outline" />}>附近设备</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>附近设备</DrawerTitle>
          <DrawerDescription>向上拖动查看全部 24 台设备。</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <ul className="grid gap-2">
            {devices.map((device) => (
              <li className="flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm" key={device.id}>
                <span className="numeric font-medium">{device.id}</span>
                <Badge variant={device.online ? "success" : "outline"}>{device.online ? "在线" : "离线"}</Badge>
              </li>
            ))}
          </ul>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}
`;export{e as default};
