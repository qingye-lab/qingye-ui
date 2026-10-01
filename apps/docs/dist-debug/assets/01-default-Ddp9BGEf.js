const n=`import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";

export const meta = { title: "默认", description: "一次只展开一个分节。" };

const faqs = [
  { q: "免费版有哪些限制？", a: "免费版最多 3 个项目、5 位成员，构建时长每月 300 分钟。" },
  { q: "可以随时取消订阅吗？", a: "可以。取消后当前计费周期内仍可正常使用，到期后自动降级为免费版。" },
  { q: "支持开具发票吗？", a: "支持增值税普通发票与专用发票，在「账单」页面填写抬头后申请，3 个工作日内开具。" },
];

export default function Demo() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={[faqs[0]!.q]}>
      {faqs.map((faq) => (
        <AccordionItem key={faq.q} value={faq.q}>
          <AccordionTrigger>{faq.q}</AccordionTrigger>
          <AccordionPanel>{faq.a}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
`;export{n as default};
