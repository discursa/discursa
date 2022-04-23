import { ComponentPropsWithoutRef } from "react"

export interface LabeledTextAreaProps
  extends ComponentPropsWithoutRef<"textarea"> {
  name: string
  label: string
  labelProps: ComponentPropsWithoutRef<"label">
  styles?: string
}
