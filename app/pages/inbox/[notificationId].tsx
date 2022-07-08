import getNotification from "app/notifications/queries/getNotification"
import { Header, LoadingOverlay } from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { BlitzPage, useParam, useQuery } from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL: string = "../"

const NotificationPage: FC = () => {
	const notificationId = useParam("notificationId", "number")

	const [notification] = useQuery(getNotification, {
		id_: notificationId,
	})

	return (
		<Layout
			activePage=""
			nestingLevel={NESTING_LEVEL}
			pageTitle={notification.name}
			pageClass={styles.LayoutForm}
		>
			<h3 className="bottom-space-md">{notification.name}</h3>
			<p className="sub-text">{notification.description}</p>
		</Layout>
	)
}

const ShowNotificationPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<NotificationPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowNotificationPage
