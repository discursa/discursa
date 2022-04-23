import { ComponentPropsWithoutRef } from "react"

export interface LabeledInputProps extends ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  inputSize: "sm" | "md" | "lg"
  labelProps: ComponentPropsWithoutRef<"label">
  styles?: string
}
