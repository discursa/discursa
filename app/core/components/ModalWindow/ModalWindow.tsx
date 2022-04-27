import { removeObjectFromStore } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import React, { FC } from "react"
import { IconButton } from "../IconButton/IconButton"
import styles from "./ModalWindow.module.scss"
import { ModalWindowProps } from "./ModalWindow.types"

export const ModalWindow: FC<ModalWindowProps> = (props) => {
	const { title, children, setModals, modals, nestingLevel } = props

	return (
		<div className={styles.Modal}>
			<section className={styles.ModalWindow}>
				<div className={styles.ModalHeader}>
					<p className="simple-text">{title}</p>
					<IconButton
						variant="tertiary"
						size="md"
						href={icons.close}
						nestinglevel={nestingLevel}
						onClick={() => removeObjectFromStore(modals, setModals)}
					/>
				</div>
				<div className={styles.ModalBody}>{children}</div>
			</section>
		</div>
	)
}
