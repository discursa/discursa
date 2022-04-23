import { ComponentPropsWithoutRef } from "react"
export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant: "primary" | "secondary" | "tertiary" | "danger"
  size: "sm" | "md" | "lg"
  href: string
  styles?: string
  iconStyles?: string
  nestinglevel: string
}
