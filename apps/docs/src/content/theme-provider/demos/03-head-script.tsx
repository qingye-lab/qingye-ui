import { themeScript } from "@qingye_lab/ui/components/theme-provider";

export const meta = {
  title: "防闪烁脚本",
  description:
    "防闪烁脚本放在 <head> 中的样式表之前，参数与 ThemeProvider 一致。",
};

export default function Demo() {
  return (
    <pre className="w-full max-w-xl overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-muted p-4 font-mono text-muted-foreground text-caption leading-relaxed [font-variant-ligatures:none]">
      {`<script>${themeScript({ storageKey: "yq-theme" })}</script>`}
    </pre>
  );
}
