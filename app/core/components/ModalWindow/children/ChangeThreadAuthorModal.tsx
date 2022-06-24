import { User } from "@prisma/client"
import { ThreadService } from "app/api/services"
import { ThreadType } from "app/core/types"
import { FC, Fragment, useState } from "react"
import { ChangeAuthorForm } from "../../Form/children/ChangeAuthorForm"

interface ChangeThreadAuthorModalProps {
	users: User[]
	thread: ThreadType
	setQueryData: Function
}

interface ChangeAuthorFormValuesType {
	username: string
}

export const ChangeThreadAuthorModal: FC<ChangeThreadAuthorModalProps> = (
	props
) => {
	const { users, thread, setQueryData } = props

	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: ChangeAuthorFormValuesType) => {
		const threadService = new ThreadService()
		const newAuthor = users.find((user) => {
			return user.name === values.username
		})

		if (newAuthor !== undefined) {
			setError(false)
			await threadService.changeAuthor(thread, newAuthor.id, setQueryData)
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
