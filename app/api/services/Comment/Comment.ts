import createComment from "app/api/mutations/Comment/createComment"
import deleteComment from "app/api/mutations/Comment/deleteComment"
import { CommentType } from "app/core/types"
import { addObjectToDb, deleteObjectFromDb } from "app/core/utils/functions"
import { BlitzRouter, RouteUrlObject } from "blitz"
import { DefaultServiceType } from "../types"

interface CommentValuesType {
	message: string
}

export class CommentService implements DefaultServiceType {
	async create(
		router: BlitzRouter,
		route: RouteUrlObject | string,
		object: any
	) {
		try {
			await addObjectToDb(createComment, object, router, route)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async update() {}
	async delete(comment: CommentType, router: BlitzRouter) {
		const message = "This comment will be deleted"

		try {
			await deleteObjectFromDb(deleteComment, comment, router, "", message)
		} catch (error: any) {}
	}
}
