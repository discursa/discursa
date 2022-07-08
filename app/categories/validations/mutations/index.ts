import { z } from "zod"

const CreateCategorySchema = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
})

const DeleteCategorySchema = z.object({
	id_: z.number(),
})

const UpdateCategorySchema = z.object({
	id_: z.number(),
	name: z.string(),
	description: z.string(),
})

export { CreateCategorySchema, DeleteCategorySchema, UpdateCategorySchema }
