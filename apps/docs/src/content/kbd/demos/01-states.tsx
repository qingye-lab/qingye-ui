import { Kbd } from "@qingye/ui/components/kbd";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "键位", titleEn: "Keys" };
export default function Demo() { return <Inline><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd aria-label="Command">⌘</Kbd><Kbd>Enter</Kbd></Inline>; }
