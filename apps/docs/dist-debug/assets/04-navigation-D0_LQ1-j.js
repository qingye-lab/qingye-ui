const _04Navigation = 'import { segmentedControlItemVariants, segmentedControlRootClassName } from "@yanqing/ui";\n\nexport const meta = {\n  title: "导航链接",\n  description: "跳转到不同地址时用真正的链接，当前页标 aria-current=\\"page\\"。",\n};\n\nconst item = segmentedControlItemVariants({ state: "current" });\n\nexport default function Demo() {\n  return (\n    <nav aria-label="项目分区">\n      <div className={segmentedControlRootClassName}>\n        <a aria-current="page" className={item} href="#overview">\n          概览\n        </a>\n        <a className={item} href="#activity">\n          动态\n        </a>\n        <a className={item} href="#settings">\n          设置\n        </a>\n      </div>\n    </nav>\n  );\n}\n';
export {
  _04Navigation as default
};
