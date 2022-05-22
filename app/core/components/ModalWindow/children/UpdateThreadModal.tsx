import { ThreadService } from "app/api/services/Thread/Thread"
import { ThreadType } from "app/core/types"
import { ThreadSchema } from "app/core/validation"
import { BlitzRouter } from "blitz"
import { FC } from "react"
import { ThreadForm } from "../../Form/children/ThreadForm"

const threadService = new ThreadService()

interface UpdateThreadModalProps {
	thread: ThreadType
	router: BlitzRouter
	setQueryData: Function
}

export const UpdateThreadModal: FC<UpdateThreadModalProps> = (props) => {
	const { thread, setQueryData, router } = props

	return (
		<ThreadForm
			className="w100 col g1"
			submitText="Update"
			resetText="Delete"
			schema={ThreadSchema}
			initialValues={thread}
			onSubmit={async (values) => {
				await threadService.update(thread, values, setQueryData)
			}}
			onReset={async () => {
				await threadService.delete(thread, router)
			}}
		/>
	)
}
