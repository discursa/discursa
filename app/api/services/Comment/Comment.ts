import createComment from "app/api/mutations/Comment/createComment"
import deleteComment from "app/api/mutations/Comment/deleteComment"
import {
	CommentFormValuesType,
	CommentType,
	DiscussionType,
	QuestionType,
	ThreadType,
} from "app/core/types"
import { addObjectToDb, deleteObjectFromDb } from "app/core/utils/functions"
import { BlitzRouter, ClientSession, RouteUrlObject } from "blitz"
import { DiscussionService } from "../Discussion/Discussion"
import { QuestionService } from "../Question/Question"
import { ThreadService } from "../Thread/Thread"
import { CommentServiceType } from "./Comment.types"

export class CommentService implements CommentServiceType {
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

	async reply(
		type: "question" | "discussion" | "thread",
		comments: CommentType[],
		router: BlitzRouter,
		values: CommentFormValuesType,
		parent: DiscussionType | ThreadType | QuestionType,
		comment: CommentType,
		session: ClientSession
	) {
		if (type === "discussion") {
			const discussionService = new DiscussionService()
			try {
				discussionService.comment(
					comments,
					router,
					values,
					parent.id_,
					true,
					comment.id_,
					session,
					// @ts-ignore
					parent
				)
			} catch (error: any) {
				console.log(error)
				throw new Error(error)
			}
		}

		if (type === "thread") {
			const threadService = new ThreadService()

			try {
				threadService.comment(
					comments,
					router,
					values,
					parent.id_,
					true,
					comment.id_,
					session,
					// @ts-ignore
					parent
				)
			} catch (error: any) {
				console.log(error)
				throw new Error(error)
			}
		}

		if (type === "question") {
			const questionService = new QuestionService()

			try {
				questionService.comment(
					comments,
					router,
					values,
					parent.id_,
					true,
					comment.id_,
					session,
					// @ts-ignore
					parent
				)
			} catch (error: any) {
				console.log(error)
				throw new Error(error)
			}
		}
	}
}
