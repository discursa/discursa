import { FC } from "react"
import styles from "app/core/layouts/Layout.module.scss"
import { Button, InfoBlock } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import { Link, Routes } from "blitz"
import { icons } from "app/core/utils/icons"

interface UserHasntPermitionsWidgetProps {
	nestingLevel: string
}

export const UserHasntPermitionsWidget: FC<UserHasntPermitionsWidgetProps> = (
	props
) => {
	const { nestingLevel } = props

	return (
		<Layout
			activePage="Discussions"
			pageTitle="Oops..."
			pageClass={styles.LayoutForm}
			nestingLevel={nestingLevel}
		>
			<InfoBlock
				title="Oops... You haven't permitions"
				description="You haven't permitions to see page content"
				href={icons.error}
				nestingLevel={nestingLevel}
			>
				<Link href={Routes.ShowHome()}>
					<Button variant="secondary" size="lg" type="submit">
						Back to general
					</Button>
				</Link>
			</InfoBlock>
		</Layout>
	)
}
