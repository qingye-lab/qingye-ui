import { Steps } from "@yanqing/ui";
import { CreditCardIcon, PackageCheckIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";

export const meta = { title: "图标与尺寸", description: "icon 替换序号；size=\"sm\" 适合卡片和侧栏。" };

const items = [
  { id: "order", title: "已下单", icon: <ShoppingCartIcon /> },
  { id: "pay", title: "已付款", icon: <CreditCardIcon /> },
  { id: "ship", title: "运输中", icon: <TruckIcon /> },
  { id: "sign", title: "已签收", icon: <PackageCheckIcon /> },
];

export default function Demo() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Steps current={2} items={items} label="订单进度" />
      <Steps current={2} items={items} label="订单进度（小）" size="sm" />
    </div>
  );
}
