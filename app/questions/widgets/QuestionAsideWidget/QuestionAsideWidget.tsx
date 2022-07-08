import { Avatar, Button, Icon } from "app/core/components"
import { check } from "app/core/modules/Check"
import { typeGuard } from "app/core/modules/TypeGuard"
import {
	addObjectToStore,
	getId,
	getShortenUsername,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import {
	AddUserToPrivateQuestionModal,
	ChangeQuestionAuthorModal,
} from "app/questions/components"
import { QuestionService } from "app/questions/services"
import getUserById from "app/users/queries/getUserById"
import getUsers from "app/users/queries/getUsers"
import { Link, Routes, setQueryData, useQuery } from "blitz"
import { FC, Fragment } from "react"
import { QuestionAsideWidgetProps } from "./QuestionAsideWidget.types"

export const QuestionAsideWidget: FC<QuestionAsideWidgetProps> = (props) => {
	const { question, nestingLevel, session, modals, setModals } = props

	const [users] = useQuery(getUsers, {})

	const [user] = useQuery(getUserById, {
		id: question.authorId,
	})

	const gearIcon = (
		<Icon size="sm" href={icons.gear} nestingLevel={nestingLevel} />
	)

	const personAddIcon = (
		<Icon size="sm" href={icons.personAdd} nestingLevel={nestingLevel} />
	)

	const signOutIcon = (
		<Icon size="sm" href={icons.signOut} nestingLevel={nestingLevel} />
	)

	const peopleIcon = (
		<Icon size="sm" href={icons.people} nestingLevel={nestingLevel} />
	)

	const addUserToPrivateQuestionModal = {
		id: getId(modals),
		title: "Invite someone to question",
		children: (
			<AddUserToPrivateQuestionModal
				question={question}
				setQueryData={setQueryData}
			/>
		),
	}

	const changeQuestionAuthorModal = {
		id: getId(modals),
		title: "Change question author",
		children: (
			<ChangeQuestionAuthorModal
				users={users}
				question={question}
				setQueryData={setQueryData}
			/>
		),
	}

	const leaveQuestion = async () => {
		if (check.author(session.userId, question.authorId)) {
			addObjectToStore(setModals, changeQuestionAuthorModal)
		} else {
			const questionService = new QuestionService()

			if (typeGuard.isString(session.userId)) {
				await questionService.leave(question, session.userId, setQueryData)
			}
		}
	}

	return (
		<aside className="w100 col g1 pr-40px box-border">
			<div className="row aic jcfs">
				<p className="simple-text right-space-xs">Owner:</p>
				<Link href={`/${user.name}`}>
					<a className="row g1">
						<Avatar
							type="text"
							size="sm"
							shortenName={getShortenUsername(user)}
						/>
						{user.name}
					</a>
				</Link>
			</div>
			<div className="row g1">
				<p className="simple-text">Type:</p>
				<p className="sub-text">{question.visibility}</p>
			</div>
			<div className="row g1">
				<p className="simple-text">Answered:</p>
				<p className="sub-text">{question.answered ? "True" : "False"}</p>
			</div>
			{check.author(session.userId, question.authorId) &&
			check.private(question) ? (
				<Fragment>
					<Link
						href={Routes.ShowQuestionMembersPage({
							discussionId: question.parent,
							questionId: question.id_,
						})}
					>
						<Button
							variant="secondary"
							size="md"
							type="submit"
							styles="w100"
							leadingicon={peopleIcon}
						>
							Members
						</Button>
					</Link>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingicon={personAddIcon}
						onClick={() =>
							addObjectToStore(setModals, addUserToPrivateQuestionModal)
						}
					>
						Invite
					</Button>
				</Fragment>
			) : (
				""
			)}
			{check.author(session.userId, question.authorId) && (
				<Link
					href={Routes.ShowEditQuestionPage({
						discussionId: question.parent,
						questionId: question.id_,
					})}
				>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingicon={gearIcon}
					>
						Settings
					</Button>
				</Link>
			)}
			<Button
				variant="danger"
				size="md"
				type="submit"
				styles="w100"
				leadingicon={signOutIcon}
				onClick={leaveQuestion}
			>
				Leave
			</Button>
		</aside>
	)
}
