import { z } from "zod"

const GetDiscussionSchema = z.object({
	id_: z.number().optional(),
})

export { GetDiscussionSchema }
