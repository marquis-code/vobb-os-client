import { cn } from "lib";
import { HTMLAttributes, forwardRef } from "react";

export const Row = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...rest }, ref) => (
		<div ref={ref} {...rest} className={cn("flex gap-4", className)} />
	)
);

Row.displayName = "Row";

export const Column = forwardRef<
	HTMLDivElement,
	HTMLAttributes<HTMLDivElement>
>(({ className, ...rest }, ref) => (
	<div ref={ref} {...rest} className={cn("flex flex-col gap-4", className)} />
));

Column.displayName = "Column";
