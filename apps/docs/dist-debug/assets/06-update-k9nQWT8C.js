const n=`import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

export const meta = {
  title: "原地更新",
  description: "用同一个 id 重复添加时不会堆叠，而是更新原消息并轻微脉冲提示，适合自动保存。",
};

export default function Demo() {
  return (
    <Button
      onClick={() =>
        toastManager.add({
          id: "draft-saved",
          type: "success",
          title: "草稿已保存",
          description: \`最近保存：\${new Date().toLocaleTimeString("zh-CN")}\`,
        })
      }
      variant="outline"
    >
      保存草稿
    </Button>
  );
}
`;export{n as default};
