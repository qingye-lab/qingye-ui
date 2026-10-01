import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@yanqing/ui";

export const meta = { title: "状态", description: "禁用与校验失败。Field 内的 invalid 会传给触发器。" };

const owners = { zhang: "张伟 · 运维", li: "李娜 · 网络", wang: "王磊 · 安全" };

function OwnerSelect(props: { disabled?: boolean; defaultValue?: string }) {
  return (
    <Select items={owners} {...props}>
      <SelectTrigger>
        <SelectValue placeholder="选择负责人" />
      </SelectTrigger>
      <SelectPopup>
        {Object.entries(owners).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectPopup>
    </Select>
  );
}

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
      <Field disabled>
        <FieldLabel>负责人</FieldLabel>
        <OwnerSelect disabled defaultValue="zhang" />
        <FieldDescription>工单已关闭，不能改派。</FieldDescription>
      </Field>
      <Field invalid>
        <FieldLabel>负责人</FieldLabel>
        <OwnerSelect />
        <FieldError>请指定一位负责人</FieldError>
      </Field>
    </div>
  );
}
