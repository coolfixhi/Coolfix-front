"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
  error?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, checked, onChange, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-2 cursor-pointer group">
          <div className="relative flex items-center justify-center shrink-0 mt-0.5">
            <input
              type="checkbox"
              className="peer sr-only"
              ref={ref}
              checked={checked}
              onChange={onChange}
              {...props}
            />
            <div className={cn(
              "h-5 w-5 rounded border-2 border-gray-300 bg-white transition-all",
              "peer-checked:bg-primary peer-checked:border-primary",
              "peer-focus:ring-2 peer-focus:ring-primary/20",
              "group-hover:border-primary/50",
              "flex items-center justify-center",
              className
            )}>
              <Check className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
            </div>
          </div>
          {label && (
            <span className="text-sm text-foreground leading-relaxed select-none">
              {label}
            </span>
          )}
        </label>
        {error && (
          <p className="text-xs text-destructive ml-7">{error}</p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
