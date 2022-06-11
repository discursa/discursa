import createComment from "app/api/mutations/Comment/createComment"
import deleteComment from "app/api/mutations/Comment/deleteComment"
import { CommentType } from "app/core/types"
import { addObjectToDb, deleteObjectFromDb } from "app/core/utils/functions"
import { BlitzRouter, RouteUrlObject } from "blitz"
import { DefaultServiceType } from "../types"

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
		try {
			await deleteObjectFromDb(deleteComment, comment, router, "")
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
