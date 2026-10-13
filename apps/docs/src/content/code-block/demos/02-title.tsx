import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "文件名标题栏", titleEn: "File-name title bar" } satisfies DemoMeta;
export default function Demo() {
  return <CodeBlock title="values.js" code={'const values = [0, null];\n\nfunction getValue(index) {\n  return values[index];\n}\n'} />;
}
