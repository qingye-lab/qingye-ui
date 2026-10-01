const _03HeadScript = 'import { themeScript } from "@yanqing/ui";\n\nexport const meta = {\n  title: "防闪烁脚本",\n  description:\n    "themeScript() 生成的源码，放进 index.html 的 <head>、样式表之前；参数与 ThemeProvider 保持一致。",\n};\n\nexport default function Demo() {\n  return (\n    <pre className="w-full max-w-xl overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-muted p-4 font-mono text-muted-foreground text-xs leading-relaxed [font-variant-ligatures:none]">\n      {`<script>${themeScript({ storageKey: "yq-theme" })}<\/script>`}\n    </pre>\n  );\n}\n';
export {
  _03HeadScript as default
};
