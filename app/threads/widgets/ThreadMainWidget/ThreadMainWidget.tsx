import {
	CommentForm,
	CommentFormValuesType,
	CommentList,
	CommentSchema,
	CommentService,
} from "app/comments"
import getComments from "app/comments/queries/getComments"
import getPaginatedComments from "app/comments/queries/getPaginatedComments"
import { Breadcrumbs } from "app/core/components"
import { LoaderBox } from "app/core/components/LoaderBox/LoaderBox"
import { ITEMS_PER_PAGE } from "app/core/constants"
import getDiscussion from "app/discussions/queries/getDiscussion"
import { ThreadService } from "app/threads"
import getThread from "app/threads/queries/getThread"
import {
	Routes,
	usePaginatedQuery,
	useQuery,
	useRouter,
	useSession,
} from "blitz"
import { FC, Suspense, useState } from "react"
import { ThreadMainWidgetProps } from "./ThreadMainWidget.types"

export const ThreadMainWidget: FC<ThreadMainWidgetProps> = (props) => {
	const { threadId, nestingLevel } = props
	const router = useRouter()
	const session = useSession()
	const page = Number(router.query.page) || 0
	const [reply, setReply] = useState<boolean>(false)
	const commentService = new CommentService()

	const [{ paginatedComments, hasMore }, { isPreviousData }] =
		usePaginatedQuery(getPaginatedComments, {
			where: {
				parent: threadId,
				type: "question",
			},
			orderBy: { id_: "asc" },
			skip: ITEMS_PER_PAGE * page,
			take: ITEMS_PER_PAGE,
		})

	const [thread] = useQuery(getThread, {
		id_: threadId,
	})

	const [discussion] = useQuery(getDiscussion, {
		id_: thread.parent,
	})
	const [comments] = useQuery(getComments, {})

	const breadcrumbsItems = [
		{
			id: 0,
			name: "General",
			route: Routes.ShowHome(),
		},
		{
			id: 1,
			name: "Discussions",
			route: Routes.ShowDiscussionsPage(),
		},
		{
			id: 2,
			name: discussion.name,
			route: Routes.ShowDiscussionPage({ discussionId: discussion.id_ }),
		},
		{
			id: 3,
			name: thread.name,
			route: Routes.ShowThreadPage({
				discussionId: discussion.id_,
				threadId: thread.id_,
			}),
		},
	]

	const commentThread = async (values: CommentFormValuesType) => {
		const threadService = new ThreadService()

		await threadService.comment(
			comments,
			router,
			values,
			thread.id_,
			null,
			session,
			thread
		)
	}

	return (
		<section className="w100 col g2">
			<Breadcrumbs items={breadcrumbsItems} />
			<CommentForm
				className="w100 g1"
				submitText="Create"
				schema={CommentSchema}
				initialValues={{ message: "" }}
				onSubmit={async (values) => {
					await commentThread(values)
				}}
			/>
			<Suspense fallback={<LoaderBox size="sm" />}>
				<CommentList
					comments={paginatedComments}
					session={session}
					reply={reply}
					editComment={async () => {
						await commentService.update()
					}}
					setReply={setReply}
					nestingLevel={nestingLevel}
					type="thread"
					parent={thread}
					page={page}
					isPreviousData={isPreviousData}
					hasMore={hasMore}
				/>
			</Suspense>
		</section>
	)
}
