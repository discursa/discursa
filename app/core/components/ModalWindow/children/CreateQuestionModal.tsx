import { QuestionService } from "app/api/services"
import {
	DiscussionType,
	QuestionFromValuesType,
	QuestionType,
} from "app/core/types"
import { QuestionSchema } from "app/core/validation"
import { useRouter, useSession } from "blitz"
import { FC } from "react"
import { QuestionForm } from "../../Form/children/QuestionForm"

interface CreateQuestionModalProps {
	questions: QuestionType[]
	discussion: DiscussionType
}

export const CreateQuestionModal: FC<CreateQuestionModalProps> = (props) => {
	const { questions, discussion } = props

	const router = useRouter()
	const session = useSession()
	const questionService = new QuestionService()

	const submitRequest = async (values: QuestionFromValuesType) => {
		await questionService.create(questions, values, discussion, session, router)
	}

	return (
		<QuestionForm
			className="w100 col g1"
			submitText="Ask"
			schema={QuestionSchema}
			initialValues={{
				name: "",
				description: "",
				visibility: "",
			}}
			onSubmit={async (values: QuestionFromValuesType) => {
				await submitRequest(values)
			}}
		/>
	)
}
