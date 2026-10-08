import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "状态", titleEn: "States" };
export default function Demo() { return <Inline>{(["online","offline","pending","in-progress","unknown","warning","error"] as const).map(status => <StatusDot key={status} status={status} />)}</Inline>; }
