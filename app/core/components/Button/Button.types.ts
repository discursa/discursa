import { ComponentPropsWithoutRef, ReactNode } from "react"

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode
  variant: "primary" | "secondary" | "tertiary" | "danger"
  size: "sm" | "md" | "lg"
  styles?: string
  leadingIcon?: ReactNode
}
