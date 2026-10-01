const n=`import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";

export const meta = { title: "同时展开多个与禁用", description: "multiple 允许多个分节同时展开；单个分节可以禁用。" };

export default function Demo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["build", "env"]} multiple>
      <AccordionItem value="build">
        <AccordionTrigger>构建命令</AccordionTrigger>
        <AccordionPanel>
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs">pnpm build</code>
          ，输出目录为 dist。
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="env">
        <AccordionTrigger>环境变量</AccordionTrigger>
        <AccordionPanel>已配置 6 个变量，其中 2 个仅在生产环境生效。</AccordionPanel>
      </AccordionItem>
      <AccordionItem disabled value="domain">
        <AccordionTrigger>自定义域名（团队版可用）</AccordionTrigger>
        <AccordionPanel>绑定你自己的域名，并自动签发 HTTPS 证书。</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
`;export{n as default};
