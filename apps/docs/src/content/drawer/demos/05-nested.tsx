import { Button } from "@qingye/ui/components/button";
import { Drawer, DrawerClose, DrawerDescription, DrawerFooter, DrawerHeader, DrawerPanel, DrawerPopup, DrawerTitle, DrawerTrigger } from "@qingye/ui/components/drawer";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "嵌套抽屉",
  description: "下一级抽屉打开时，上一级缩小并露出边缘，形成层叠；关闭后自然回位。",
};

export default function Demo() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>付款方式</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>付款方式</DrawerTitle>
          <DrawerDescription>订单 YQ20260930-0418 · 应付 ¥ 14,280.00</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter variant="bare">
          <DrawerClose render={<Button variant="ghost" />}>取消</DrawerClose>
          <Drawer>
            <DrawerTrigger render={<Button />}>添加对公账户</DrawerTrigger>
            <DrawerPopup showBar>
              <DrawerHeader>
                <DrawerTitle>添加对公账户</DrawerTitle>
                <DrawerDescription>账户需与开票信息中的公司名称一致。</DrawerDescription>
              </DrawerHeader>
              <DrawerPanel className="grid gap-4" scrollable={false}>
                <Field>
                  <FieldLabel>开户银行</FieldLabel>
                  <Input defaultValue="招商银行杭州分行" />
                </Field>
                <Field>
                  <FieldLabel>银行账号</FieldLabel>
                  <Input inputMode="numeric" placeholder="请输入对公账号" />
                </Field>
              </DrawerPanel>
              <DrawerFooter>
                <DrawerClose render={<Button variant="ghost" />}>返回</DrawerClose>
                <DrawerClose render={<Button />}>保存</DrawerClose>
              </DrawerFooter>
            </DrawerPopup>
          </Drawer>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
