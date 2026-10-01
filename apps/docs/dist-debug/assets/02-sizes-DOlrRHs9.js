const _02Sizes = 'import { Tabs, TabsList, TabsTab } from "@yanqing/ui";\n\nexport const meta = { title: "尺寸", description: "sm、default、lg 三档；移动端自动加高 4px。" };\n\nconst sizes = ["sm", "default", "lg"] as const;\n\nexport default function Demo() {\n  return (\n    <div className="flex flex-col items-center gap-4">\n      {sizes.map((size) => (\n        <Tabs defaultValue="day" key={size}>\n          <TabsList size={size}>\n            <TabsTab value="day">日</TabsTab>\n            <TabsTab value="week">周</TabsTab>\n            <TabsTab value="month">月</TabsTab>\n            <TabsTab value="year">年</TabsTab>\n          </TabsList>\n        </Tabs>\n      ))}\n    </div>\n  );\n}\n';
export {
  _02Sizes as default
};
