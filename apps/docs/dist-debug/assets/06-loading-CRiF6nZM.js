const n=`import { Button } from "@qingye/ui/components/button";
import { useState } from "react";

export const meta = {
  title: "加载中",
  description: "loading 显示居中的旋转指示并禁用按钮，文字透明但保留宽度，按钮不会跳动。",
};

export default function Demo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };
  return (
    <>
      <Button loading={saving} onClick={save}>
        保存更改
      </Button>
      <Button loading variant="outline">
        同步中
      </Button>
      <Button loading variant="destructive">
        删除中
      </Button>
    </>
  );
}
`;export{n as default};
