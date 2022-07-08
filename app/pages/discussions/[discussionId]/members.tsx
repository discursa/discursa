import getDiscussion from "app/discussions/queries/getDiscussion"
import { Header, LoadingOverlay } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { BlitzPage, useParam, useQuery } from "blitz"
import { Fragment, Suspense, useState } from "react"
import {
	DiscussionMembersAsideWidget,
	DiscussionMembersMainWidget,
} from "app/discussions"
import { UserHasntPermitionsWidget } from "app/users"

const NESTING_LEVEL = "../../"

const DiscussionMembersPage = () => {
	const discussionId = useParam("discussionId", "number")
	const [discussion] = useQuery(getDiscussion, {
		id_: discussionId,
	})

	const [shownUsers, setShownUsers] = useState<string[]>(discussion.members)

	return discussion.visibility === "Public" ? (
		<UserHasntPermitionsWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle="Members"
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<DiscussionMembersAsideWidget
					discussionId={discussionId}
					setShownUsers={setShownUsers}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<DiscussionMembersMainWidget
					discussionId={discussionId}
					shownUsers={shownUsers}
					nestingLevel={NESTING_LEVEL}
				/>
			</Suspense>
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
