const _02Variants = 'import { CopyButton } from "@yanqing/ui";\n\nexport const meta = { title: "样式与尺寸", description: "透传 Button 的 variant 与 size；icon-* 尺寸只显示图标。" };\n\nexport default function Demo() {\n  return (\n    <>\n      <CopyButton size="sm" value="SO-20260930-0042" variant="ghost" />\n      <CopyButton value="SO-20260930-0042" variant="secondary" />\n      <CopyButton size="lg" value="SO-20260930-0042" variant="default" />\n      <CopyButton copyLabel="复制订单号" size="icon-sm" value="SO-20260930-0042" variant="ghost" />\n      <CopyButton copyLabel="复制订单号" size="icon" value="SO-20260930-0042" />\n    </>\n  );\n}\n';
export {
  _02Variants as default
};
