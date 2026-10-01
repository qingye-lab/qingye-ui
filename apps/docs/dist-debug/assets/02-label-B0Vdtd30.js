const _02Label = 'import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@yanqing/ui";\n\nexport const meta = { title: "标签与数值", description: "MeterValue 默认显示数值在范围内的百分比。" };\n\nexport default function Demo() {\n  return (\n    <Meter className="max-w-sm" value={75}>\n      <div className="flex items-center justify-between gap-2">\n        <MeterLabel>团队席位</MeterLabel>\n        <MeterValue />\n      </div>\n      <MeterTrack>\n        <MeterIndicator />\n      </MeterTrack>\n    </Meter>\n  );\n}\n';
export {
  _02Label as default
};
