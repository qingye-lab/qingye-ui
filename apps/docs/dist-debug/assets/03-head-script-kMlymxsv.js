const e=`import { themeScript } from "@qingye/ui/components/theme-provider";

export const meta = {
  title: "防闪烁脚本",
  description:
    "themeScript() 生成的源码，放进 index.html 的 <head>、样式表之前；参数与 ThemeProvider 保持一致。",
};

export default function Demo() {
  return (
    <pre className="w-full max-w-xl overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-muted p-4 font-mono text-muted-foreground text-xs leading-relaxed [font-variant-ligatures:none]">
      {\`<script>\${themeScript({ storageKey: "yq-theme" })}<\/script>\`}
    </pre>
  );
}
`;export{e as default};
