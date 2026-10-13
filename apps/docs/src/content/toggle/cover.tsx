import { IconItalic } from "@tabler/icons-react";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Toggle } from "@qingye_lab/ui/components/toggle";

export default function Cover() {
  return <Inline><Toggle defaultPressed>加粗</Toggle><Toggle shape="icon" aria-label="斜体"><IconItalic aria-hidden="true" /></Toggle></Inline>;
}
