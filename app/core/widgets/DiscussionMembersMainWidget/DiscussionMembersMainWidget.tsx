import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import { Breadcrumbs } from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import { Routes, useQuery } from "blitz"
import { FC } from "react"

interface DiscussionMembersMainWidgetProps {
	discussionId: number | undefined
	shownUsers: string[]
	nestingLevel: string
}

export const DiscussionMembersMainWidget: FC<
	DiscussionMembersMainWidgetProps
> = (props) => {
	const { discussionId, shownUsers, nestingLevel } = props

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
		<section className="w100 col g1">
			<Breadcrumbs items={breadcrumbsItems} />
			<UserList
				type="discussion"
				object={discussion}
				members={shownUsers}
				nestingLevel={nestingLevel}
				setQueryData={setQueryData}
			/>
		</section>
	)
}
