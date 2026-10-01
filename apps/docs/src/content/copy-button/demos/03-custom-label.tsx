import { CopyButton } from "@yanqing/ui";

export const meta = { title: "自定义文字", description: "用 children 写明复制的内容。" };

export default function Demo() {
  return <CopyButton value="pnpm add @yanqing/ui">复制安装命令</CopyButton>;
}
