import {
	CommentFormValuesType,
	CommentService,
	CommentType,
} from "app/comments"
import { typeGuard } from "app/core/modules/TypeGuard"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	removeElementFromArray,
	updateDbObject,
} from "app/core/utils/functions"
import { DiscussionType } from "app/discussions"
import changeThreadAuthor from "app/threads/mutations/changeThreadAuthor"
import { BlitzRouter, ClientSession, Routes } from "blitz"
import createThread from "../mutations/createThread"
import deleteThread from "../mutations/deleteThread"
import joinThread from "../mutations/joinThread"
import updateThread from "../mutations/updateThread"
import { ThreadFormValuesType, ThreadServiceType, ThreadType } from "../types"

interface ValuesType {
	name: string
	visibility: string
}

export class ThreadService implements ThreadServiceType {
	async create(
		threads: ThreadType[],
		values: ThreadFormValuesType,
		discussion: DiscussionType,
		router: BlitzRouter,
		session: ClientSession
	) {
		const thread = {
			id_: getId(threads),
			name: values.name,
			message: values.message,
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
		values: CommentFormValuesType,
		parentId: number,
		replierId: number | null,
		session: ClientSession,
		thread: ThreadType
	) {
		const comment = {
			id_: getId(comments),
			message: values.message,
			parent: parentId,
			replierId: replierId,
			authorId: session.userId,
			type: "thread",
			grandParent: thread.parent,
		}

		const commentService = new CommentService()

		try {
			await commentService.create(router, "", comment)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async delete(thread: ThreadType, router: BlitzRouter) {
		const route = Routes.ShowDiscussionPage({ discussionId: thread.parent })
		const message = "This thread will be deleted"

		try {
			if (window.confirm(message)) {
				await deleteObjectFromDb(deleteThread, thread, router, route)
			}
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
			if (
				typeGuard.isString(session.userId) &&
				thread.members.includes(session.userId)
			) {
				pushErrorAlert()
			} else {
				await updateDbObject(joinThread, thread.id_, members, setQueryData)
			}
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async leave(thread: ThreadType, userId: string, setQueryData: Function) {
		const members = removeElementFromArray(thread.members, userId)

		try {
			await updateDbObject(joinThread, thread.id_, members, setQueryData)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async changeAuthor(
		thread: ThreadType,
		userId: string,
		setQueryData: Function
	) {
		const newAuthor = {
			authorId: userId,
		}

		try {
			await updateDbObject(
				changeThreadAuthor,
				thread.id_,
				newAuthor,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
