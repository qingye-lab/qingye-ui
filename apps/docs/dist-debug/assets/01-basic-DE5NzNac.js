const _01Basic = 'import { Field, FieldDescription, FieldLabel, OTPField, OTPFieldInput } from "@yanqing/ui";\n\nexport const meta = { title: "基础用法", description: "6 位数字验证码。" };\n\nexport default function Demo() {\n  return (\n    <Field className="items-center">\n      <FieldLabel>短信验证码</FieldLabel>\n      <OTPField length={6}>\n        {Array.from({ length: 6 }, (_, index) => (\n          <OTPFieldInput key={index} />\n        ))}\n      </OTPField>\n      <FieldDescription>已发送至 138 **** 6021</FieldDescription>\n    </Field>\n  );\n}\n';
export {
  _01Basic as default
};
