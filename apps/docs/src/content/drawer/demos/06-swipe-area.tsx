import { Drawer, DrawerClose, DrawerPopup, DrawerPrimitive, DrawerTitle, DrawerTrigger } from "@qingye_lab/ui/components/drawer";
export const meta = { title: "边缘滑出", titleEn: "Swipe from the edge" };
// DrawerPrimitive.SwipeArea 是一条看不见的边缘热区：swipeDirection="left" 的抽屉在左边，热区默认在相反方向的手势上——
// 从左缘向右拖动即可拉出。热区本身不画任何东西，需要调用方给它位置与宽度；
// 这里贴着视口左缘、宽 --qy-space-4（预设，足够指尖或指针命中又不盖住页面内容）。它不是控件，不进入 Tab 序列，所以仍保留可见的触发器。
export default function DrawerDemo() {
  return <Drawer swipeDirection="left">
    <DrawerPrimitive.SwipeArea className="fixed inset-y-0 left-0 w-(--qy-space-4)" />
    <DrawerTrigger>打开导航</DrawerTrigger>
    <DrawerPopup className="w-72"><DrawerTitle>导航</DrawerTitle><DrawerClose>关闭</DrawerClose></DrawerPopup>
  </Drawer>;
}
