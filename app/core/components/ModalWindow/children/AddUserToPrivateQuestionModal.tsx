import getUsers from "app/api/queries/User/getUsers"
import { QuestionService } from "app/api/services"
import { QuestionType } from "app/core/types"
import { useQuery } from "blitz"
import { FC, Fragment, useState } from "react"
import { AddUserForm } from "../../Form/children/AddUserForm"

interface AddUserToPrivateQuestionModalProps {
	question: QuestionType
	setQueryData: Function
}

interface Values {
	username: string
}

export const AddUserToPrivateQuestionModal: FC<
	AddUserToPrivateQuestionModalProps
> = (props) => {
	const { question, setQueryData } = props
	const [users] = useQuery(getUsers, {})
	const [error, setError] = useState<boolean>(false)

	const submitRequest = async (values: Values) => {
		const invitedUser = users.find((user) => user.name === values.username)
		const questionService = new QuestionService()

		if (invitedUser !== undefined) {
			setError(false)
			await questionService.join(question, invitedUser.id, setQueryData)
		} else {
			setError(true)
		}
	}

	return (
		<Fragment>
			<AddUserForm
				className="w100 col g1"
				submitText="Invite"
				initialValues={{ username: "" }}
				onSubmit={async (values) => {
					await submitRequest(values)
				}}
			/>
			{error && (
				<p className="red top-space-sm">
					User not found or user has already joined discussion
				</p>
			)}
		</Fragment>
	)
}
