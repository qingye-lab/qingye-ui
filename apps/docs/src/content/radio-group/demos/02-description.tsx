import { Field, FieldContent, FieldDescription, FieldLabel, Radio, RadioGroup } from "@yanqing/ui";

export const meta = { title: "带说明", description: "每个选项一个 Field，说明作为描述读出。" };

const options = [
  { value: "rolling", label: "滚动发布", description: "逐台替换实例，服务不中断，耗时较长。" },
  { value: "blue-green", label: "蓝绿发布", description: "新旧两套环境并行，切换流量后可秒级回滚。" },
  { value: "recreate", label: "重建", description: "先停止全部旧实例再启动新版本，期间服务不可用。" },
];

export default function Demo() {
  return (
    <RadioGroup aria-label="发布策略" defaultValue="rolling" className="max-w-sm gap-4">
      {options.map((option) => (
        <Field key={option.value} orientation="horizontal" className="items-start">
          <Radio value={option.value} className="mt-px" />
          <FieldContent>
            <FieldLabel>{option.label}</FieldLabel>
            <FieldDescription>{option.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  );
}
