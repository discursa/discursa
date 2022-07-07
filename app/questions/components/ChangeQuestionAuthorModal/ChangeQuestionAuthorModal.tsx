import { ChangeAuthorForm } from "app/core/components"
import { QuestionService } from "app/questions/services"
import { FC, Fragment, useState } from "react"
import {
	ChangeAuthorFormValuesType,
	ChangeQuestionAuthorModalProps,
} from "./ChangeQuestionAuthorModal.types"

export const ChangeQuestionAuthorModal: FC<ChangeQuestionAuthorModalProps> = (
	props
) => {
	const { users, question, setQueryData } = props

	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: ChangeAuthorFormValuesType) => {
		const questionService = new QuestionService()
		const newAuthor = users.find((user) => {
			return user.name === values.username
		})

		if (newAuthor !== undefined) {
			setError(false)
			await questionService.changeAuthor(question, newAuthor.id, setQueryData)
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
