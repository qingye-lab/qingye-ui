const _01Horizontal = 'import { Steps } from "@yanqing/ui";\n\nexport const meta = { title: "水平步骤", description: "current 之前的步骤自动标记为已完成。" };\n\nconst items = [\n  { id: "info", title: "填写信息", description: "企业名称与联系人" },\n  { id: "verify", title: "实名认证", description: "上传营业执照" },\n  { id: "bank", title: "绑定账户", description: "对公银行账户" },\n  { id: "done", title: "开通完成" },\n];\n\nexport default function Demo() {\n  return <Steps className="max-w-2xl" current={1} items={items} />;\n}\n';
export {
  _01Horizontal as default
};
