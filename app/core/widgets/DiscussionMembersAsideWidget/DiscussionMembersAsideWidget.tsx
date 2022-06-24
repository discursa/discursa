import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import { ButtonNavigation, Icon } from "app/core/components"
import { icons } from "app/core/utils/icons"
import { useQuery } from "blitz"
import { FC } from "react"

interface DiscussionMembersAsideWidgetProps {
	discussionId: number | undefined
	setShownUsers: Function
	nestingLevel: string
}

export const DiscussionMembersAsideWidget: FC<
	DiscussionMembersAsideWidgetProps
> = (props) => {
	const { discussionId, setShownUsers, nestingLevel } = props

	const [discussion] = useQuery(getDiscussion, {
		id_: discussionId,
	})

	const peopleIcon = (
		<Icon size="sm" href={icons.people} nestingLevel={nestingLevel} />
	)
	const circleSlashIcon = (
		<Icon size="sm" href={icons.circleSlash} nestingLevel={nestingLevel} />
	)

	const buttonNavigation = [
		{
			id: 0,
			name: "Members",
			leadingicon: peopleIcon,
			styles: "w100 jcfs",
			onClick() {
				setShownUsers(discussion.members)
			},
		},
		{
			id: 1,
			name: "Banned",
			leadingicon: circleSlashIcon,
			styles: "w100 jcfs",
			onClick() {
				setShownUsers(discussion.banned)
			},
		},
	]

	return (
		<aside className="col aifs jcfs g1">
			<ButtonNavigation buttons={buttonNavigation} size="lg" />
		</aside>
	)
}
