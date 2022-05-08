import { z } from "zod"
import { name, message } from "app/core/utils/validation"

export const DiscussionSchema = z.object({
	name,
	category: z.string(),
	message,
	visibility: z.string(),
	voting: z.boolean(),
})
