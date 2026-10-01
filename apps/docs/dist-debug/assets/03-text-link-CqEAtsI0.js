const _03TextLink = 'import { TextLink } from "@yanqing/ui";\n\nexport const meta = { title: "文字链接", description: "默认样式、弱化样式与外部链接。" };\n\nexport default function Demo() {\n  return (\n    <div className="flex max-w-md flex-col gap-3 text-sm">\n      <p>\n        修改结算周期前，请先阅读<TextLink href="#billing">结算规则</TextLink>。\n      </p>\n      <p className="text-muted-foreground">\n        没有收到验证码？<TextLink href="#resend" variant="muted">重新发送</TextLink>\n      </p>\n      <p>\n        设备型号参数见{" "}\n        <TextLink external href="https://developer.sunmi.com/">\n          商米开发者中心\n        </TextLink>\n        。\n      </p>\n    </div>\n  );\n}\n';
export {
  _03TextLink as default
};
