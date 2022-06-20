import React, { FC, forwardRef, useState } from "react"
import { useOutsideClick } from "app/core/hooks/useOutsideClick"
import { Button, IconButton } from "app/core/components"
import { IconButtonDropdownProps } from "./IconButtonDropdown.types"
import styles from "./IconButtonDropdown.module.scss"

export const IconButtonDropdown: FC<IconButtonDropdownProps> = (props) => {
	const { variant, size, href, nestingLevel, items } = props
	const [shown, setShown] = useState<boolean>(false)
	const dangerButtons = items.filter((item) => item.variant === "danger")

	const toggleShown = () => {
		setShown(!shown)
	}

	const currentRef = useOutsideClick(() => setShown(false))

	if (items.length < 2) {
		throw new Error("Dropdown must have 2 or more buttons")
	}

	if (items.every((item) => item.variant === "danger")) {
		throw new Error("All buttons in dropdown can't be danger")
	}

	if (dangerButtons.length >= 2) {
		throw new Error("Dropdown can't contain 2 or more danger buttons")
	}

	if (items.some((item) => item.variant === "primary")) {
		throw new Error("Dropdown can't contain primary buttons")
	}

	return (
		<div className="col jcfe">
			<IconButton
				variant={variant}
				size={size}
				href={href}
				nestinglevel={nestingLevel}
				onClick={toggleShown}
			/>
			<div
				className={shown ? styles.ButtonDropDown : "overflow-hidden"}
				// @ts-ignore
				ref={currentRef}
			>
				{items.map((item) => (
					<Button
						key={item.id}
						variant={item.variant}
						size={item.size}
						styles={styles.IconButtonDropdownItem}
						onClick={() => item.onClick()}
					>
						{item.name}
					</Button>
				))}
			</div>
		</div>
	)
}
