import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "已高亮的内容", titleEn: "Highlighted content" } satisfies DemoMeta;
const code = 'const values = [0, null];\n\n// 取第 index 项\nfunction getValue(index) {\n  return values[index];\n}\n';
export default function Demo() {
  return <CodeBlock title="values.js" code={code} wrap>
    <span className="text-info-foreground">const</span> values = [<span className="text-warning-foreground">0</span>, <span className="text-warning-foreground">null</span>];{"\n\n"}
    <span className="text-muted-foreground">{"// 取第 index 项"}</span>{"\n"}
    <span className="text-info-foreground">function</span> <span className="text-success-foreground">getValue</span>(index) {"{"}{"\n  "}
    <span className="text-info-foreground">return</span> values[index];{"\n"}
    {"}"}{"\n"}
  </CodeBlock>;
}
