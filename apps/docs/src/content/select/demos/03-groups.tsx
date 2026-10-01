import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@yanqing/ui";
import { Fragment } from "react";

export const meta = { title: "分组与禁用项", description: "售罄的规格保留在列表中但不可选。" };

const groups = [
  {
    label: "通用型",
    items: [
      { label: "g7.large · 2 核 8 GB", value: "g7.large" },
      { label: "g7.xlarge · 4 核 16 GB", value: "g7.xlarge" },
      { label: "g7.2xlarge · 8 核 32 GB", value: "g7.2xlarge", disabled: true },
    ],
  },
  {
    label: "计算型",
    items: [
      { label: "c7.large · 2 核 4 GB", value: "c7.large" },
      { label: "c7.xlarge · 4 核 8 GB", value: "c7.xlarge" },
    ],
  },
  {
    label: "内存型",
    items: [
      { label: "r7.large · 2 核 16 GB", value: "r7.large", disabled: true },
      { label: "r7.xlarge · 4 核 32 GB", value: "r7.xlarge" },
    ],
  },
];
const items = groups.flatMap((group) => group.items);

export default function Demo() {
  return (
    <Select items={items} defaultValue="g7.xlarge" aria-label="实例规格">
      <SelectTrigger className="w-full max-w-72">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {groups.map((group, index) => (
          <Fragment key={group.label}>
            {index > 0 ? <SelectSeparator /> : null}
            <SelectGroup>
              <SelectGroupLabel>{group.label}</SelectGroupLabel>
              {group.items.map((item) => (
                <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </Fragment>
        ))}
      </SelectPopup>
    </Select>
  );
}
