const e=`import { InlineCode } from "@qingye/ui/components/code-block";

export const meta = { title: "行内代码", description: "字号随所在文字缩放，长内容可在行间断开。" };

export default function Demo() {
  return (
    <p className="max-w-md text-pretty text-sm leading-relaxed">
      安装后在入口样式中加入 <InlineCode>@import "@qingye/ui/styles.css"</InlineCode>，再用{" "}
      <InlineCode>ThemeProvider</InlineCode> 包裹应用。需要密集表格时设置{" "}
      <InlineCode>density="compact"</InlineCode>。
    </p>
  );
}
`;export{e as default};
