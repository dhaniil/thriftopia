import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-auto",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground px-2 py-0.5 [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary px-2 py-0.5 text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive px-2 py-0.5 text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground [a&]:hover:bg-accent px-2 py-0.5 [a&]:hover:text-accent-foreground",
        amount:
          "bg-black text-white rounded-full px-1 text-xs font-medium",
        size:
          "bg-black text-white rounded-full px-2 text-xs font-medium",
        accordion:
          " text-gray-500 rounded-sm cursor-pointer border-0 px-1 text-xs font-normal",
        size2:
          " bg-transparent text-black cursor-pointer  px-4 py-2 text-sm font-normal",
        category:
          " bg-gray-200 text-black cursor-pointer rounded-full px-3 border-gray-400 py-2 text-xs font-normal",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
