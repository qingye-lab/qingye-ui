import { Button } from "@qingye_lab/ui/components/button";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";

export default function Cover() {
  return <Result tone="success"><ResultTitle level={3}>申请已提交</ResultTitle><ResultDescription>结果会在三个工作日内发到你的邮箱。</ResultDescription><ResultActions><Button>查看申请</Button></ResultActions></Result>;
}
