import { icons } from "app/core/utils/icons"
import { FC, useState } from "react"
import { IconButton } from "../IconButton/IconButton"
import styles from "./Accordion.module.scss"
import { AccordionProps } from "./Accordion.types"

export const Accordion: FC<AccordionProps> = (props) => {
	const { title, children, nestingLevel, additionalButton } = props
	const [open, setOpen] = useState<boolean>(false)

	return (
		<section className={styles.Accordion}>
			<div className="w100 row aic jcsb">
				<p className="simple-text">{title}</p>
				<div className="row aic jcfe g1">
					{additionalButton}
					<IconButton
						variant="secondary"
						size="sm"
						href={icons.chevronDown}
						nestinglevel={nestingLevel}
						onClick={() => setOpen(!open)}
						styles={open ? styles.RotatedIcon : ""}
					/>
				</div>
			</div>
			<div className={open ? styles.ShowContent : styles.Content}>
				{children}
			</div>
		</section>
	)
}
