import React, { FC, forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import style from "./LabeledTextArea.module.scss"
import { LabeledTextAreaProps } from "./LabeledTextArea.types"

export const LabeledTextArea = forwardRef(
  (props: LabeledTextAreaProps, ref) => {
    const { name, label, labelProps, styles } = props
    const {
      register,
      formState: { errors, isSubmitting },
    } = useFormContext()

    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    const errorStyles = error && "red-border"
    const otherStyles =
      styles !== undefined ? `${errorStyles} ${styles}` : errorStyles

    return (
      <label {...labelProps}>
        {label}
        <textarea
          className={`${style.Textarea} ${otherStyles}`}
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
  }
)
