import { ComponentPropsWithoutRef } from "react"

export interface LabeledCheckboxProps
  extends ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  labelProps: any
  outerProps: any
  nestingLevel: string
}
