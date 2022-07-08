import { User } from "@prisma/client"
import { QuestionType } from "app/questions/types"

interface ChangeQuestionAuthorModalProps {
	users: User[]
	question: QuestionType
	setQueryData: Function
}

interface ChangeAuthorFormValuesType {
	username: string
}

export type { ChangeAuthorFormValuesType, ChangeQuestionAuthorModalProps }
