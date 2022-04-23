import React, { FC, ForwardedRef } from "react"
import { LabeledInputProps } from "./LabeledInput.types"
import { useFormContext } from "react-hook-form"
import { forwardRef } from "react"

export const LabeledInput = forwardRef((props: LabeledInputProps, ref) => {
  const { name, label, inputSize, labelProps, styles } = props

  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext()

  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]

  const errorClassName = error && "red-border"
  const otherStyles =
    styles !== undefined ? `${errorClassName} ${styles}` : errorClassName

  return (
    <label {...labelProps}>
      {label}

      <input
        className={`input-${inputSize} ${otherStyles}`}
        disabled={isSubmitting}
        {...register(name)}
        {...props}
      />

      {error && (
        <p className="red" role="alert">
          {error}
        </p>
      )}
    </label>
  )
})
