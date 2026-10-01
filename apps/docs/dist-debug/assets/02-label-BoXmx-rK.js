const _02Label = 'import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@yanqing/ui";\n\nexport const meta = { title: "标签与数值", description: "标签和数值放在轨道上方的一行，两端对齐。" };\n\nexport default function Demo() {\n  return (\n    <Progress className="max-w-sm" value={64}>\n      <div className="flex items-center justify-between gap-2">\n        <ProgressLabel>导出订单数据</ProgressLabel>\n        <ProgressValue />\n      </div>\n      <ProgressTrack>\n        <ProgressIndicator />\n      </ProgressTrack>\n    </Progress>\n  );\n}\n';
export {
  _02Label as default
};
