import { z } from "zod"

export const GetQuestionSchema = z.object({
	id_: z.number().optional(),
})
