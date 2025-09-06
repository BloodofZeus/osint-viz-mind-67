import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    variant?: "default" | "cyber" | "matrix" | "accent"
  }
>(({ className, sideOffset = 4, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-popover text-popover-foreground border-border",
    cyber: "bg-gradient-primary text-primary-foreground border-primary/30 glow-primary",
    matrix: "bg-gradient-secondary text-secondary-foreground border-secondary/30 glow-secondary", 
    accent: "bg-gradient-accent text-accent-foreground border-accent/30 glow-accent"
  }

  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm glass backdrop-blur-lg shadow-cyber animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent }