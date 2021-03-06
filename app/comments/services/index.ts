import { typeGuard } from "app/core/modules/TypeGuard"
import { addObjectToDb, deleteObjectFromDb } from "app/core/utils/functions"
import { BlitzRouter, ClientSession, RouteUrlObject } from "blitz"
import { CommentServiceType } from "../../api/services/Comment/Comment.types"

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
			await deleteObjectFromDb(deleteComment, comment, router, null)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async reply(
		type: "question" | "thread",
		comments: CommentType[],
		router: BlitzRouter,
		values: CommentFormValuesType,
		parent: DiscussionType | ThreadType | QuestionType,
		comment: CommentType,
		session: ClientSession
	) {
		if (type === "thread" && typeGuard.isThread(parent)) {
			const threadService = new ThreadService()

			try {
				threadService.comment(
					comments,
					router,
					values,
					parent.id_,
					comment.id_,
					session,
					parent
				)
			} catch (error: any) {
				console.log(error)
				throw new Error(error)
			}
		}

		if (type === "question" && typeGuard.isQuestion(parent)) {
			const questionService = new QuestionService()

			try {
				questionService.comment(
					comments,
					router,
					values,
					parent.id_,
					comment.id_,
					session,
					parent
				)
			} catch (error: any) {
				console.log(error)
				throw new Error(error)
			}
		}
	}
}
