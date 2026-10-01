const _04Indeterminate = 'import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack } from "@yanqing/ui";\n\nexport const meta = {\n  title: "不确定进度",\n  description: "value={null} 时一道光带循环扫过轨道，适合还算不出总量的阶段。",\n};\n\nexport default function Demo() {\n  return (\n    <Progress className="max-w-sm" value={null}>\n      <div className="flex items-center justify-between gap-2">\n        <ProgressLabel>正在准备备份</ProgressLabel>\n        <span className="text-muted-foreground text-sm">计算文件数量…</span>\n      </div>\n      <ProgressTrack>\n        <ProgressIndicator />\n      </ProgressTrack>\n    </Progress>\n  );\n}\n';
export {
  _04Indeterminate as default
};
