import getUser from "app/api/queries/User/getUser"
import getUserById from "app/api/queries/User/getUserById"
import { Avatar, Button, Icon } from "app/core/components"
import { check } from "app/core/modules/Check"
import { QuestionType } from "app/core/types"
import { addObjectToStore, getShortenUsername } from "app/core/utils/functions"
import { icons } from "app/core/utils/icons"
import { ClientSession, Link, Routes, useQuery, useSession } from "blitz"
import { FC } from "react"

interface QuestionAsideWidgetProps {
	question: QuestionType
	nestingLevel: string
	session: ClientSession
}

export const QuestionAsideWidget: FC<QuestionAsideWidgetProps> = (props) => {
	const { question, nestingLevel, session } = props

	const [user] = useQuery(getUserById, {
		id: question.authorId,
	})

	const gearIcon = (
		<Icon size="sm" href={icons.gear} nestingLevel={nestingLevel} />
	)

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
			{check.author(session.userId, question.authorId) ? (
				<Link href={Routes.ShowEditQuestionPage({ discussionId: question.parent, questionId: question.id_ })}>
					<Button
						variant="secondary"
						size="md"
						type="submit"
						styles="w100"
						leadingIcon={gearIcon}
					>
						Settings
					</Button>
				</Link>
			) : (
				""
			)}
		</aside>
	)
}
