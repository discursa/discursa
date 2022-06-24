import { User } from "@prisma/client"
import { DiscussionService } from "app/api/services"
import { DiscussionType } from "app/core/types"
import { FC, Fragment, useState } from "react"
import { ChangeAuthorForm } from "../../Form/children/ChangeAuthorForm"

interface ChangeAuthorModalProps {
	users: User[]
	discussion: DiscussionType
	setQueryData: Function
}

interface ChangeAuthorFormValuesType {
	username: string
}

export const ChangeDiscussionAuthorModal: FC<ChangeAuthorModalProps> = (
	props
) => {
	const { users, discussion, setQueryData } = props

	const discussionService = new DiscussionService()
	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: ChangeAuthorFormValuesType) => {
		const newAuthor = users.find((user) => {
			return user.name === values.username
		})

		if (newAuthor !== undefined) {
			setError(false)
			await discussionService.changeAuthor(
				discussion,
				newAuthor.id,
				setQueryData
			)
		} else {
			setError(true)
		}
	}

	return (
		<Fragment>
			<ChangeAuthorForm
				className="w100 col g1"
				submitText="Change author"
				initialValues={{ username: "" }}
				onSubmit={async (values) => {
					submitRequest(values)
				}}
			/>
			{error && (
				<p className="red top-space-sm">User with this username not found</p>
			)}
		</Fragment>
	)
}
