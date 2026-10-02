import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from "@qingye/ui/components/pagination";
import { PaginationNext } from "@qingye/ui/components/pagination";
import { TabsList } from "@qingye/ui/components/tabs";
import { UILocale } from "@qingye/ui/locale";
import { CopyButton } from "@qingye/ui/components/copy-button";
import { Pagination, PaginationPrevious } from "@qingye/ui/components/pagination";
import { SearchInput } from "@qingye/ui/components/search-input";
import { Tabs, TabsTab } from "@qingye/ui/components/tabs";
import { UILocaleProvider, zhCN } from "@qingye/ui/locale";
import { enUS } from "@qingye/ui/locales/en-US";
import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { Callout, Code, H2, P, PageHeader } from "@/components/prose";

const SAMPLES: Record<string, { zh: unknown[]; en: unknown[] }> = {
  selectDateTime: { zh: ["开始"], en: ["start"] }, removeFile: { zh: ["报告.pdf"], en: ["report.pdf"] }, fileError: { zh: ["报告.pdf", "size"], en: ["report.pdf", "size"] }, pageSummary: { zh: [2, 5, 48], en: [2, 5, 48] }, selectedCount: { zh: [3], en: [3] }, };

function show(value: unknown, args: unknown[] | undefined): { text: string; call?: string } {
  if (typeof value !== "function") return { text: String(value) };
  const params = args ?? Array.from({ length: value.length }, () => "…");
  return { text: String((value as (...a: unknown[]) => unknown)(...params)), call: `(${params.map((p) => JSON.stringify(p)).join(", ")})` };
}

function LocalePreview() {
  const [code, setCode] = useState<"zh-CN" | "en-US">("zh-CN");
  const locale: UILocale = code === "en-US" ? enUS : zhCN;
  return (
    <div className="my-6 overflow-hidden rounded-xl border">
      <div className="flex items-center justify-between gap-3 border-b bg-surface-subtle/60 py-1.5 ps-4 pe-1.5 dark:bg-surface/40">
        <span className="text-muted-foreground text-xs">内置文案随语言切换，示例内容本身不变</span>
        <Tabs onValueChange={(value) => setCode(value as typeof code)} value={code}>
          <TabsList aria-label="界面语言" size="sm">
            <TabsTab value="zh-CN">简体中文</TabsTab>
            <TabsTab value="en-US">English</TabsTab>
          </TabsList>
        </Tabs>
      </div>
      <UILocaleProvider locale={locale}>
        <div className="flex flex-col items-center gap-6 p-6 sm:p-8" lang={code}>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#i18n-demo" onClick={(event) => event.preventDefault()} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#i18n-demo" onClick={(event) => event.preventDefault()}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#i18n-demo" isActive onClick={(event) => event.preventDefault()}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#i18n-demo" onClick={(event) => event.preventDefault()} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row">
            <div className="w-full flex-1">
              <SearchInput aria-label={code === "en-US" ? "Search members" : "搜索成员"} defaultValue="林" />
            </div>
            <CopyButton value="Qingye UI" />
          </div>
        </div>
      </UILocaleProvider>
    </div>
  );
}

function MessagesTable() {
  const { messages } = zhCN;
  const keys = Object.keys(zhCN.messages) as (keyof typeof zhCN.messages)[];
  return (
    <div className="my-4 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[34rem] text-sm">
        <thead className="border-b bg-surface-subtle/60 text-muted-foreground text-xs dark:bg-surface/40">
          <tr>
            <th className="px-4 py-2 text-start font-medium">键</th>
            <th className="px-4 py-2 text-start font-medium">简体中文</th>
            <th className="px-4 py-2 text-start font-medium">English</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {keys.map((key) => {
            const zh = show(messages[key], SAMPLES[key]?.zh);
            const en = show(enUS.messages[key], SAMPLES[key]?.en);
            return (
              <tr key={key}>
                <td className="px-4 py-2 align-top">
                  <code className="font-mono text-[0.8125rem] text-foreground-strong">{key}</code>
                  {zh.call ? <code className="font-mono text-[0.75rem] text-muted-foreground">{zh.call}</code> : null}
                </td>
                <td className="px-4 py-2 align-top text-foreground/85">{zh.text}</td>
                <td className="px-4 py-2 align-top text-foreground/85" lang="en">
                  {en.text}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function I18nPage() {
  return (
    <article>
      <PageHeader
        description="组件内置的文案（关闭、加载中、分页、清除……）默认是简体中文，可以整体切换为英文，也可以只改其中几条。"
        title="国际化"
      />
      <P>
        所有内置文案都通过 <Code>useUILocale()</Code> 读取，不依赖浏览器语言。组件上显式传入的参数优先于默认文案，例如 <Code>aria-label</Code>、
        <Code>clearLabel</Code>、<Code>copyLabel</Code>。用户内容、列标题与业务文案由你的应用提供。
      </P>

      <H2 id="english">切换到英文</H2>
      <CodeBlock
        code={`import { UILocaleProvider } from "@qingye/ui/locale";\nimport { enUS } from "@qingye/ui/locales/en-US";\n\nexport function Root() {\n  return (\n    <UILocaleProvider locale={enUS}>\n      <App />\n    </UILocaleProvider>\n  );\n}`}
        title="root.tsx"
      />
      <P>
        英文词条是单独的入口，只用中文的应用不会把它打包进来。别忘了同时把 <Code>{'<html lang="en">'}</Code> 设成对应语言，读屏软件依赖它选择发音。
      </P>
      <div id="i18n-demo">
        <LocalePreview />
      </div>

      <H2 id="overrides">覆盖部分文案</H2>
      <P>
        只想改几条时传 <Code>messages</Code>。它会与上层的语言合并，所以可以在某个区域里再嵌套一层：
      </P>
      <CodeBlock
        code={`<UILocaleProvider messages={{ noResults: "暂无数据", close: "收起" }}>\n  <DataTable … />\n</UILocaleProvider>`}
      />
      <Callout title="带参数的文案">
        少数文案是函数，例如 <Code>pageSummary(page, pages, total)</Code>、<Code>selectedCount(count)</Code>，覆盖时同样传入函数，便于处理语序与单复数。
      </Callout>

      <H2 id="custom-components">在自己的组件里使用</H2>
      <P>封装业务组件时读取同一份文案，界面语言就能保持一致：</P>
      <CodeBlock
        code={`import { Button } from "@qingye/ui/components/button";\nimport { useUILocale } from "@qingye/ui/locale";\n\nexport function ClearFilters({ onClear }: { onClear: () => void }) {\n  const { code, messages } = useUILocale(); // code: "zh-CN" | "en-US"\n  return <Button onClick={onClear}>{messages.clear}</Button>;\n}`}
      />
      <P className="text-[0.875rem] text-muted-foreground">
        向组件库新增内置文案时，需要同时补齐 <Code>src/locale.tsx</Code> 与 <Code>src/locales/en-US.ts</Code>，两边的键保持一一对应。
      </P>

      <H2 id="messages">内置文案一览</H2>
      <P>下表直接读取库中的两套词条，带参数的文案以示例参数调用后显示。</P>
      <MessagesTable />
    </article>
  );
}
