import { Input } from "@yanqing/ui/components/input";

export const meta = { title: "默认" };

export default function Demo() {
  return <Input aria-label="设备名称" className="max-w-xs" placeholder="例如：3 号楼东侧摄像头" />;
}
