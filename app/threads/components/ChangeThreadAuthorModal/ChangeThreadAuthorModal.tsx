import { ChangeAuthorForm } from "app/core/components"
import { ThreadService } from "app/threads/services"
import { FC, Fragment, useState } from "react"
import {
	ChangeAuthorFormValuesType,
	ChangeThreadAuthorModalProps,
} from "./ChangeThreadAuthorModal.types"

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
