import { Tabs, TabsList, TabsTab } from "@qingye_lab/ui/components/tabs";

export type Granularity = "day" | "week" | "month";

export type GranularityPickerProps = {
  value: Granularity;
  onChange: (value: Granularity) => void;
};

// DN 自然解：Tabs（没有面板）
export function GranularityPicker({ value, onChange }: GranularityPickerProps) {
  return (
    <Tabs value={value} onValueChange={next => onChange(next as Granularity)}>
      <TabsList aria-label="时间粒度">
        <TabsTab value="day">日</TabsTab>
        <TabsTab value="week">周</TabsTab>
        <TabsTab value="month">月</TabsTab>
      </TabsList>
    </Tabs>
  );
}
