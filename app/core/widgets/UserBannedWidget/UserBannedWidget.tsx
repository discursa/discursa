import { Button, InfoBlock } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { icons } from "app/core/utils/icons"
import { Link, Routes } from "blitz"
import { FC } from "react"

interface UserBannedWidgetProps {
	nestingLevel: string
}

export const UserBannedWidget: FC<UserBannedWidgetProps> = (props) => {
	const { nestingLevel } = props

	return (
		<Layout
			activePage="Discussions"
			pageTitle="Oops..."
			pageClass={styles.LayoutForm}
			nestingLevel={nestingLevel}
		>
			<InfoBlock
				title="Oops... You are baned"
				description="You can't see anything, because you are banned"
				href={icons.error}
				nestingLevel={nestingLevel}
			>
				<Link href={Routes.ShowDiscussionsPage()}>
					<Button variant="secondary" size="lg" type="submit">
						Back to discussions
					</Button>
				</Link>
			</InfoBlock>
		</Layout>
	)
}
