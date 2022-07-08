import createQuestion from "../mutations/createQuestion"
import updateQuestion from "../mutations/updateQuestion"
import changeQuestionAuthor from "../mutations/changeQuestionAuthor"
import deleteQuestion from "../mutations/deleteQuestion"
import joinQuestion from "../mutations/joinQuestion"
import { check } from "app/core/modules/Check"
import {
	addObjectToDb,
	deleteObjectFromDb,
	getId,
	removeElementFromArray,
	updateDbObject,
} from "app/core/utils/functions"
import { BlitzRouter, ClientSession, Routes } from "blitz"
import {
	QuestionFromValuesType,
	QuestionServiceType,
	QuestionType,
} from "../types"
import { DiscussionType } from "app/discussions"
import {
	CommentFormValuesType,
	CommentService,
	CommentType,
} from "app/comments"
import answerQuestion from "../mutations/answerQuestion"

export class QuestionService implements QuestionServiceType {
	async create(
		questions: QuestionType[],
		values: QuestionFromValuesType,
		discussion: DiscussionType,
		session: ClientSession,
		router: BlitzRouter
	) {
		const question = {
			id_: getId(questions),
			name: values.name,
			description: values.description,
			visibility: values.visibility,
			authorId: session.userId,
			members: values.visibility === "Private" ? [session.userId] : [],
			parent: discussion.id_,
		}

		const route = `discussions/${discussion.id_}/questions/${question.id_}`

		try {
			await addObjectToDb(createQuestion, question, router, route)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async update(
		question: QuestionType,
		values: QuestionFromValuesType,
		setQueryData: Function,
		pushNothingChangedAlert: () => void,
		pushSuccessfullyUpdatedAlert: () => void
	) {
		const arrayForCheck = [
			{
				name: values.name,
				initialName: question.name,
			},
			{
				name: values.description,
				initialName: question.description,
			},
			{
				name: values.visibility,
				initialName: question.visibility,
			},
		]

		try {
			if (check.changes(arrayForCheck)) {
				pushNothingChangedAlert()
			} else {
				await updateDbObject(updateQuestion, question.id_, values, setQueryData)
				pushSuccessfullyUpdatedAlert()
			}
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async delete(question: QuestionType, router: BlitzRouter) {
		const route = Routes.ShowDiscussionPage({ discussionId: question.parent })

		try {
			await deleteObjectFromDb(deleteQuestion, question, router, route)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async answer(
		question: QuestionType,
		comment: CommentType,
		setQueryData: Function
	) {
		const answeredQuestion = {
			answered: true,
			answerId: comment.id,
		}

		try {
			await updateDbObject(
				answerQuestion,
				question.id_,
				answeredQuestion,
				setQueryData
			)
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
		question: QuestionType
	) {
		const comment = {
			id_: getId(comments),
			message: values.message,
			parent: parentId,
			replierId: replierId,
			authorId: session.userId,
			type: "question",
			grandParent: question.parent,
		}

		const commentService = new CommentService()

		try {
			await commentService.create(router, "", comment)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
	async join(question: QuestionType, userId: string, setQueryData: Function) {
		const joinedQuestion = {
			members: [...question.members, userId],
		}

		try {
			await updateDbObject(
				joinQuestion,
				question.id_,
				joinedQuestion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async leave(question: QuestionType, userId: string, setQueryData: Function) {
		const leavedQuestion = {
			members: removeElementFromArray(question.members, userId),
		}

		try {
			await updateDbObject(
				joinQuestion,
				question.id_,
				leavedQuestion,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}

	async changeAuthor(
		question: QuestionType,
		userId: string,
		setQueryData: Function
	) {
		const newAuthor = {
			authorId: userId,
		}

		try {
			await updateDbObject(
				changeQuestionAuthor,
				question.id_,
				newAuthor,
				setQueryData
			)
		} catch (error: any) {
			console.log(error)
			throw new Error(error)
		}
	}
}
