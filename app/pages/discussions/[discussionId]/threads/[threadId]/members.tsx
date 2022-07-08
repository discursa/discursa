import { Header, LoadingOverlay } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { ThreadMembersMainWidget } from "app/threads"
import getThread from "app/threads/queries/getThread"
import { UserHasntPermitionsWidget } from "app/users"
import { BlitzPage, useParam, useQuery } from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL = "../../../../"

const ThreadMembersPage: FC = () => {
	const threadId = useParam("threadId", "number")

	const [thread] = useQuery(getThread, {
		id_: threadId,
	})

	return thread.visibility === "Public" ? (
		<UserHasntPermitionsWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle="Members"
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside />
			<Suspense fallback={<LoaderBox size="sm" />}>
				<ThreadMembersMainWidget
					threadId={threadId}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
		</Layout>
	)
}

const ShowThreadMembersPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<ThreadMembersPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowThreadMembersPage
