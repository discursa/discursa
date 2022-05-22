import { ThreadService } from "app/api/services/Thread/Thread"
import { DiscussionType, ThreadType } from "app/core/types"
import { ThreadSchema } from "app/core/validation"
import { BlitzRouter, ClientSession } from "blitz"
import { FC } from "react"
import { ThreadForm } from "../../Form/children/ThreadForm"

const threadService = new ThreadService()

interface CreateThreadModalProps {
	threads: ThreadType[]
	discussion: DiscussionType
	router: BlitzRouter
	session: ClientSession
}

export const CreateThreadModal: FC<CreateThreadModalProps> = (props) => {
	const { threads, discussion, router, session } = props

	return (
		<ThreadForm
			className="w100 col g2"
			submitText="Create"
			schema={ThreadSchema}
			initialValues={{
				name: "",
				visibility: "",
			}}
			onSubmit={async (values) => {
				await threadService.create(threads, values, discussion, router, session)
			}}
		/>
	)
}
