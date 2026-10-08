import { buttonVariants } from "@qingye_lab/ui/components/button";
import { IconExternalLink } from "@tabler/icons-react";

export const meta = { title: "链接", titleEn: "Links" };

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-(--qy-action-gap)">
      <a className={buttonVariants({ variant: "quiet" })} href="/docs/button">按钮文档</a>
      <a className={buttonVariants({ variant: "bordered" })} href="/design.md" rel="noreferrer" target="_blank">
        设计指南<IconExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
