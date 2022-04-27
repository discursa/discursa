import React, { FC } from "react"
import { Icon } from "../Icon/Icon"
import styles from "./InfoBlock.module.scss"
import { InfoBlockProps } from "./InfoBlock.types"

export const InfoBlock: FC<InfoBlockProps> = (props) => {
	const { title, description, href, children, nestingLevel } = props

	if (title === undefined || title === "") {
		throw new Error("Info block can't be shown without title")
	}

	if (href === undefined || href === "") {
		throw new Error("Info block can't be shown whithout icon href")
	}

	if (description === undefined || description === "") {
		throw new Error("Info block can't be shown whithout description")
	}

	return (
		<section className={styles.InfoBlock}>
			<div className="col aic jcc w100 g1 bottom-space-sm">
				<Icon
					size="xl"
					href={href}
					nestingLevel={nestingLevel}
					styles="white"
				/>
				<h3>{title}</h3>
				<p className="sub-text">{description}</p>
			</div>
			{children}
		</section>
	)
}
