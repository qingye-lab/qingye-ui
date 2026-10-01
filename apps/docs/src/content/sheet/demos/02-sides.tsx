import { Button } from "@qingye/ui/components/button";
import { Sheet, SheetDescription, SheetHeader, SheetPanel, SheetPopup, SheetTitle, SheetTrigger } from "@qingye/ui/components/sheet";

export const meta = { title: "四个方向", description: "通过 side 指定滑入的边。" };

const sides = [
  { side: "right", label: "右侧" },
  { side: "left", label: "左侧" },
  { side: "top", label: "顶部" },
  { side: "bottom", label: "底部" },
] as const;

const notices = [
  "09:42 仓库 3 号扫码枪电量低于 15%",
  "09:30 周以宁完成了工单 #2318",
  "08:55 华东仓储新增 4 台设备",
];

export default function Demo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {sides.map(({ side, label }) => (
        <Sheet key={side}>
          <SheetTrigger render={<Button variant="outline" />}>{label}</SheetTrigger>
          <SheetPopup side={side}>
            <SheetHeader>
              <SheetTitle>最近动态</SheetTitle>
              <SheetDescription>从{label}滑入的面板。</SheetDescription>
            </SheetHeader>
            <SheetPanel>
              <ul className="grid gap-2.5 text-sm">
                {notices.map((notice) => (
                  <li className="numeric text-muted-foreground" key={notice}>
                    {notice}
                  </li>
                ))}
              </ul>
            </SheetPanel>
          </SheetPopup>
        </Sheet>
      ))}
    </div>
  );
}
