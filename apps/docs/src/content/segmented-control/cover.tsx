import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export default function Cover() {
  return <SegmentedControl aria-label="对齐" defaultValue="center">
    <SegmentedControlItem value="left">左</SegmentedControlItem>
    <SegmentedControlItem value="center">中</SegmentedControlItem>
    <SegmentedControlItem value="right">右</SegmentedControlItem>
  </SegmentedControl>;
}
