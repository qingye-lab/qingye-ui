import { Steps } from "@qingye/ui/components/steps";

export const meta = { title: "出错状态", description: "status=\"error\" 覆盖推导出的状态，标出失败的步骤。" };

const items = [
  { id: "upload", title: "上传文件" },
  { id: "parse", title: "解析数据", status: "error" as const, description: "第 128 行缺少手机号" },
  { id: "import", title: "导入客户" },
];

export default function Demo() {
  return <Steps className="max-w-xl" current={1} items={items} label="导入进度" />;
}
