import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef(function TooltipContent(
    { className, sideOffset = 8, children, ...props },
    ref
) {
    return (
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    't-micro z-50 rounded-full border border-line bg-bg-raised px-2 py-1 text-ink-soft',
                    'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
                    className
                )}
                {...props}
            >
                {children}
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    )
})

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
