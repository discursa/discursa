import React, { FC, Fragment, useState } from "react"
import { Button } from "app/core/components"
import {
	ButtonNavigationItem,
	ButtonNavigationProps,
} from "./ButtonNavigation.types"

export const ButtonNavigation: FC<ButtonNavigationProps> = (props) => {
	const { buttons, size, setActivePage } = props
	const [active, setActive] = useState<number>(0)

	const toggleActive = (button: ButtonNavigationItem) => {
		const { id, onClick } = button

		setActive(id)
		if (setActivePage !== undefined) {
			setActivePage(id)
		}
		if (onClick !== undefined) {
			onClick()
		}
	}

	return (
		<Fragment>
			{buttons.map((button) => (
				<Button
					key={button.id}
					variant={active === button.id ? "primary" : "tertiary"}
					size={size}
					styles={button.styles}
					leadingicon={button.leadingicon}
					onClick={() => toggleActive(button)}
				>
					{button.name}
				</Button>
			))}
		</Fragment>
	)
}
