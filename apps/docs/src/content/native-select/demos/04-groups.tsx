import { Field, FieldLabel, NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@yanqing/ui";

export const meta = { title: "分组与长列表", description: "选项很多时用 optgroup 分组，系统选择器会自带滚动与快速定位。" };

const regions = [
  { label: "华北", provinces: ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区"] },
  { label: "华东", provinces: ["上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省"] },
  { label: "华南", provinces: ["广东省", "广西壮族自治区", "海南省"] },
  { label: "西南", provinces: ["重庆市", "四川省", "贵州省", "云南省", "西藏自治区"] },
];

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>收货省份</FieldLabel>
      <NativeSelect name="province" placeholder="选择省份" required>
        {regions.map((region) => (
          <NativeSelectOptGroup key={region.label} label={region.label}>
            {region.provinces.map((province) => (
              <NativeSelectOption key={province} value={province}>
                {province}
              </NativeSelectOption>
            ))}
          </NativeSelectOptGroup>
        ))}
      </NativeSelect>
    </Field>
  );
}
