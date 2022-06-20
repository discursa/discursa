import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getThread from "app/api/queries/Thread/getThread"
import { Breadcrumbs, Header, LoadingOverlay } from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { UserHasntPermitionsWidget } from "app/core/widgets"
import { BlitzPage, Routes, useParam, useQuery } from "blitz"
import { FC, Fragment, Suspense } from "react"

const NESTING_LEVEL = "../../../../"

const ThreadMembersPage: FC = () => {
	const threadId = useParam("threadId", "number")

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

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 1,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 2,
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
		{
			id: 3,
			name: thread.name,
			route: Routes.ShowThreadPage({
				discussionId: discussion.id_,
				threadId: thread.id_,
			}),
		},
		{
			id: 4,
			name: "Members",
			route: Routes.ShowThreadMembersPage({
				discussionId: discussion.id_,
				threadId: thread.id_,
			}),
		},
	]

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
			<Fragment>
				<section className="w100 col g1">
					<Breadcrumbs items={breadcrumbsItems} />
					<UserList
						type="thread"
						object={thread}
						members={thread.members}
						nestingLevel={NESTING_LEVEL}
						setQueryData={setQueryData}
					/>
				</section>
			</Fragment>
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
