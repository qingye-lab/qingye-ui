import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "限定行数", titleEn: "Limited lines" } satisfies DemoMeta;
const code = Array.from({ length: 30 }, (_, i) => `const value${i + 1} = ${i + 1};`).join("\n") + "\n";
export default function Demo() {
  return <CodeBlock title="values.js" maxLines={8} code={code} />;
}
