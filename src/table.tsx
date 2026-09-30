import type { ComponentProps } from "react";
import * as Coss from "./coss/table";
import { cn } from "./utils";
export type TableProps = ComponentProps<typeof Coss.Table> & { density?: "default" | "compact" };
export function Table({ className, density = "default", ...props }: TableProps) { return <Coss.Table data-density={density} className={cn("group/table", className)} {...props} />; }
export { TableBody, TableCaption, TableFooter, TableHeader, TableRow } from "./coss/table";
export function TableHead({ className, ...props }: ComponentProps<typeof Coss.TableHead>) { return <Coss.TableHead className={cn("h-(--density-table-row) group-data-[density=compact]/table:h-(--density-table-row-compact)", className)} {...props} />; }
export function TableCell({ className, ...props }: ComponentProps<typeof Coss.TableCell>) { return <Coss.TableCell className={cn("h-(--density-table-row) group-data-[density=compact]/table:h-(--density-table-row-compact)", className)} {...props} />; }
