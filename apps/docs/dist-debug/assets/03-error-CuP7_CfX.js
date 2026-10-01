const _03Error = 'import { Steps } from "@yanqing/ui";\n\nexport const meta = { title: "出错状态", description: "status=\\"error\\" 覆盖推导出的状态，标出失败的步骤。" };\n\nconst items = [\n  { id: "upload", title: "上传文件" },\n  { id: "parse", title: "解析数据", status: "error" as const, description: "第 128 行缺少手机号" },\n  { id: "import", title: "导入客户" },\n];\n\nexport default function Demo() {\n  return <Steps className="max-w-xl" current={1} items={items} label="导入进度" />;\n}\n';
export {
  _03Error as default
};
