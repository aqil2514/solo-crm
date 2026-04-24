// components/molecules/base-dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ReactNode } from "react"
import { twMerge } from "tailwind-merge"

// Definisikan tipe ukuran yang tersedia
type DialogSize = "sm" | "md" | "lg" | "xl" | "full"

interface BaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
  size?: DialogSize // Tambahkan props size
  className?: string // Untuk override styling jika butuh custom mendadak
}

// Mapping ukuran ke class Tailwind
const sizeClasses: Record<DialogSize, string> = {
  sm: "sm:max-w-[425px]",
  md: "sm:max-w-[600px]",
  lg: "sm:max-w-[800px]",
  xl: "sm:max-w-[1140px]",
  full: "sm:max-w-[95vw] h-[90vh]", // Hampir layar penuh
}

export function BaseDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = "md",
  className,
}: BaseDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={twMerge(
          "overflow-y-auto max-h-[95vh]",
          sizeClasses[size], 
          className
        )}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        
        <div className="py-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}