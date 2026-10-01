const t=`import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { CircleAlertIcon } from "lucide-react";

export const meta = {
  title: "仅标题与多段说明",
  description: "标题可以单独使用；说明里可以放列表等多段内容。",
};

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-3">
      <Alert variant="info">
        <AlertTitle>你正在以只读身份查看“华东仓储”项目。</AlertTitle>
      </Alert>
      <Alert variant="destructive">
        <CircleAlertIcon />
        <AlertTitle>导入失败，共 3 处错误</AlertTitle>
        <AlertDescription>
          <ul className="list-disc ps-4">
            <li>第 12 行：设备编号 YQ-SC-2039 已存在</li>
            <li>第 27 行：所属仓库不能为空</li>
            <li>第 41 行：负责人手机号格式不正确</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
`;export{t as default};
