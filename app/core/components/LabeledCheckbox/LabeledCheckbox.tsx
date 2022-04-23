import React, { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { icons } from "app/core/utils/icons"
import { Icon } from "../Icon/Icon"
import { LabeledCheckboxProps } from "./LabeledCheckbox.types"
import styles from "./LabeledCheckbox.module.scss"

export const LabeledCheckbox: FC<LabeledCheckboxProps> = (props) => {
  const { name, label, labelProps, outerProps, nestingLevel } = props
  const [checked, setChecked] = useState(false)

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const error = Array.isArray(errors[name])
    ? errors[name].join(", ")
    : errors[name]?.message || errors[name]

  const errorClassName = error && styles.ErrorCheckbox

  const toggleCheck = () => {
    setChecked(!checked)
  }

  return (
    <div {...outerProps}>
      <label {...labelProps}>
        <input
          className={styles.CheckInput}
          disabled={isSubmitting}
          type="checkbox"
          checked={checked}
          {...register(name)}
          {...props}
        />
        <span
          className={`${styles.Checkbox} ${errorClassName}`}
          onClick={toggleCheck}
        >
          <Icon
            size="sm"
            href={icons.check}
            styles={styles.IconSm}
            nestingLevel={nestingLevel}
          />
        </span>

        {label}
      </label>

      {error && (
        <div role="alert" className="text-sm text-red-500 m-4">
          {error}
        </div>
      )}
    </div>
  )
}
