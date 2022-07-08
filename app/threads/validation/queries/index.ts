import { z } from "zod"

const GetThreadSchema = z.object({
	id_: z.number().optional(),
})

export { GetThreadSchema }
