import { z } from "zod"

const CreateNotificationSchema = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
	type: z.string(),
	recipient: z.string(),
})

const DeleteNotificationSchema = z.object({
	id_: z.number(),
})

const ChangeNotificationTypeSchema = z.object({
	id_: z.number(),
	type: z.string(),
})

export {
	CreateNotificationSchema,
	DeleteNotificationSchema,
	ChangeNotificationTypeSchema,
}
