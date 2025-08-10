"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface FormFieldProps {
  label: string
  error?: string
  success?: boolean
  required?: boolean
  description?: string
  className?: string
  children: React.ReactNode
}

export function FormField({
  label,
  error,
  success,
  required,
  description,
  className,
  children
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      
      <div className="relative">
        {children}
        
        {/* Success indicator */}
        {success && !error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        )}
        
        {/* Error indicator */}
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <AlertCircle className="h-4 w-4 text-red-500" />
          </div>
        )}
      </div>
      
      {/* Description */}
      {description && !error && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      
      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  success?: boolean
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <Input
        className={cn(
          "transition-colors",
          error && "border-red-500 focus-visible:ring-red-500",
          success && !error && "border-green-500 focus-visible:ring-green-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ValidatedInput.displayName = "ValidatedInput"

interface ValidatedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  success?: boolean
}

export const ValidatedTextarea = forwardRef<HTMLTextAreaElement, ValidatedTextareaProps>(
  ({ className, error, success, ...props }, ref) => {
    return (
      <Textarea
        className={cn(
          "transition-colors",
          error && "border-red-500 focus-visible:ring-red-500",
          success && !error && "border-green-500 focus-visible:ring-green-500",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
ValidatedTextarea.displayName = "ValidatedTextarea"
