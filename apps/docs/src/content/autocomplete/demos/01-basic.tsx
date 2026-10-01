import { Autocomplete, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@yanqing/ui";
import { SearchIcon } from "lucide-react";

export const meta = { title: "基础用法", description: "输入时给出建议，也可以直接提交任意文字。" };

const questions = [
  "如何重置设备管理员密码",
  "设备离线后如何排查网络",
  "批量升级固件的步骤",
  "如何导出近 30 天的告警记录",
  "如何为子账号分配只读权限",
  "如何更换绑定的手机号",
  "发票申请与下载",
];

export default function Demo() {
  return (
    <div className="w-full max-w-sm">
      <Autocomplete items={questions}>
        <AutocompleteInput aria-label="搜索帮助中心" placeholder="搜索帮助中心" startAddon={<SearchIcon />} />
        <AutocompletePopup>
          <AutocompleteEmpty>没有相关文章，按回车搜索全部内容</AutocompleteEmpty>
          <AutocompleteList>
            {(question: string) => (
              <AutocompleteItem key={question} value={question}>
                {question}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
