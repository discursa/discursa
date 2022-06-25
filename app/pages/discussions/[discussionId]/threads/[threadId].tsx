import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getThread from "app/api/queries/Thread/getThread"
import getThreads from "app/api/queries/Thread/getThreads"
import getUserById from "app/api/queries/User/getUserById"
import { Alert, Header, LoadingOverlay, ModalWindow } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { typeGuard } from "app/core/modules/TypeGuard"
import { AlertType, ModalWindowType } from "app/core/types"
import {
	ThreadAsideWidget,
	ThreadMainWidget,
	ThreadsSidebarWidget,
	UserBannedWidget,
} from "app/core/widgets"
import { BlitzPage, useParam, useQuery, useSession } from "blitz"
import { Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../"

const ThreadPage = () => {
	const threadId = useParam("threadId", "number")
	const session = useSession()
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const [modals, setModals] = useState<ModalWindowType[]>([])
	const [thread, { setQueryData }] = useQuery(
		getThread,
		{
			id_: threadId,
		},
		{
			staleTime: Infinity,
		}
	)

	const [discussion] = useQuery(getDiscussion, {
		id_: thread.parent,
	})
	// @ts-ignore
	const [user] = useQuery(getUserById, { id: session.userId })
	const [threads] = useQuery(getThreads, {})
	const userBannedCondition =
		typeGuard.isString(session.userId) && thread.banned.includes(session.userId)

	return userBannedCondition ? (
		<UserBannedWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage=""
			pageTitle={thread.name}
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<ThreadsSidebarWidget
					discussion={discussion}
					threads={threads}
					session={session}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<ThreadMainWidget threadId={threadId} nestingLevel={NESTING_LEVEL} />
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<ThreadAsideWidget
					thread={thread}
					user={user}
					nestingLevel={NESTING_LEVEL}
					setQueryData={setQueryData}
					setModals={setModals}
					modals={modals}
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

const ShowThreadPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading" />
			<Suspense fallback={<LoadingOverlay />}>
				<ThreadPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowThreadPage
