import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "原样文本与复制", titleEn: "Literal text and copy" } satisfies DemoMeta;
export default function Demo() {
  return <CodeBlock language="JavaScript" code={'const values = [0, null];\n\nfunction getValue(index) {\n  return values[index];\n}\n'} />;
}
