import { SearchInput } from "@yanqing/ui";

export const meta = { title: "默认", description: "输入后出现清除按钮，按 Esc 也可清空。" };

export default function Demo() {
  return <SearchInput aria-label="搜索订单" className="max-w-xs" defaultValue="退款" placeholder="搜索订单号、客户、商品" />;
}
