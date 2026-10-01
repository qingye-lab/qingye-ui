const n=`import { Button } from "@qingye/ui/components/button";
import { Spinner } from "@qingye/ui/components/spinner";

export const meta = {
  title: "自定义加载",
  description: "需要保留文字时，自行组合 Spinner 与 disabled，例如“正在上传 3 个文件”。",
};

export default function Demo() {
  return (
    <>
      <Button disabled>
        <Spinner />
        正在上传 3 个文件
      </Button>
      <Button disabled size="sm" variant="outline">
        <Spinner />
        生成中
      </Button>
    </>
  );
}
`;export{n as default};
