import createDiscussion from "app/api/mutations/Discussion/createDiscussion"
import deleteDiscussion from "app/api/mutations/Discussion/deleteDiscussion"
import joinDiscussion from "app/api/mutations/Discussion/joinDiscussion"
import leaveDiscussion from "app/api/mutations/Discussion/leaveDiscussion"
import subscribeDiscussion from "app/api/mutations/Discussion/subscribeDiscussion"
import updateDiscussion from "app/api/mutations/Discussion/updateDiscussion"
import upvoteDiscussion from "app/api/mutations/Discussion/upvoteDiscussion"
import { FORM_ERROR } from "app/core/components/Form/children/DiscussionForm"
import { check } from "app/core/modules/Check"
import { CommentType, DiscussionType } from "app/core/types"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	removeElementFromArray,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter, ClientSession, Routes } from "blitz"
import { CommentService } from "../Comment/Comment"
import {
	CommentValuesType,
	DiscussionServiceType,
	UpvotedValuesType,
	ValuesType,
} from "./Discussion.types"

const commentService = new CommentService()
export class DiscussionService implements DiscussionServiceType {
	async create(
		values: ValuesType,
		discussions: DiscussionType[],
		session: ClientSession,
		router: BlitzRouter
	) {
		const discussion = {
			id_: getId(discussions),
			name: values.name,
			message: values.message,
			category: values.category,
			visibility: values.visibility,
			voting: values.voting,
			upvotes: 0,
			vouters: [],
			subscribers: [],
			members: [],
			authorId: session.userId,
		}

		const route = Routes.ShowDiscussionPage({
			discussionId: discussion.id_,
		})

		try {
			addObjectToDb(createDiscussion, discussion, router, route)
		} catch (error: any) {
			console.log(error)
			return {
				[FORM_ERROR]: error.toString(),
			}
		}
	}

	async comment(
		comments: CommentType[],
		router: BlitzRouter,
		values: CommentValuesType,
		parentId: number,
		reply: boolean,
		replierId: string,
		session: ClientSession,
		discussion: DiscussionType
	) {
		const comment = {
			id_: getId(comments),
			message: values.message,
			parent: parentId,
			grandParent: discussion.id_,
			replierId: reply ? replierId : "",
			authorId: session.userId,
			type: "discussion",
		}

		try {
			await commentService.create(router, "", comment)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async update(
		values: ValuesType,
		discussion: DiscussionType,
		setQueryData: Function,
		pushNothingChangedAlert: any,
		pushSuccessfullyUpdatedAlert: any
	) {
		const arrayForCheck = [
			{
				name: values.name,
				initialName: discussion.name,
			},
			{
				name: values.message,
				initialName: discussion.message,
			},
		]

		try {
			if (check.changes(arrayForCheck)) {
				pushNothingChangedAlert()
			} else {
				await updateDbObject(
					updateDiscussion,
					discussion.id_,
					values,
					setQueryData
				)
				pushSuccessfullyUpdatedAlert()
			}
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async delete(discussion: DiscussionType, router: BlitzRouter) {
		const route = Routes.ShowDiscussionsPage()

		try {
			await deleteObjectFromDb(deleteDiscussion, discussion, router, route)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async upvote(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const updatedVouters = [...discussion.vouters, userId]
		const upvotedDiscussion: UpvotedValuesType = {
			upvotes: discussion.upvotes + 1,
			vouters: updatedVouters,
		}

		try {
			updateDbObject(
				upvoteDiscussion,
				discussion.id_,
				upvotedDiscussion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async unvote(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const updatedVouters = removeElementFromArray(discussion.vouters, userId)
		const unvotedDiscussion: UpvotedValuesType = {
			upvotes: discussion.upvotes - 1,
			vouters: updatedVouters,
		}

		try {
			updateDbObject(
				upvoteDiscussion,
				discussion.id_,
				unvotedDiscussion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async subscribe(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const updatedSubscribers = [...discussion.subscribers, userId]
		const subscribedDiscussion = {
			subscribers: updatedSubscribers,
		}

		try {
			updateDbObject(
				subscribeDiscussion,
				discussion.id_,
				subscribedDiscussion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async unsubscribe(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const updatedSubscribers = removeElementFromArray(
			discussion.subscribers,
			userId
		)
		const unsubscribedDiscussion = {
			subscribers: updatedSubscribers,
		}

		try {
			updateDbObject(
				subscribeDiscussion,
				discussion.id_,
				unsubscribedDiscussion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async leave(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function,
		changeAuthorModal: any
	) {
		const members = removeElementFromArray(discussion.members, userId)

		const leavedDiscussion = {
			members: members,
		}

		try {
			if (check.author(userId, discussion.authorId)) {
				changeAuthorModal
			} else {
				updateDbObject(
					leaveDiscussion,
					discussion.id_,
					leavedDiscussion,
					setQueryData
				)
			}
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async join(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const members = [...discussion.members, userId]

		const joinedDiscussion = {
			members: members,
		}

		try {
			updateDbObject(
				joinDiscussion,
				discussion.id_,
				joinedDiscussion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
