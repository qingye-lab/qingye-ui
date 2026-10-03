# Locale switch

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/locale-switch
Source: packages/ui/src/components/locale-switch.tsx
Source SHA-256: fb5b15634796d8a87229cddea5fa12b1aef1e70e98d45d4e53c6d76ada8888a4

Request an application locale change and show the current Provider value.

## Notes
- No changes to document.lang, system language, storage, or routes; applications own these.
- The built-in language name uses UI locale; consumers supply visible option names.

## Use and ownership
- An application-language entry for UILocaleProvider.
- Avoid: Optimistically switching the internal value without changing Provider.
- Library: Presenting Provider's current value and requests.
- Application: Available languages, Provider, URLs, and document language.

## Composition
- Provider + NativeSelect + application acceptance.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- NativeSelect's five profiles/public composition and explicit names.

## Current exports
- LocaleSwitch: function; owner locale-switch; PASS; props: LocaleSwitchProps
- LocaleSwitchOption: type; owner locale-switch; PASS
- LocaleSwitchProps: type; owner locale-switch; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### LocaleSwitch
Uses NativeSelect; UILocaleProvider alone supplies the current value.
- options: readonly { locale: UILocale; label: string; disabled?: boolean }[]. The consumer supplies available languages and names. Codes must be nonblank and unique; an unlisted current code appears as a disabled factual option.
- onLocaleChange: (locale: UILocale, event: ChangeEvent<HTMLSelectElement>) => void. Requests a locale; selection changes only after the application updates Provider. Refusal retains the previous value.
- controlSize: xs | sm | md | lg | xl; default md. The same five matching control/text profiles as NativeSelect.
- name / form / disabled / render / ref / onChange / ARIA: NativeSelectProps. Native form, disabling, and composition. onChange preventDefault cancels a request; the default name reads messages.language.

## Keyboard
- Platform picker keys: Retain native select direction, confirmation, and mobile-picker behavior.

## Source examples
### 当前语言
Source: apps/docs/src/content/locale-switch/demos/01-provider.tsx
```tsx
import { useState } from "react";
import { CopyButton } from "@qingye/ui/components/copy-button";
import { LocaleSwitch } from "@qingye/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
export const meta = { title: "当前语言", titleEn: "Current locale" };
export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  return <UILocaleProvider locale={locale}><div className="flex flex-wrap items-center gap-(--qy-action-gap)"><LocaleSwitch className="w-auto" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={setLocale} /><CopyButton value="Qingye" /></div></UILocaleProvider>;
}
```

### 五档与禁用
Source: apps/docs/src/content/locale-switch/demos/02-sizes.tsx
```tsx
import { useState } from "react";
import { LocaleSwitch } from "@qingye/ui/components/locale-switch";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
export const meta = { title: "五档与禁用", titleEn: "Sizes and disabled" };
export default function Demo() {
  const [locale, setLocale] = useState(zhCN);
  return <UILocaleProvider locale={locale}><div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(controlSize => <LocaleSwitch key={controlSize} controlSize={controlSize} aria-label={controlSize} className="w-auto" options={[{ locale: zhCN, label: "中文" }, { locale: enUS, label: "English" }]} onLocaleChange={setLocale} disabled={controlSize === "xl"} />)}</div></UILocaleProvider>;
}
```
