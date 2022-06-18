import { z } from "zod"
import { name, description } from "app/core/utils/validation"

export const QuestionSchema = z.object({
	name,
	description,
	visibility: z.string(),
})
