const _05Link = 'import { Button } from "@yanqing/ui";\nimport { ChevronLeftIcon, ExternalLinkIcon } from "lucide-react";\n\nexport const meta = {\n  title: "作为链接",\n  description: "导航用 render 渲染为 <a>，并设 nativeButton={false}，保留按钮外观与链接语义。",\n};\n\nexport default function Demo() {\n  return (\n    <>\n      <Button nativeButton={false} render={<a href="#orders" />} variant="link">\n        <ChevronLeftIcon aria-hidden="true" />\n        返回订单列表\n      </Button>\n      <Button\n        nativeButton={false}\n        render={<a href="https://example.com/help" rel="noreferrer" target="_blank" />}\n        variant="outline"\n      >\n        帮助中心\n        <ExternalLinkIcon aria-hidden="true" />\n      </Button>\n    </>\n  );\n}\n';
export {
  _05Link as default
};
