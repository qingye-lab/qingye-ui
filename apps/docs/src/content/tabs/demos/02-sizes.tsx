import { Tabs, TabsList, TabsTab } from "@yanqing/ui";

export const meta = { title: "尺寸", description: "sm、default、lg 三档；移动端自动加高 4px。" };

const sizes = ["sm", "default", "lg"] as const;

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <Tabs defaultValue="day" key={size}>
          <TabsList size={size}>
            <TabsTab value="day">日</TabsTab>
            <TabsTab value="week">周</TabsTab>
            <TabsTab value="month">月</TabsTab>
            <TabsTab value="year">年</TabsTab>
          </TabsList>
        </Tabs>
      ))}
    </div>
  );
}
