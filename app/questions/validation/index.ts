import { name, description } from "app/core/utils/validation"
import { z } from "zod"

import {
	AnswerQuestionSchema,
	ChangeQuestionAuthorSchema,
	CreateQuestionSchema,
	DeleteQuestionSchema,
	JoinQuestionSchema,
	UpdateQuestionSchema,
} from "./mutations"

import { GetQuestionSchema } from "./queries"

const QuestionSchema = z.object({
	name,
	description,
	visibility: z.string(),
})

export {
	AnswerQuestionSchema,
	ChangeQuestionAuthorSchema,
	CreateQuestionSchema,
	DeleteQuestionSchema,
	JoinQuestionSchema,
	UpdateQuestionSchema,
	GetQuestionSchema,
	QuestionSchema,
}
