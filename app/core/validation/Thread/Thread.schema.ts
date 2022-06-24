import { z } from "zod"
import { name, message } from "app/core/utils/validation"

export const ThreadSchema = z.object({
	name,
	message,
	visibility: z.string(),
})
