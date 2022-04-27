import getDiscussion from "app/api/queries/Discussion/getDiscussion"
import { DiscussionService } from "app/api/services"
import {
	Alert,
	Breadcrumbs,
	DiscussionForm,
	Header,
	Spinner,
} from "app/core/components"
import Layout from "app/core/layouts/Layout"
import styles from "app/core/layouts/Layout.module.scss"
import {
	getNothingChangedAlert,
	getSuccessfullyUpdatedAlert,
} from "app/core/templates/alert"
import { AlertType } from "app/core/types"
import {
	addObjectToStore,
	removeObjectFromStore,
} from "app/core/utils/functions"
import { DiscussionSchema } from "app/core/validation"
import { BlitzPage, Routes, useParam, useQuery, useRouter } from "blitz"
import { Fragment, Suspense, useState } from "react"

const NESTING_LEVEL = "../../"
const discussionService = new DiscussionService()

export const EditDiscussion = () => {
	const router = useRouter()
	const discussionId = useParam("discussionId", "number")
	const [alerts, setAlerts] = useState<AlertType[]>([])
	const [discussion, { setQueryData }] = useQuery(
		getDiscussion,
		{
			id_: discussionId,
		},
		{
			staleTime: Infinity,
		}
	)

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
			id: 2,
			name: "Edit discussion",
			route: Routes.EditDiscussionPage({ discussionId: discussion.id_ }),
		},
	]

	const nothingChangedAlert = getNothingChangedAlert(alerts, "discussion")
	const successfullyUpdatedAlert = getSuccessfullyUpdatedAlert(
		alerts,
		"discussion"
	)

	return (
		<Layout
			activePage="Discussions"
			pageTitle={discussion.name}
			pageClass={styles.LayoutForm}
			nestingLevel={NESTING_LEVEL}
		>
			<Breadcrumbs items={breadcrumbsItems} />
			<DiscussionForm
				className="w75 col g1"
				submitText="Update"
				resetText="Delete"
				initialValues={discussion}
				schema={DiscussionSchema}
				onSubmit={async (values) =>
					discussionService.update(
						values,
						discussion,
						setQueryData,
						addObjectToStore(setAlerts, nothingChangedAlert),
						addObjectToStore(setAlerts, successfullyUpdatedAlert)
					)
				}
				onReset={async () => {
					discussionService.delete(discussion, router)
				}}
			/>
			{alerts.map((alert) => (
				<Alert
					key={alert.id}
					variant={alert.variant}
					message={alert.message}
					toast={false}
					iconHref={alert.iconHref}
					nestingLevel={NESTING_LEVEL}
					styles="bottom-20"
					remove={() => removeObjectFromStore(alerts, setAlerts)}
				/>
			))}
		</Layout>
	)
}

const EditDiscussionPage: BlitzPage = () => {
	return (
		<Fragment>
			<Header title="Loading..." />
			<Suspense fallback={<Spinner />}>
				<EditDiscussion />
			</Suspense>
		</Fragment>
	)
}

EditDiscussionPage.authenticate = false

export default EditDiscussionPage
