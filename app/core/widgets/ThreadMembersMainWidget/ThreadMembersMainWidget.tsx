import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import getThread from "app/api/queries/Thread/getThread"
import { Breadcrumbs } from "app/core/components"
import { UserList } from "app/core/components/UserList/UserList"
import { Routes, useQuery } from "blitz"
import { FC } from "react"

interface ThreadMembersMainWidgetProps {
	threadId: number | undefined
	nestingLevel: string
}

export const ThreadMembersMainWidget: FC<ThreadMembersMainWidgetProps> = (
	props
) => {
	const { threadId, nestingLevel } = props

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
		<section className="w100 col g1">
			<Breadcrumbs items={breadcrumbsItems} />
			<UserList
				type="thread"
				object={thread}
				members={thread.members}
				nestingLevel={nestingLevel}
				setQueryData={setQueryData}
			/>
		</section>
	)
}
