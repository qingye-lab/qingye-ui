import { buttonVariants } from "@qingye/ui/components/button";
import { ExternalLinkIcon } from "lucide-react";

export const meta = { title: "链接", titleEn: "Links" };

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-(--qy-action-gap)">
      <a className={buttonVariants({ variant: "quiet" })} href="/docs/button">按钮文档</a>
      <a className={buttonVariants({ variant: "bordered" })} href="/design.md" rel="noreferrer" target="_blank">
        设计指南<ExternalLinkIcon aria-hidden="true" />
      </a>
    </div>
  );
}
