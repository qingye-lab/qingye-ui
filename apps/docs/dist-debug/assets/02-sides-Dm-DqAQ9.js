const _02Sides = 'import { Button, Tooltip, TooltipPopup, TooltipTrigger } from "@yanqing/ui";\n\nexport const meta = { title: "方向", description: "默认在上方；side 指定其他方向，空间不足时自动翻转。" };\n\nconst sides = [\n  { side: "top", label: "上方" },\n  { side: "right", label: "右侧" },\n  { side: "bottom", label: "下方" },\n  { side: "left", label: "左侧" },\n] as const;\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-wrap justify-center gap-2">\n      {sides.map(({ side, label }) => (\n        <Tooltip key={side}>\n          <TooltipTrigger render={<Button variant="outline" />}>{label}</TooltipTrigger>\n          <TooltipPopup side={side}>显示在{label}</TooltipPopup>\n        </Tooltip>\n      ))}\n    </div>\n  );\n}\n';
export {
  _02Sides as default
};
