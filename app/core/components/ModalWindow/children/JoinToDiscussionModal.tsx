import { DiscussionServiceType } from "app/api/services/Discussion/Discussion.types"
import { getDiscussionById } from "app/api/services/functions"
import { check } from "app/core/modules/Check"
import { DiscussionType } from "app/core/types"
import { BlitzRouter, ClientSession, Routes, setQueryData } from "blitz"
import { FC, Fragment, useState } from "react"
import { JoinToPrivate } from "../../Form/children/JoinToPrivate"

interface JoinToPrivateDisussionModal {
	discussions: DiscussionType[]
	session: ClientSession
	router: BlitzRouter
	discussionService: DiscussionServiceType
}

export const JoinToPrivateDisussionModal: FC<JoinToPrivateDisussionModal> = (
	props
) => {
	const { discussions, session, router, discussionService } = props
	const [error, setError] = useState(false)

	return (
		<Fragment>
			<JoinToPrivate
				className="w100 col g1"
				submitText="Join"
				initialValues={{ code: "" }}
				onSubmit={async (values) => {
					const discussion = getDiscussionById(discussions, values.code)

					if (discussion !== undefined && !check.joined(discussion, session)) {
						const route = Routes.ShowDiscussionPage({
							discussionId: discussion.id_,
						})

						setError(false)
						await discussionService.join(
							discussion,
							session.userId,
							setQueryData
						)
						router.push(route)
					} else {
						setError(true)
					}
				}}
			/>
			{error && (
				<p className="red top-space-sm">
					Code isn't valid or you has already joined this discusion
				</p>
			)}
		</Fragment>
	)
}
