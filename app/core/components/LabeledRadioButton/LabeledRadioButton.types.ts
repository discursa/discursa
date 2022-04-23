import { ComponentPropsWithoutRef } from "react"

export interface LabeledRadioButtonProps
  extends ComponentPropsWithoutRef<"input"> {
  name: string
  label: string
  labelProps: any
  outerProps: any
}
