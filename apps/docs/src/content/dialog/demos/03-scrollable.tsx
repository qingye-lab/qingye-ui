import { Button } from "@yanqing/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle, DialogTrigger } from "@yanqing/ui/components/dialog";

export const meta = {
  title: "长内容滚动",
  description: "正文超出视口时只在 DialogPanel 内滚动，标题和操作始终可见。",
};

const sections = [
  ["服务内容", "燕青云为团队提供设备管理、工单流转与数据看板服务。我们会持续改进功能，重大变更将提前 30 天通过站内信与邮件通知。"],
  ["账号与安全", "你需要妥善保管账号凭据。发现异常登录时，请立即在“安全设置”中重置密码并退出所有设备。"],
  ["数据归属", "你上传的设备数据、工单记录归你所在的组织所有。我们仅在提供服务所必需的范围内处理这些数据。"],
  ["费用与发票", "订阅费用按自然月结算。发票将在每月 5 日前开具，可在“账单中心”下载电子发票。"],
  ["服务可用性", "我们承诺月度可用性不低于 99.9%。计划内维护会提前 72 小时公告，并尽量安排在凌晨进行。"],
  ["终止服务", "你可以随时导出数据并注销组织。注销后 30 天内数据可恢复，超过期限将被永久删除。"],
  ["争议解决", "本协议适用中华人民共和国法律。因本协议产生的争议，双方应友好协商；协商不成的，提交杭州仲裁委员会仲裁。"],
];

export default function Demo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>查看服务协议</DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>燕青云服务协议</DialogTitle>
          <DialogDescription>更新于 2026 年 9 月 1 日</DialogDescription>
        </DialogHeader>
        <DialogPanel className="grid gap-5 text-sm">
          {sections.map(([title, body], index) => (
            <section className="grid gap-1.5" key={title}>
              <h3 className="font-medium">
                {index + 1}. {title}
              </h3>
              <p className="text-pretty text-muted-foreground leading-relaxed">{body}</p>
              <p className="text-pretty text-muted-foreground leading-relaxed">
                如对本条款有疑问，可通过工作台右下角的“联系客服”与我们沟通，我们会在一个工作日内回复。
              </p>
            </section>
          ))}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>暂不同意</DialogClose>
          <DialogClose render={<Button />}>同意并继续</DialogClose>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
