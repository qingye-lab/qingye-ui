const _04ProseSm = 'import { Prose } from "@yanqing/ui";\n\nexport const meta = { title: "紧凑长文", description: "size=\\"sm\\" 用于侧栏、抽屉中的说明文字。" };\n\nexport default function Demo() {\n  return (\n    <Prose className="w-full max-w-sm" size="sm">\n      <h3>关于自动对账</h3>\n      <p>\n        每天凌晨 2:00 系统会拉取前一日的支付流水与订单，自动比对金额与笔数。差异会出现在<a href="#diff">对账差异</a>中。\n      </p>\n      <ul>\n        <li>金额差异小于 0.01 元的记录自动忽略。</li>\n        <li>退款以原支付渠道的到账时间为准。</li>\n      </ul>\n    </Prose>\n  );\n}\n';
export {
  _04ProseSm as default
};
