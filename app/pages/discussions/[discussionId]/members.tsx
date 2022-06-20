import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import {
	Breadcrumbs,
	ButtonNavigation,
	Header,
	Icon,
	LoadingOverlay,
} from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import { icons } from "app/core/utils/icons"
import { UserHasntPermitionsWidget } from "app/core/widgets"
import { BlitzPage, Routes, useParam, useQuery } from "blitz"
import { Fragment, Suspense, useState } from "react"

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

	const [shownUsers, setShownUsers] = useState<string[]>(discussion.members)

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

	const peopleIcon = (
		<Icon size="sm" href={icons.people} nestingLevel={NESTING_LEVEL} />
	)
	const circleSlashIcon = (
		<Icon size="sm" href={icons.circleSlash} nestingLevel={NESTING_LEVEL} />
	)

	const buttonNavigation = [
		{
			id: 0,
			name: "Members",
			leadingicon: peopleIcon,
			styles: "w100 jcfs",
			onClick() {
				setShownUsers(discussion.members)
			},
		},
		{
			id: 1,
			name: "Banned",
			leadingicon: circleSlashIcon,
			styles: "w100 jcfs",
			onClick() {
				setShownUsers(discussion.banned)
			},
		},
	]

	return discussion.visibility === "Public" ? (
		<UserHasntPermitionsWidget nestingLevel={NESTING_LEVEL} />
	) : (
		<Layout
			activePage="Discussions"
			pageTitle="Members"
			pageClass={styles.LayoutBase}
			nestingLevel={NESTING_LEVEL}
		>
			<aside className="col aifs jcfs g1">
				<ButtonNavigation buttons={buttonNavigation} size="lg" />
			</aside>
			<section className="w100 col g1">
				<Breadcrumbs items={breadcrumbsItems} />
				<UserList
					type="discussion"
					object={discussion}
					members={shownUsers}
					nestingLevel={NESTING_LEVEL}
					setQueryData={setQueryData}
				/>
			</section>
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
