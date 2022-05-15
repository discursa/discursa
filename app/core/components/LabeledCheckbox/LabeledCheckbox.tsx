import { icons } from "app/core/utils/icons"
import React, { FC } from "react"
import { useFormContext } from "react-hook-form"
import { Icon } from "../Icon/Icon"
import styles from "./LabeledCheckbox.module.scss"
import { LabeledCheckboxProps } from "./LabeledCheckbox.types"

export const LabeledCheckbox: FC<LabeledCheckboxProps> = (props) => {
	const { name, label, labelProps, outerProps, nestingLevel } = props

	const {
		register,
		formState: { errors, isSubmitting },
	} = useFormContext()

	const error = Array.isArray(errors[name])
		? errors[name].join(", ")
		: errors[name]?.message || errors[name]

	const errorClassName = error && styles.ErrorCheckbox

	return (
		<div {...outerProps}>
			<label {...labelProps}>
				<input
					className={styles.CheckInput}
					disabled={isSubmitting}
					type="checkbox"
					{...register(name)}
					{...props}
				/>
				<span className={`${styles.Checkbox} ${errorClassName}`}>
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
