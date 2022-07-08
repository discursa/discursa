import { ThreadService } from "app/threads/services"
import { ThreadSchema } from "app/threads/validation"
import { FC } from "react"
import { ThreadForm } from "../ThreadForm/ThreadForm"
import { UpdateThreadModalProps } from "./UpdateThreadModal.types"

export const UpdateThreadModal: FC<UpdateThreadModalProps> = (props) => {
	const { thread, setQueryData, router } = props
	const threadService = new ThreadService()

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
