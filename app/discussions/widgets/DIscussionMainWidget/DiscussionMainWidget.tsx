import getDiscussion from "app/discussions/queries/getDiscussion"
import { Breadcrumbs } from "app/core/components"
import { PreviewableMessage } from "app/core/components/PreviewableMessage/PreviewableMessage"
import { Routes, useQuery } from "blitz"
import { FC } from "react"
import getUserById from "app/users/queries/getUserById"

interface DiscussionMainWidgetProps {
	discussionId: number | undefined
}

export const DiscussionMainWidget: FC<DiscussionMainWidgetProps> = (props) => {
	const { discussionId } = props

	const [discussion] = useQuery(getDiscussion, { id_: discussionId })
	const [user] = useQuery(getUserById, { id: discussion.authorId })

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 2,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 0,
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
	]

	return (
		<section className="col g1">
			<Breadcrumbs items={breadcrumbsItems} />
			<h1 className="bottom-space-sm">{discussion.name}</h1>
			<PreviewableMessage message={discussion.message} user={user} />
		</section>
	)
}
