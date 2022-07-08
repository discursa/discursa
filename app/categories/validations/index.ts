import { description, name } from "app/core/utils/validation"
import { z } from "zod"
import {
	CreateCategorySchema,
	DeleteCategorySchema,
	UpdateCategorySchema,
} from "./mutations"
import { GetCategorySchema } from "./queries"

const CategorySchema = z.object({
	name,
	description,
})

export {
	CreateCategorySchema,
	DeleteCategorySchema,
	UpdateCategorySchema,
	GetCategorySchema,
	CategorySchema,
}
