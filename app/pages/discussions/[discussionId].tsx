import { Alert, Header, LoadingOverlay, ModalWindow } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { typeGuard } from "app/core/modules/TypeGuard"
import { AlertType, ModalWindowType } from "app/core/types"
import { DiscussionAsideWidget, DiscussionMainWidget } from "app/discussions"
import getDiscussion from "app/discussions/queries/getDiscussion"
import { ThreadsSidebarWidget } from "app/threads"
import getThreads from "app/threads/queries/getThreads"
import { UserBannedWidget } from "app/users"
import getUserById from "app/users/queries/getUserById"
import { BlitzPage, useParam, useQuery, useSession } from "blitz"
import { Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../"

export const DiscussionPage = () => {
	const session = useSession()
	const discussionId = useParam("discussionId", "number")
	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{ id_: discussionId },
		{ staleTime: Infinity }
	)
	const [threads] = useQuery(getThreads, {})
	const [user] = useQuery(getUserById, { id: discussion.authorId })
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [alerts, setAlerts] = useState<AlertType[]>([])

	const userBannedCondition =
		typeGuard.isString(session.userId) &&
		discussion.banned.includes(session.userId)

	return userBannedCondition ? (
		<UserBannedWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle={discussion.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<ThreadsSidebarWidget
					discussion={discussion}
					nestingLevel={NESTING_LEVEL}
					threads={threads}
					session={session}
				/>
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<DiscussionMainWidget discussionId={discussionId} />
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<DiscussionAsideWidget
					discussion={discussion}
					nestingLevel={NESTING_LEVEL}
					setQueryData={setQueryData}
					modals={modals}
					setModals={setModals}
					user={user}
				/>
			</Suspense>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					variant={alert.variant}
					message={alert.message}
					toast={false}
					nestingLevel={NESTING_LEVEL}
					iconHref={alert.iconHref}
				/>
			))}
			{modals.map((modal) => (
				<ModalWindow
					key={modal.id}
					title={modal.title}
					modals={modals}
					setModals={setModals}
					nestingLevel={NESTING_LEVEL}
				>
					{modal.children}
				</ModalWindow>
			))}
		</Layout>
	)
}

const ShowDiscussionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<DiscussionPage />
			</Suspense>
		</Fragment>
	)
}

ShowDiscussionPage.authenticate = false

export default ShowDiscussionPage
