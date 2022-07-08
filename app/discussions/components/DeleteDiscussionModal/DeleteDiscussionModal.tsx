import { Button } from "app/core/components"
import { changeValue } from "app/core/utils/functions"
import { DiscussionService } from "app/discussions/services"
import { useRouter } from "blitz"
import { FC, Fragment, useState } from "react"
import { DeleteDiscussionModalProps } from "./DeleteDiscussionModal.types"

export const DeleteDiscussionModal: FC<DeleteDiscussionModalProps> = (
	props
) => {
	const { discussion } = props
	const [value, setValue] = useState<string>("")
	const router = useRouter()
	const discussionService = new DiscussionService()

	const submitRequest = async () => {
		await discussionService.delete(discussion, router)
	}

	return (
		<Fragment>
			<p className="simple-text bottom-space-md">
				This action cannot be undone. This will permanently delete the
				discussion, threads and comments
			</p>
			<form
				className="w100 col g1"
				onSubmit={async () => {
					await submitRequest()
				}}
			>
				<label className="col g1">
					<p className="simple-text">Write {discussion.name} to confirm</p>
					<input
						className="input-md w100"
						type="text"
						placeholder="Type required info to confirm"
						value={value}
						onChange={(e: any) => changeValue(e, setValue)}
					/>
				</label>
				<Button
					variant="danger"
					size="md"
					type="submit"
					styles="w100 top-space-xs"
					onClick={async () => {
						await submitRequest()
					}}
					disabled={value !== discussion.name}
				>
					I understand consequences
				</Button>
			</form>
		</Fragment>
	)
}
