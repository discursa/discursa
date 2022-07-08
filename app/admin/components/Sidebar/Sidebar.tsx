import { Button } from "app/core/components"
import { Link } from "blitz"
import { FC } from "react"
import styles from "./Sidebar.module.scss"
import { SidebarProps, SidebarLinkType } from "./Sidebar.types"

export const Sidebar: FC<SidebarProps> = (props) => {
	const { nestingLevel } = props

	const links: SidebarLinkType[] = [
		{
			id: 0,
			name: "Discussions",
		},
	]

	return (
		<header className={styles.Sidebar}>
			{links.map((link) => (
				<Link key={link.id} href={link.route}>
					<a>
						<Button
							variant="tertiary"
							size="lg"
							type="submit"
							styles="w100 jcfs"
							leadingicon={link.leadingicon}
						>
							{link.name}
						</Button>
					</a>
				</Link>
			))}
		</header>
	)
}
