import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import styles from "app/core/layouts/Layout.module.scss"
import Layout from "app/core/layouts/Layout"
import { BlitzPage, Link, Routes, useParam, useQuery } from "blitz"
import {
	Breadcrumbs,
	Button,
	Header,
	InfoBlock,
	LoadingOverlay,
} from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import { Fragment, Suspense } from "react"
import { icons } from "app/core/utils/icons"

const NESTING_LEVEL = "../../"

const DiscussionMembersPage = () => {
	const discussionId = useParam("discussionId", "number")

	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{
			id_: discussionId,
		},
		{
			staleTime: Infinity,
		}
	)

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
			name: "Members",
			route: Routes.ShowDiscussionMembersPage({ discussionId: discussion.id_ }),
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
			{discussion.visibility === "Public" ? (
				<section className="w100 col g1 jcc">
					<InfoBlock
						title="Discussion is public"
						description="You can't see members, because discussion is public"
						href={icons.error}
						nestingLevel={NESTING_LEVEL}
					>
						<Link
							href={Routes.ShowDiscussionPage({
								discussionId: discussion.id_,
							})}
						>
							<Button variant="secondary" size="lg" type="submit">
								Back to discussion
							</Button>
						</Link>
					</InfoBlock>
				</section>
			) : (
				<section className="w100 col g1">
					<Breadcrumbs items={breadcrumbsItems} />
					<UserList
						type="discussion"
						object={discussion}
						members={discussion.members}
						nestingLevel={NESTING_LEVEL}
						setQueryData={setQueryData}
					/>
				</section>
			)}
		</Layout>
	)
}

const ShowDiscussionMembersPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<LoadingOverlay />}>
				<DiscussionMembersPage />
			</Suspense>
		</Fragment>
	)
}

export default ShowDiscussionMembersPage
