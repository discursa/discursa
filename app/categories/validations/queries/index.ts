import { z } from "zod"

const GetCategorySchema = z.object({
	id_: z.number().optional(),
})

export { GetCategorySchema }
