import { Button } from "@qingye/ui/components/button";

export const meta = { title: "位置与尺寸", titleEn: "Size by position" };

export default function Demo() {
  return <>
    <Button size="xs" variant="quiet">编辑此行</Button>
    <Button size="sm" variant="quiet">筛选设备</Button>
    <Button size="md">保存设置</Button>
    <Button size="lg">登录工作区</Button>
    <Button size="xl">创建工作区</Button>
  </>;
}
