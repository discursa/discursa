import { FC } from "react"
import { useFormContext } from "react-hook-form"
import styles from "./Dropdown.module.scss"

interface DropdownProps {
	name: string
	label: string
	options: any[]
}

export const Dropdown: FC<DropdownProps> = (props) => {
	const { name, label, options } = props

	const {
		register,
		formState: { isSubmitting },
	} = useFormContext()

	return (
		<label className="col simple-text">
			{label}
			<select
				className={styles.Dropdown}
				disabled={isSubmitting}
				{...register(name)}
			>
				{options.map((option) => (
					<option key={option.name} value={option.name}>
						{option.name}
					</option>
				))}
			</select>
		</label>
	)
}
