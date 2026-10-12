import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "键位", titleEn: "Keys" };
export default function Demo() { return <Inline><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd><span aria-hidden="true">⌘</span><span className="sr-only">Command</span></Kbd><Kbd>Enter</Kbd></Inline>; }
