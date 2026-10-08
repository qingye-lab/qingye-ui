import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Text } from "@qingye_lab/ui/components/typography";
import { useEffect, useState } from "react";

export const meta = { title: "输入方式", titleEn: "Input modality" };

export default function Demo() {
  const [input, setInput] = useState<string | null>(null);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setInput(root.getAttribute("data-ui-input"));
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributeFilter: ["data-ui-input"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Stack gap="panel">
      <Inline gap="actions"><Button>按钮</Button><Button variant="bordered">按钮</Button></Inline>
      <Text step="support" className="text-muted-foreground">输入方式：{input === "keyboard" ? "键盘" : input === "pointer" ? "指针" : "待检测"}</Text>
    </Stack>
  );
}
