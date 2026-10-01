import { Steps } from "@qingye/ui/components/steps";

export const meta = { title: "水平步骤", description: "current 之前的步骤自动标记为已完成。" };

const items = [
  { id: "info", title: "填写信息", description: "企业名称与联系人" },
  { id: "verify", title: "实名认证", description: "上传营业执照" },
  { id: "bank", title: "绑定账户", description: "对公银行账户" },
  { id: "done", title: "开通完成" },
];

export default function Demo() {
  return <Steps className="max-w-2xl" current={1} items={items} />;
}
