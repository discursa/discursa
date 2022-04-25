import { z } from "zod"
import { message } from "app/core/utils/validation"

export const CommentSchema = z.object({
	message,
})
