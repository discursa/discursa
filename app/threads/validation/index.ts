import { message, name } from "app/core/utils/validation"
import { z } from "zod"
import {
	ChangeThreadAuthorSchema,
	CreateThreadSchema,
	DeleteThreadSchema,
	JoinThreadSchema,
	UpdateThreadSchema,
} from "./mutations"
import { GetThreadSchema } from "./queries"

const ThreadSchema = z.object({
	name,
	message,
	visibility: z.string(),
})

export {
	ChangeThreadAuthorSchema,
	CreateThreadSchema,
	DeleteThreadSchema,
	JoinThreadSchema,
	UpdateThreadSchema,
	GetThreadSchema,
	ThreadSchema,
}
