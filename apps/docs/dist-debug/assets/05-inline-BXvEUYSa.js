const _05Inline = 'import { InlineCode } from "@yanqing/ui";\n\nexport const meta = { title: "行内代码", description: "字号随所在文字缩放，长内容可在行间断开。" };\n\nexport default function Demo() {\n  return (\n    <p className="max-w-md text-pretty text-sm leading-relaxed">\n      安装后在入口样式中加入 <InlineCode>@import "@yanqing/ui/styles.css"</InlineCode>，再用{" "}\n      <InlineCode>ThemeProvider</InlineCode> 包裹应用。需要密集表格时设置{" "}\n      <InlineCode>density="compact"</InlineCode>。\n    </p>\n  );\n}\n';
export {
  _05Inline as default
};
