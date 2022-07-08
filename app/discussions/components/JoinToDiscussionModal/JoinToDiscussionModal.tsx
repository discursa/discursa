import { check } from "app/core/modules/Check"
import { DiscussionService, getDiscussionById } from "app/discussions"
import { Routes, setQueryData } from "blitz"
import { FC, Fragment, useState } from "react"
import { JoinToPrivate } from "app/core/components"
import { JoinToPrivateDisussionModalProps } from "./JoinToDiscussionModal.types"

export const JoinToPrivateDisussionModal: FC<
	JoinToPrivateDisussionModalProps
> = (props) => {
	const { discussions, session, router } = props
	const [error, setError] = useState(false)
	const discussionService = new DiscussionService()

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
							// @ts-ignore
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
					Code isn&apos;t valid or you has already joined this discusion
				</p>
			)}
		</Fragment>
	)
}
