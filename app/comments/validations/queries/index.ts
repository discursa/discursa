import { z } from "zod"

const GetCommentSchema = z.object({
	id_: z.number().optional(),
})

export { GetCommentSchema }
