"use client";

import type * as React from "react";
import type { Group } from "./group";

// ButtonGroup is the shadcn name for Group. The parts are the same components,
// re-exported so both vocabularies resolve to one implementation.
export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  groupVariants as buttonGroupVariants,
} from "./group";

export type ButtonGroupProps = React.ComponentProps<typeof Group>;
