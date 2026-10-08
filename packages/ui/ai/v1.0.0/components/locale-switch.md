# 语言切换 LocaleSwitch

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/locale-switch
Source: packages/ui/src/components/locale-switch.tsx
Source SHA-256: fb5b15634796d8a87229cddea5fa12b1aef1e70e98d45d4e53c6d76ada8888a4

请求切换应用语言，并显示 Provider 当前事实。

## Notes
- 不修改 document.lang、系统语言、存储或路由；这些属于应用。
- 内置名 language 走 UI locale；选项可见名称由消费项目给出。

## Use and ownership
- UILocaleProvider 的应用语言入口
- Avoid: 内部乐观切值却未改变 Provider
- Library: 呈现 Provider 当前值与请求
- Application: 可选语言、Provider、URL/文档语言

## Composition
- Provider + NativeSelect + 应用接受变化

## Responsive behavior
- 窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。

## Customization
- NativeSelect 的公开出口与显式名称

## Current exports
- LocaleSwitch: function; owner locale-switch; PASS; props: LocaleSwitchProps
- LocaleSwitchOption: type; owner locale-switch; PASS
- LocaleSwitchProps: type; owner locale-switch; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### LocaleSwitch
复用 NativeSelect；UILocaleProvider 是唯一当前值来源。
- options: readonly { locale: UILocale; label: string; disabled?: boolean }[]. 消费项目提供可选语言与名称，code 必须非空且唯一。当前 code 未列入时显示其禁用事实选项。
- onLocaleChange: (locale: UILocale, event: ChangeEvent<HTMLSelectElement>) => void. 请求新 locale；应用更新 Provider 后才改变选择事实，拒绝时保留原值。
- name / form / disabled / render / ref / onChange / ARIA: NativeSelectProps. 原生表单、禁用与出口；onChange preventDefault 可取消请求；默认名称读 messages.language。

## Keyboard
- 平台选择器键位: 保留原生 select 的方向、确认与移动选择器行为。

## Source examples
### 当前语言
Source: apps/docs/src/content/locale-switch/demos/01-provider.tsx
```tsx
import { useState } from "react";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { LocaleSwitch } from "@qingye_lab/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";
export const meta = { title: "当前语言", titleEn: "Current locale" };
export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  return <UILocaleProvider locale={locale}><div className="flex flex-wrap items-center gap-(--qy-action-gap)"><LocaleSwitch className="w-auto" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={setLocale} /><CopyButton value="Qingye" /></div></UILocaleProvider>;
}
```

### 密度与禁用
Source: apps/docs/src/content/locale-switch/demos/02-density.tsx
```tsx
import { useState } from "react";
import { LocaleSwitch } from "@qingye_lab/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye_lab/ui/locale";
import { enUS } from "@qingye_lab/ui/locales/en-US";

export const meta = { title: "密度与禁用", titleEn: "Density and disabled" };

export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  const options = [{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }];
  return (
    <UILocaleProvider locale={locale}>
      <div className="flex flex-wrap items-start gap-(--qy-panel-gap)">
        {(["default", "compact"] as const).map((density) => (
          <div data-density={density} key={density}>
            <LocaleSwitch aria-label={density === "compact" ? "语言 · 紧凑" : "语言"} className="w-auto" options={options} onLocaleChange={setLocale} />
          </div>
        ))}
        <LocaleSwitch aria-label="语言 · 禁用" className="w-auto" options={options} onLocaleChange={setLocale} disabled />
      </div>
    </UILocaleProvider>
  );
}
```
