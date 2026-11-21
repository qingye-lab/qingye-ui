import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import * as React from "react";

export const meta = { title: "禁用原因写在按钮旁", titleEn: "The disabled reason sits beside the button" };

// 原因是页内文字，不放进提示：触屏上提示不会出现。aria-disabled 让按钮仍可聚焦，读屏经 aria-describedby 读到原因。
export default function Demo() {
  const reason = React.useId();
  return (
    <Stack gap="field" className="w-full max-w-md">
      <div><Button aria-disabled aria-describedby={reason}>发布</Button></div>
      <p id={reason} className="m-0 text-support text-muted-foreground">需要编辑权限，请联系空间管理员。</p>
    </Stack>
  );
}
