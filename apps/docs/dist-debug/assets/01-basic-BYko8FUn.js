const _01Basic = 'import { Card, CardPanel, Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@yanqing/ui";\n\nexport const meta = { title: "基础", description: "放进 Card，数值使用等宽数字，变化量注明对比周期。" };\n\nexport default function Demo() {\n  return (\n    <Card className="w-full max-w-xs" size="sm">\n      <CardPanel>\n        <Stat>\n          <StatLabel>在线设备</StatLabel>\n          <StatValue>\n            1,284\n            <StatUnit>台</StatUnit>\n          </StatValue>\n          <StatDescription>\n            <StatDelta trend="up">+8.2%</StatDelta>\n            较上周\n          </StatDescription>\n        </Stat>\n      </CardPanel>\n    </Card>\n  );\n}\n';
export {
  _01Basic as default
};
