import { Proportion } from "@qingye/ui/components/proportion";
export const meta = { title: "部分与剩余", titleEn: "Parts and remainder" };
export default function Demo() {
  return <div className="grid w-full max-w-xl gap-(--qy-section-gap)">
    <Proportion label="存储用量" total={100} format={n => `${n} GB`} items={[{ key: "rec", label: "记录", value: 42 }, { key: "att", label: "附件", value: 23 }, { key: "log", label: "日志", value: 9 }]} />
    <Proportion label="同步来源" items={[{ key: "api", label: "接口推送", value: 1284 }, { key: "file", label: "定时导入", value: 912 }, { key: "db", label: "数据库", value: 640 }]} />
  </div>;
}
