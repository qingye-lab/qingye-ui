import { Button } from "@yanqing/ui/components/button";
import { ChevronLeftIcon, ExternalLinkIcon } from "lucide-react";

export const meta = {
  title: "作为链接",
  description: "导航用 render 渲染为 <a>，并设 nativeButton={false}，保留按钮外观与链接语义。",
};

export default function Demo() {
  return (
    <>
      <Button nativeButton={false} render={<a href="#orders" />} variant="link">
        <ChevronLeftIcon aria-hidden="true" />
        返回订单列表
      </Button>
      <Button
        nativeButton={false}
        render={<a href="https://example.com/help" rel="noreferrer" target="_blank" />}
        variant="outline"
      >
        帮助中心
        <ExternalLinkIcon aria-hidden="true" />
      </Button>
    </>
  );
}
