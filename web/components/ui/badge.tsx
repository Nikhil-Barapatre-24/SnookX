import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        outline:
          "border-border text-foreground",
        success:
          "border-green-800/40 bg-green-900/20 text-green-400 dark:border-green-800/40 dark:bg-green-900/20 dark:text-green-400",
        warning:
          "border-amber-800/40 bg-amber-900/20 text-amber-600 dark:border-amber-800/40 dark:bg-amber-900/20 dark:text-amber-400",
        info:
          "border-blue-800/40 bg-blue-900/20 text-blue-600 dark:border-blue-800/40 dark:bg-blue-900/20 dark:text-blue-400",
        purple:
          "border-purple-800/40 bg-purple-900/20 text-purple-600 dark:border-purple-800/40 dark:bg-purple-900/20 dark:text-purple-400",
        danger:
          "border-red-800/40 bg-red-900/20 text-red-600 dark:border-red-800/40 dark:bg-red-900/20 dark:text-red-400",
        muted:
          "border-border bg-secondary text-muted-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
