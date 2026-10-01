import {
  Button,
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@yanqing/ui";

export const meta = { title: "基础用法", description: "默认从底部滑出，showBar 显示拖动手柄，向下拖动即可关闭。" };

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>扫码结果</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader className="text-center">
          <DrawerTitle>已识别设备 YQ-SC-20391</DrawerTitle>
          <DrawerDescription>仓库 3 号扫码枪 · 华东仓储 · 在线</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter variant="bare" className="sm:justify-center">
          <DrawerClose render={<Button variant="outline" />}>继续扫码</DrawerClose>
          <DrawerClose render={<Button />}>查看设备</DrawerClose>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
