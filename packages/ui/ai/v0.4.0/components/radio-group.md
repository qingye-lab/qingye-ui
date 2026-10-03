# 单选组 RadioGroup

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/radio-group
Source: packages/ui/src/components/radio-group.tsx
Source SHA-256: daeeb0c15d39c4ba850fd2d6e5e9dba613e835d4776d44f7b7dc33ab78bf1a71

从同时可见的少量候选中取一个值。

## Use and ownership
- 少量互斥候选，必须同时看见才能比较
- Avoid: 可收起列表用 Select
- Avoid: 多选用 Checkbox
- Avoid: 命令用 Menu，视角切换用 Tabs
- Avoid: 复杂属性比较用应用比较结构
- Library: 焦点、方向键、非受控值
- Application: 受控值、候选、invalid、提交与结果

## Composition
- FieldTitle → RadioGroup aria-labelledby；FieldItem + FieldLabel 命名单项；FieldDescription + FieldError 保留关联

## Responsive behavior
- 读既有窄屏尺寸与粗指针命中角色；本批只做桌面检查

## Customization
- 同档文字行高、圆形身份、主题表面与边框；不新增外围焦点圈

## Current exports
- Radio: function; owner radio-group; PASS; props: RadioProps<Value>
- RadioGroup: function; owner radio-group; PASS; props: RadioGroupProps<Value>
- RadioGroupPrimitive: reexport; owner radio-group; UNVERIFIED
- RadioGroupProps: type; owner radio-group; PASS
- RadioPrimitive: reexport; owner radio-group; UNVERIFIED
- RadioProps: type; owner radio-group; PASS
- RadioSize: type; owner radio-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### RadioGroup
可见互斥候选的共同状态与组语义。
- value / defaultValue: Value. 受控值或真实初始选择。省略初值保持未选择；受控可用 null。
- onValueChange: (value, eventDetails) => void. 原语值变化，可通过 eventDetails.cancel() 取消。
- name / form / inputRef: string / string / Ref<HTMLInputElement>. 表单名、外部表单与隐藏 input 引用。未选不提交该字段。
- disabled / readOnly / required: boolean; default false. 禁用、只读与原生约束；required 不自行推断 invalid。
- aria-labelledby / aria-label: string. 组的名称；FieldTitle 的 id 可作为 aria-labelledby。
- render / ref / className / style: Base UI composition. 组根元素与状态样式入口。

### Radio
圆形单选入口与中心选中点。
- value: Value. 组内唯一候选值；空字符串、0 与 null 未选择不同。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 圆形外径读同档文字行高；命中区单独读取 touch-target。
- disabled / readOnly / required: boolean. 原语支持组与项的真实限制，Field disabled 也可传递。
- render / nativeButton / ref / inputRef: Base UI composition. 默认原生 button，保留隐藏 radio input；改成非 button 时显式 nativeButton=false。
- children / className / style: ReactNode / Base UI state callbacks. 替换指示部位或覆写样式；名称放在 FieldLabel 中。

### RadioGroupPrimitive / RadioPrimitive
Base UI 组与 Radio 原语出口。

## Keyboard
- Tab / Shift+Tab: 组保留一个停靠点；已选项或第一个可用项获得焦点。
- ↑ / ↓ / ← / →: 移动并选择候选，跳过禁用项，在组内循环。
- Space: 选择当前候选。Home/End、类型搜索不属于此 Radio 原语契约。

## Source examples
### 尺寸
Source: apps/docs/src/content/radio-group/demos/01-sizes.tsx
```tsx
import { useId } from "react";
import { Field, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";
import { RadioGroup, Radio, type RadioSize } from "@qingye/ui/components/radio-group";

export const meta = { title: "尺寸", titleEn: "Sizes" };

const sizes: RadioSize[] = ["xs", "sm", "md", "lg", "xl"];
const textClasses: Record<RadioSize, string> = {
  xs: "text-control-xs", sm: "text-control-sm", md: "text-control-md", lg: "text-control-lg", xl: "text-control-xl",
};
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  const id = useId();
  return (
    <FieldGroup className="grid w-full grid-cols-5 items-start">
      {sizes.map(size => (
        <Field key={size}>
          <FieldTitle id={`${id}-${size}`}>{size}</FieldTitle>
          <RadioGroup aria-labelledby={`${id}-${size}`} defaultValue="center">
            {options.map(option => (
              <FieldItem key={option.value}>
                <Radio value={option.value} size={size} />
                <FieldLabel className={textClasses[size]}>{option.label}</FieldLabel>
              </FieldItem>
            ))}
          </RadioGroup>
        </Field>
      ))}
    </FieldGroup>
  );
}
```

### 状态
Source: apps/docs/src/content/radio-group/demos/02-states.tsx
```tsx
import { useId, useState } from "react";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";
import { RadioGroup, Radio } from "@qingye/ui/components/radio-group";

export const meta = { title: "状态", titleEn: "States" };

const states = [
  { id: "unselected", label: "未选择" },
  { id: "selected", label: "已选择" },
  { id: "invalid", label: "无效" },
  { id: "readonly", label: "只读" },
  { id: "disabled", label: "禁用" },
  { id: "disabled-item", label: "禁用项" },
];
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  const id = useId();
  const [requiredValue, setRequiredValue] = useState<string | null>(null);
  return (
    <FieldGroup className="grid w-full grid-cols-3 items-start">
      {states.map(state => {
        const invalid = state.id === "invalid" && requiredValue === null;
        return (
          <Field key={state.id} invalid={invalid} disabled={state.id === "disabled"}>
            <FieldTitle id={`${id}-${state.id}`}>
              {state.id === "invalid" && !invalid ? "已选择" : state.label}
            </FieldTitle>
            <RadioGroup
              aria-labelledby={`${id}-${state.id}`}
              defaultValue={state.id === "unselected" || state.id === "invalid" ? null : "center"}
              readOnly={state.id === "readonly"}
              disabled={state.id === "disabled"}
              onValueChange={value => {
                if (state.id === "invalid") setRequiredValue(value);
              }}
            >
              {options.map(option => (
                <FieldItem key={option.value}>
                  <Radio value={option.value} disabled={state.id === "disabled-item" && option.value === "right"} />
                  <FieldLabel>{option.label}</FieldLabel>
                </FieldItem>
              ))}
            </RadioGroup>
            {invalid && <FieldError>请选择对齐方式。</FieldError>}
          </Field>
        );
      })}
    </FieldGroup>
  );
}
```

