import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { LabeledRadioButtonProps } from "./LabeledRadioButton.types"
import styles from "./LabeledRadioButton.module.scss"

export const LabeledRadioButton: FC<LabeledRadioButtonProps> = (props) => {
  const { name, label, labelProps, outerProps } = props

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]

  const errorClassName = error && styles.ErrorRadioBtn

  return (
    <div {...outerProps}>
      <label {...labelProps}>
        <input
          className={styles.RadioInput}
          type="radio"
          disabled={isSubmitting}
          {...register(name)}
          {...props}
        />
        <span className={`${styles.RadioBtn} ${errorClassName}`}>
          <span className={styles.RadioCircle} />
        </span>

        {label}
      </label>

      {error && (
        <div role="alert" className="simple-text top-space-sm">
          {error}
        </div>
      )}
    </div>
  )
}
