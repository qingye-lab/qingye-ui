import { Button } from "@qingye_lab/ui/components/button";
import { Grid } from "@qingye_lab/ui/components/layout";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "成功、失败与提示", titleEn: "Success, failure and notice" } satisfies DemoMeta;

export default function Demo() {
  return <Grid columns={2} gap="section">
    <Result tone="success"><ResultTitle level={3}>已保存</ResultTitle><ResultDescription>修改已写入，下次打开即可看到。</ResultDescription><ResultActions><Button>返回列表</Button></ResultActions></Result>
    <Result tone="danger" role="alert"><ResultTitle level={3}>保存失败</ResultTitle><ResultDescription>网络中断，修改还在这个页面里，没有丢失。</ResultDescription><ResultActions><Button>重试</Button><Button variant="quiet">返回</Button></ResultActions></Result>
    <Result tone="warning"><ResultTitle level={3}>部分文件未上传</ResultTitle><ResultDescription>3 个文件中有 1 个超过大小限制。</ResultDescription><ResultActions><Button>查看文件</Button></ResultActions></Result>
    <Result tone="info"><ResultTitle level={3}>正在审核</ResultTitle><ResultDescription>审核通过后会通知你。</ResultDescription></Result>
  </Grid>;
}
