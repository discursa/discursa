import createThread from "app/api/mutations/Thread/createThread"
import deleteThread from "app/api/mutations/Thread/deleteThread"
import joinThread from "app/api/mutations/Thread/joinThread"
import leaveThread from "app/api/mutations/Thread/leaveThread"
import updateThread from "app/api/mutations/Thread/updateThread"
import { CommentType, DiscussionType, ThreadType } from "app/core/types"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	removeElementFromArray,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter, ClientSession, Routes } from "blitz"
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
		router: BlitzRouter,
		session: ClientSession
	) {
		const thread = {
			id_: getId(threads),
			name: values.name,
			visibility: values.visibility,
			members: values.visibility === "Private" ? [session.userId] : [],
			parent: discussion.id_,
			authorId: session.userId,
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
	async delete(thread: ThreadType, router: BlitzRouter) {
		const message = "This thread will be deleted"
		const route = Routes.ShowDiscussionPage({ discussionId: thread.parent })

		try {
			await deleteObjectFromDb(deleteThread, thread, router, route, message)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async join(
		thread: ThreadType,
		session: ClientSession,
		pushErrorAlert: Function,
		setQueryData: Function
	) {
		const members = [...thread.members, session.userId]

		try {
			// @ts-ignore
			if (thread.members.includes(session.userId)) {
				pushErrorAlert()
			} else {
				await updateDbObject(joinThread, thread.id_, members, setQueryData)
			}
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async leave(
		thread: ThreadType,
		session: ClientSession,
		setQueryData: Function
	) {
		const members = removeElementFromArray(thread.members, session.userId)

		try {
			await updateDbObject(leaveThread, thread.id_, members, setQueryData)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
