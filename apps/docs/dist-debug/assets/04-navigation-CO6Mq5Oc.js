const n=`import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";

export const meta = {
  title: "导航链接",
  description: "跳转到不同地址时用真正的链接，当前页标 aria-current=\\"page\\"。",
};

const item = segmentedControlItemVariants({ state: "current" });

export default function Demo() {
  return (
    <nav aria-label="项目分区">
      <div className={segmentedControlRootClassName}>
        <a aria-current="page" className={item} href="#overview">
          概览
        </a>
        <a className={item} href="#activity">
          动态
        </a>
        <a className={item} href="#settings">
          设置
        </a>
      </div>
    </nav>
  );
}
`;export{n as default};
