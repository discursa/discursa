import { check } from "app/core/modules/Check"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	removeElementFromArray,
	updateDbObject,
} from "app/core/utils/functions"
import { FORM_ERROR } from "app/discussions/components/DiscussionForm/DiscussionForm"
import {
	DiscussionFormValuesType,
	DiscussionServiceType,
	DiscussionType,
} from "app/discussions/types"
import { BlitzRouter, ClientSession, Routes } from "blitz"
import banUserAtDiscussion from "../mutations/banUserAtDiscussion"
import changeDiscussionAuthor from "../mutations/changeDiscussionAuthor"
import createDiscussion from "../mutations/createDiscussion"
import deleteDiscussion from "../mutations/deleteDiscussion"
import joinDiscussion from "../mutations/joinDiscussion"
import subscribeDiscussion from "../mutations/subscribeDiscussion"
import updateDiscussion from "../mutations/updateDiscussion"
import voteDiscussion from "../mutations/voteDiscussion"

export class DiscussionService implements DiscussionServiceType {
	async create(
		values: DiscussionFormValuesType,
		discussions: DiscussionType[],
		session: ClientSession,
		router: BlitzRouter
	) {
		const members = values.visibility === "Public" ? [] : [session.userId]

		const discussion = {
			id_: getId(discussions),
			name: values.name,
			message: values.message,
			category: values.category,
			visibility: values.visibility,
			voting: values.voting,
			upvotes: 0,
			unvotes: 0,
			upvoters: [],
			unvoters: [],
			subscribers: [],
			members: members,
			banned: [],
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

	async update(
		values: DiscussionFormValuesType,
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
		const upvoters = discussion.upvoters.includes(userId)
			? removeElementFromArray(discussion.upvoters, userId)
			: [...discussion.upvoters, userId]

		const upvotesCount = discussion.upvoters.includes(userId)
			? discussion.upvotes - 1
			: discussion.upvotes + 1

		const unvoters = discussion.unvoters.includes(userId)
			? removeElementFromArray(discussion.unvoters, userId)
			: discussion.unvoters

		const unvotesCount = discussion.unvoters.includes(userId)
			? discussion.unvotes - 1
			: discussion.unvotes

		const upvotedDiscussion = {
			upvotes: upvotesCount,
			upvoters: upvoters,
			unvotes: unvotesCount,
			unvoters: unvoters,
		}

		try {
			await updateDbObject(
				voteDiscussion,
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
		const upvoters = discussion.upvoters.includes(userId)
			? removeElementFromArray(discussion.upvoters, userId)
			: discussion.upvoters

		const upvotesCount = discussion.upvoters.includes(userId)
			? discussion.upvotes - 1
			: discussion.upvotes

		const unvotesCount = discussion.unvoters.includes(userId)
			? discussion.unvotes - 1
			: discussion.unvotes + 1

		const unvouters = discussion.unvoters.includes(userId)
			? removeElementFromArray(discussion.unvoters, userId)
			: [...discussion.unvoters, userId]

		const unvotedDiscussion = {
			upvotes: upvotesCount,
			upvoters: upvoters,
			unvotes: unvotesCount,
			unvoters: unvouters,
		}

		try {
			await updateDbObject(
				voteDiscussion,
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
			await updateDbObject(
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
			await updateDbObject(
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
		setQueryData: Function
	) {
		const members = removeElementFromArray(discussion.members, userId)

		const leavedDiscussion = {
			members: members,
		}

		try {
			await updateDbObject(
				joinDiscussion,
				discussion.id_,
				leavedDiscussion,
				setQueryData
			)
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
			await updateDbObject(
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

	async ban(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const bannedMembers = {
			banned: [...discussion.banned, userId],
		}

		try {
			await updateDbObject(
				banUserAtDiscussion,
				discussion.id_,
				bannedMembers,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async unban(
		discussion: DiscussionType,
		userId: string,
		setQueryData: Function
	) {
		const bannedMembers = removeElementFromArray(discussion.banned, userId)

		try {
			await updateDbObject(
				banUserAtDiscussion,
				discussion.id_,
				bannedMembers,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async changeAuthor(
		discussion: DiscussionType,
		userId: string | null,
		setQueryData: Function
	) {
		const newAuthor = {
			authorId: userId,
		}

		try {
			await updateDbObject(
				changeDiscussionAuthor,
				discussion.id_,
				newAuthor,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
