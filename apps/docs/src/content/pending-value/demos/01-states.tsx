import { Button } from "@qingye/ui/components/button";
import { PendingValue } from "@qingye/ui/components/pending-value";
export const meta = { title: "保留原值", titleEn: "Original value retained" };
export default function Demo() { return <PendingValue label="值" actions={<Button variant="bordered">核实</Button>}>{0}</PendingValue>; }
