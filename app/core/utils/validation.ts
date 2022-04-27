import { z } from "zod"

export const name = z
	.string({
		required_error: "Name is required",
		invalid_type_error: "Name must be string",
	})
	.nonempty({ message: "Can't be empty" })
	.min(3, {
		message: "Must be 3 or more characters long",
	})
	.max(35, {
		message: "Must be 35 or fewer characters long",
	})

export const description = z
	.string({
		required_error: "Description is required",
		invalid_type_error: "Description must be string",
	})
	.nonempty({ message: "Can't be empty" })
	.min(5, {
		message: "Must be 5 or more characters long",
	})
	.max(50, {
		message: "Must be 500 or fewer characters long",
	})

export const message = z
	.string({
		required_error: "Message is required",
		invalid_type_error: "Message must be string",
	})
	.nonempty({ message: "Can't be empty" })
	.min(5, {
		message: "Must be 5 or more characters long",
	})
	.max(500, {
		message: "Must be 500 or fewer characters long",
	})
