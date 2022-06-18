import { QuestionService } from "app/api/services"
import { QuestionType } from "app/core/types"
import { changeValue } from "app/core/utils/functions"
import { useRouter } from "blitz"
import { FC, Fragment, useState } from "react"
import { Button } from "../../Button/Button"

interface DeleteQuestionModalProps {
	question: QuestionType
}

export const DeleteQuestionModal: FC<DeleteQuestionModalProps> = (props) => {
	const { question } = props
	const [value, setValue] = useState<string>("")
	const router = useRouter()
	const questionService = new QuestionService()

	const deleteQuestion = async () => {
		await questionService.delete(question, router)
	}

	return (
		<Fragment>
			<p className="simple-text bottom-space-md">
				This action cannot be undone. This will permanently delete the question
				and comments
			</p>
			<form
				className="w100 col g1"
				onSubmit={async () => {
					await deleteQuestion()
				}}
			>
				<label className="col g1">
					<p className="simple-text">Write {question.name} to confirm</p>
					<input
						className="input-md w100"
						type="text"
						placeholder="Type required info to confirm"
						value={value}
						onChange={(e: any) => changeValue(e, setValue)}
					/>
				</label>
				<Button
					variant="danger"
					size="md"
					type="submit"
					styles="w100 top-space-xs"
					disabled={value !== question.name}
				>
					I understand consequences
				</Button>
			</form>
		</Fragment>
	)
}
