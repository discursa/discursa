import createThread from "app/api/mutations/Thread/createThread"
import updateThread from "app/api/mutations/Thread/updateThread"
import { CommentType, DiscussionType, ThreadType } from "app/core/types"
import { addObjectToDb, getId, updateDbObject } from "app/core/utils/functions"
import { BlitzRouter, ClientSession } from "blitz"
import { CommentService } from "../Comment/Comment"
import { CommentValuesType } from "../Discussion/Discussion.types"
import { ThreadServiceType } from "./Thread.types"

interface ValuesType {
	name: string
	visibility: string
}

const commentService = new CommentService()

export class ThreadService implements ThreadServiceType {
	async create(
		threads: ThreadType[],
		values: ValuesType,
		discussion: DiscussionType,
		router: BlitzRouter
	) {
		const thread = {
			id_: getId(threads),
			name: values.name,
			visibility: values.visibility,
			members: [],
			parent: discussion.id_,
		}

		const route = `/discussions/${discussion.id_}/${thread.id_}`

		try {
			await addObjectToDb(createThread, thread, router, route)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async update(thread: ThreadType, values: ValuesType, setQueryData: Function) {
		try {
			await updateDbObject(updateThread, thread.id_, values, setQueryData)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async comment(
		comments: CommentType[],
		router: BlitzRouter,
		values: CommentValuesType,
		parentId: number,
		reply: boolean,
		replierId: string,
		session: ClientSession
	) {
		const comment = {
			id_: getId(comments),
			message: values.message,
			parent: parentId,
			replierId: reply ? replierId : "",
			authorId: session.userId,
			type: "thread",
		}

		try {
			await commentService.create(router, "", comment)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async delete() {}
}
