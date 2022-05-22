import { ThreadService } from "app/api/services/Thread/Thread"
import { getThreadById } from "app/api/services/functions"
import { ThreadType } from "app/core/types"
import { setQueryData, useSession } from "blitz"
import { FC, Fragment, useState } from "react"
import { JoinToPrivate } from "../../Form/children/JoinToPrivate"

interface JoinToThreadModalProps {
	threads: ThreadType[]
	pushErrorAlert: Function
}

interface Values {
	code: string
}

const threadService = new ThreadService()

export const JoinToPrivateThreadModal: FC<JoinToThreadModalProps> = (props) => {
	const { threads, pushErrorAlert } = props
	const session = useSession()
	const [error, setError] = useState(false)

	const submitRequest = async (values: Values) => {
		const thread = getThreadById(threads, values.code)

		if (thread !== undefined) {
			setError(false)
			await threadService.join(thread, session, pushErrorAlert, setQueryData)
		} else {
			setError(true)
		}
	}

	return (
		<Fragment>
			<JoinToPrivate
				className="w100 col g1"
				submitText="Join"
				initialValues={{ code: "" }}
				onSubmit={async (values) => {
					await submitRequest(values)
				}}
			/>
			{error && <p className="red top-space-sm">Code isn't valid</p>}
		</Fragment>
	)
}
