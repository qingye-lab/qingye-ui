const _03Alphanumeric = 'import { OTPField, OTPFieldInput } from "@yanqing/ui";\n\nexport const meta = { title: "字母数字与占位", description: "validationType=\\"alphanumeric\\" 接受字母和数字，并统一转为大写。" };\n\nexport default function Demo() {\n  return (\n    <OTPField\n      length={5}\n      validationType="alphanumeric"\n      normalizeValue={(value) => value.toUpperCase()}\n      aria-label="兑换码"\n    >\n      {Array.from({ length: 5 }, (_, index) => (\n        <OTPFieldInput key={index} placeholder="·" />\n      ))}\n    </OTPField>\n  );\n}\n';
export {
  _03Alphanumeric as default
};
