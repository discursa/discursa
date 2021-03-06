import {
	ButtonNavigation,
	Header,
	Icon,
	LoadingOverlay,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { icons } from "app/core/utils/icons"
import { pages } from "app/core/utils/pages"
import {
	InboxWidget,
	ReadNotificationsWidget,
	SavedNotificationsWidget,
} from "app/notifications"
import getNotifications from "app/notifications/queries/getNotifications"
import { BlitzPage, useQuery } from "blitz"
import { FC, Fragment, Suspense, useState } from "react"

const NESTING_LEVEL: string = ""

const InboxPage: FC = () => {
	const [activeWidget, setActieWidget] = useState(0)
	const [notifications] = useQuery(getNotifications, {})

	const navigationButtons = [
		{
			id: 0,
			name: "Inbox",
			leadingicon: (
				<Icon size="md" href={icons.inbox} nestingLevel={NESTING_LEVEL} />
			),
			styles: "jcfs w10w0",
			onClick() {
				setActieWidget(0)
			},
		},
		{
			id: 1,
			name: "Saved",
			leadingicon: (
				<Icon size="md" href={icons.bookmark} nestingLevel={NESTING_LEVEL} />
			),
			styles: "jcfs w100",
			onClick() {
				setActieWidget(1)
			},
		},
		{
			id: 2,
			name: "Read",
			leadingicon: (
				<Icon size="md" href={icons.check} nestingLevel={NESTING_LEVEL} />
			),
			styles: "jcfs w100",
			onClick() {
				setActieWidget(2)
			},
		},
	]

	return (
		<Layout
			activePage=""
			pageTitle={pages.inbox}
			pageClass={styles.LayoutSub}
			nestingLevel={NESTING_LEVEL}
		>
			<div className="col aifs jcfs g2">
				<ButtonNavigation size="lg" buttons={navigationButtons} />
			</div>
			<div className="col aifs jcfs g2">
				{activeWidget === 0 && (
					<InboxWidget
						notifications={notifications}
						nestingLevel={NESTING_LEVEL}
					/>
				)}
				{activeWidget === 1 && (
					<SavedNotificationsWidget
						notifications={notifications}
						nestingLevel={NESTING_LEVEL}
					/>
				)}
				{activeWidget === 2 && (
					<ReadNotificationsWidget
						notifications={notifications}
						nestingLevel={NESTING_LEVEL}
					/>
				)}
			</div>
		</Layout>
	)
}

const ShowInboxPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<InboxPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowInboxPage
