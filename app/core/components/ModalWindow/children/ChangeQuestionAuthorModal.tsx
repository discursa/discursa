import { User } from "@prisma/client"
import changeQuestionAuthor from "app/api/mutations/Question/changeQuestionAuthor"
import { QuestionType } from "app/core/types"
import { updateDbObject } from "app/core/utils/functions"
import { FC, Fragment, useState } from "react"
import { ChangeAuthorForm } from "../../Form/children/ChangeAuthorForm"

interface ChangeQuestionAuthorModalProps {
	users: User[]
	question: QuestionType
	setQueryData: Function
}

interface ChangeAuthorFormValuesType {
	username: string
}

export const ChangeQuestionAuthorModal: FC<ChangeQuestionAuthorModalProps> = (
	props
) => {
	const { users, question, setQueryData } = props

	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: ChangeAuthorFormValuesType) => {
		const newAuthor = users.find((user) => {
			return user.name === values.username
		})

		const newAuthorValues = {
			authorId: newAuthor?.id,
		}

		if (newAuthor !== undefined) {
			setError(false)
			await updateDbObject(
				changeQuestionAuthor,
				question.id_,
				newAuthorValues,
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
