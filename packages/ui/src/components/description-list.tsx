"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type DescriptionListProps = useRender.ComponentProps<"dl">;
export function DescriptionList({ render, className, ...props }: DescriptionListProps) {
  return useRender({ defaultTagName: "dl", render, props: mergeProps({ "data-slot": "description-list", className: cn("m-0 flex min-w-0 flex-col gap-(--qy-panel-gap) text-body", className) }, props) });
}
export type DescriptionListItemProps = useRender.ComponentProps<"div">;
export function DescriptionListItem({ render, className, ...props }: DescriptionListItemProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "description-list-item", className: cn("grid min-w-0 gap-(--qy-field-gap)", className) }, props) });
}
export type DescriptionListTermProps = useRender.ComponentProps<"dt">;
export function DescriptionListTerm({ render, className, ...props }: DescriptionListTermProps) {
  return useRender({ defaultTagName: "dt", render, props: mergeProps({ "data-slot": "description-list-term", className: cn("min-w-0 text-body-strong wrap-anywhere", className) }, props) });
}
export type DescriptionListDetailProps = useRender.ComponentProps<"dd">;
export function DescriptionListDetail({ render, className, ...props }: DescriptionListDetailProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "description-list-detail", className: cn("m-0 min-w-0 wrap-anywhere", className) }, props) });
}
