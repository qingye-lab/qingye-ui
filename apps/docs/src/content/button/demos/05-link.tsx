import { buttonVariants } from "@qingye/ui/components/button";
import { ChevronLeftIcon, ExternalLinkIcon } from "lucide-react";

export const meta = {
  title: "作为链接",
  description: "导航使用真正的 a 或路由 Link，配合 buttonVariants 复用按钮外观，保留链接语义与浏览器操作。",
};

export default function Demo() {
  return (
    <>
      <a className={buttonVariants({ variant: "link" })} href="#orders">
        <ChevronLeftIcon aria-hidden="true" />
        返回订单列表
      </a>
      <a
        className={buttonVariants({ variant: "outline" })}
        href="https://example.com/help"
        rel="noreferrer"
        target="_blank"
      >
        帮助中心
        <ExternalLinkIcon aria-hidden="true" />
      </a>
    </>
  );
}
