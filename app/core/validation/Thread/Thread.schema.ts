import { z } from "zod"
import { name } from "app/core/utils/validation"

export const ThreadSchema = z.object({
	name,
	visibility: z.string(),
})
