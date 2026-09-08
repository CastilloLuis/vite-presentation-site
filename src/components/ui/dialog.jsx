import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogTitle = DialogPrimitive.Title
const DialogDescription = DialogPrimitive.Description

const DialogOverlay = React.forwardRef(function DialogOverlay({ className, ...props }, ref) {
    return (
        <DialogPrimitive.Overlay
            ref={ref}
            className={cn(
                'fixed inset-0 z-50 bg-black/85 backdrop-blur-md transition-opacity duration-300',
                'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                className
            )}
            {...props}
        />
    )
})

const DialogContent = React.forwardRef(function DialogContent(
    { className, children, showClose = true, overlayClassName, ...props },
    ref
) {
    return (
        <DialogPrimitive.Portal>
            <DialogOverlay className={overlayClassName} />
            <DialogPrimitive.Content
                ref={ref}
                className={cn(
                    'fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-10',
                    'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
                    className
                )}
                {...props}
            >
                {children}
                {showClose && (
                    <DialogPrimitive.Close
                        className="fixed top-5 right-5 rounded-full border border-white/15 p-2.5 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                        aria-label="Close"
                    >
                        <X className="size-4" />
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
    )
})

export {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
}
