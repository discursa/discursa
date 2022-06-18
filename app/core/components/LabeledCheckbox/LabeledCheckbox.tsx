import { icons } from "app/core/utils/icons"
import React, { FC } from "react"
import { useFormContext } from "react-hook-form"
import { Icon } from "../Icon/Icon"
import styles from "./LabeledCheckbox.module.scss"
import { LabeledCheckboxProps } from "./LabeledCheckbox.types"

export const LabeledCheckbox: FC<LabeledCheckboxProps> = (props) => {
	const { name, label, labelProps, outerProps } = props

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
					<svg
						className={styles.IconSm}
						shapeRendering="optimizeSpeed"
						viewBox="0 0 16 16"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							id="check"
							fillRule="evenodd"
							clipRule="evenodd"
							d="M13.78 4.21995C13.9204 4.36057 13.9993 4.5512 13.9993 4.74995C13.9993 4.9487 13.9204 5.13932 13.78 5.27995L6.53 12.53C6.38937 12.6704 6.19875 12.7493 6 12.7493C5.80125 12.7493 5.61062 12.6704 5.47 12.53L2.22 9.27995C2.08752 9.13777 2.0154 8.94973 2.01882 8.75542C2.02225 8.56112 2.10096 8.37574 2.23838 8.23832C2.37579 8.10091 2.56118 8.0222 2.75548 8.01877C2.94978 8.01534 3.13782 8.08747 3.28 8.21995L6 10.9399L12.72 4.21995C12.8606 4.0795 13.0512 4.00061 13.25 4.00061C13.4487 4.00061 13.6394 4.0795 13.78 4.21995Z"
						/>
					</svg>
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
