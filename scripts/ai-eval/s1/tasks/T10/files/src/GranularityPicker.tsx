export type Granularity = "day" | "week" | "month";

export type GranularityPickerProps = {
  value: Granularity;
  onChange: (value: Granularity) => void;
};

export function GranularityPicker(_props: GranularityPickerProps) {
  return null;
}
