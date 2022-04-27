import { z } from "zod"
import { name, description } from "app/core/utils/validation"

export const CategorySchema = z.object({
	name,
	description,
})
