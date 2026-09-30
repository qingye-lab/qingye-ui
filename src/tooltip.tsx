import type { ComponentProps } from "react";
import { TooltipProvider as CossTooltipProvider } from "./coss/tooltip";
export { Tooltip, TooltipTrigger, TooltipContent } from "./coss/tooltip";
export function TooltipProvider({ delay = 0, ...props }: ComponentProps<typeof CossTooltipProvider>) { return <CossTooltipProvider delay={delay} {...props} />; }
