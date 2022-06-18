import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getThread from "app/api/queries/Thread/getThread"
import {
	Breadcrumbs,
	Button,
	Header,
	InfoBlock,
	LoadingOverlay,
} from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { icons } from "app/core/utils/icons"
import { BlitzPage, Link, Routes, useParam, useQuery } from "blitz"
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

	return (
		<Layout
			activePage="Discussions"
			pageTitle="Members"
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside />
			{thread.visibility === "Public" ? (
				<section className="w100 col g1 jcc">
					<InfoBlock
						title="Thread is public"
						description="You can't see members, because thread is public"
						href={icons.error}
						nestingLevel={NESTING_LEVEL}
					>
						<Link
							href={Routes.ShowThreadPage({
								discussionId: discussion.id_,
								threadId: thread.id_,
							})}
						>
							<Button variant="secondary" size="lg" type="submit">
								Back to thread
							</Button>
						</Link>
					</InfoBlock>
				</section>
			) : (
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
			)}
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
