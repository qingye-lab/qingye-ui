import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemLink, ItemTitle } from "@qingye_lab/ui/components/item";

export default function Cover() {
  return <Item className="w-full">
    <ItemContent><ItemTitle><ItemLink href="#item">同步记录</ItemLink></ItemTitle><ItemDescription>本周新增 12 条</ItemDescription></ItemContent>
    <ItemActions><Button variant="quiet">编辑</Button></ItemActions>
  </Item>;
}
