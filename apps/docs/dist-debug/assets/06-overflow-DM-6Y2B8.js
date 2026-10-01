const _06Overflow = 'import { ScrollArea, Tabs, TabsList, TabsTab } from "@yanqing/ui";\n\nexport const meta = {\n  title: "窄屏溢出",\n  description: "标签多时放进 ScrollArea 横向滚动，边缘渐隐提示还有内容。",\n};\n\nconst channels = ["全部", "设计", "前端", "后端", "测试", "运维", "产品", "市场", "客服"];\n\nexport default function Demo() {\n  return (\n    <Tabs className="w-full max-w-sm" defaultValue="全部">\n      <ScrollArea scrollFade>\n        <div className="w-max min-w-full border-b">\n          <TabsList variant="underline">\n            {channels.map((name) => (\n              <TabsTab key={name} value={name}>\n                {name}\n              </TabsTab>\n            ))}\n          </TabsList>\n        </div>\n      </ScrollArea>\n    </Tabs>\n  );\n}\n';
export {
  _06Overflow as default
};
