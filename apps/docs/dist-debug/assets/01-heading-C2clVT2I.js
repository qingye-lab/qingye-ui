const _01Heading = 'import { Heading } from "@yanqing/ui";\n\nexport const meta = { title: "标题", description: "level 决定语义层级，size 决定字号，二者可以独立设置。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex w-full flex-col gap-4">\n      <Heading level={1}>门店运营概览</Heading>\n      <Heading level={2}>本周订单与营收</Heading>\n      <Heading level={3}>徐汇漕溪北路店</Heading>\n      <Heading level={4} size="label">\n        设备与人员\n      </Heading>\n      <Heading level={2} size="heading" className="text-muted-foreground">\n        level 2 · size heading\n      </Heading>\n    </div>\n  );\n}\n';
export {
  _01Heading as default
};
