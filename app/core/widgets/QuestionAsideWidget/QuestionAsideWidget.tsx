import getUserById from "app/api/queries/User/getUserById"
import getUsers from "app/api/queries/User/getUsers"
import { QuestionService } from "app/api/services"
import {
	AddUserToPrivateQuestionModal,
	Avatar,
	Button,
	ChangeQuestionAuthorModal,
	Icon,
	ModalWindow,
} from "app/core/components"
import { check } from "app/core/modules/Check"
import { ModalWindowType, QuestionType } from "app/core/types"
import {
	addObjectToStore,
	getId,
	getShortenUsername,
} from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import {
	ClientSession,
	Link,
	Routes,
	setQueryData,
	useQuery,
	useSession,
} from "blitz"
import { FC } from "react"

interface QuestionAsideWidgetProps {
	question: QuestionType
	nestingLevel: string
	session: ClientSession
	modals: ModalWindowType[]
	setModals: Function
}

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
			await questionService.leave(question, session, setQueryData)
		}
	}

	return (
		<aside className="w100 col g2 pr-40px box-border">
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
