import createComment from "app/api/mutations/Comment/createComment"
import deleteComment from "app/api/mutations/Comment/deleteComment"
import { CommentType } from "app/core/types"
import {
	addObjectToDb,
	getId,
	removeObjectFromDb,
} from "app/core/utils/functions"
import { BlitzRouter, ClientSession } from "blitz"
import { DefaultServiceType } from "../types"

interface CommentValuesType {
	message: string
}

export class CommentService implements DefaultServiceType {
	async create(
		comments: CommentType[],
		values: CommentValuesType,
		parentId: number,
		session: ClientSession,
		router: BlitzRouter,
		reply: boolean,
		replierId?: string
	) {
		const comment = {
			id_: getId(comments),
			message: values.message,
			parent: parentId,
			replierId: reply ? replierId : "",
			authorId: session.userId,
		}

		try {
			await addObjectToDb(createComment, comment, router, "")
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async update() {}
	async delete(comment: CommentType, router: BlitzRouter) {
		const message = "This comment will be deleted"

		try {
			await removeObjectFromDb(deleteComment, comment, router, "", message)
		} catch (error: any) {}
	}
}
