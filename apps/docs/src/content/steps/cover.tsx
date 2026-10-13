import { Step, Steps, StepTitle } from "@qingye_lab/ui/components/steps";

export default function Cover() {
  return <Steps>
    <Step state="complete"><StepTitle>第一步</StepTitle></Step>
    <Step state="current"><StepTitle>第二步</StepTitle></Step>
    <Step state="upcoming"><StepTitle>第三步</StepTitle></Step>
  </Steps>;
}
