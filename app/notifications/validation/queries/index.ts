import { z } from "zod"

const GetNotificationSchema = z.object({
	id_: z.number().optional(),
})

export { GetNotificationSchema }
