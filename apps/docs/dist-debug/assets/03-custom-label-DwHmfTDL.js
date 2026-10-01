const t=`import { CopyButton } from "@qingye/ui/components/copy-button";

export const meta = { title: "自定义文字", description: "用 children 写明复制的内容。" };

export default function Demo() {
  return <CopyButton value="pnpm add @qingye/ui">复制安装命令</CopyButton>;
}
`;export{t as default};
